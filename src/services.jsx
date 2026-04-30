const SERVICES = [
  {
    num: '01',
    title: 'Bridal',
    italic: 'Styling',
    img: 'Bride · evening',
    imgSrc: 'images/bride-candlelit.jpg',
    imgPos: 'center 25%',
    body: "The dress, the shoes, the shape of the day. I work with brides from first appointment to the final morning. Sourcing. Fitting. No second guessing. By the time you're in the car, you don't have to think about a thing.",
    list: ['Dress sourcing & fittings', 'Second looks & going away', 'Accessories, shoes, cover ups', 'Day of attendance (optional)'],
    price: 'TBC',
    tag: 'Specialist',
    waMsg: "Hi Jo, I'm interested in your Bridal Styling service. I'd love to find out more and see if we'd be a good fit.",
  },
  {
    num: '02',
    title: 'Bridesmaids',
    italic: '& Bridal Party',
    img: 'Bridesmaids · mixed silhouettes',
    imgSrc: 'images/bridesmaids-dusty-rose-2.jpg',
    imgPos: 'center 25%',
    body: "Every shape, every shade, every opinion in one group chat. Sorted. I style the whole party so the photographs read as a single idea. Every woman feels like herself.",
    list: ['Mixed silhouettes', 'Coordinated across sizes & shapes', 'MOB, MOG & flower girls', 'Group fittings in studio or online'],
    price: 'TBC',
    tag: 'Specialist',
    waMsg: "Hi Jo, I'm interested in Bridesmaids & Bridal Party styling. I'd love to find out more and chat through what we need.",
  },
  {
    num: '03',
    title: 'Editorial &',
    italic: 'Occasion',
    img: 'Editorial · on set',
    imgSrc: 'images/service-occasion.jpg',
    imgPos: 'center 20%',
    body: "Shoots, lookbooks, campaigns. And the occasions in between. A calm, collaborative hand on set. A specialist eye off it.",
    list: ['Editorial & campaign styling', 'Lookbooks & designer shoots', 'Occasion & MOB styling', 'Personal styling by referral'],
    price: 'TBC',
    waMsg: "Hi Jo, I'm interested in your Editorial & Occasion styling. I'd love to find out more about working together.",
  },
];

const Services = () => (
  <section className="section section-deep" id="services">
    <div className="section-head">
      <div className="eyebrow">02 · Ways to work together</div>
      <h2>For brides, parties, and anyone <em>who wants to feel seen, styled, and completely themselves.</em></h2>
    </div>
    <div className="services-grid">
      {SERVICES.map((s) => (
        <div key={s.num} className="service-card">
          <div className="svc-num">{s.num} / 03</div>
          <div className="svc-img"><Placeholder label={s.img} src={s.imgSrc} pos={s.imgPos} />{s.tag && <span className="svc-tag">{s.tag}</span>}</div>
          <h3>{s.title} <em>{s.italic}</em></h3>
          <p className="svc-body">{s.body}</p>
          <ul className="svc-list">{s.list.map((l) => <li key={l}>{l}</li>)}</ul>
          <div className="svc-price"><span>{s.price}</span><span>→</span></div>
          <a className="svc-link" href="#enquire" onClick={(e) => { e.preventDefault(); openWhatsApp(s.waMsg); }}>
            Learn more <span>→</span>
          </a>
        </div>
      ))}
    </div>
  </section>
);
window.Services = Services;
