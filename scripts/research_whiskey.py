#!/usr/bin/env python3
"""Build verified whiskey metadata from DrinkMe's current product sitemap.

The script is intentionally conservative: only high-confidence title matches are
accepted automatically. Downloaded pages are cached and requests respect the
site's three-second crawl delay.
"""

import difflib
import html
import json
import re
import subprocess
import time
import unicodedata
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / ".research-cache" / "drinkme"
OUTPUT = ROOT / "whiskey-research-data.js"
IMAGE_DIR = ROOT / "assets" / "research" / "whiskey"
SITEMAP_URL = "https://drinkme.bg/sitemap/product/1.xml"
REJECT_AUTO = {"bushmills-black-bush"}
DRINKME_OVERRIDES = {
    "peats-beast-px": "https://drinkme.bg/product/peats-beast-batch-strenght-px-sherry-wood-finish-whisky",
    "william-lawson-s": "https://drinkme.bg/product/william-lawsons-blended-scotch-whisky",
    "bg-black-ram": "https://drinkme.bg/product/black-ram",
    "ballantine-s-12-yo": "https://drinkme.bg/product/ballantines-12-yo-whisky-07l",
    "balantine-s-люлка": "https://drinkme.bg/product/ballantines-finest-whisky-07l",
    "balblair-12-yo": "https://drinkme.bg/product/balblair-12-years-old-whisky",
    "bushmills-10-yo": "https://drinkme.bg/product/bushmills-10-years-old-whiskey",
    "bushmills-original": "https://drinkme.bg/product/bushmills-original-whiskey-07l",
    "bushmills-red-bush": "https://drinkme.bg/product/bushmills-red-bush-whiskey",
    "bushmills-black-bush": "https://drinkme.bg/product/bushmills-black-bush-whiskey-07l",
    "bulleit-bourbon": "https://drinkme.bg/product/bulleit-bourbon-whiskey",
    "cardhu-gold-reserve": "https://drinkme.bg/product/cardhu-gold-reserve-whisky",
    "grant-s-triple-wood-12-yo": "https://drinkme.bg/product/grants-triple-wood-12-yo-whiskey",
    "four-roses-bourbon": "https://drinkme.bg/product/four-roses-american-bourbon",
    "green-spot-triple-distilled": "https://drinkme.bg/product/spot-whiskey-green-spot-whisky",
    "glenfiddich-project-xx": "https://drinkme.bg/product/glenfiddich-project-xx-with-2-glasses-whisky",
    "dimple-gold-selection": "https://drinkme.bg/product/dimple-gold-selection-whisky-1",
    "dimple-15-yo": "https://drinkme.bg/product/dimple-15-years-old-whisky",
    "kavalan-king-car-conductor": "https://drinkme.bg/product/kavalan-king-car-conductor-whisky",
    "maker-s-mark": "https://drinkme.bg/product/makers-mark-kentucky-straight-bourbon-whisky",
    "monkey-shoulders": "https://drinkme.bg/product/monkey-shoulder-the-original-blended-whisky",
    "royal-brackla-12-yo-sherry-cask-finish": "https://drinkme.bg/product/royal-brackla-12-yo-single-malt-whisky",
    "yellow-spot-12-yo-three-cask": "https://drinkme.bg/product/spot-whiskey-yellow-spot-12-yo-whisky",
    "teacher-s": "https://drinkme.bg/product/teachers-highland-cream-whisky",
    "johnnie-walker-blue-label": "https://drinkme.bg/product/johnni-walker-blue-label-whisky",
}
MANUAL_RECORDS = {
    "glen-scanlan": {
        "name": "Glen Scanlan Finest Scotch",
        "summary": "Glen Scanlan Finest Scotch е blended Scotch whisky от Шотландия, позиционирано като лек и достъпен профил за чисто сервиране и смесени напитки.",
        "origin": "Шотландия",
        "brand": "Glen Scanlan",
        "style": "Blended Scotch Whisky",
        "verifiedVolume": "0.700 л.",
        "verifiedAbv": "40%",
        "image": "assets/products/glen-scanlan.png",
        "source": {"label": "Glen Scanlan", "url": "https://glenscanlan.com/"},
        "verified": True,
        "verifiedAt": "2026-06-28",
        "facts": ["Blended Scotch Whisky", "Шотландия", "Glen Scanlan"],
    },
    "aberlour-14-yo-double-cask": {
        "name": "Aberlour 14 YO Double Cask",
        "summary": "Aberlour 14 YO Double Cask е шотландско single malt уиски, отлежавало в комбинация от традиционен дъб и шери бъчви.",
        "origin": "Шотландия",
        "brand": "Aberlour",
        "style": "Speyside Single Malt",
        "verifiedVolume": "0.700 л.",
        "verifiedAbv": "40%",
        "image": "assets/research/whiskey/aberlour-14-yo-double-cask-transparent.png",
        "source": {"label": "Delicando", "url": "https://www.delicando.com/products/40372-aberlour-14-years-old-double-cask-matured-batch-0007-40-vol-002l"},
        "verified": True,
        "verifiedAt": "2026-06-28",
        "facts": ["Speyside Single Malt", "Шотландия", "Aberlour"],
    },
    "cardhu-amber-rock": {
        "name": "Cardhu Amber Rock",
        "summary": "Cardhu Amber Rock е шотландско Speyside single malt уиски с двойно отлежаване и финален период в обгорени американски дъбови бъчви.",
        "origin": "Шотландия",
        "brand": "Cardhu",
        "style": "Speyside Single Malt",
        "verifiedVolume": "0.700 л.",
        "verifiedAbv": "40%",
        "image": "assets/research/whiskey/cardhu-amber-rock.jpg",
        "source": {"label": "Delicando", "url": "https://www.delicando.com/products/11409-cardhu-amber-rock-double-matured-single-malt-40-vol-07l-in-geschenkbox"},
        "verified": True,
        "verifiedAt": "2026-06-28",
        "facts": ["Speyside Single Malt", "Шотландия", "Cardhu"],
    },
    "jack-daniel-s-metal-box": {
        "name": "Jack Daniel's Metal Box",
        "summary": "Jack Daniel's Metal Box съдържа класическото Tennessee whiskey на марката в метална подаръчна опаковка.",
        "origin": "САЩ",
        "brand": "Jack Daniel's",
        "style": "Tennessee Whiskey",
        "verifiedVolume": "1.0 л.",
        "verifiedAbv": "40%",
        "image": "assets/catalog/jack-daniel-s.png",
        "source": {"label": "DrinkMe.bg", "url": "https://drinkme.bg/product/jack-daniels-whisky"},
        "verified": True,
        "verifiedAt": "2026-06-28",
        "facts": ["Tennessee Whiskey", "САЩ", "Jack Daniel's"],
    },
    "royal-salute-62-gun-american-oak-reserve": {
        "name": "Royal Salute 62 Gun Salute American Oak Reserve",
        "summary": "Royal Salute 62 Gun Salute American Oak Reserve е престижен blended Scotch, съставен от селекция малцови и зърнени уискита с акцент върху продължително отлежаване в американски дъб.",
        "origin": "Шотландия",
        "brand": "Royal Salute",
        "style": "Blended Scotch Whisky",
        "verifiedVolume": "0.700 л.",
        "verifiedAbv": "40%",
        "image": "assets/research/whiskey/royal-salute-62-gun-american-oak-reserve.jpg",
        "source": {"label": "The Whiskey Wash", "url": "https://thewhiskeywash.com/whiskey-reviews/whisky-review-whiskey-whisky-review-royal-salute-62-gun-salute-the-american-oak-reserve-royal-salute/"},
        "verified": True,
        "verifiedAt": "2026-06-28",
        "facts": ["Blended Scotch Whisky", "Шотландия", "Royal Salute"],
    },
    "wild-turkey-81-proof": {
        "name": "Wild Turkey 81 Proof",
        "summary": "Wild Turkey 81 Proof е Kentucky Straight Bourbon от САЩ, бутилиран при 40.5% ABV и създаден като по-мек израз на характерния стил на марката.",
        "origin": "САЩ",
        "brand": "Wild Turkey",
        "style": "Kentucky Straight Bourbon",
        "verifiedVolume": "0.700 л.",
        "verifiedAbv": "40.5%",
        "image": "assets/research/whiskey/wild-turkey-81-proof.jpg",
        "source": {"label": "Weinquelle Lühmann", "url": "https://www.weinquelle.com/artikel/Wild_Turkey_81_Proof_11445_e.html"},
        "verified": True,
        "verifiedAt": "2026-06-28",
        "facts": ["Kentucky Straight Bourbon", "САЩ", "Wild Turkey"],
    },
}
RESEARCH_CORRECTIONS = {
    "aberlour-12-yo-non-chill-filtered": {
        "verifiedAbv": "48%",
        "source": {"label": "Aberlour Official", "url": "https://www.aberlour.com/fr-fr/le-whisky/aberlour-12-ans-non-chill-filtered/"},
    },
    "dimple-15-yo": {"verifiedAbv": "43%"},
    "jack-daniel-s-honey": {
        "verifiedAbv": "35%",
        "source": {"label": "Jack Daniel's", "url": "https://pressroom.jackdaniels.com/wp-content/uploads/2015/01/Tennessee-Honey-Fact-Sheet.pdf"},
    },
    "royal-salute-62-gun-american-oak-reserve": {
        "verifiedAbv": "43%",
        "source": {"label": "Royal Salute Official", "url": "https://www.royalsalute.com/en/whisky/62-gun-salute-american-oak-reserve/"},
    },
}


