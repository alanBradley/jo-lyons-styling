const PORTFOLIO = [
  // Bridal/bridesmaid work leads
  { id: 1, cat: 'bridal', label: 'Bridal party · editorial', credit: 'Styling · Jo Lyons', size: 'p-big',
    src: 'images/bridesmaids-olive.jpg', pos: 'center 30%' },
  { id: 2, cat: 'bridal', label: 'Bridesmaids · Wildflower', credit: 'Styling · Jo Lyons', size: 'p-tall',
    src: 'images/bridesmaids-dusty-rose-1.jpg', pos: 'center 30%' },
  { id: 3, cat: 'bridal', label: 'Lavender · on location', credit: 'Styling · Jo Lyons', size: 'p-square',
    src: 'images/bridesmaids-lavender.jpg', pos: 'center 30%' },
  { id: 4, cat: 'bridal', label: 'Mixed silhouettes · chiffon', credit: 'Styling · Jo Lyons', size: 'p-wide',
    src: 'images/bridesmaids-dusty-rose-2.jpg', pos: 'center 30%' },
  { id: 5, cat: 'bridal', label: 'Bridal · soft knits', credit: 'Styling · Jo Lyons', size: 'p-portrait',
    src: 'images/portfolio/white-detail.jpg', pos: 'center 25%' },
  // Editorial
  { id: 6, cat: 'editorial', label: 'Ask My Gee · editorial', credit: 'Styling · Jo Lyons', size: 'p-med',
    src: 'images/portfolio/green-cape.jpg', pos: 'center 30%' },
  { id: 7, cat: 'editorial', label: 'Kiki Na Art · statement', credit: 'Styling · Jo Lyons', size: 'p-square',
    src: 'images/portfolio/editorial-turban.jpg', pos: 'center 25%' },
  { id: 8, cat: 'editorial', label: 'AW16 · knitwear', credit: 'Styling · Jo Lyons', size: 'p-med',
    src: 'images/portfolio/knit-halter.jpg', pos: 'center 20%' },
  { id: 9, cat: 'editorial', label: 'Billie Eilish · tour', credit: 'Styling · Jo Lyons', size: 'p-small',
    src: 'images/portfolio/billie-eilish-tour.jpg', pos: 'center 30%' },
  // Occasion / personal
  { id: 10, cat: 'occasion', label: 'Black tie · statement', credit: 'Styling · Jo Lyons', size: 'p-med',
    src: 'images/portfolio/portrait-earrings.jpg', pos: 'center 25%' },
  { id: 11, cat: 'occasion', label: 'Tailoring · Dublin', credit: 'Styling · Jo Lyons', size: 'p-wide',
    src: 'images/portfolio/blazer-tulle.jpg', pos: 'center 30%' },
  { id: 12, cat: 'occasion', label: 'Shearling · portrait', credit: 'Styling · Jo Lyons', size: 'p-square',
    src: 'images/portfolio/dublin-shearling.jpg', pos: 'center 20%' },
  // Editorial · The Costume Room series
  { id: 13, cat: 'editorial', label: 'The Costume Room · calm', credit: 'Styling · Jo Lyons', size: 'p-square',
    src: 'images/portfolio/costume-room-calm.jpg', pos: 'center 30%' },
  { id: 14, cat: 'editorial', label: 'The Costume Room · pair', credit: 'Styling · Jo Lyons', size: 'p-tall',
    src: 'images/portfolio/costume-room-pair.jpg', pos: 'center 25%' },
  { id: 15, cat: 'editorial', label: 'The Costume Room · ensemble', credit: 'Styling · Jo Lyons', size: 'p-med',
    src: 'images/portfolio/costume-room-four.jpg', pos: 'center 20%' },
  { id: 16, cat: 'editorial', label: 'The Costume Room · portrait', credit: 'Styling · Jo Lyons', size: 'p-portrait',
    src: 'images/portfolio/costume-room-portrait.jpg', pos: 'center 20%' },
];

const Portfolio = () => {
  const [filter, setFilter] = React.useState('all');
  const items = filter === 'all' ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === filter);
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'bridal', label: 'Bridal & Bridesmaids' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'occasion', label: 'Occasion' },
  ];
  return (
    <section className="section" id="work">
      <div className="portfolio-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>05 · Selected work</div>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 68px)', maxWidth: '22ch' }}>
            Styling that feels effortless on the day — <em style={{ color: 'var(--accent)' }}>and timeless after it.</em>
          </h2>
        </div>
        <div className="portfolio-filters">
          {filters.map(f => (
            <button key={f.id}
                    className={`portfolio-filter ${filter === f.id ? 'active' : ''}`}
                    onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="portfolio-grid">
        {items.map(it => (
          <div key={it.id} className={`portfolio-item ${it.size}`}>
            <Placeholder label={it.label} src={it.src} pos={it.pos} variant={it.id % 4 === 0 ? 'ph-dark' : ''} />
            <div className="p-caption">
              <span>{it.label}</span>
              {it.credit && <span className="p-caption-meta">{it.credit}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
window.Portfolio = Portfolio;
