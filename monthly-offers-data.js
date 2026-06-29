// Monthly promotions content for monthly-offers.html and the home page carousel.
// All promotions are quantity/package offers: buy a minimum quantity and get a better unit price.
// Edit images, quantity, prices, periods, package products and descriptions here.

window.MONTHLY_OFFERS_DATA = {
  phoneDisplay: "+359 897 898 245",
  phoneHref: "+359897898245",
  viberHref: "viber://chat?number=%2B359897898245",
  updatedLabel: "Месечни промоции",
  rules: [
    "Промоциите важат при закупуване на минималното количество, описано в конкретната оферта.",
    "Намалената цена е цена за бутилка в рамките на пакетната заявка.",
    "Офертите са валидни до изчерпване на количествата или до края на посочения срок.",
    "При различни количества можем да подготвим индивидуална оферта."
  ],
  offers: [
    {
      id: "natterjack-18-bottles",
      type: "package",
      title: "Natterjack Irish Whiskey 18 бутилки",
      image: "assets/products/natterjack-blend-front.png",
      period: "Валидна до 31.07.2026",
      badge: "Ценови пакет",
      short: "При заявка на 18 бутилки получавате по-добра цена за бутилка.",
      quantity: "18 бутилки",
      regularUnitPrice: "29.15 €",
      promoUnitPrice: "26.90 €",
      saving: "40.50 € общо",
      includes: ["18 x Natterjack Blend No.1", "Цена за бутилка: 26.90 €", "Подходящо за Whiskey Sour и Old Fashioned"],
      description: [
        "Ценови пакет за барове, които искат да заредят premium Irish whiskey с по-добра цена на бутилка.",
        "Подходяща за коктейлна карта, premium house serve и препоръки към гости, които харесват мек Irish whiskey."
      ]
    },
    {
      id: "hetman-18-bottles",
      type: "package",
      title: "Hetman Premium Vodka 18 бутилки",
      image: "assets/products/hetman-premium-official.png",
      period: "Валидна до 31.07.2026",
      badge: "Ценови пакет",
      short: "Premium vodka пакет за Martini, Mule, Espresso Martini и highball сервирания.",
      quantity: "18 бутилки",
      regularUnitPrice: "27.62 €",
      promoUnitPrice: "23.90 €",
      saving: "66.96 € общо",
      includes: ["18 x Hetman Premium", "Цена за бутилка: 23.90 €", "0.700л · 40% ABV"],
      description: [
        "Ценови месечен пакет за обекти, които работят активно с vodka cocktails.",
        "Намалената цена важи при закупуване на целия пакет от 18 бутилки."
      ]
    },
    {
      id: "castro-mix-24-bottles",
      type: "package",
      title: "Castro Craft Mix 24 бутилки",
      image: "assets/products/castro-coffee.png",
      period: "Валидна до 31.07.2026",
      badge: "Промо пакет",
      short: "Микс от Castro ликьори за Spritz, Espresso Martini вариации и десертни коктейли.",
      quantity: "24 бутилки",
      regularUnitPrice: "8.09 €",
      promoUnitPrice: "7.20 €",
      saving: "21.36 € общо",
      includes: ["24 x Castro Craft по избор", "Coffee / Limoncello / Mastiha / Cappuccino", "Цена за бутилка: 7.20 €"],
      description: [
        "Месечен промо пакет за летни менюта, шотове и signature коктейли.",
        "Може да се комбинират различни вкусове според нуждите на обекта."
      ]
    },
    {
      id: "gold-mauritius-12-bottles",
      type: "package",
      title: "Gold of Mauritius 12 бутилки",
      image: "assets/products/gold-mauritius-velvet.png",
      period: "Валидна до 31.07.2026",
      badge: "Ценови пакет",
      short: "Премиум ром пакет за signature cocktails, neat serve и Rum Old Fashioned.",
      quantity: "12 бутилки",
      regularUnitPrice: "40.90 €",
      promoUnitPrice: "36.90 €",
      saving: "48.00 € общо",
      includes: ["12 x Gold of Mauritius Velvet Edition", "Цена за бутилка: 36.90 €", "0.700л · 43% ABV"],
      description: [
        "Пакетна промоция за барове, които искат premium rum позиция с по-добра цена на бутилка.",
        "Подходящ за Rum Old Fashioned, premium Daiquiri и чисто сервиране."
      ]
    },
    {
      id: "peats-beast-12-bottles",
      type: "package",
      title: "Peat's Beast 12 бутилки",
      image: "assets/products/peats-beast-cask.png",
      period: "Валидна до 31.07.2026",
      badge: "Ценови пакет",
      short: "Опушен Scotch пакет за smoky cocktails и premium whisky предложения.",
      quantity: "12 бутилки",
      regularUnitPrice: "38.99 €",
      promoUnitPrice: "34.90 €",
      saving: "49.08 € общо",
      includes: ["12 x Peat's Beast Cask Strength", "Цена за бутилка: 34.90 €", "0.700л · 52.1% ABV"],
      description: [
        "Ценови пакет за барове, които искат да работят със smoky whisky профил.",
        "Подходящ за smoky highball, Penicillin вариации и premium dram."
      ]
    },
    {
      id: "vodka-mix-24-bottles",
      type: "package",
      title: "Vodka Mix 24 бутилки",
      image: "assets/brands/clean/president-vodka.png",
      period: "Валидна до 31.07.2026",
      badge: "Промо пакет",
      short: "Промо пакет от водки за speed rail, long drinks и коктейлна работа.",
      quantity: "24 бутилки",
      regularUnitPrice: "по листа",
      promoUnitPrice: "по оферта",
      saving: "индивидуално",
      includes: ["Hetman / President / Oginski / Iganoff", "Микс по избор според наличност", "Цена според избраната комбинация"],
      description: [
        "Гъвкав месечен пакет за обекти, които искат да комбинират няколко vodka позиции.",
        "Свържете се с нас за точна цена според избрания микс и количества."
      ]
    }
  ]
};
