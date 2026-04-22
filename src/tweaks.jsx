const TWEAK_CONFIG = [
  {
    key: 'heroLayout', label: 'Hero layout',
    opts: [
      { id: 'full-bleed', label: 'Full-bleed' },
      { id: 'split', label: 'Split' },
      { id: 'type-led', label: 'Type-led' },
    ],
  },
  {
    key: 'typePairing', label: 'Typography',
    opts: [
      { id: 'fraunces-inter', label: 'Fraunces / Inter' },
      { id: 'instrument-work', label: 'Instrument / Work Sans' },
      { id: 'cormorant-inter', label: 'Cormorant / Inter' },
    ],
  },
  {
    key: 'accent', label: 'Accent',
    opts: [
      { id: 'rose', label: 'Rose (brand)', swatch: '#D94A5E' },
      { id: 'olive', label: 'Olive', swatch: '#3C4A2F' },
      { id: 'terracotta', label: 'Terracotta', swatch: '#A85436' },
      { id: 'ink', label: 'Ink blue', swatch: '#1F2A44' },
      { id: 'plum', label: 'Plum', swatch: '#5B2C3A' },
      { id: 'ochre', label: 'Ochre', swatch: '#8A6A3E' },
    ],
  },
  {
    key: 'imageryMode', label: 'Imagery weight',
    opts: [
      { id: 'imagery-led', label: 'Imagery-led' },
      { id: 'type-led', label: 'Type-led (hero only)' },
    ],
  },
  {
    key: 'testimonialStyle', label: 'Testimonials',
    opts: [
      { id: 'quote-card', label: 'Quote cards' },
      { id: 'editorial', label: 'Editorial stack' },
      { id: 'ticker', label: 'Marquee' },
    ],
  },
];

const TweaksPanel = ({ tweaks, setTweak, onClose }) => (
  <div className="tweaks-panel">
    <div className="tweaks-head">
      <div className="title">Tweaks</div>
      <button className="tweaks-close" onClick={onClose} aria-label="Close">×</button>
    </div>
    <div className="tweaks-body">
      {TWEAK_CONFIG.map(g => (
        <div key={g.key} className="tweak-group">
          <div className="tweak-label">{g.label}</div>
          <div className="tweak-opts">
            {g.opts.map(o => (
              <button key={o.id}
                      className={`tweak-opt ${tweaks[g.key] === o.id ? 'active' : ''}`}
                      onClick={() => setTweak(g.key, o.id)}>
                {o.swatch && <span className="tweak-swatch" style={{ background: o.swatch }} />}
                {o.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
window.TweaksPanel = TweaksPanel;
