const Nav = ({ onBook, activeSection, heroLayout }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jump = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const links = [
    { id: 'services', label: 'Services' },
    { id: 'approach', label: 'Approach' },
    { id: 'work', label: 'Work' },
    { id: 'process', label: 'Process' },
    { id: 'enquire', label: 'Enquire' },
  ];

  // Full-bleed hero = dark photography behind the nav → switch to light logo + white links
  const onDark = heroLayout === 'full-bleed';

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${onDark ? 'on-dark' : ''}`}>
      <div className="nav-left">
        {links.slice(0, 3).map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={jump(l.id)}
             className={`nav-link ${activeSection === l.id ? 'active' : ''}`}>
            {l.label}
          </a>
        ))}
      </div>
      <a href="#top" onClick={jump('top')} className="nav-brand" aria-label="Jo Lyons Styling · home">
        <img src="images/logo-dark.png" alt="Jo Lyons Styling" className="nav-brand-logo logo-dark" />
        <img src="images/logo-light.png" alt="" aria-hidden="true" className="nav-brand-logo logo-light" />
      </a>
      <div className="nav-right">
        {links.slice(3).map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={jump(l.id)}
             className={`nav-link ${activeSection === l.id ? 'active' : ''}`}>
            {l.label}
          </a>
        ))}
        <button className="nav-cta" onClick={onBook}>
          <span className="dot" />
          Book a consultation
        </button>
      </div>
    </nav>
  );
};
window.Nav = Nav;
