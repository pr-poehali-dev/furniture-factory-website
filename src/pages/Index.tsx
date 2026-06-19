import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG    = "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/6ff72b68-2ea7-436f-9b5f-d1dea06ccf53.jpg";
const DETAIL_IMG  = "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/9bcc3ae2-a064-4545-9183-8b8e2d49a6cc.jpg";
const GARDEN_IMG  = "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/01dacf89-913e-4fcc-9e09-285ef232c2fa.jpg";
const FACTORY_IMG = "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/674e26ac-8556-4981-9f6d-e53f615c1ab3.jpg";

/* ── helpers ─────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = to / 80;
    const t = setInterval(() => {
      v += step;
      if (v >= to) { setVal(to); clearInterval(t); } else setVal(Math.floor(v));
    }, 20);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── data ────────────────────────────────────── */
const NAV = [
  { label: "Главная",    href: "#home" },
  { label: "О нас",      href: "#about" },
  { label: "Процесс",    href: "#process" },
  { label: "Каталог",    href: "#catalog" },
  { label: "Контакты",   href: "#contacts" },
];

const STATS = [
  { value: 550, suffix: "+",  label: "изделий в день" },
  { value: 10,  suffix: "+",  label: "лет на рынке" },
  { value: 100, suffix: "%",  label: "своё производство" },
];

const STEPS = [
  { n:"01", title:"Нить",               desc:"Производство нити с нуля — основа каждого изделия. Контроль состава и прочности на входе." },
  { n:"02", title:"Ткань-рогожка",      desc:"Из нити — фирменная рогожка. Плотная, износостойкая, с благородной текстурой." },
  { n:"03", title:"Металлокаркас",      desc:"Сварные каркасы из металла собственного производства. Испытания на изгиб и нагрузку." },
  { n:"04", title:"Декор и опоры",      desc:"Пластиковые опоры и декоративные элементы — точное литьё, богатая палитра." },
  { n:"05", title:"Финальная сборка изделий", desc:"Комплектация и сборка всех изделий — от кроя ткани до готового продукта." },
  { n:"06", title:"Упаковка изделия",         desc:"Упаковка каждого изделия перед отгрузкой заказчику." },
];

