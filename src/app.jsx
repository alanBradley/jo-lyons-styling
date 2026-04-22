const App = () => {
  const [tweaks, setTweaks] = React.useState(() => ({ ...(window.__TWEAKS__ || {}) }));
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const [bookingOpen, setBookingOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');

  // Hero variant can override imageryMode → type-led
  const effectiveLayout = tweaks.imageryMode === 'type-led' ? 'type-led' : tweaks.heroLayout;

  // Edit-mode protocol
  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const setTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  // Sync data-attrs on <html>
  React.useEffect(() => {
    document.documentElement.dataset.type = tweaks.typePairing;
    document.documentElement.dataset.accent = tweaks.accent;
  }, [tweaks.typePairing, tweaks.accent]);

  // Scrollspy
  React.useEffect(() => {
    const ids = ['services', 'approach', 'work', 'process', 'enquire'];
    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openBooking = () => setBookingOpen(true);

  return (
    <>
      <Nav onBook={openBooking} activeSection={activeSection} heroLayout={effectiveLayout} />
      <Hero layout={effectiveLayout} onBook={openBooking} />

      {/* Trust band */}
      <div className="trust-band">
        <div className="trust-band-row">
          {Array(2).fill(0).map((_, i) => (
            <React.Fragment key={i}>
              <span>Bridal parties styled · <em>60+</em></span>
              <span className="sep">✦</span>
              <span>Editorial & campaign · <em>Folkster · Ask My Gee · Kiki Na Art</em></span>
              <span className="sep">✦</span>
              <span>Formerly · <em>The White & Gold</em></span>
              <span className="sep">✦</span>
              <span>Specialism · <em>Bridal & Bridesmaids</em></span>
              <span className="sep">✦</span>
              <span>By appointment · <em>Nerja, Spain & worldwide</em></span>
              <span className="sep">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <Intro />
      <Services />
      <Philosophy />
      <Reviews />
      <Portfolio />
      <Process />
      <Testimonials style={tweaks.testimonialStyle} />
      <Enquiry />
      <Footer onBook={openBooking} />

      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
      {tweaksOpen && (
        <TweaksPanel tweaks={tweaks} setTweak={setTweak} onClose={() => setTweaksOpen(false)} />
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
