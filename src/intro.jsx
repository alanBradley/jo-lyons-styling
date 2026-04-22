const Intro = () => (
  <section className="section" id="about">
    <div className="section-head">
      <div className="eyebrow">01 · A note from Jo</div>
      <h2>Styling is <em>service.</em> It always has been.</h2>
    </div>
    <div className="intro-grid">
      <div>
        <div className="intro-body">
          <p>I've spent the last decade styling brides, bridal parties, and the shoots that dress them. On set with designers and photographers. In fitting rooms with the women who'll actually wear the clothes.</p>
          <p>My work isn't about transformation. It's about reading the person, the dress, and the day. Making all three agree. Quietly, without fuss, so you don't have to think about any of it on the morning.</p>
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
