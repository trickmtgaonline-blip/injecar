import { useEffect, useState, useRef, type FormEvent, type PointerEvent } from 'react';
import {
  ArrowRight, ArrowUpRight, BatteryCharging, CarFront, Check, ChevronLeft, ChevronRight,
  CircleGauge, Cog, Droplets, Fan, Gauge, Instagram, LocateFixed, Mail, MapPin,
  Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Star, Thermometer, Timer, Wrench, X,
} from 'lucide-react';

const phone = '5551982696724';
const phoneDisplay = '(51) 98269-6724';
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
const whatsappUrl = wa('Olá! Vim pelo site da Injecar e gostaria de agendar uma avaliação do meu veículo.');
const mapsUrl = 'https://maps.app.goo.gl/Ai7Jx5JnuQyK23bt6';
const routeUrl = 'https://www.google.com/maps/dir/?api=1&destination=Rua+das+Adálias+37+Cecília+Viamão+RS';
const instagramUrl = 'https://instagram.com/injecaroficina';
const reviewsUrl = 'https://maps.app.goo.gl/Ai7Jx5JnuQyK23bt6';

const images = {
  logo: '/126a14e9-a05c-468f-8250-a6a97c989fc9.png',
  hero: '/730210568_18331418242261610_4238321417700025183_n.jpg',
  workshop: '/681048939_18317284393261610_8019736608153311643_n.jpg',
  mechanic: '/728951157_18325759207261610_3028685046551557509_n.jpg',
  diagnostic: '/733171647_18325759216261610_7939968414557570078_n.jpg',
  oil: '/752674403_18328175827261610_1891844332097946425_n.jpg',
  transmission: '/755195219_18329217385261610_932121478158884375_n.jpg',
  team: '/757602781_18329217319261610_5448296942135089883_n.jpg',
  shop: '/757656925_18329217367261610_5140952744389651525_n.jpg',
  fluid: '/758469173_18329217406261610_8646025379877701225_n.jpg',
  engine: '/758647202_18329217307261610_8971566153452198695_n.jpg',
  tools: '/766481619_18331418227261610_3905926026753926484_n.jpg',
  service: '/768408176_18331418173261610_1933869028792409320_n.jpg',
  brakes: '/768763105_18331418176261610_5197203723085048317_n.jpg',
  underside: '/770962332_18331418197261610_2891615064485577160_n.jpg',
  detail: '/773863123_18331418206261610_4609301319227943541_n.jpg',
  repair: '/774042358_18331418194261610_2178427222121299118_n.jpg',
};

type IconType = typeof Wrench;
type Service = { title: string; description: string; icon: IconType };

const navItems = [
  ['Início', 'inicio'], ['Sobre nós', 'sobre'], ['Serviços', 'servicos'],
  ['Especialidades', 'especialidades'], ['Estrutura', 'estrutura'], ['Contato', 'contato'],
];

const trustItems: Service[] = [
  { title: 'Diagnóstico preciso', description: 'Identificamos a causa do problema antes de indicar a solução.', icon: CircleGauge },
  { title: 'Desde 2013 em Viamão', description: 'Mais de uma década cuidando de veículos na região.', icon: ShieldCheck },
  { title: 'Estrutura e equipamentos', description: 'Ferramentas adequadas para diagnóstico e manutenção.', icon: Gauge },
  { title: 'Confiança e transparência', description: 'Clareza sobre o serviço necessário antes da execução.', icon: Sparkles },
];

