/**
 * Тексты интерфейса: меню, кнопки, подписи.
 * Содержание сайта (описания, комитеты, правила) лежит в src/content и редактируется в админке.
 * Казахские и английские подписи — черновой перевод, их стоит проверить носителю языка.
 */

export const LOCALES = ['ru', 'kk', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'ru';

/** Код языка для атрибута lang и форматирования дат и чисел. */
export const INTL_LOCALE: Record<Lang, string> = {
  ru: 'ru-RU',
  kk: 'kk-KZ',
  en: 'en-GB',
};

/** Короткая подпись в переключателе языков. */
export const LANG_LABEL: Record<Lang, string> = {
  ru: 'РУС',
  kk: 'ҚАЗ',
  en: 'ENG',
};

/** Полное название языка на самом этом языке (для подсказок переключателя). */
export const LANG_NAME: Record<Lang, string> = {
  ru: 'Русский',
  kk: 'Қазақша',
  en: 'English',
};

const ru = {
  'meta.description':
    'Youth Research Summit — межшкольный исследовательский турнир для учеников 8–11 (12) классов.',
  'a11y.skip': 'Перейти к содержанию',
  'a11y.newTab': 'откроется в новой вкладке',
  'nav.label': 'Основное меню',
  'nav.menu': 'Меню',
  'nav.home': 'Главная',
  'nav.committees': 'Комитеты',
  'nav.rules': 'Правила и оценка',
  'nav.register': 'Регистрация',
  'nav.results': 'Итоги',
  'nav.journal': 'Журнал',
  'journal.lead': 'Академический журнал Youth Lab: лучшие исследовательские работы участников. Первый выпуск выйдет после саммита.',
  'lang.label': 'Язык сайта',

  'cta.soon': 'Регистрация скоро откроется',
  'cta.open': 'Зарегистрироваться',
  'cta.closed': 'Регистрация закрыта',
  'cta.opensOn': 'Регистрация откроется {date}',
  'cta.deadline': 'Регистрация до {date}',

  'event.date': 'Дата',
  'event.time': 'Время',
  'event.timeTba': 'Время уточняется',
  'event.venue': 'Место',
  'event.audience': 'Участники',
  'event.team': 'Команда',
  'event.fee': 'Стоимость участия',
  'event.feeUnit': '₸ с участника',
  'event.free': 'Бесплатно',
  'event.map': 'Открыть на карте',

  'home.about': 'О саммите',
  'home.committees': 'Тематические комитеты',
  'home.committeesMore': 'Подробнее о комитетах',
  'home.program': 'Программа дня',
  'home.participation': 'Участие',
  'home.jury': 'Жюри',
  'home.partners': 'Партнёры',
  'home.contacts': 'Контакты',

  'hero.how': 'Как это устроено',
  'hero.follow': 'Следить в Instagram',
  'countdown.label': 'До саммита',
  'countdown.today': 'Саммит проходит сегодня',
  'step.label': 'Шаг {n}',

  'home.format.eyebrow': 'Формат',
  'home.format.title': 'Исследование за один день',
  'home.steps.eyebrow': 'Шаг за шагом',
  'home.steps.title': 'Как принять участие',
  'home.committees.eyebrow': 'Комитеты',
  'home.committees.title': 'Выберите направление',
  'home.committees.hint': 'Нажмите на комитет, чтобы увидеть направления и источники.',
  'home.program.eyebrow': 'День саммита',
  'home.program.title': 'Как пройдёт день',
  'home.scoring.eyebrow': 'Оценка',
  'home.scoring.title': 'Как оценивает жюри',
  'home.scoring.lead': 'Жюри оценивает представленную работу и выступление, а не только сложность темы. Ко всем командам применяются одинаковые стандарты.',
  'home.scoring.more': 'Все правила и требования к записке',
  'home.benefits.eyebrow': 'Награды',
  'home.benefits.title': 'Что получат участники',
  'home.faq.eyebrow': 'Вопросы',
  'home.faq.title': 'Вопросы и ответы',
  'home.final.title': 'Соберите команду и приходите на саммит',
  'home.final.questions': 'Остались вопросы? Напишите нам в Instagram или позвоните.',
  'sticky.follow': 'Следить',
  'committees.more': 'Подробнее о комитете',
  'committees.count': '{n} из {total}',

  'home.registerMore': 'Подробнее о регистрации',
  'home.rulesMore': 'Правила и критерии оценки',
  'committees.title': 'Комитеты',
  'committees.lead':
    'Команда выбирает один комитет. Направления подсказывают, где искать проблему, а источники — отправная точка, а не готовые ответы.',
  'committees.topics': 'Возможные направления',
  'committees.sources': 'Рекомендуемые стартовые источники',
  'committees.language': 'Язык комитета',

  'rules.title': 'Правила и оценка',
  'rules.rubrics': 'Критерии оценки',
  'rules.criterion': 'Критерий',
  'rules.max': 'Макс.',
  'rules.focus': 'Что оценивается',
  'rules.total': 'Итого',
  'rules.points': 'баллов',
  'rules.awards': 'Награды',
  'rules.document': 'Скачать Положение (PDF)',
  'rules.toc': 'На этой странице',

  'register.title': 'Регистрация',
  'register.howTo': 'Как участвовать',
  'register.payment': 'Реквизиты для оплаты будут в форме регистрации.',

  'results.title': 'Итоги',
  'results.pending': 'Итоги будут опубликованы после саммита.',
  'results.winners': 'Победители',
  'results.photos': 'Фотографии',
  'award.research': 'Лучшая исследовательская работа',
  'award.oral': 'Лучшее устное выступление',
  'award.team': 'Команда-победитель',

  'contacts.phone': 'Телефон',
  'contacts.instagram': 'Instagram',
  'contacts.email': 'Почта',
  'contacts.address': 'Адрес',

  'contacts.questions': 'Остались вопросы? Напишите или позвоните нам.',
  'footer.organizer': 'Организатор — Youth Lab',
  'footer.nav': 'Разделы',

  'notFound.title': 'Страница не найдена',
  'notFound.back': 'На главную',

  'language.ru': 'русский',
  'language.kk': 'казахский',
  'language.en': 'английский',
} as const;

export type UiKey = keyof typeof ru;

const kk: Record<UiKey, string> = {
  'meta.description':
    'Youth Research Summit — 8–11 (12) сынып оқушыларына арналған мектепаралық зерттеу турнирі.',
  'a11y.skip': 'Мазмұнға өту',
  'a11y.newTab': 'жаңа бетте ашылады',
  'nav.label': 'Негізгі мәзір',
  'nav.menu': 'Мәзір',
  'nav.home': 'Басты бет',
  'nav.committees': 'Комитеттер',
  'nav.rules': 'Ережелер мен бағалау',
  'nav.register': 'Тіркеу',
  'nav.results': 'Қорытынды',
  'nav.journal': 'Журнал',
  'journal.lead': 'Youth Lab академиялық журналы: қатысушылардың үздік зерттеу жұмыстары. Алғашқы шығарылым саммиттен кейін жарық көреді.',
  'lang.label': 'Сайт тілі',

  'cta.soon': 'Тіркеу жақында ашылады',
  'cta.open': 'Тіркелу',
  'cta.closed': 'Тіркеу жабық',
  'cta.opensOn': 'Тіркеу {date} ашылады',
  'cta.deadline': 'Тіркеу мерзімі — {date}',

  'event.date': 'Күні',
  'event.time': 'Уақыты',
  'event.timeTba': 'Уақыты нақтыланады',
  'event.venue': 'Өтетін орны',
  'event.audience': 'Қатысушылар',
  'event.team': 'Команда',
  'event.fee': 'Қатысу құны',
  'event.feeUnit': '₸ бір қатысушыға',
  'event.free': 'Тегін',
  'event.map': 'Картадан ашу',

  'home.about': 'Саммит туралы',
  'home.committees': 'Тақырыптық комитеттер',
  'home.committeesMore': 'Комитеттер туралы толығырақ',
  'home.program': 'Күн бағдарламасы',
  'home.participation': 'Қатысу',
  'home.jury': 'Қазылар алқасы',
  'home.partners': 'Серіктестер',
  'home.contacts': 'Байланыс',

  'hero.how': 'Бұл қалай өтеді',
  'hero.follow': 'Instagram-да бақылау',
  'countdown.label': 'Саммитке дейін',
  'countdown.today': 'Саммит бүгін өтеді',
  'step.label': '{n}-қадам',

  'home.format.eyebrow': 'Формат',
  'home.format.title': 'Бір күндегі зерттеу',
  'home.steps.eyebrow': 'Қадам-қадаммен',
  'home.steps.title': 'Қалай қатысуға болады',
  'home.committees.eyebrow': 'Комитеттер',
  'home.committees.title': 'Бағытты таңдаңыз',
  'home.committees.hint': 'Бағыттар мен дереккөздерді көру үшін комитетті басыңыз.',
  'home.program.eyebrow': 'Саммит күні',
  'home.program.title': 'Күн қалай өтеді',
  'home.scoring.eyebrow': 'Бағалау',
  'home.scoring.title': 'Қазылар қалай бағалайды',
  'home.scoring.lead': 'Қазылар тақырыптың күрделілігін ғана емес, ұсынылған жұмыс пен баяндаманы бағалайды. Барлық командаға бірдей талап қойылады.',
  'home.scoring.more': 'Барлық ереже және жазбаға қойылатын талаптар',
  'home.benefits.eyebrow': 'Марапаттар',
  'home.benefits.title': 'Қатысушылар не алады',
  'home.faq.eyebrow': 'Сұрақтар',
  'home.faq.title': 'Сұрақ-жауап',
  'home.final.title': 'Команда жинап, саммитке келіңіз',
  'home.final.questions': 'Сұрақтарыңыз бар ма? Instagram-да жазыңыз немесе қоңырау шалыңыз.',
  'sticky.follow': 'Бақылау',
  'committees.more': 'Комитет туралы толығырақ',
  'committees.count': '{n} / {total}',

  'home.registerMore': 'Тіркеу туралы толығырақ',
  'home.rulesMore': 'Ережелер мен бағалау критерийлері',
  'committees.title': 'Комитеттер',
  'committees.lead':
    'Команда бір комитетті таңдайды. Бағыттар мәселені қайдан іздеу керегін көрсетеді, ал дереккөздер — дайын жауап емес, бастапқы нүкте.',
  'committees.topics': 'Ықтимал бағыттар',
  'committees.sources': 'Ұсынылатын бастапқы дереккөздер',
  'committees.language': 'Комитет тілі',

  'rules.title': 'Ережелер мен бағалау',
  'rules.rubrics': 'Бағалау критерийлері',
  'rules.criterion': 'Критерий',
  'rules.max': 'Макс.',
  'rules.focus': 'Не бағаланады',
  'rules.total': 'Барлығы',
  'rules.points': 'ұпай',
  'rules.awards': 'Марапаттар',
  'rules.document': 'Ережені жүктеп алу (PDF)',
  'rules.toc': 'Осы бетте',

  'register.title': 'Тіркеу',
  'register.howTo': 'Қалай қатысуға болады',
  'register.payment': 'Төлем деректемелері тіркеу формасында көрсетіледі.',

  'results.title': 'Қорытынды',
  'results.pending': 'Қорытынды саммиттен кейін жарияланады.',
  'results.winners': 'Жеңімпаздар',
  'results.photos': 'Фотосуреттер',
  'award.research': 'Үздік зерттеу жұмысы',
  'award.oral': 'Үздік ауызша баяндама',
  'award.team': 'Жеңімпаз команда',

  'contacts.phone': 'Телефон',
  'contacts.instagram': 'Instagram',
  'contacts.email': 'Пошта',
  'contacts.address': 'Мекенжай',

  'contacts.questions': 'Сұрақтарыңыз бар ма? Бізге жазыңыз немесе қоңырау шалыңыз.',
  'footer.organizer': 'Ұйымдастырушы — Youth Lab',
  'footer.nav': 'Бөлімдер',

  'notFound.title': 'Бет табылмады',
  'notFound.back': 'Басты бетке',

  'language.ru': 'орыс тілі',
  'language.kk': 'қазақ тілі',
  'language.en': 'ағылшын тілі',
};

const en: Record<UiKey, string> = {
  'meta.description':
    'Youth Research Summit is an inter-school research tournament for students in grades 8–11 (12).',
  'a11y.skip': 'Skip to content',
  'a11y.newTab': 'opens in a new tab',
  'nav.label': 'Main menu',
  'nav.menu': 'Menu',
  'nav.home': 'Home',
  'nav.committees': 'Committees',
  'nav.rules': 'Rules and scoring',
  'nav.register': 'Registration',
  'nav.results': 'Results',
  'nav.journal': 'Journal',
  'journal.lead': 'The Youth Lab academic journal: the best research by summit participants. The first issue will be published after the summit.',
  'lang.label': 'Site language',

  'cta.soon': 'Registration opens soon',
  'cta.open': 'Register',
  'cta.closed': 'Registration is closed',
  'cta.opensOn': 'Registration opens on {date}',
  'cta.deadline': 'Register by {date}',

  'event.date': 'Date',
  'event.time': 'Time',
  'event.timeTba': 'Time to be announced',
  'event.venue': 'Venue',
  'event.audience': 'Who can take part',
  'event.team': 'Team',
  'event.fee': 'Participation fee',
  'event.feeUnit': '₸ per participant',
  'event.free': 'Free',
  'event.map': 'Open in maps',

  'home.about': 'About the summit',
  'home.committees': 'Committees',
  'home.committeesMore': 'More about the committees',
  'home.program': 'Programme of the day',
  'home.participation': 'Taking part',
  'home.jury': 'Jury',
  'home.partners': 'Partners',
  'home.contacts': 'Contacts',

  'hero.how': 'How it works',
  'hero.follow': 'Follow on Instagram',
  'countdown.label': 'Summit starts in',
  'countdown.today': 'The summit is today',
  'step.label': 'Step {n}',

  'home.format.eyebrow': 'Format',
  'home.format.title': 'Research in a single day',
  'home.steps.eyebrow': 'Step by step',
  'home.steps.title': 'How to take part',
  'home.committees.eyebrow': 'Committees',
  'home.committees.title': 'Choose your area',
  'home.committees.hint': 'Tap a committee to see its topics and sources.',
  'home.program.eyebrow': 'Summit day',
  'home.program.title': 'How the day goes',
  'home.scoring.eyebrow': 'Scoring',
  'home.scoring.title': 'How the jury scores',
  'home.scoring.lead': 'The jury assesses the submitted work and the presentation, not just how difficult the topic is. The same standards apply to every team.',
  'home.scoring.more': 'All rules and brief requirements',
  'home.benefits.eyebrow': 'Awards',
  'home.benefits.title': 'What participants get',
  'home.faq.eyebrow': 'FAQ',
  'home.faq.title': 'Questions and answers',
  'home.final.title': 'Build a team and join the summit',
  'home.final.questions': 'Any questions? Message us on Instagram or give us a call.',
  'sticky.follow': 'Follow',
  'committees.more': 'More about this committee',
  'committees.count': '{n} of {total}',

  'home.registerMore': 'More about registration',
  'home.rulesMore': 'Rules and scoring criteria',
  'committees.title': 'Committees',
  'committees.lead':
    'Each team chooses one committee. The topics suggest where to look for a problem; the sources are a starting point, not ready-made answers.',
  'committees.topics': 'Possible topics',
  'committees.sources': 'Recommended starting sources',
  'committees.language': 'Committee language',

  'rules.title': 'Rules and scoring',
  'rules.rubrics': 'Scoring criteria',
  'rules.criterion': 'Criterion',
  'rules.max': 'Max',
  'rules.focus': 'What is assessed',
  'rules.total': 'Total',
  'rules.points': 'points',
  'rules.awards': 'Awards',
  'rules.document': 'Download the regulations (PDF)',
  'rules.toc': 'On this page',

  'register.title': 'Registration',
  'register.howTo': 'How to take part',
  'register.payment': 'Payment details will be provided in the registration form.',

  'results.title': 'Results',
  'results.pending': 'Results will be published after the summit.',
  'results.winners': 'Winners',
  'results.photos': 'Photos',
  'award.research': 'Best Research Paper',
  'award.oral': 'Best Oral Presentation',
  'award.team': 'Winning Team',

  'contacts.phone': 'Phone',
  'contacts.instagram': 'Instagram',
  'contacts.email': 'Email',
  'contacts.address': 'Address',

  'contacts.questions': 'Any questions? Message or call us.',
  'footer.organizer': 'Organised by Youth Lab',
  'footer.nav': 'Sections',

  'notFound.title': 'Page not found',
  'notFound.back': 'Back to home',

  'language.ru': 'Russian',
  'language.kk': 'Kazakh',
  'language.en': 'English',
};

/** Формы слов для чисел: «1 балл», «4 балла», «8 баллов». Ключи — категории Intl.PluralRules. */
export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };
type PluralWord = 'points' | 'days' | 'hours' | 'minutes' | 'seconds';