def normalize(value):
    value = value.replace("&", " and ").replace("№", " no ")
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode().lower()
    return " ".join(token for token in re.findall(r"[a-z0-9]+", value) if token not in {"pet", "pocket"})

def match_score(local_name, remote_title, remote_url):
    ignored = {
        "yo", "the", "and", "whisky", "whiskey", "scotch", "single", "malt"
    }
    local_ordered = [token for token in normalize(local_name).split() if token not in ignored]
    remote_ordered = [token for token in normalize(remote_title).split() if token not in ignored]
    local_tokens = set(local_ordered)
    remote_tokens = set(remote_ordered)
    if local_ordered and local_ordered[0] not in remote_tokens:
        return 0
    sequence = difflib.SequenceMatcher(None, normalize(local_name), normalize(remote_title)).ratio()
    overlap = local_tokens & remote_tokens
    coverage = len(overlap) / max(1, len(local_tokens))
    precision = len(overlap) / max(1, len(remote_tokens))
    token_score = 0.75 * coverage + 0.25 * precision
    score = max(sequence, token_score)
    if any(word in remote_url for word in ("glass", "tumbler", "shaker", "rucksack", "becher", "messer")):
        score -= 0.3
    return score


def request(url):
    request = urllib.request.Request(url, headers={"User-Agent": "BoProMas product research/1.0"})
    with urllib.request.urlopen(request, timeout=40) as response:
        return response.read().decode("utf-8", errors="replace")


