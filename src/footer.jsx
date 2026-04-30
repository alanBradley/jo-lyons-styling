const Footer = ({ onBook }) => (
  <footer className="footer">
    <div className="footer-top">
      <div>
        <img src="images/logo-light.png" alt="Jo Lyons Styling" className="footer-brand-logo" />
        <p className="footer-tag">A stylist with a specialist eye for bridal and bridesmaids. Editorial, occasion, and personal by referral. Based in Nerja, southern Spain. Available internationally.</p>
      </div>
      <div className="footer-col">
        <div className="col-title">Services</div>
        <a href="#services">Bridal styling</a>
        <a href="#services">Bridesmaids & party</a>
        <a href="#services">Editorial & campaign</a>
        <a href="#services">Occasion</a>
      </div>
      <div className="footer-col">
        <div className="col-title">Studio</div>
        <p>By appointment</p>
        <p>Nerja · Málaga · Spain</p>
        <a href="mailto:hello@jolyons.com">hello@jolyons.com</a>
        <a href="tel:+34000000000">Available worldwide</a>
      </div>
      <div className="footer-col">
        <div className="col-title">Elsewhere</div>
        <a href="#">Instagram</a>
        <a href="#">Pinterest</a>
        <a href="#">Press & features</a>
        <button onClick={onBook} style={{ padding: '5px 0', fontSize: 14, color: 'rgba(241,234,221,0.85)', display: 'block' }}>
          Book a consultation →
        </button>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 Jo Lyons Styling</span>
      <span>Bridal · Bridesmaids · Editorial</span>
    </div>
  </footer>
);
window.Footer = Footer;