const services: Service[] = [
  { title: 'Injeção eletrônica', description: 'Diagnóstico e manutenção dos sistemas de injeção.', icon: CircleGauge },
  { title: 'Diagnóstico automotivo', description: 'Investigação técnica para identificar falhas reais.', icon: Gauge },
  { title: 'Elétrica automotiva', description: 'Diagnóstico e manutenção dos sistemas elétricos.', icon: BatteryCharging },
  { title: 'Eletrônica automotiva', description: 'Investigação de falhas e componentes eletrônicos.', icon: Sparkles },
  { title: 'Câmbio automático', description: 'Avaliação e manutenção da transmissão automática.', icon: Cog },
  { title: 'Mecânica geral', description: 'Manutenção dos principais sistemas mecânicos.', icon: Wrench },
  { title: 'Suspensão', description: 'Estabilidade, segurança e conforto para rodar melhor.', icon: CarFront },
  { title: 'Freios', description: 'Inspeção e manutenção do sistema de frenagem.', icon: ShieldCheck },
  { title: 'Troca de óleo', description: 'Lubrificação adequada para o cuidado do motor.', icon: Droplets },
  { title: 'Ar-condicionado', description: 'Mais conforto e eficiência durante o trajeto.', icon: Fan },
  { title: 'Arrefecimento', description: 'Controle térmico para proteger o motor.', icon: Thermometer },
  { title: 'Embragem', description: 'Diagnóstico e manutenção do sistema de embreagem.', icon: Cog },
];

const gallery = [
  { src: images.workshop, label: 'Estrutura da oficina' }, { src: images.diagnostic, label: 'Diagnóstico automotivo' },
  { src: images.mechanic, label: 'Manutenção do motor' }, { src: images.transmission, label: 'Serviço automotivo' },
  { src: images.engine, label: 'Detalhe técnico' }, { src: images.tools, label: 'Ferramentas e estrutura' },
  { src: images.service, label: 'Equipe em ação' }, { src: images.brakes, label: 'Sistema de freios' },
  { src: images.underside, label: 'Manutenção inferior' }, { src: images.detail, label: 'Cuidado nos detalhes' },
  { src: images.repair, label: 'Reparo automotivo' }, { src: images.oil, label: 'Troca de fluido' },
];

const signs: { text: string; wa: string }[] = [
  { text: 'Luz da injeção acesa', wa: 'Olá! A luz da injeção do meu carro está acesa e gostaria de agendar uma avaliação.' },
  { text: 'Motor falhando', wa: 'Olá! Meu motor está falhando e gostaria de agendar uma avaliação.' },
  { text: 'Consumo elevado', wa: 'Olá! Meu carro está com consumo elevado e gostaria de agendar uma avaliação.' },
  { text: 'Barulhos na suspensão', wa: 'Olá! Meu carro está fazendo barulhos na suspensão e gostaria de agendar uma avaliação.' },
  { text: 'Problemas nos freios', wa: 'Olá! Estou sentindo problemas nos freios e gostaria de agendar uma avaliação.' },
  { text: 'Dificuldade nas marchas', wa: 'Olá! Estou tendo dificuldade para engatar as marchas e gostaria de agendar uma avaliação.' },
  { text: 'Ar-condicionado fraco', wa: 'Olá! O ar-condicionado do meu carro está sem eficiência e gostaria de agendar uma avaliação.' },
  { text: 'Carro puxando para um lado', wa: 'Olá! Meu carro está puxando para um lado e gostaria de agendar uma avaliação.' },
];

