const TESTIMONIALS = [
  {
    quote: "Joanne is an exceptional stylist with a very intuitive understanding of form, proportion and presence. She approaches styling with a quiet confidence. She never overworks a look. She lets the pieces speak, and elevates them subtly. Working with Joanne is always a calm and collaborative process.",
    name: 'Sinead Roberts',
    context: 'The Costumeroom',
    img: 'On set · editorial',
    imgSrc: 'images/jo-portrait.jpg',
    imgPos: 'center 25%',
  },
  {
    quote: "Joanne is one of the most incredible stylists I've ever worked with. She has an exceptional sense of style and a remarkable eye for detail. What truly sets her apart is the care and attention she gives each client. She's an absolute gem.",
    name: 'Kerrie Ward',
    context: 'Head Designer · Folkster',
    img: 'Campaign · Dusty Rose',
    imgSrc: 'images/bridesmaids-dusty-rose-1.jpg',
    imgPos: 'center 30%',
  },
  {
    quote: "Jo has an innate sense of style. It is who she is. Styling a client, merchandising the floor, or even her personal style, the result is always effortless. Jo exudes warmth and kindness. Every client styling session felt personal and special.",
    name: 'Sorcha Gillett',
    context: 'CEO · The White & Gold',
    img: 'In store · styling session',
    imgSrc: 'images/service-bridal.jpg',
    imgPos: 'center 25%',
  },
];

const Testimonials = ({ style }) => (
  <section className="section section-bone" id="testimonials">
    <div className="section-head">
      <div className="eyebrow">07 · In their words</div>
      <h2>Designers, editors, CEOs. <em>In their own words.</em></h2>
    </div>

    {style === 'editorial' && (
      <div className="testimonials-stack">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="t-editorial">
            <div className="t-mark">"</div>
            <div className="t-quote">{t.quote}</div>
            <div className="t-attr">{t.name} · {t.context}</div>
          </div>
        ))}
      </div>
    )}

    {style === 'ticker' && (
      <div>
        <div className="t-ticker-wrap">
          <div className="t-ticker-row">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <React.Fragment key={i}>
                <span>"{t.quote.split('.')[0]}."</span>
                <span className="star">✦</span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="t-ticker-attrs">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="attr-cell">
              <div className="attr-name">{t.name}</div>
              <div className="attr-meta">{t.context}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {(!style || style === 'quote-card') && (
      <div className="testimonials-stack">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="t-card">
            <div className="t-img"><Placeholder label={t.img} src={t.imgSrc} pos={t.imgPos} /></div>
            <div>
              <p className="t-quote">"{t.quote}"</p>
              <div className="t-attr"><span className="bar" />{t.name} · {t.context}</div>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);
window.Testimonials = Testimonials;
