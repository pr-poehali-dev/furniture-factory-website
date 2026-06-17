import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG    = "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/files/b404ae03-3f95-4ed4-b475-d2d62428a2e7.jpg";
const DETAIL_IMG  = "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/files/75e05f22-3037-439e-a4a2-34684d8ff26b.jpg";
const GARDEN_IMG  = "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/files/87a80901-5fe0-4f57-8cda-3653bdc09e74.jpg";
const FACTORY_IMG = "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/files/3c0494b8-0186-4c8a-bd37-c650767e0a57.jpg";

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
  { value: 6,   suffix: "",   label: "этапов цикла" },
  { value: 100, suffix: "%",  label: "своё производство" },
];

const STEPS = [
  { n:"01", title:"Нить",               desc:"Производство нити с нуля — основа каждого изделия. Контроль состава и прочности на входе." },
  { n:"02", title:"Ткань-рогожка",      desc:"Из нити — фирменная рогожка. Плотная, износостойкая, с благородной текстурой." },
  { n:"03", title:"Металлокаркас",      desc:"Сварные каркасы из металла собственного производства. Испытания на изгиб и нагрузку." },
  { n:"04", title:"Декор и опоры",      desc:"Пластиковые опоры и декоративные элементы — точное литьё, богатая палитра." },
  { n:"05", title:"Лоза ротанга",       desc:"ПВХ-лоза для садовой мебели: UV-стойкая, морозоустойчивая, долговечная." },
  { n:"06", title:"Сборка и упаковка",  desc:"Финальная сборка всех изделий — от кроя ткани до фирменной упаковки." },
];

const CATALOG = [
  { icon:"Armchair",  title:"Диваны",         sub:"Модульные, угловые, прямые",         badge:"Хит" },
  { icon:"Sofa",      title:"Кресла",          sub:"Для дома и офиса",                   badge:"" },
  { icon:"BedDouble", title:"Кровати",         sub:"Мягкие, с металлическим каркасом",   badge:"" },
  { icon:"Trees",     title:"Садовая мебель",  sub:"Из искусственного ротанга",          badge:"Сезон" },
  { icon:"Circle",    title:"Коконы",          sub:"Подвесные кресла — новинка",         badge:"Новинка" },
  { icon:"Settings",  title:"Под заказ",       sub:"Индивидуальные партии для сетей",    badge:"" },
];

/* ── component ───────────────────────────────── */
export default function Index() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [form,       setForm]       = useState({ name:"", phone:"", message:"" });
  const [sent,       setSent]       = useState(false);

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
              МЕБЕЛЬ<span className="text-gold">ФАБРИКА</span>
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
                className={`group relative bg-white border border-border p-8 hover-lift-soft transition-all duration-700 ${
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
          <div className="grid lg:grid-cols-2 gap-20">

            {/* Left */}
            <div className={`transition-all duration-1000 ${s.contact.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <p className="font-sans-premium text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-gold inline-block" />
                Партнёрство
              </p>
              <h2 className="font-serif text-5xl font-light leading-tight gold-line mb-10">
                Станьте<br />
                <em className="italic text-gradient-gold">нашим партнёром</em>
              </h2>
              <p className="font-sans-premium font-light text-muted-foreground text-sm leading-relaxed tracking-wide mb-10">
                Работаем с оптовыми покупателями и торговыми сетями. Оставьте заявку — менеджер свяжется в течение рабочего часа.
              </p>

              <div className="space-y-5">
                {[
                  { icon:"Phone",  l:"Телефон",       v:"+7 (___) ___-__-__",   s:"Пн–Пт, 9:00–18:00" },
                  { icon:"Mail",   l:"Электронная почта", v:"info@factory.ru",  s:"Ответим в течение часа" },
                  { icon:"MapPin", l:"Производство",  v:"Укажите адрес",         s:"Производственный цех" },
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

            {/* Right: form */}
            <div className={`transition-all duration-1000 delay-300 ${s.contact.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-14 h-14 border border-gold flex items-center justify-center mb-6">
                    <Icon name="Check" size={22} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-3xl font-light mb-3">Заявка получена</h3>
                  <p className="font-sans-premium text-[0.65rem] tracking-wide text-muted-foreground">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5">
                  {[
                    { label:"Ваше имя",  key:"name",    type:"text",  ph:"Иван Иванов" },
                    { label:"Телефон",   key:"phone",   type:"tel",   ph:"+7 (___) ___-__-__" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="font-sans-premium text-[0.58rem] tracking-[0.22em] uppercase text-muted-foreground block mb-2">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        required
                        placeholder={f.ph}
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full border-b border-border bg-transparent py-3 font-sans-premium text-sm text-foreground
                                   placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="font-sans-premium text-[0.58rem] tracking-[0.22em] uppercase text-muted-foreground block mb-2">
                      Сообщение
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Расскажите о вашем запросе..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full border-b border-border bg-transparent py-3 font-sans-premium text-sm text-foreground
                                 placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gold text-white py-4 font-sans-premium text-[0.68rem] tracking-[0.22em] uppercase
                                 hover:bg-gold-light transition-colors duration-400 flex items-center justify-center gap-3"
                    >
                      <Icon name="Send" size={13} />
                      Отправить заявку
                    </button>
                    <p className="font-sans-premium text-[0.55rem] text-muted-foreground text-center mt-3 tracking-wide">
                      Нажимая кнопку, вы принимаете политику конфиденциальности
                    </p>
                  </div>
                </form>
              )}
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
                МЕБЕЛЬ<span className="text-gradient-gold">ФАБРИКА</span>
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
            <p className="font-sans-premium text-[0.58rem] tracking-wide">© 2016–2026 МебельФабрика. Все права защищены.</p>
            <p className="font-sans-premium text-[0.58rem] tracking-wide">Политика конфиденциальности</p>
          </div>
        </div>
      </footer>
    </div>
  );
}