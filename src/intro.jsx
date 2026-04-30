const Intro = () => (
  <section className="section" id="about">
    <div className="section-head">
      <div className="eyebrow">01 · A note from Jo</div>
      <h2>Styling is <em>service.</em> It always has been.</h2>
    </div>
    <div className="intro-grid">
      <div>
        <div className="intro-body">
          <p>With a decade of experience, I've had the privilege of styling countless brides, their parties, and numerous shoots. From the collaborative energy on set with designers to the intimate moments in fitting rooms, my focus has always been on the women I dress.</p>
        </div>
        <div className="intro-sig">
          <div className="sig">Jo</div>
          <div className="meta">Stylist · Bridal & Bridesmaids</div>
        </div>
      </div>
      <div className="intro-portrait">
        <Placeholder label="Jo · on set" src="images/jo-studio.jpg" pos="center 25%" />
        <div className="intro-caption">
          <span>Fig. 01</span>
          <span>Jo, on floor styling</span>
        </div>
      </div>
    </div>
  </section>
);
window.Intro = Intro;
