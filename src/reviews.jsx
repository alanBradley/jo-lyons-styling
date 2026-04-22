const REVIEWS = [
  {
    stars: 5,
    quote: "Jo understood the dress I was imagining before I'd fully described it. Not a single fuss on the morning — she was the calmest person in the room.",
    name: 'Louise O’D',
    meta: 'Wedding · Frigiliana · June 2025',
  },
  {
    stars: 5,
    quote: "We flew her in for the fittings and she stayed two days. My bridesmaids have never looked more like themselves. I'll be sending every friend her way.",
    name: "Éadaoin O'R.",
    meta: 'Wedding · Cortijo Bravo · September 2025',
  },
  {
    stars: 5,
    quote: "A quiet, thoughtful eye. Jo reworked a family dress my mother wore in 1982 and made it feel entirely mine. Worth every mile she travelled.",
    name: 'Isabella P.',
    meta: 'Wedding · Nerja · May 2024',
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