const CATALOG = [
  {
    icon:"Armchair",  title:"Диваны",  sub:"Модульные, угловые, прямые",  badge:"Хит",
    photos: [
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/1eabcb58-47e5-4742-94cb-bc2a1f61c331.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/4986b569-8444-4ee5-b35d-9a5d91539d76.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/e89614ec-14ce-49d6-8a48-acd0d37f933e.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/e9eece3c-0be2-42f0-90ae-71dd61f02fd0.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/f0b13a77-1939-474b-9d67-2af9d13c8193.jpg",
    ],
    desc: "Производим диваны всех форматов: прямые, угловые, модульные. Каркас — собственный металл, ткань — фирменная рогожка. Подходят для жилых и коммерческих пространств. Работаем на поставку крупным торговым сетям.",
    features: ["Металлокаркас собственного производства", "Ткань-рогожка или велюр", "Модульные и угловые конфигурации", "Оптовые партии от 50 шт."],
  },
  {
    icon:"Sofa",  title:"Кресла",  sub:"Для дома и офиса",  badge:"",
    photos: [
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/7f74a7a5-d083-46e7-81bb-5fea60e00390.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/b22f1204-de01-4f66-9127-4527cb4c66ba.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/6d05dd51-fc09-4774-a690-29ac327cfef5.png",
    ],
    desc: "Кресла для дома, переговорных и лобби. Широкая линейка форм: классика, скандинавский стиль, мягкий минимализм. Все модели — на металлических или деревянных ножках собственного производства.",
    features: ["Ножки — металл или пластик", "Широкая палитра обивки", "Жёсткий и мягкий вариант сиденья", "Малые и средние серии"],
  },
  {
    icon:"BedDouble",  title:"Кровати",  sub:"Мягкие, с металлическим каркасом",  badge:"",
    photos: [
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/28f56f17-33db-48d6-9e9e-c0269ca9ec45.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/887b5ca6-f519-416e-bda6-579eba4e7e58.jpg",
    ],
    desc: "Мягкие кровати с мягким изголовьем на сварном металлическом каркасе. Разные размеры: 140, 160, 180 см. Возможно исполнение с ящиком для хранения. Подходят для сетевых мебельных магазинов и отельного сегмента.",
    features: ["Размеры 140 / 160 / 180 см", "Изголовье — ткань, экокожа", "Вариант с подъёмным механизмом", "Партии для отельного сегмента"],
  },
  {
    icon:"Trees",  title:"Садовая мебель",  sub:"Из искусственного ротанга",  badge:"Сезон",
    photos: [
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/8cff0c34-9de5-470e-b0b0-f4fab7bb2a1e.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/3834eb01-e5f4-4694-8038-2ba6afeb4ada.jpg",
    ],
    desc: "Комплекты для террас, веранд и загородных домов. Лоза из ПВХ — собственное производство. Устойчива к UV, морозу и влаге. Алюминиевый или стальной каркас с порошковым покрытием.",
    features: ["ПВХ-лоза собственного производства", "UV и морозостойкость", "Алюминиевый или стальной каркас", "Комплекты и отдельные предметы"],
  },
  {
    icon:"Circle",  title:"Коконы",  sub:"Подвесные кресла — новинка",  badge:"Новинка",
    photos: [
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/821eee13-9709-4e5e-a22c-f85eea6d0234.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/bdc83376-4aa3-4afd-b291-ffebb590e9c7.png",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/97243112-c201-4ed2-959d-3ce5a839b8b6.png",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/65e48316-e9b8-407d-acbd-3c9ed49e89ac.png",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/e7b71494-4208-4b88-bb2b-d405d8a3b87e.png",
    ],
    desc: "Подвесные кресла-коконы из искусственного ротанга — наша новинка этого сезона. Стали одним из самых продаваемых товаров в категории садовой мебели. Подходят для улицы и закрытых помещений.",
    features: ["Искусственный ротанг ПВХ", "Металлический каркас-подставка в комплекте", "Для улицы и интерьера", "Хит продаж 2024–2025"],
  },
  {
    icon:"Layers",  title:"Ткань рогожка",  sub:"Собственное изготовление",  badge:"",
    photos: [
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/9ee836d2-0d46-4dfd-be0b-83076c98646b.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/6022831b-cedf-4f9e-a717-0bfbf5b4e882.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/79c07d55-0ec5-4969-a7a6-2a4f0df955cc.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/3b4803a9-5781-4529-a2f5-602b108d0446.jpg",
      "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/bucket/1c09d869-ce13-4497-bc4d-0a71a6bc9aaf.jpg",
    ],
    desc: "Производим фирменную ткань-рогожку с нуля — от нити до готового полотна. Плотная, износостойкая, с благородной текстурой. Используется во всей нашей мягкой мебели, доступна для заказа отдельными партиями.",
    features: ["Производство нити собственными силами", "Плотная износостойкая структура", "Широкая палитра цветов", "Поставка оптовыми партиями"],
  },
];

type CatalogItem = typeof CATALOG[number];

