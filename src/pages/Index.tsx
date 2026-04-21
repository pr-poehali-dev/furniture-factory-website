import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/files/3c0494b8-0186-4c8a-bd37-c650767e0a57.jpg";
const SOFAS_IMG = "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/files/5ae3afe3-6741-49f4-9d4f-d909725df4a5.jpg";
const GARDEN_IMG = "https://cdn.poehali.dev/projects/1c5d3218-1ab5-4a1f-ac32-40770b70a351/files/ec4c509b-1cf7-4ea8-85b3-993b8f771edd.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // threshold is stable
  return { ref, inView };
}

function CountUp({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const navItems = [
  { label: "Главная", href: "#home" },
  { label: "О нас", href: "#about" },
  { label: "Производство", href: "#production" },
  { label: "Процесс", href: "#process" },
  { label: "Каталог", href: "#catalog" },
  { label: "Контакты", href: "#contacts" },
];

const stats = [
  { value: 550, suffix: "+", label: "диванов в день" },
  { value: 10, suffix: "+", label: "лет на рынке" },
  { value: 100, suffix: "%", label: "свой цикл" },
  { value: 50, suffix: "+", label: "партнёров" },
];

const productionSteps = [
  {
    num: "01",
    icon: "Layers",
    title: "Производство нити",
    desc: "Всё начинается с нити — основы любого изделия. Собственное производство нити обеспечивает полный контроль качества с первого этапа.",
  },
  {
    num: "02",
    icon: "Grid3x3",
    title: "Ткань-рогожка",
    desc: "Из нити мы ткём рогожку — прочную, износостойкую ткань с характерной текстурой. Материал проходит контроль плотности и цвета.",
  },
  {
    num: "03",
    icon: "Wrench",
    title: "Металлические каркасы",
    desc: "Собственный металлопрокат и сборка каркасов. Каждый каркас испытывается на нагрузку — никаких компромиссов с надёжностью.",
  },
  {
    num: "04",
    icon: "Package",
    title: "Декор и пластиковые опоры",
    desc: "Декоративные элементы и диванные опоры из пластика — тоже наше производство. Точность литья, богатая палитра цветов.",
  },
  {
    num: "05",
    icon: "Leaf",
    title: "Искусственный ротанг (лоза)",
    desc: "Производим лозу из ПВХ для садовой мебели. Устойчива к UV-излучению, морозу и влаге — идеальна для уличного применения.",
  },
  {
    num: "06",
    icon: "Armchair",
    title: "Полная сборка изделий",
    desc: "Финальный этап — сборка диванов, кресел, кроватей и садовой мебели. От кроя и набивки до упаковки — всё под одной крышей.",
  },
];

const catalogItems = [
  { title: "Диваны", desc: "Модульные, угловые, прямые — для любого интерьера", icon: "Armchair", tag: "Хит продаж" },
  { title: "Кресла", desc: "Эргономичные модели для дома и офиса", icon: "Sofa", tag: "Новинки" },
  { title: "Кровати", desc: "Мягкие кровати с изголовьем на металлическом каркасе", icon: "BedDouble", tag: "" },
  { title: "Садовая мебель", desc: "Комплекты из искусственного ротанга для улицы", icon: "Trees", tag: "Сезонный хит" },
  { title: "Коконы", desc: "Подвесные кресла-коконы из ротанга — новинка", icon: "Circle", tag: "Новинка" },
  { title: "Под заказ", desc: "Индивидуальные решения для торговых сетей", icon: "Settings", tag: "" },
];

const aboutFeatures = [
  { icon: "Factory", title: "Полный цикл", desc: "От нити до готового изделия — без субподряда и посредников" },
  { icon: "ShieldCheck", title: "Контроль качества", desc: "Каждый этап производства проходит многоступенчатую проверку" },
  { icon: "Truck", title: "Работаем с сетями", desc: "Стабильные поставки крупным торговым сетям по всей стране" },
  { icon: "Zap", title: "550 изделий в день", desc: "Мощности позволяют выполнять крупные оптовые заказы точно в срок" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { ref: aboutRef, inView: aboutInView } = useInView();
  const { ref: prodRef, inView: prodInView } = useInView();
  const { ref: catalogRef, inView: catalogInView } = useInView();
  const { ref: contactRef, inView: contactInView } = useInView();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-xl" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-brand-orange flex items-center justify-center">
              <span className="font-display text-background font-bold text-lg leading-none">М</span>
            </div>
            <div>
              <div className="font-display text-lg text-foreground leading-none tracking-wider">МЕБЕЛЬ<span className="text-brand-orange">ФАБРИКА</span></div>
              <div className="text-[10px] text-muted-foreground tracking-widest font-body uppercase">С 2016 года</div>
            </div>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">{item.label}</a>
              </li>
            ))}
          </ul>

          <a
            href="#contacts"
            className="hidden lg:flex items-center gap-2 bg-brand-orange text-background px-5 py-2.5 font-display text-sm uppercase tracking-wider hover:bg-brand-amber transition-colors duration-300"
          >
            <Icon name="Phone" size={14} />
            Связаться
          </a>

          <button className="lg:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-card border-t border-border px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 nav-link border-b border-border/50 last:border-0"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 opacity-0-start animate-fade-in-up">
              <div className="h-px w-12 bg-brand-orange" />
              <span className="font-body text-brand-orange text-sm tracking-widest uppercase">Производитель полного цикла</span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl leading-none mb-6 opacity-0-start animate-fade-in-up delay-200">
              МЫ <span className="text-gradient">СОЗДАЁМ</span><br />
              МЕБЕЛЬ<br />
              <span className="text-foreground/40">С НУЛЯ</span>
            </h1>

            <p className="font-body text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed opacity-0-start animate-fade-in-up delay-400">
              От производства нити до готового дивана — полный цикл под одной крышей.
              Более <strong className="text-foreground">10 лет</strong> мы создаём мягкую и садовую мебель
              для крупнейших торговых сетей страны.
            </p>

            <div className="flex flex-wrap gap-4 opacity-0-start animate-fade-in-up delay-500">
              <a
                href="#process"
                className="flex items-center gap-2 bg-brand-orange text-background px-8 py-4 font-display text-sm uppercase tracking-wider hover:bg-brand-amber transition-all duration-300 hover:scale-105"
              >
                <Icon name="Factory" size={16} />
                Наше производство
              </a>
              <a
                href="#catalog"
                className="flex items-center gap-2 border border-foreground/30 text-foreground px-8 py-4 font-display text-sm uppercase tracking-wider hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
              >
                <Icon name="Grid2x2" size={16} />
                Каталог продукции
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl md:text-4xl text-gradient">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-body text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: "repeating-linear-gradient(45deg, hsl(28 85% 52%) 0, hsl(28 85% 52%) 1px, transparent 0, transparent 50%)",
            backgroundSize: "30px 30px"
          }} />
        </div>

        <div ref={aboutRef} className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${aboutInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-brand-orange" />
                <span className="font-body text-brand-orange text-sm tracking-widest uppercase">О компании</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl leading-none mb-6 line-accent">
                МЫ НЕ ПРОСТО<br />
                <span className="text-gradient">ПРОИЗВОДИМ —</span><br />
                МЫ СОЗДАЁМ
              </h2>
              <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
                С 2016 года наша фабрика строит мебель иначе. Мы контролируем каждый миллиметр — от сырья до упаковки.
                Никаких субподрядчиков, никаких компромиссов с качеством.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Сегодня мы производим более <strong className="text-foreground">550 диванов в сутки</strong>,
                работаем с крупнейшими торговыми сетями и продолжаем расширяться. Наши коконы из искусственного ротанга
                стали настоящим хитом сезона.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Мягкая мебель", "Садовая мебель", "Коконы", "Металлокаркасы", "Ткань рогожка", "Лоза ротанг"].map((tag) => (
                  <span key={tag} className="font-body text-xs border border-brand-orange/40 text-brand-orange px-3 py-1.5 uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${aboutInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
              <div className="grid grid-cols-2 gap-4">
                {aboutFeatures.map((feature, i) => (
                  <div key={i} className="bg-card border border-border p-6 hover-lift group">
                    <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center mb-4 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                      <Icon name={feature.icon} size={18} className="text-brand-orange group-hover:text-background transition-colors duration-300" />
                    </div>
                    <h3 className="font-display text-base mb-2 tracking-wide">{feature.title}</h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTION WIDE BANNER */}
      <section id="production" className="relative h-64 overflow-hidden">
        <img src={SOFAS_IMG} alt="Производство диванов" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <p className="font-display text-3xl md:text-5xl text-foreground">
              Производим <span className="text-gradient">550+</span> изделий<br />
              <span className="text-muted-foreground">каждый рабочий день</span>
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 bg-card/30">
        <div ref={prodRef} className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${prodInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-orange" />
              <span className="font-body text-brand-orange text-sm tracking-widest uppercase">Наш процесс</span>
              <div className="h-px w-12 bg-brand-orange" />
            </div>
            <h2 className="font-display text-5xl md:text-6xl line-accent-center">
              ОТ НИТИ —<br /><span className="text-gradient">ДО ГОТОВОГО ИЗДЕЛИЯ</span>
            </h2>
            <p className="font-body text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
              6 этапов полного производственного цикла. Всё — на наших мощностях, всё — под нашим контролем.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {productionSteps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`font-display text-sm px-4 py-2 uppercase tracking-wider border transition-all duration-300 ${
                  activeStep === i
                    ? "bg-brand-orange text-background border-brand-orange"
                    : "border-border text-muted-foreground hover:border-brand-orange/50 hover:text-brand-orange"
                }`}
              >
                {step.num}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productionSteps.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                className={`relative border p-7 cursor-pointer transition-all duration-500 group ${
                  activeStep === i
                    ? "border-brand-orange bg-brand-orange/5 shadow-lg shadow-brand-orange/10"
                    : "border-border bg-card hover:border-brand-orange/40"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className={`font-display text-5xl font-bold leading-none transition-colors duration-300 ${activeStep === i ? "text-brand-orange/30" : "text-foreground/10"}`}>
                    {step.num}
                  </span>
                  <div className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${activeStep === i ? "bg-brand-orange border-brand-orange" : "border-border group-hover:border-brand-orange/50"}`}>
                    <Icon name={step.icon} size={18} className={activeStep === i ? "text-background" : "text-muted-foreground"} />
                  </div>
                </div>
                <h3 className={`font-display text-lg mb-3 tracking-wide transition-colors duration-300 ${activeStep === i ? "text-brand-orange" : ""}`}>
                  {step.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                {activeStep === i && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-orange to-brand-amber" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-28">
        <div ref={catalogRef} className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 transition-all duration-1000 ${catalogInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-orange" />
              <span className="font-body text-brand-orange text-sm tracking-widest uppercase">Продукция</span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-5xl md:text-6xl leading-none">
                НАШИ<br /><span className="text-gradient">ИЗДЕЛИЯ</span>
              </h2>
              <p className="font-body text-muted-foreground max-w-sm">
                Широкий ассортимент мягкой и садовой мебели для оптовых партнёров и торговых сетей.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {catalogItems.map((item, i) => (
              <div
                key={i}
                className={`group relative bg-card border border-border p-8 hover-lift cursor-pointer transition-all duration-700 ${catalogInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {item.tag && (
                  <span className="absolute top-4 right-4 font-body text-[10px] bg-brand-orange text-background px-2 py-1 uppercase tracking-wider">
                    {item.tag}
                  </span>
                )}
                <div className="w-14 h-14 border border-border flex items-center justify-center mb-6 group-hover:border-brand-orange group-hover:bg-brand-orange/10 transition-all duration-300">
                  <Icon name={item.icon} size={24} className="text-muted-foreground group-hover:text-brand-orange transition-colors duration-300" />
                </div>
                <h3 className="font-display text-2xl mb-3 group-hover:text-brand-orange transition-colors duration-300 tracking-wide">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-brand-orange opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="font-display text-xs uppercase tracking-widest">Подробнее</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-brand-orange to-brand-amber group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>

          <div className="mt-12 relative overflow-hidden h-72 group cursor-pointer">
            <img
              src={GARDEN_IMG}
              alt="Садовая мебель и коконы"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-12">
              <div>
                <div className="font-body text-brand-orange text-sm tracking-widest uppercase mb-3">Новинка сезона</div>
                <h3 className="font-display text-4xl md:text-5xl mb-4">КОКОНЫ ИЗ<br /><span className="text-gradient">РОТАНГА</span></h3>
                <p className="font-body text-muted-foreground max-w-sm">Подвесные кресла-коконы собственного производства. Стиль, комфорт и долговечность.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 bg-card/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(28 85% 52%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(38 92% 60%) 0%, transparent 50%)"
        }} />

        <div ref={contactRef} className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-orange" />
              <span className="font-body text-brand-orange text-sm tracking-widest uppercase">Контакты</span>
              <div className="h-px w-12 bg-brand-orange" />
            </div>
            <h2 className="font-display text-5xl md:text-6xl">
              СТАНЬТЕ<br /><span className="text-gradient">НАШИМ ПАРТНЁРОМ</span>
            </h2>
            <p className="font-body text-muted-foreground text-lg mt-6 max-w-xl mx-auto">
              Работаем с оптовыми покупателями и торговыми сетями. Оставьте заявку — наш менеджер свяжется в течение часа.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className={`transition-all duration-1000 delay-200 ${contactInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
              {formSent ? (
                <div className="bg-brand-orange/10 border border-brand-orange p-12 text-center">
                  <div className="w-16 h-16 bg-brand-orange flex items-center justify-center mx-auto mb-6">
                    <Icon name="Check" size={28} className="text-background" />
                  </div>
                  <h3 className="font-display text-2xl mb-3">Заявка отправлена!</h3>
                  <p className="font-body text-muted-foreground">Мы свяжемся с вами в течение рабочего часа.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-card border border-border px-5 py-4 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-brand-orange transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-2">Телефон</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-card border border-border px-5 py-4 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-brand-orange transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="font-display text-xs uppercase tracking-widest text-muted-foreground block mb-2">Сообщение</label>
                    <textarea
                      rows={4}
                      placeholder="Расскажите о вашем запросе..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-card border border-border px-5 py-4 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-brand-orange transition-colors duration-300 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-orange text-background py-4 font-display uppercase tracking-wider text-sm hover:bg-brand-amber transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Icon name="Send" size={16} />
                    Отправить заявку
                  </button>
                  <p className="font-body text-muted-foreground text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>

            <div className={`transition-all duration-1000 delay-400 ${contactInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (___) ___-__-__", sub: "Пн–Пт, 9:00 – 18:00" },
                  { icon: "Mail", label: "Email", value: "info@factory.ru", sub: "Ответим в течение часа" },
                  { icon: "MapPin", label: "Производство", value: "Укажите адрес фабрики", sub: "Производственный цех" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–18:00", sub: "Сб: по договорённости" },
                ].map((contact, i) => (
                  <div key={i} className="flex items-start gap-5 p-5 bg-card border border-border hover:border-brand-orange/40 transition-colors duration-300">
                    <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center flex-shrink-0">
                      <Icon name={contact.icon} size={16} className="text-brand-orange" />
                    </div>
                    <div>
                      <div className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-1">{contact.label}</div>
                      <div className="font-body text-foreground font-medium">{contact.value}</div>
                      <div className="font-body text-muted-foreground text-sm">{contact.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 border border-brand-orange/30 bg-brand-orange/5">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="Star" size={16} className="text-brand-orange" />
                  <span className="font-display text-sm uppercase tracking-wider text-brand-orange">Работаем с крупным оптом</span>
                </div>
                <p className="font-body text-muted-foreground text-sm">
                  Официальный поставщик крупных торговых сетей. Стабильные поставки, индивидуальные условия, собственная логистика.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-brand-orange flex items-center justify-center">
                  <span className="font-display text-background font-bold">М</span>
                </div>
                <span className="font-display text-lg">МЕБЕЛЬ<span className="text-brand-orange">ФАБРИКА</span></span>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                Полный цикл производства мягкой и садовой мебели с 2016 года. Качество, которому доверяют.
              </p>
            </div>
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-muted-foreground">Разделы</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="font-body text-sm text-muted-foreground hover:text-brand-orange transition-colors duration-200">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-muted-foreground">Продукция</h4>
              <ul className="space-y-2">
                {["Диваны", "Кресла", "Кровати", "Садовая мебель", "Коконы"].map((prod) => (
                  <li key={prod}>
                    <a href="#catalog" className="font-body text-sm text-muted-foreground hover:text-brand-orange transition-colors duration-200">
                      {prod}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-body text-muted-foreground text-sm">
              © 2016–2026 МебельФабрика. Все права защищены.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Shield" size={12} />
              <span className="font-body text-xs">Политика конфиденциальности</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}