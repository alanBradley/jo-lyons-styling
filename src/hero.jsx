const Hero = ({ layout, onBook }) => {
  if (layout === 'split') return <HeroSplit onBook={onBook} />;
  if (layout === 'type-led') return <HeroType onBook={onBook} />;
  return <HeroFull onBook={onBook} />;
};

const HeroFull = ({ onBook }) => (
  <header id="top" className="hero hero-full">
    <div className="hero-bg">
      <Placeholder label="Hero · bridal party · styled by Jo" src="images/bridesmaids-olive.jpg" pos="center 30%" />
    </div>
    <div className="hero-top">
      <div className="hero-locator">
        <span className="bar" />
        <span>Jo Lyons · Stylist · Nerja, Spain</span>
      </div>
      <div className="hero-meta" style={{ textAlign: 'right' }}>
        <span>Est. 2018</span>
        <span>Bridal · Bridesmaids · Editorial</span>
      </div>
    </div>
    <div className="hero-bottom">
      <h1>
        Your stylist for brides,<br/>
        bridesmaids, and the <em>women</em><br/>
        who ensure your day is perfectly supported<br/>
        and beautifully styled.
      </h1>
      <div>
        <p className="hero-lede">
          I'm Jo. I style bridal parties, editorial shoots, occasion looks, and also offer a personal shopping service.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-ghost-light" onClick={() => openWhatsApp('Hi Jo, I\'d like to book a styling consultation. Could we arrange a time to chat?')}>
            Book a consultation <ArrowRight />
          </button>
          <a className="btn btn-ghost-light" href="#work" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
            See recent work
          </a>
        </div>
      </div>
    </div>
  </header>
);

const HeroSplit = ({ onBook }) => (
  <header id="top" className="hero hero-split">
    <div className="hero-text">
      <div className="eyebrow" style={{ marginBottom: 28 }}>Jo Lyons · Stylist · Bridal & Bridesmaids</div>
      <h1>
        Styling for the <em>day</em> she'll remember.
      </h1>
      <p className="hero-lede">
        I work with brides and their parties. From first fitting to the last photograph. A calm, intuitive eye for form, proportion, and the quiet confidence of wearing the right thing.
      </p>
      <div className="hero-ctas">
        <button className="btn btn-primary" onClick={() => openWhatsApp('Hi Jo, I\'d like to book a styling consultation. Could we arrange a time to chat?')}>
          Book a consultation <ArrowRight />
        </button>
        <a className="btn btn-ghost" href="#work" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}>
          Recent work
        </a>
      </div>
    </div>
    <div className="hero-img">
      <Placeholder label="Bridesmaids · styled by Jo" src="images/bridesmaids-dusty-rose-1.jpg" pos="center 30%" />
    </div>
  </header>
);

const HeroType = ({ onBook }) => (
  <header id="top" className="hero hero-type">
    <div>
      <div className="eyebrow" style={{ marginBottom: 40 }}>Jo Lyons · Stylist · Est. 2018</div>
      <h1>
        A stylist,<br/>
        with a specialist<br/>
        eye for <em>brides.</em>
      </h1>
    </div>
    <div className="hero-strip">
      <Placeholder label="Bridal · editorial" src="images/bridesmaids-olive.jpg" pos="center 30%" />
      <Placeholder label="Bridesmaids · chiffon" src="images/bridesmaids-dusty-rose-1.jpg" pos="center 30%" />
      <Placeholder label="MOB · occasion" src="images/bridesmaids-lavender.jpg" pos="center 30%" />
    </div>
    <div className="hero-footer">
      <p className="hero-lede">
        Bridal, bridesmaids, editorial and occasion. By appointment. In studio, on location, or on set.
      </p>
      <div>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Services</div>
        <div style={{ fontSize: 15 }}>Bridal · Bridesmaids · Editorial · Personal</div>
      </div>
      <div className="hero-ctas" style={{ margin: 0, justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={() => openWhatsApp('Hi Jo, I\'d like to book a styling consultation. Could we arrange a time to chat?')}>
          Book a consultation <ArrowRight />
        </button>
      </div>
    </div>
  </header>
);
window.Hero = Hero;
