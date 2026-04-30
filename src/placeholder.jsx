// Placeholder image component. Labeled shaded block, or real image if `src` provided
const Placeholder = ({ label, variant = '', className = '', style = {}, src, alt, pos }) => {
  const cls = ['ph', variant, src ? 'ph-img' : '', className].filter(Boolean).join(' ');
  if (src) {
    return (
      <div className={cls} style={style}>
        <img src={src} alt={alt || label || ''} loading="lazy" decoding="async" style={{ objectPosition: pos || 'center center' }} />
      </div>
    );
  }
  return <div className={cls} data-label={label} style={style} />;
};
window.Placeholder = Placeholder;