/* ── component ───────────────────────────────── */
export default function Index() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [form,       setForm]       = useState({ name:"", phone:"", message:"" });
  const [sent,       setSent]       = useState(false);
  const [popup,      setPopup]      = useState<CatalogItem | null>(null);
  const [slideIdx,   setSlideIdx]   = useState(0);

  const openPopup = (item: CatalogItem) => { setPopup(item); setSlideIdx(0); };
  const prevSlide = (total: number) => setSlideIdx(i => (i - 1 + total) % total);
  const nextSlide = (total: number) => setSlideIdx(i => (i + 1) % total);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const s = {
    about:   useInView(),
    process: useInView(),
    catalog: useInView(),
    contact: useInView(),
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-serif">

      {/* ── NAV ─────────────────────────────────── */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white border-b border-border shadow-sm"
          : "bg-foreground/40 backdrop-blur-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex flex-col">
            <span className={`font-serif text-2xl font-light tracking-[0.12em] leading-none transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}>
              Волжская мебельная мануфактура
            </span>
            <span className={`font-sans-premium text-[0.55rem] tracking-[0.25em] uppercase mt-0.5 transition-colors duration-300 ${
              scrolled ? "text-muted-foreground" : "text-white/70"
            }`}>
              Производство полного цикла · с 2016
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-10">
            {NAV.map(n => (
              <li key={n.href}>
                <a href={n.href} className={`nav-item transition-colors duration-300 ${
                  scrolled ? "" : "!text-white/90 hover:!text-white"
                }`}>{n.label}</a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contacts"
            className={`hidden lg:inline-flex items-center gap-2.5 px-7 py-2.5
                       font-sans-premium text-[0.65rem] tracking-[0.18em] uppercase transition-all duration-300 ${
              scrolled
                ? "border border-gold text-gold hover:bg-gold hover:text-white"
                : "border border-white/70 text-white hover:bg-white hover:text-foreground"
            }`}
          >
            <Icon name="Phone" size={12} />
            Связаться
          </a>

          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} className={scrolled ? "text-foreground" : "text-white"} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-8 py-5 space-y-4">
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}
                 className="block nav-item py-1">{n.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section id="home" className="relative h-screen flex items-end overflow-hidden">
        {/* Photo */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Фабрика" className="w-full h-full object-cover opacity-init anim-scale-reveal" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-foreground/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 to-transparent" />
        </div>

        {/* Text block */}
        <div className="relative max-w-7xl mx-auto px-8 pb-24 w-full">
          <div className="max-w-3xl">
            <p className="opacity-init anim-fade-up d-200 font-sans-premium text-[0.65rem] tracking-[0.35em] uppercase text-white/70 mb-5 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-gold-light"></span>
              Производитель мягкой и садовой мебели
            </p>

            <h1 className="opacity-init anim-fade-up d-300 font-serif font-light text-white leading-[0.95]
                           text-[clamp(3.5rem,8vw,7rem)] tracking-tight mb-8">
              Искусство<br />
              <em className="italic text-gradient-gold not-italic">создавать</em><br />
              комфорт
            </h1>

            <p className="opacity-init anim-fade-up d-500 font-sans-premium font-light text-white/75 text-base
                          leading-relaxed max-w-lg mb-10 tracking-wide">
              От первой нити до готового изделия — полный производственный цикл под одной крышей.
              Более <strong className="text-white font-normal">10 лет</strong> мы поставляем мебель в крупнейшие торговые сети.
            </p>

            <div className="opacity-init anim-fade-up d-600 flex flex-wrap gap-4">
              <a href="#process"
                 className="bg-gold text-white px-10 py-3.5 font-sans-premium text-[0.68rem] tracking-[0.2em] uppercase
                            hover:bg-gold-light transition-colors duration-400">
                Наш процесс
              </a>
              <a href="#catalog"
                 className="border border-white/50 text-white px-10 py-3.5 font-sans-premium text-[0.68rem] tracking-[0.2em] uppercase
                            hover:border-white hover:bg-white/10 transition-all duration-400">
                Каталог
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute right-10 bottom-10 flex flex-col items-center gap-2 opacity-60">
          <span className="font-sans-premium text-[0.55rem] tracking-[0.3em] uppercase text-white"
                style={{ writingMode:"vertical-rl" }}>scroll</span>
          <div className="w-px h-10 bg-white/40 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-3 bg-white"
                 style={{ animation:"scrollDot 1.6s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={i} className={`text-center py-4 ${i < 3 ? "border-r border-border" : ""}`}>
              <div className="font-serif text-4xl font-light text-gradient-gold mb-1">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="font-sans-premium text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────── */}
      <section id="about" className="py-32 bg-background">
        <div ref={s.about.ref} className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left: image */}
            <div className={`relative transition-all duration-1000 ${s.about.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <img src={DETAIL_IMG} alt="Детали производства"
                   className="w-full h-[520px] object-cover" />
              {/* Gold frame accent */}
              <div className="absolute -bottom-5 -right-5 w-2/3 h-2/3 border border-gold/30 pointer-events-none" />
              {/* Badge */}
              <div className="absolute top-8 -right-6 bg-gold text-white px-5 py-3 text-center shadow-xl">
                <div className="font-serif text-3xl font-light leading-none">10+</div>
                <div className="font-sans-premium text-[0.5rem] tracking-[0.2em] uppercase mt-1">лет опыта</div>
              </div>
            </div>

            {/* Right: text */}
            <div className={`transition-all duration-1000 delay-200 ${s.about.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <p className="font-sans-premium text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-gold inline-block" />
                О компании
              </p>
              <h2 className="font-serif text-5xl font-light leading-tight mb-6 gold-line">
                Производство,<br />
                <em className="italic">которому доверяют</em>
              </h2>
              <p className="font-sans-premium font-light text-muted-foreground leading-relaxed text-sm mb-5 tracking-wide">
                С 2016 года мы строим мебель иначе — без субподрядчиков, без компромиссов. Каждый этап: от
                производства нити и ткани до металлокаркасов, пластиковых опор и лозы ротанга — выполняется
                на наших мощностях.
              </p>
              <p className="font-sans-premium font-light text-muted-foreground leading-relaxed text-sm mb-10 tracking-wide">
                Сегодня фабрика выпускает более <strong className="text-foreground font-normal">550 изделий в сутки</strong> и
                является официальным поставщиком крупнейших российских мебельных сетей.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon:"Factory",     t:"Полный цикл",       d:"Нить → ткань → каркас → изделие" },
                  { icon:"ShieldCheck", t:"Контроль качества", d:"Многоступенчатая проверка" },
                  { icon:"Truck",       t:"Торговые сети",      d:"Крупнейшие партнёры по РФ" },
                  { icon:"Leaf",        t:"Ротанг & коконы",   d:"Уличная мебель собств. пр-ва" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 py-4 border-t border-border">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-gold/30 mt-0.5">
                      <Icon name={f.icon} size={14} className="text-gold" />
                    </div>
                    <div>
                      <div className="font-sans-premium text-[0.65rem] font-500 tracking-wider uppercase text-foreground mb-0.5">{f.t}</div>
                      <div className="font-sans-premium text-[0.6rem] text-muted-foreground tracking-wide">{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH QUOTE ─────────────────────── */}
      <section className="relative py-36 overflow-hidden">
        <img src={FACTORY_IMG} alt="Завод" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/75" />
        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <p className="font-sans-premium text-[0.6rem] tracking-[0.35em] uppercase text-gold mb-8 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-gold" />
            Наш принцип
            <span className="w-8 h-px bg-gold" />
          </p>
          <blockquote className="font-serif text-4xl md:text-6xl font-light text-white leading-tight tracking-wide">
            «Мы не покупаем<br />
            <em className="italic text-gradient-gold">— мы создаём</em>»
          </blockquote>
          <p className="font-sans-premium font-light text-white/60 text-sm tracking-widest mt-8">
            От сырья до готового изделия
          </p>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────── */}
      <section id="process" className="py-32 bg-white">
        <div ref={s.process.ref} className="max-w-7xl mx-auto px-8">
          <div className={`mb-20 transition-all duration-900 ${s.process.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="font-sans-premium text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-gold inline-block" />
              Производственный цикл
            </p>
            <h2 className="font-serif text-5xl md:text-6xl font-light gold-line-center md:gold-line">
              От нити —<br />
              <em className="italic text-gradient-gold">до готового изделия</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {STEPS.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                className={`group relative bg-white p-10 cursor-pointer transition-all duration-500 ${
                  s.process.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                } ${activeStep === i ? "bg-gold-pale" : "hover:bg-[hsl(42,40%,97%)]"}`}
                style={{ transitionDelay:`${i * 80}ms` }}
              >
                <div className={`font-serif text-[5rem] font-light leading-none select-none mb-4 transition-colors duration-300 ${
                  activeStep === i ? "text-gold/20" : "text-foreground/8 group-hover:text-gold/10"
                }`}>{step.n}</div>

                <div className={`w-6 h-px mb-5 transition-all duration-300 ${activeStep === i ? "bg-gold w-10" : "bg-border"}`} />

                <h3 className={`font-serif text-2xl font-light mb-3 transition-colors duration-300 ${activeStep === i ? "text-gold" : ""}`}>
                  {step.title}
                </h3>
                <p className="font-sans-premium text-[0.68rem] leading-relaxed tracking-wide text-muted-foreground">
                  {step.desc}
                </p>

                {activeStep === i && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gold" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ─────────────────────────────── */}
      <section id="catalog" className="py-32 bg-background">
        <div ref={s.catalog.ref} className="max-w-7xl mx-auto px-8">
          <div className={`mb-20 transition-all duration-900 ${s.catalog.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="font-sans-premium text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-gold inline-block" />
              Продукция
            </p>
            <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">
              Наши<br />
              <em className="italic text-gradient-gold">изделия</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATALOG.map((item, i) => (
              <div
                key={i}
                onClick={() => openPopup(item)}
                className={`group relative bg-white border border-border p-8 hover-lift-soft cursor-pointer transition-all duration-700 ${
                  s.catalog.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay:`${i * 80}ms` }}
              >
                {item.badge && (
                  <span className="absolute top-0 right-0 bg-gold text-white font-sans-premium text-[0.52rem] tracking-[0.2em] uppercase px-3 py-1.5">
                    {item.badge}
                  </span>
                )}
                <div className="w-12 h-12 border border-border flex items-center justify-center mb-7
                                group-hover:border-gold group-hover:bg-gold-pale transition-all duration-400">
                  <Icon name={item.icon} size={20} className="text-muted-foreground group-hover:text-gold transition-colors duration-400" />
                </div>
                <h3 className="font-serif text-2xl font-light mb-2 group-hover:text-gold transition-colors duration-300 tracking-wide">
                  {item.title}
                </h3>
                <p className="font-sans-premium text-[0.65rem] tracking-wide text-muted-foreground leading-relaxed">
                  {item.sub}
                </p>
                <div className="mt-7 flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-sans-premium text-[0.6rem] tracking-[0.2em] uppercase">Подробнее</span>
                  <Icon name="MoveRight" size={12} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* Garden wide */}
          <div className="mt-8 relative overflow-hidden h-80 group">
            <img src={GARDEN_IMG} alt="Садовая мебель" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex items-center px-16">
              <div>
                <p className="font-sans-premium text-[0.58rem] tracking-[0.3em] uppercase text-gold mb-3 flex items-center gap-2">
                  <span className="w-6 h-px bg-gold" /> Новинка сезона
                </p>
                <h3 className="font-serif text-4xl md:text-5xl font-light mb-3">
                  Коконы из<br />
                  <em className="italic text-gradient-gold">ротанга</em>
                </h3>
                <p className="font-sans-premium text-[0.65rem] text-muted-foreground tracking-wide max-w-xs">
                  Подвесные кресла собственного производства. Стиль и долговечность.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTS ────────────────────────────── */}
      <section id="contacts" className="py-32 bg-white">
        <div ref={s.contact.ref} className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 max-w-4xl">

            {/* Работа */}
            <div className={`transition-all duration-1000 ${s.contact.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <p className="font-sans-premium text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-gold inline-block" />
                Работа
              </p>
              <h2 className="font-serif text-5xl font-light leading-tight gold-line mb-10">
                Присоединяйтесь<br />
                <em className="italic text-gradient-gold">к нашей команде</em>
              </h2>
              <p className="font-sans-premium font-light text-muted-foreground text-sm leading-relaxed tracking-wide mb-10">
                Ищем талантливых людей в производство и продажи.
              </p>
              <div className="space-y-5">
                {[
                  { icon:"Phone", l:"По вопросам трудоустройства", v:"+7 (917) 630 44 64", s:"" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-5 pb-5 border-b border-border last:border-0">
                    <div className="w-9 h-9 flex-shrink-0 border border-gold/30 flex items-center justify-center">
                      <Icon name={c.icon} size={13} className="text-gold" />
                    </div>
                    <div>
                      <div className="font-sans-premium text-[0.55rem] tracking-[0.22em] uppercase text-muted-foreground mb-1">{c.l}</div>
                      <div className="font-sans-premium text-sm text-foreground">{c.v}</div>
                      <div className="font-sans-premium text-[0.62rem] text-muted-foreground mt-0.5">{c.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Партнёрство */}
            <div className={`transition-all duration-1000 delay-200 ${s.contact.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <p className="font-sans-premium text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-gold inline-block" />
                Партнёрство
              </p>
              <h2 className="font-serif text-5xl font-light leading-tight gold-line mb-10">
                Станьте<br />
                <em className="italic text-gradient-gold">нашим партнёром</em>
              </h2>
              <p className="font-sans-premium font-light text-muted-foreground text-sm leading-relaxed tracking-wide mb-10">
                Работаем с оптовыми покупателями и торговыми сетями.
              </p>
              <div className="space-y-5">
                {[
                  { icon:"Phone",  l:"По вопросам партнёрства", v:"+7 (8422) 303680",                   s:"Пн–Пт, 08:30–17:30" },
                  { icon:"Mail",   l:"Электронная почта",       v:"info@vmm24.com",                      s:"" },
                  { icon:"MapPin", l:"Адрес",                   v:"г. Ульяновск, ул. Герасимова 10 стр 9", s:"" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-5 pb-5 border-b border-border last:border-0">
                    <div className="w-9 h-9 flex-shrink-0 border border-gold/30 flex items-center justify-center">
                      <Icon name={c.icon} size={13} className="text-gold" />
                    </div>
                    <div>
                      <div className="font-sans-premium text-[0.55rem] tracking-[0.22em] uppercase text-muted-foreground mb-1">{c.l}</div>
                      <div className="font-sans-premium text-sm text-foreground">{c.v}</div>
                      <div className="font-sans-premium text-[0.62rem] text-muted-foreground mt-0.5">{c.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="bg-foreground text-white/60 py-14">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="font-serif text-xl font-light tracking-[0.1em] text-white mb-3">
                Волжская мебельная<span className="text-gradient-gold"> мануфактура</span>
              </div>
              <p className="font-sans-premium text-[0.62rem] tracking-wide leading-relaxed">
                Полный цикл производства мягкой<br />и садовой мебели с 2016 года.
              </p>
            </div>
            <div>
              <div className="font-sans-premium text-[0.55rem] tracking-[0.25em] uppercase text-white/30 mb-4">Разделы</div>
              <ul className="space-y-2">
                {NAV.map(n => (
                  <li key={n.href}>
                    <a href={n.href} className="font-sans-premium text-[0.65rem] tracking-wide hover:text-gold transition-colors duration-200">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-sans-premium text-[0.55rem] tracking-[0.25em] uppercase text-white/30 mb-4">Продукция</div>
              <ul className="space-y-2">
                {CATALOG.map(c => (
                  <li key={c.title}>
                    <a href="#catalog" className="font-sans-premium text-[0.65rem] tracking-wide hover:text-gold transition-colors duration-200">
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="font-sans-premium text-[0.58rem] tracking-wide">© 2016–2026 Волжская мебельная мануфактура. Все права защищены.</p>
            <p className="font-sans-premium text-[0.58rem] tracking-wide">Политика конфиденциальности</p>
          </div>
        </div>
      </footer>

      {/* ── CATALOG POPUP ───────────────────────── */}
      {popup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setPopup(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/65 backdrop-blur-sm" style={{ animation:"fadeIn 0.3s ease forwards" }} />

          {/* Modal */}
          <div
            className="relative bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl"
            style={{ animation:"fadeUp 0.35s cubic-bezier(0.25,0.46,0.45,0.94) forwards" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setPopup(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white/90 border border-border hover:border-gold hover:text-gold transition-colors duration-200"
            >
              <Icon name="X" size={14} />
            </button>

            {/* Gallery */}
            <div className="relative h-72 md:h-96 overflow-hidden bg-muted select-none">
              {/* Slides */}
              {popup.photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${popup.title} ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{ opacity: i === slideIdx ? 1 : 0, zIndex: i === slideIdx ? 1 : 0 }}
                />
              ))}

              {/* Prev / Next */}
              <button
                onClick={() => prevSlide(popup.photos.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white border border-white/60 transition-all duration-200"
              >
                <Icon name="ChevronLeft" size={18} className="text-foreground" />
              </button>
              <button
                onClick={() => nextSlide(popup.photos.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white border border-white/60 transition-all duration-200"
              >
                <Icon name="ChevronRight" size={18} className="text-foreground" />
              </button>

              {/* Badge */}
              {popup.badge && (
                <span className="absolute top-4 left-4 z-10 bg-gold text-white font-sans-premium text-[0.52rem] tracking-[0.2em] uppercase px-3 py-1.5">
                  {popup.badge}
                </span>
              )}

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {popup.photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIdx(i)}
                    className={`transition-all duration-300 ${
                      i === slideIdx ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 z-10 font-sans-premium text-[0.55rem] tracking-wider text-white/80">
                {slideIdx + 1} / {popup.photos.length}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <p className="font-sans-premium text-[0.58rem] tracking-[0.28em] uppercase text-gold mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-gold inline-block" />
                Категория продукции
              </p>
              <h2 className="font-serif text-4xl font-light mb-5 gold-line">{popup.title}</h2>
              <p className="font-sans-premium text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-8">
                {popup.desc}
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {popup.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 border-t border-border">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0 mt-1.5" />
                    <span className="font-sans-premium text-[0.65rem] tracking-wide text-foreground leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}