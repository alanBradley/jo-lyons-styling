const ArrowRight = ({ size = 14 }) => (
  <svg className="btn-arrow" width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="square" />
  </svg>
);
const ArrowDown = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M7 1v12M2 8l5 5 5-5" strokeLinecap="square" />
  </svg>
);
const Plus = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M7 1v12M1 7h12" />
  </svg>
);
Object.assign(window, { ArrowRight, ArrowDown, Plus });