export const PLURALS: Record<Lang, Record<PluralWord, PluralForms>> = {
  ru: {
    points: { one: 'балл', few: 'балла', many: 'баллов', other: 'балла' },
    days: { one: 'день', few: 'дня', many: 'дней', other: 'дня' },
    hours: { one: 'час', few: 'часа', many: 'часов', other: 'часа' },
    minutes: { one: 'минута', few: 'минуты', many: 'минут', other: 'минуты' },
    seconds: { one: 'секунда', few: 'секунды', many: 'секунд', other: 'секунды' },
  },
  kk: {
    points: { other: 'ұпай' },
    days: { other: 'күн' },
    hours: { other: 'сағат' },
    minutes: { other: 'минут' },
    seconds: { other: 'секунд' },
  },
  en: {
    points: { one: 'point', other: 'points' },
    days: { one: 'day', other: 'days' },
    hours: { one: 'hour', other: 'hours' },
    minutes: { one: 'minute', other: 'minutes' },
    seconds: { one: 'second', other: 'seconds' },
  },
};

/** Слово в нужной форме для числа: plural('ru', 4, 'points') → «балла». */
export function plural(lang: Lang, count: number, word: PluralWord): string {
  const forms = PLURALS[lang][word];
  const category = new Intl.PluralRules(INTL_LOCALE[lang]).select(count);
  return forms[category] ?? forms.other;
}

const dictionaries: Record<Lang, Record<UiKey, string>> = { ru, kk, en };

/** Возвращает функцию перевода подписей для выбранного языка. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey, params: Record<string, string> = {}): string {
    let text = dictionaries[lang][key] ?? ru[key];
    for (const [name, value] of Object.entries(params)) {
      text = text.replaceAll(`{${name}}`, value);
    }
    return text;
  };
}
