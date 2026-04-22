const REVIEWS = [
  {
    stars: 5,
    quote: "From the first fitting, Jo made me feel like myself, only styled. She's strong on direction but so easy to talk to. Everything felt personal, never performed.",
    name: 'Sinead',
    meta: 'Wedding',
  },
  {
    stars: 5,
    quote: "Jo understood what I wanted without me having to explain it. Her styling is confident, the atmosphere soft. I felt comfortable, considered, and completely myself all day.",
    name: 'Kerry',
    meta: 'Wedding',
  },
  {
    stars: 5,
    quote: "Jo's styling eye is one of the strongest we've worked with. Warm, personal, and quietly decisive. Our brides always feel comfortable in her hands. An easy recommendation.",
    name: 'White and Gold Bridal',
    meta: 'Bridal boutique',
  },
];

const Reviews = () => (
  <section className="section" id="reviews">
    <div className="section-head">
      <div className="eyebrow">04 · From the brides</div>
      <h2>Quiet words, <em>after the day.</em></h2>
    </div>
    <div className="reviews-grid">
      {REVIEWS.map((r, i) => (
        <div key={i} className="review-card">
          <div className="review-stars" aria-label={`${r.stars} out of 5`}>
            {Array(r.stars).fill(0).map((_, j) => (
              <span key={j}>✦</span>
            ))}
          </div>
          <p className="review-quote">&ldquo;{r.quote}&rdquo;</p>
          <div className="review-attr">
            <div className="review-name">{r.name}</div>
            <div className="review-meta">{r.meta}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
window.Reviews = Reviews;