const reviews = [
  {
    name: 'Gustavo Farias',
    rating: 5,
    text: 'Ótima oficina mecânica! Recentemente arrumei o ar condicionado do meu Astra. Ficou perfeito o serviço, sempre mandam video e foto de como está o processo dos ajustes mecânicos. Muito top!',
    image: '/Gustavo_Farias.png',
    googleUrl: 'https://maps.app.goo.gl/FUcq1ETt59nfM6XL6',
  },
  {
    name: 'Mariéle Ribeiro Trindade',
    rating: 5,
    text: 'Sou cliente da Injecar há 12 anos e sempre confio em todos os serviços prestados pelos profissionais da oficina. Além de fazer a manutenção dos carros que tive, também me orientaram nas aquisições de novos veículos. Destaco o atendimento acolhedor das meninas no setor administrativo.',
    image: '/Mariele_Ribeiro_Trindade.png',
    googleUrl: 'https://maps.app.goo.gl/HA4pkdDpqCVzJcWB7',
  },
  {
    name: 'Gustavo Debom Borges',
    rating: 5,
    text: 'Melhor mecânica da região. Atendimento nota 10. recomendo pra quem precisa ter um mecânico de confiança. sou cliente desde 2013.',
    image: '/Gustavo_Debom_Borges.png',
    googleUrl: 'https://maps.app.goo.gl/JFiC7JbT8UxwezQj9',
  },
  {
    name: 'Clair Souza',
    rating: 5,
    text: 'Esse ambiente é de confiança, recomendo esse lugar, o pessoal é muito simpático e o serviço deles são corretíssimos, são honestos e verdadeiro. Sou cliente deles a 10 anos. Desde que eles tinham a oficina perto de minha casa. Aliás só levo meu carro neles, são elles é quem fazem a mecânica do meu carro.',
    image: '/Clair_Souza.png',
    googleUrl: 'https://maps.app.goo.gl/JMJ3a94JSxgr3e8m8',
  },
];

