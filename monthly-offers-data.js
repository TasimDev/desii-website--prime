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
      id: "august-2026-mixed-promo",
      type: "monthly",
      title: "Промо цени за месец август",
      image: "assets/products/august-2026-promo.png",
      period: "Валидна от 01.08.2026 до 31.08.2026",
      badge: "Август 2026",
      short: "18 артикула водка и уиски. Минимум 18 бутилки, може и микс.",
      quantity: "Минимум 18 бутилки",
      regularUnitPrice: "Паралелен внос",
      promoUnitPrice: "18 артикула",
      saving: "Може и микс",
      description: [
        "Промоционалните цени са валидни през целия месец август — от 1 до 31 август 2026 г.",
        "Продуктите са от паралелен внос и са без дозатор. Минималното количество за доставка в София е 18 бутилки и може да бъде микс от позициите."
      ],
      includes: [
        "Руски Стандарт 0.700 л — 8,63 € / 16,88 лв с ДДС",
        "Руски Стандарт 1.000 л — 10,35 € / 20,24 лв с ДДС",
        "Финландия с дозатор 0.700 л — 8,63 € / 16,88 лв с ДДС",
        "Финландия с дозатор 1.000 л — 10,75 € / 21,03 лв с ДДС",
        "Абсолют 0.700 л — 9,82 € / 19,21 лв с ДДС",
        "Абсолют 1.000 л — 13,00 € / 25,43 лв с ДДС",
        "Коскенкорва 1.000 л — 10,24 € / 20,03 лв с ДДС",
        "Грантс 0.700 л — 8,17 € / 15,98 лв с ДДС",
        "Грантс 1.000 л — 10,58 € / 20,69 лв с ДДС",
        "Пади 0.700 л — 9,20 € / 17,99 лв с ДДС",
        "J&B 0.700 л — 9,78 € / 19,13 лв с ДДС",
        "Джони Уокър Red Label 0.700 л — 9,89 € / 19,34 лв с ДДС",
        "Балантайнс 0.700 л — 10,35 € / 20,24 лв с ДДС",
        "Бушмилс 0.700 л — 10,93 € / 21,38 лв с ДДС",
        "Бушмилс 1.000 л — 14,84 € / 29,02 лв с ДДС",
        "Джим Бийм 0.700 л — 11,16 € / 21,83 лв с ДДС",
        "Джим Бийм 1.000 л — 13,57 € / 26,54 лв с ДДС",
        "Тюламор 0.700 л — 11,39 € / 22,28 лв с ДДС"
      ]
    },
    {
      id: "alexandridi-11-plus-1-august-2026",
      type: "package",
      modalLayout: "vertical",
      title: "Узо Александриди 11+1",
      image: "assets/products/alexandridi-1-plus-1-august-2026.jpg",
      period: "Валидна от 01.08.2026 до 31.08.2026",
      badge: "Топ оферта",
      short: "Вземете 11+1 за всички разфасовки Узо Александриди с допълнителна отстъпка 8,33%.",
      quantity: "11+1",
      regularUnitPrice: "Всички разфасовки",
      promoUnitPrice: "11+1",
      saving: "Допълнителни 8,33%",
      includes: [
        "Узо Александриди — всички разфасовки",
        "Оферта 11+1",
        "Допълнителна отстъпка: 8,33%",
        "Паралелен внос — без дозатор",
        "Минимум 18 броя за доставка в София — може и микс"
      ],
      description: [
        "Промоционалният пакет важи за всички разфасовки Узо Александриди.",
        "Към офертата 11+1 се прилага допълнителна отстъпка от 8,33%.",
        "Продуктите са от паралелен внос и са без дозатор. Минималното количество за доставка в София е 18 броя и може да бъде микс."
      ]
    },
    {
      id: "miniatures-mix-30-august-2026",
      type: "package",
      modalLayout: "vertical",
      title: "Лятно парти с миниатюрки",
      image: "assets/products/miniatures-mix-30-august-2026.jpg",
      period: "Валидна от 01.08.2026 до 31.08.2026",
      badge: "Лятна оферта",
      short: "Поръчайте над 30 оригинални миниатюрки, направете микс по избор и получете 15% отстъпка.",
      quantity: "Над 30 броя",
      regularUnitPrice: "Микс по избор",
      promoUnitPrice: "-15%",
      saving: "15% отстъпка",
      includes: [
        "Над 30 оригинални миниатюрки",
        "Свободен микс от различни предложения",
        "15% отстъпка от поръчката",
        "Подходящи охладени, за подарък или за парти"
      ],
      description: [
        "Изберете и комбинирайте оригинални миниатюрки според предпочитанията си.",
        "При поръчка на повече от 30 броя получавате 15% отстъпка."
      ]
    },
    {
      id: "rose-chardonnay-6-bottles-august-2026",
      type: "package",
      modalLayout: "vertical",
      title: "Rosé или Chardonnay — кашон от 6 бутилки",
      image: "assets/products/rose-chardonnay-6-bottles-august-2026.jpg",
      period: "Валидна от 01.08.2026 до 31.08.2026",
      badge: "Винена оферта",
      short: "Изберете Rosé или Chardonnay — кашон от 6 бутилки на специална обща цена 44,94 €.",
      quantity: "6 бутилки",
      regularUnitPrice: "Кашон: 44,94 €",
      promoUnitPrice: "7,49 € / бутилка",
      saving: "Специална цена",
      includes: [
        "6 бутилки Rosé или Chardonnay",
        "Цена за бутилка: 7,49 €",
        "Обща цена за кашона: 44,94 €",
        "Избор между Rosé и Chardonnay"
      ],
      description: [
        "Изберете предпочитания вкус — Rosé или Chardonnay.",
        "Пакетната цена важи при покупка на цял кашон от 6 бутилки."
      ]
    },
    {
      id: "natterjack-three-bottles-dispenser-august-2026",
      type: "package",
      modalLayout: "vertical",
      title: "Natterjack — 3 бутилки с подарък дисплей",
      image: "assets/products/natterjack-three-bottles-dispenser-august-2026.png",
      period: "Валидна от 01.08.2026 до 31.08.2026",
      badge: "Подарък",
      short: "Купете и трите бутилки Natterjack и получете брандиран дисплей като подарък.",
      quantity: "3 бутилки",
      regularUnitPrice: "Комплект Natterjack",
      promoUnitPrice: "Дисплей подарък",
      saving: "Подарък",
      includes: [
        "1 бутилка Natterjack Irish Whiskey",
        "1 бутилка Natterjack The Mistake",
        "1 бутилка Natterjack Cask Strength",
        "1 брандиран дисплей Natterjack — подарък"
      ],
      description: [
        "Закупете комплект от трите представени бутилки Natterjack.",
        "Към комплекта получавате брандиран дисплей Natterjack като подарък."
      ]
    },
    {
      id: "alexandridi-liqueurs-5-plus-1-august-2026",
      type: "package",
      modalLayout: "vertical",
      title: "Ликьори Александриди 5+1",
      image: "assets/products/alexandridi-liqueurs-5-plus-1-august-2026.png",
      period: "Валидна от 01.08.2026 до 31.08.2026",
      badge: "5+1 оферта",
      short: "Купете 5 бутилки ликьори Александриди и получете още 1 бутилка безплатно.",
      quantity: "5+1 бутилки",
      regularUnitPrice: "Купувате 5",
      promoUnitPrice: "1 безплатно",
      saving: "Подарък",
      includes: [
        "Александриди Coffee",
        "Александриди Mastiha",
        "Александриди Limoncello",
        "Александриди Cappuccino",
        "Александриди Tentura",
        "1 бутилка безплатно при покупка на 5"
      ],
      description: [
        "Промоционална оферта за занаятчийските ликьори Александриди.",
        "Купете 5 бутилки и получете още 1 бутилка безплатно."
      ]
    }
  ],
  archivedOffers: [
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