def local_whiskeys():
    script = """
const fs=require('fs'),vm=require('vm');
const c={window:{}}; vm.createContext(c);
vm.runInContext(fs.readFileSync('product-data.js','utf8'),c);
const category=c.window.CATALOG_CATEGORIES.find(item=>item.id==='whiskey');
const records=new Map();
const slugify=value=>value.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase()
  .replace(/№/g,'no').replace(/&/g,' and ').replace(/[^a-z0-9а-я]+/gi,'-').replace(/^-+|-+$/g,'');
for(const item of category.items){
  const slug=item.slug||slugify(item.name);
  if(!records.has(slug)) records.set(slug,{slug,name:item.name,variants:[]});
  records.get(slug).variants.push({volume:item.volume,abv:item.abv,packaging:item.packaging});
}
console.log(JSON.stringify([...records.values()]));
"""
    return json.loads(subprocess.check_output(["node", "-e", script], cwd=ROOT, text=True))


def sitemap_products():
    xml = request(SITEMAP_URL)
    return [
        {"url": html.unescape(url), "title": html.unescape(title)}
        for url, title in re.findall(
            r"<url>.*?<loc>(.*?)</loc>.*?<image:title>(.*?)</image:title>.*?</url>",
            xml,
            re.S,
        )
    ]


def page_for(url):
    CACHE.mkdir(parents=True, exist_ok=True)
    target = CACHE / f"{url.rstrip('/').split('/')[-1]}.html"
    if target.exists():
        return target.read_text(encoding="utf-8")
    content = request(url)
    target.write_text(content, encoding="utf-8")
    time.sleep(3)
    return content


def local_product_image(url, slug):
    if not url:
        return ""
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    existing = next(iter(IMAGE_DIR.glob(f"{slug}.*")), None)
    if existing:
        return existing.relative_to(ROOT).as_posix()
    clean_url = re.sub(r"([?&])width=\d+", r"\g<1>width=700", url)
    clean_url = re.sub(r"([?&])height=\d+", r"\g<1>height=700", clean_url)
    request_object = urllib.request.Request(
        clean_url,
        headers={"User-Agent": "BoProMas product research/1.0"},
    )
    with urllib.request.urlopen(request_object, timeout=40) as response:
        content_type = response.headers.get_content_type()
        extension = {
            "image/jpeg": ".jpg",
            "image/png": ".png",
            "image/webp": ".webp",
        }.get(content_type, ".jpg")
        target = IMAGE_DIR / f"{slug}{extension}"
        if not target.exists():
            target.write_bytes(response.read())
    return target.relative_to(ROOT).as_posix()


def plain_text(fragment):
    fragment = re.sub(r"<br\s*/?>", "\n", fragment, flags=re.I)
    fragment = re.sub(r"<[^>]+>", " ", fragment)
    return re.sub(r"\s+", " ", html.unescape(fragment)).strip()


def property_value(page, label):
    match = re.search(
        rf'_product-details-properties-title">\s*{re.escape(label)}:\s*</span>\s*'
        r'<span class="_product-details-properties-value">\s*(.*?)\s*</span>',
        page,
        re.S | re.I,
    )
    return plain_text(match.group(1)) if match else ""