const faqs = [
  { q: 'Preciso agendar para levar o carro?', a: 'Sim, o agendamento ajuda a organizar o atendimento e garantir que sua avaliação seja feita com a devida atenção. Você pode agendar pelo WhatsApp.' },
  { q: 'Vocês fazem diagnóstico antes de orçar?', a: 'Sim. A Injecar busca identificar a causa do problema antes de propor qualquer serviço, para que você saiba exatamente o que será feito.' },
  { q: 'Quanto tempo leva uma avaliação?', a: 'Depende do problema, mas a primeira avaliação é feita no momento em que o carro chega. Casos mais complexos podem precisar de mais tempo para diagnóstico.' },
  { q: 'Vocês atendem qualquer tipo de carro?', a: 'A Injecar atende diferentes veículos com foco em injeção eletrônica, diagnóstico, elétrica, eletrônica e câmbio automático. Entre em contato para confirmar.' },
  { q: 'Como funciona o pagamento?', a: 'As condições são combinadas diretamente com a oficina no momento do orçamento, com transparência sobre o serviço necessário.' },
  { q: 'Onde fica a Injecar?', a: 'Rua das Adálias, 37 — Cecília, Viamão/RS. CEP 94475-400.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewsPerView, setReviewsPerView] = useState(1);
  const [reviewPointerStart, setReviewPointerStart] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('inicio');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || selectedImage !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, selectedImage]);

  useEffect(() => {
    const updateReviewsPerView = () => {
      setReviewsPerView(window.innerWidth >= 1000 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    };
    updateReviewsPerView();
    window.addEventListener('resize', updateReviewsPerView);
    return () => window.removeEventListener('resize', updateReviewsPerView);
  }, []);

  useEffect(() => {
    setReviewIndex(index => Math.min(index, Math.max(0, reviews.length - reviewsPerView)));
  }, [reviewsPerView]);

  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedImage === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowLeft') setSelectedImage(i => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
      if (e.key === 'ArrowRight') setSelectedImage(i => (i === null ? null : (i + 1) % gallery.length));
    };
    window.addEventListener('keydown', onKey);
    lightboxCloseRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedImage]);

  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const moveReview = (direction: number) => {
    setReviewIndex(index => Math.min(Math.max(0, index + direction), Math.max(0, reviews.length - reviewsPerView)));
  };
  const handleReviewPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (reviewPointerStart !== null) {
      const distance = event.clientX - reviewPointerStart;
      if (Math.abs(distance) > 45) moveReview(distance < 0 ? 1 : -1);
    }
    setReviewPointerStart(null);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };

  return (
    <div className="site-shell">
      <a href="#inicio" className="skip-link">Pular para o conteúdo</a>

      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container header-inner">
          <button className="brand" onClick={() => go('inicio')} aria-label="Voltar ao início">
            <img src={images.logo} alt="Injecar Mecânica" width={122} height={58} />
          </button>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => go(id)} aria-current={activeSection === id ? 'true' : undefined}>{label}</button>
            ))}
          </nav>
          <div className="header-actions">
            <a className="header-phone" href={`tel:+${phone}`}><Phone size={15} /> <span>{phoneDisplay}</span></a>
            <a className="button button--small button--red" href={whatsappUrl}>Agendar avaliação <ArrowUpRight size={16} /></a>
            <button className="menu-button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu /></button>
          </div>
        </div>
      </header>

      {menuOpen && <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />}
      <aside className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} aria-label="Menu mobile">
        <div className="mobile-menu-top"><img src={images.logo} alt="Injecar" /><button aria-label="Fechar menu" onClick={() => setMenuOpen(false)}><X /></button></div>
        {navItems.map(([label, id]) => <button key={id} onClick={() => go(id)} aria-current={activeSection === id ? 'true' : undefined}>{label}<ArrowRight size={17} /></button>)}
        <a className="button button--red" href={whatsappUrl}>Agendar avaliação <MessageCircle size={18} /></a>
      </aside>

      <main>
        <section id="inicio" className="hero">
          <img className="hero-image" src={images.hero} alt="Veículos em manutenção na oficina Injecar em Viamão" width={1920} height={1080} fetchPriority="high" />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="eyebrow"><span className="eyebrow-line" /> INJECAR MECÂNICA <span className="eyebrow-location">VIAMÃO / RS</span></div>
            <h1>Seu carro nas mãos<br /><em>de quem entende.</em></h1>
            <p className="hero-copy">Oficina mecânica em Viamão com manutenção, diagnóstico e serviços automotivos — atendimento especializado, tecnologia e transparência.</p>
            <div className="hero-actions">
              <a className="button button--red" href={whatsappUrl}>Agendar avaliação <ArrowUpRight size={18} /></a>
              <button className="button button--outline-light" onClick={() => go('contato')}>Solicitar orçamento <ArrowRight size={18} /></button>
            </div>
            <div className="hero-tags">{['Mecânica automotiva', 'Diagnóstico', 'Injeção eletrônica', 'Câmbio automático'].map(tag => <span key={tag}><Check size={14} /> {tag}</span>)}</div>
          </div>
          <div className="hero-scroll">SCROLL PARA EXPLORAR <span /></div>
        </section>

        <section className="trust-bar"><div className="container trust-grid">{trustItems.map(({ title, description, icon: Icon }) => <article className="trust-item" key={title}><Icon className="trust-icon" size={25} /><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></section>

        <section id="servicos" className="section section--light"><div className="container">
          <div className="section-heading"><div><div className="eyebrow eyebrow--dark"><span className="eyebrow-line" /> O QUE FAZEMOS</div><h2>Soluções para o seu carro,<br /><span>do diagnóstico ao reparo.</span></h2></div><p>Da manutenção preventiva aos diagnósticos mais específicos, a Injecar reúne diferentes serviços automotivos em um só lugar.</p></div>
          <div className="service-grid">{services.map(({ title, description, icon: Icon }) => <article className="service-card" key={title}><div className="service-icon"><Icon size={22} /></div><h3>{title}</h3><p>{description}</p><ArrowUpRight className="card-arrow" size={18} /></article>)}</div>
        </div></section>

        <section id="especialidades" className="section specialties"><div className="container specialties-grid"><div className="specialty-copy"><div className="eyebrow"><span className="eyebrow-line" /> ESPECIALIDADES</div><h2>Conhecimento técnico<br /><em>em cada detalhe.</em></h2><p>Uma estrutura preparada para cuidar de diferentes sistemas do seu veículo com atenção, método e responsabilidade.</p><div className="specialty-list">{['Injeção eletrônica', 'Diagnóstico automotivo', 'Elétrica e eletrônica', 'Câmbio automático', 'Mecânica geral'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowUpRight size={17} /></div>)}</div><a className="text-link" href={whatsappUrl}>Falar com a Injecar <ArrowRight size={17} /></a></div><div className="specialty-image"><img src={images.diagnostic} alt="Mecânico realizando diagnóstico automotivo na Injecar" width={800} height={650} loading="lazy" /><div className="image-note"><span className="red-dot" /> Precisão antes da troca</div></div></div></section>

        <section className="section transmission"><div className="container transmission-grid"><div className="transmission-image"><img src={images.transmission} alt="Serviço de manutenção de câmbio automático na Injecar" width={800} height={630} loading="lazy" /></div><div className="transmission-copy"><div className="eyebrow"><span className="eyebrow-line" /> ESPECIALIDADE EM DESTAQUE</div><h2>Câmbio<br /><em>automático.</em></h2><p>Manutenção, avaliação e cuidados para preservar o funcionamento e a durabilidade da transmissão automática.</p><ul>{['Avaliação do sistema', 'Manutenção preventiva', 'Revisão e troca de fluido', 'Reparos e ajustes'].map(item => <li key={item}><Check size={16} /> {item}</li>)}</ul><a className="button button--red" href={wa('Olá! Gostaria de falar sobre manutenção de câmbio automático.')}>Falar sobre câmbio <ArrowUpRight size={17} /></a></div></div></section>

        <section id="sobre" className="section about"><div className="container about-grid"><div className="about-image"><img src={images.team} alt="Equipe da Injecar Mecânica em Viamão" width={800} height={620} loading="lazy" /><div className="about-badge"><strong>Desde</strong><span>2013</span><small>em Viamão</small></div></div><div className="about-copy"><div className="eyebrow eyebrow--dark"><span className="eyebrow-line" /> SOBRE A INJECAR</div><h2>Uma oficina feita<br /><span>para cuidar do seu carro.</span></h2><p>Desde 2013, a Injecar é uma oficina mecânica em Viamão que oferece manutenção e reparação automotiva para clientes que procuram conhecimento técnico, atendimento e confiança para cuidar do veículo.</p><p>Nossa atuação reúne mecânica, diagnóstico, elétrica e eletrônica automotiva, transmissão, câmbio automático e diferentes serviços de manutenção.</p><p className="about-signature">Aqui, cada veículo merece atenção ao problema certo e à solução adequada.</p><a className="text-link" href={whatsappUrl}>Conheça a Injecar <ArrowRight size={17} /></a></div></div></section>

        <section className="section why"><div className="container"><div className="section-heading section-heading--center"><div><div className="eyebrow"><span className="eyebrow-line" /> NOSSO JEITO DE TRABALHAR</div><h2>Mais do que consertar.<br /><em>Cuidar do seu carro.</em></h2></div><p>O atendimento começa ouvindo o que o veículo está mostrando e explicando com clareza o caminho mais adequado.</p></div><div className="why-grid">{[['01', 'Diagnóstico antes da troca', 'Buscamos a causa do problema antes de propor a solução.'], ['02', 'Atendimento próximo', 'Explicação clara sobre o que está acontecendo com o veículo.'], ['03', 'Estrutura profissional', 'Um espaço real, organizado para cuidar do seu carro.'], ['04', 'Tecnologia', 'Ferramentas voltadas ao diagnóstico e manutenção.'], ['05', 'Transparência', 'Sem linguagem técnica desnecessária e sem trocas indevidas.'], ['06', 'Soluções completas', 'Diversos serviços no mesmo endereço, em Viamão.']].map(([number, title, description]) => <article key={number}><span className="why-number">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

        <section className="diagnostic"><div className="diagnostic-image"><img src={images.mechanic} alt="Mecânico trabalhando no motor de um veículo na Injecar" width={800} height={600} loading="lazy" /></div><div className="diagnostic-copy"><div className="eyebrow"><span className="eyebrow-line" /> TECNOLOGIA & DIAGNÓSTICO</div><h2>Nem todo problema<br /><em>aparece debaixo do capô.</em></h2><p>Um diagnóstico adequado ajuda a entender o que realmente está acontecendo com o veículo e evita decisões baseadas apenas em suposições.</p><a className="button button--outline-light" href={wa('Olá! Gostaria de agendar um diagnóstico do meu veículo.')}>Solicitar avaliação <ArrowRight size={18} /></a></div></section>

        <section className="section section--light signs"><div className="container"><div className="section-heading"><div><div className="eyebrow eyebrow--dark"><span className="eyebrow-line" /> FIQUE ATENTO</div><h2>Seu carro está dando<br /><span>algum destes sinais?</span></h2></div><p>Perceber os sinais cedo ajuda a cuidar do problema certo antes que ele cresça. Clique no sintoma para falar com a Injecar.</p></div><div className="sign-grid">{signs.map((sign, index) => <a className="sign-card" key={sign.text} href={wa(sign.wa)}><span>0{index + 1}</span><h3>{sign.text}</h3><ArrowUpRight size={18} /></a>)}</div><div className="center-cta"><p>Não espere um pequeno sinal se transformar em um problema maior.</p><a className="button button--red" href={whatsappUrl}>Agendar uma avaliação <ArrowUpRight size={17} /></a></div></div></section>

        <section id="estrutura" className="section gallery-section"><div className="container"><div className="section-heading"><div><div className="eyebrow eyebrow--dark"><span className="eyebrow-line" /> POR DENTRO DA INJECAR</div><h2>Conheça nossa<br /><span>oficina.</span></h2></div><p>Um pouco do espaço, das pessoas e do cuidado que fazem parte de cada atendimento.</p></div><div className="gallery-grid">{gallery.map(({ src, label }, index) => <button className={`gallery-item gallery-item--${index + 1}`} key={src} onClick={() => setSelectedImage(index)} aria-label={`Ampliar foto: ${label}`}><img src={src} alt={label} width={400} height={300} loading="lazy" /><span>{label}<ArrowUpRight size={15} /></span></button>)}</div></div></section>

        <section className="section testimonials"><div className="container testimonial-inner"><div className="eyebrow"><span className="eyebrow-line" /> EXPERIÊNCIA DE QUEM CONFIA</div><h2>Quem confia,<br /><em>recomenda.</em></h2><p>Avaliações reais de clientes da Injecar no Google.</p><a className="reviews-rating-link" href={reviewsUrl} target="_blank" rel="noreferrer"><span className="reviews-rating-stars"><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /></span><span className="reviews-rating-text">Ver todas as avaliações no Google <ArrowUpRight size={14} /></span></a><div className="reviews-carousel" role="region" aria-roledescription="carrossel" aria-label="Avaliações de clientes"><div className="reviews-track" style={{ transform: `translateX(-${reviewIndex * (100 / reviewsPerView)}%)` }} onPointerDown={e => setReviewPointerStart(e.clientX)} onPointerUp={handleReviewPointerUp} onPointerLeave={e => { if (reviewPointerStart !== null) handleReviewPointerUp(e); }} onTouchStart={e => setReviewPointerStart(e.touches[0].clientX)} onTouchEnd={e => { if (reviewPointerStart !== null) { const distance = e.changedTouches[0].clientX - reviewPointerStart; if (Math.abs(distance) > 45) moveReview(distance < 0 ? 1 : -1); setReviewPointerStart(null); } }}>{reviews.map((review, index) => <article className="review-card" key={review.name} aria-roledescription="slide" aria-label={`Avaliação ${index + 1} de ${reviews.length}`} style={{ width: `calc(${100 / reviewsPerView}% - ${(reviewsPerView - 1) * 16 / reviewsPerView}px)` }}><div className="review-header"><img src={review.image} alt={`Foto de ${review.name}`} className="review-avatar" width={44} height={44} loading="lazy" /><div className="review-author"><strong>{review.name}</strong><span className="review-google"><Star size={11} fill="currentColor" /> Avaliação do Google</span></div></div><div className="review-stars" aria-label={`${review.rating} de 5 estrelas`}>{Array.from({ length: review.rating }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div><p className="review-text">{review.text}</p><a className="review-link" href={review.googleUrl} target="_blank" rel="noreferrer">Ver no Google <ArrowUpRight size={14} /></a></article>)}</div>{reviews.length > reviewsPerView && <div className="reviews-controls"><button className="review-arrow" aria-label="Avaliação anterior" onClick={() => moveReview(-1)} disabled={reviewIndex === 0}><ChevronLeft size={20} /></button><div className="review-dots">{Array.from({ length: Math.max(1, reviews.length - reviewsPerView + 1) }).map((_, i) => <button key={i} className={`review-dot ${reviewIndex === i ? 'review-dot--active' : ''}`} aria-label={`Ir para avaliação ${i + 1}`} onClick={() => setReviewIndex(i)} />)}</div><button className="review-arrow" aria-label="Próxima avaliação" onClick={() => moveReview(1)} disabled={reviewIndex >= reviews.length - reviewsPerView}><ChevronRight size={20} /></button></div>}</div></div></section>

        <section className="section section--light faq-section"><div className="container faq-inner">
          <div className="section-heading section-heading--center"><div><div className="eyebrow eyebrow--dark"><span className="eyebrow-line" /> DÚVIDAS FREQUENTES</div><h2>Perguntas<br /><span>frequentes.</span></h2></div><p>Tire suas dúvidas antes de levar o carro à Injecar.</p></div>
          <div className="faq-list">{faqs.map((faq, index) => (
            <div className={`faq-item ${openFaq === index ? 'faq-item--open' : ''}`} key={index}>
              <button className="faq-question" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                {faq.q}
                <span className="faq-icon">{openFaq === index ? <X size={18} /> : <ArrowUpRight size={18} />}</span>
              </button>
              <div className="faq-answer"><p>{faq.a}</p></div>
            </div>
          ))}</div>
        </div></section>

        <section id="contato" className="section contact"><div className="container contact-grid"><div className="contact-info"><div className="eyebrow eyebrow--dark"><span className="eyebrow-line" /> FALE COM A INJECAR</div><h2>Precisa de uma<br /><span>avaliação?</span></h2><p>Entre em contato com a Injecar e explique o que está acontecendo com seu veículo. Nossa equipe poderá orientar você sobre o próximo passo.</p><div className="contact-links"><a href={whatsappUrl}><MessageCircle size={20} /><div><small>WhatsApp</small><strong>{phoneDisplay}</strong></div><ArrowUpRight size={17} /></a><a href={`tel:+${phone}`}><Phone size={20} /><div><small>Telefone</small><strong>{phoneDisplay}</strong></div><ArrowUpRight size={17} /></a><a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={20} /><div><small>Instagram</small><strong>@injecaroficina</strong></div><ArrowUpRight size={17} /></a><a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={20} /><div><small>Endereço</small><strong>Rua das Adálias, 37 — Viamão/RS</strong></div><ArrowUpRight size={17} /></a></div></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-top"><span>Solicite um contato</span><span className="form-required">* campos obrigatórios</span></div>{sent ? <div className="success-message"><Check size={28} /><h3>Mensagem preparada.</h3><p>Agora é só chamar a Injecar pelo WhatsApp para continuar o atendimento.</p><a className="button button--red" href={whatsappUrl}>Abrir WhatsApp <ArrowUpRight size={17} /></a></div> : <><label>Seu nome *<input required name="name" placeholder="Como podemos chamar você?" /></label><label>Telefone *<input required name="phone" type="tel" placeholder="(00) 00000-0000" /></label><label>Como podemos ajudar?<textarea name="message" rows={3} placeholder="Conte brevemente o que está acontecendo com o veículo..." /></label><button className="button button--red" type="submit">Solicitar contato <ArrowUpRight size={17} /></button></>}</form></div></section>

        <section className="location"><div className="location-map"><iframe title="Localização da Injecar Mecânica no Google Maps" src="https://www.google.com/maps?q=Rua%20das%20Ad%C3%A1lias%2C%2037%2C%20Cec%C3%ADlia%2C%20Viam%C3%A3o%2C%20RS&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="location-copy"><div className="eyebrow"><span className="eyebrow-line" /> ONDE ESTAMOS</div><h2>Estamos<br /><em>em Viamão.</em></h2><p>Rua das Adálias, 37<br />Cecília — Viamão/RS<br />CEP 94475-400</p><div className="location-actions"><a className="button button--red" href={mapsUrl} target="_blank" rel="noreferrer">Ver no Google Maps <ArrowUpRight size={17} /></a><a className="text-link text-link--light" href={routeUrl} target="_blank" rel="noreferrer">Traçar rota <ArrowRight size={17} /></a></div></div></section>

        <section className="final-cta"><img src={images.shop} alt="Oficina Injecar em Viamão" width={1920} height={1080} loading="lazy" /><div className="final-overlay" /><div className="container final-content"><div className="eyebrow"><span className="eyebrow-line" /> PRONTO PARA CUIDAR MELHOR</div><h2>Seu carro merece<br /><em>cuidado de verdade.</em></h2><p>Conte com a Injecar para manutenção, diagnóstico e serviços automotivos em Viamão.</p><div className="hero-actions"><a className="button button--red" href={whatsappUrl}>Agendar avaliação <ArrowUpRight size={17} /></a><a className="button button--outline-light" href={`tel:+${phone}`}><Phone size={17} /> {phoneDisplay}</a></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><div className="brand brand--footer"><img src={images.logo} alt="Injecar Mecânica" width={130} height={62} /></div><p>Oficina mecânica em Viamão/RS. Manutenção, diagnóstico e serviços automotivos desde 2013.</p><a className="footer-whatsapp" href={whatsappUrl}><MessageCircle size={17} /> Falar pelo WhatsApp</a></div><div><h3>Explorar</h3>{navItems.slice(0, 5).map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</div><div><h3>Contato</h3><a href={mapsUrl} target="_blank" rel="noreferrer">Rua das Adálias, 37<br />Cecília — Viamão/RS</a><a href={`tel:+${phone}`}>{phoneDisplay}</a><a href={instagramUrl} target="_blank" rel="noreferrer">@injecaroficina</a></div></div><div className="container footer-bottom"><span>© INJECAR MECÂNICA. Todos os direitos reservados.</span><span>Desenvolvido por <strong>Wevira</strong></span></div></footer>

      <a className="floating-whatsapp" href={whatsappUrl} aria-label="Chamar no WhatsApp"><MessageCircle size={25} /><span>Fale conosco</span></a>

      <div className="mobile-cta-bar">
        <a href={`tel:+${phone}`} className="mobile-cta-btn mobile-cta-btn--phone"><Phone size={20} /><span>Ligar</span></a>
        <a href={whatsappUrl} className="mobile-cta-btn mobile-cta-btn--wa"><MessageCircle size={20} /><span>WhatsApp</span></a>
        <a href={whatsappUrl} className="mobile-cta-btn mobile-cta-btn--schedule"><ArrowUpRight size={20} /><span>Agendar</span></a>
      </div>

      {selectedImage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Visualização da galeria" ref={lightboxRef} onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" aria-label="Fechar (ESC)" ref={lightboxCloseRef} onClick={() => setSelectedImage(null)}><X /></button>
          <button className="lightbox-prev" aria-label="Imagem anterior" onClick={e => { e.stopPropagation(); setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length); }}><ChevronLeft /></button>
          <img src={gallery[selectedImage].src} alt={gallery[selectedImage].label} onClick={e => e.stopPropagation()} />
          <button className="lightbox-next" aria-label="Próxima imagem" onClick={e => { e.stopPropagation(); setSelectedImage((selectedImage + 1) % gallery.length); }}><ChevronRight /></button>
          <span className="lightbox-caption">{gallery[selectedImage].label}</span>
        </div>
      )}
    </div>
  );
}

export default App;