def normalized_volume(value):
    match = re.search(r"(\d+(?:[.,]\d+)?)", str(value or ""))
    return round(float(match.group(1).replace(",", ".")), 3) if match else None


def parse_page(page, source_url, local, trusted_match=False):
    schema_match = re.search(r'<script type="application/ld\+json">(.*?)</script>', page, re.S)
    schema = json.loads(html.unescape(schema_match.group(1))) if schema_match else {}
    origin = property_value(page, "Страна на произход")
    brand = property_value(page, "МАРКА")
    category = schema.get("category", "")
    verified_volume = property_value(page, "Разфасовка")
    verified_abv = property_value(page, "Алк.% (ABV)")
    display_name = schema.get("name") or local["name"]
    local_volumes = {normalized_volume(item.get("volume")) for item in local["variants"]}
    volume_matches = normalized_volume(verified_volume) in local_volumes
    critical_tokens = {
        token for token in ("люлка", "cradle", "metal", "pet", "pocket")
        if token in normalize(local["name"])
    }
    source_tokens = set(normalize(display_name).split())
    special_matches = not critical_tokens or critical_tokens.issubset(source_tokens)
    image_verified = volume_matches and special_matches and (
        trusted_match or match_score(local["name"], display_name, source_url) >= 0.78
    )
    facts = [value for value in [category, origin, brand] if value]
    summary = f"{display_name} е "
    summary += f"{category.lower()} " if category else "уиски "
    summary += f"от {origin.title()}" if origin else "от проверената селекция на DrinkMe"
    if brand:
        summary += f", част от марката {brand}"
    summary += "."
    return {
        "name": display_name,
        "summary": summary,
        "origin": origin.title(),
        "brand": brand,
        "style": category,
        "verifiedVolume": verified_volume,
        "verifiedAbv": verified_abv,
        "image": local_product_image(schema.get("image", ""), local["slug"]),
        "imageVerified": image_verified,
        "source": {"label": "DrinkMe.bg", "url": source_url},
        "verified": True,
        "verifiedAt": "2026-06-28",
        "facts": facts,
    }


def main():
    local = local_whiskeys()
    remote = sitemap_products()
    records = {}
    unresolved = []
    for product in local:
        needle = normalize(product["name"])
        override_url = DRINKME_OVERRIDES.get(product["slug"])
        if override_url:
            candidate = next(
                (item for item in remote if item["url"] == override_url),
                {"url": override_url, "title": product["name"]},
            )
            page = page_for(candidate["url"])
            records[product["slug"]] = parse_page(page, candidate["url"], product, trusted_match=True)
            print(f"[{len(records):>3}] {product['name']} -> {candidate['title']} (checked)", flush=True)
            continue
        candidates = sorted(
            [
              (
                match_score(product["name"], candidate["title"], candidate["url"]),
                candidate,
              )
              for candidate in remote
            ],
            key=lambda item: item[0],
        )
        score, candidate = candidates[-1]
        if score < 0.78 or product["slug"] in REJECT_AUTO:
            unresolved.append(
                {
                    "slug": product["slug"],
                    "name": product["name"],
                    "score": round(score, 3),
                    "candidate": candidate["title"],
                    "candidateUrl": candidate["url"],
                }
            )
            continue
        page = page_for(candidate["url"])
        records[product["slug"]] = parse_page(page, candidate["url"], product)
        print(f"[{len(records):>3}] {product['name']} -> {candidate['title']}", flush=True)

    for manual_record in MANUAL_RECORDS.values():
        manual_record["imageVerified"] = True
    records.update(MANUAL_RECORDS)
    for slug, corrections in RESEARCH_CORRECTIONS.items():
        if slug in records:
            records[slug].update(corrections)
    unresolved = [item for item in unresolved if item["slug"] not in MANUAL_RECORDS]
    payload = (
        "// Verified whiskey research. Generated by scripts/research_whiskey.py.\n"
        f"window.WHISKEY_RESEARCH = {json.dumps(records, ensure_ascii=False, indent=2)};\n"
        f"window.WHISKEY_RESEARCH_UNRESOLVED = {json.dumps(unresolved, ensure_ascii=False, indent=2)};\n"
        "Object.entries(window.WHISKEY_RESEARCH).forEach(([slug, research]) => {\n"
        "  if (window.PRODUCT_DATABASE?.[slug]) window.PRODUCT_DATABASE[slug].research = research;\n"
        "  if (window.PRODUCTS?.[slug]) window.PRODUCTS[slug].research = research;\n"
        "});\n"
    )
    OUTPUT.write_text(payload, encoding="utf-8")
    print(f"verified={len(records)} unresolved={len(unresolved)} output={OUTPUT}")


if __name__ == "__main__":
    main()
