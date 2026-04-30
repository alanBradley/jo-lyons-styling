/* ============================================================
   Jo Lyons — GDPR Cookie Consent (EU Regulation compliant)
   Consent Mode v2 compatible — analytics denied by default
   ============================================================ */

const { useState, useEffect, useRef } = React;

const STORAGE_KEY = 'jo_cookie_consent_v1';

// ── Helpers ──────────────────────────────────────────────────
function loadConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function persistConsent(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString()
    }));
  } catch (e) {
    // Storage unavailable (private browsing, quota exceeded) — UI still updates
  }
}

function applyGtagConsent(prefs) {
  if (typeof gtag !== 'function') return;
  gtag('consent', 'update', {
    analytics_storage:    prefs.analytics  ? 'granted' : 'denied',
    ad_storage:           prefs.marketing  ? 'granted' : 'denied',
    ad_user_data:         prefs.marketing  ? 'granted' : 'denied',
    ad_personalization:   prefs.marketing  ? 'granted' : 'denied',
  });
}

// ── Toggle switch ─────────────────────────────────────────────
function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: 40,
        height: 22,
        borderRadius: 11,
        background: disabled ? '#B8AD97' : checked ? '#1C1A17' : '#C9BFA9',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 200ms ease',
        flexShrink: 0,
        padding: 0,
      }}
    >
      <span style={{
        position: 'absolute',
        left: checked ? 20 : 2,
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: '#F1EADD',
        transition: 'left 200ms ease',
        boxShadow: '0 1px 3px rgba(28,26,23,0.25)',
      }} />
    </button>
  );
}

// ── Category row ─────────────────────────────────────────────
function CategoryRow({ label, description, checked, onChange, always }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16,
      padding: '14px 0',
      borderBottom: '1px solid rgba(28,26,23,0.1)',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: '#1C1A17',
          marginBottom: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          {label}
          {always && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#6B6459',
              background: '#E6DCCA',
              padding: '2px 6px',
            }}>
              Always on
            </span>
          )}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: '#6B6459',
          lineHeight: 1.5,
        }}>
          {description}
        </div>
      </div>
      <Toggle checked={always || checked} onChange={onChange} disabled={always} />
    </div>
  );
}

// ── Main banner ───────────────────────────────────────────────
function CookieBanner({ initial, onSave, currentConsent }) {
  // When re-opening from icon, go straight to manage view with current values pre-loaded
  const [managing, setManaging] = useState(!initial);
  const [prefs, setPrefs] = useState({
    analytics: currentConsent?.analytics ?? false,
    marketing: currentConsent?.marketing ?? false,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slight delay for graceful entrance
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  function commit(p) {
    const full = { necessary: true, analytics: !!p.analytics, marketing: !!p.marketing };
    persistConsent(full);
    try { applyGtagConsent(full); } catch(e) {}
    onSave(full); // always fires — UI closes regardless of storage/gtag errors
  }

  const acceptAll  = () => commit({ analytics: true,  marketing: true  });
  const rejectAll  = () => commit({ analytics: false, marketing: false });
  const savePrefs  = () => commit(prefs);

  const overlay = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(28,26,23,0.35)',
    zIndex: 9000,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    opacity: visible ? 1 : 0,
    transition: 'opacity 400ms ease',
    pointerEvents: visible ? 'auto' : 'none',
  };

  const panel = {
    width: '100%',
    maxWidth: 680,
    background: '#F1EADD',
    borderTop: '1px solid rgba(28,26,23,0.15)',
    padding: managing ? '28px 32px 32px' : '24px 32px',
    transform: visible ? 'translateY(0)' : 'translateY(40px)',
    transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
    maxHeight: '90vh',
    overflowY: 'auto',
  };

  return (
    <div style={overlay} role="dialog" aria-modal="true" aria-label="Cookie preferences">
      <div style={panel}>

        {/* Header */}
        <div style={{ marginBottom: managing ? 6 : 16 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#6B6459',
            marginBottom: 6,
          }}>
            Cookie Preferences
          </div>
          <div style={{
            fontFamily: "'Fraunces', serif",
            fontSize: managing ? 22 : 20,
            fontWeight: 400,
            color: '#1C1A17',
            lineHeight: 1.1,
            marginBottom: 10,
          }}>
            {managing ? 'Manage your preferences' : 'We value your privacy'}
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: '#3A3630',
            lineHeight: 1.6,
            maxWidth: 560,
          }}>
            {managing
              ? 'Choose which cookies you\'d like to allow. Necessary cookies keep the site working. All other categories are optional.'
              : 'We use cookies to understand how visitors use our site and to improve your experience. You can choose what you\'re comfortable with — or accept all to help us improve.'}
          </p>
        </div>

        {/* Manage panel */}
        {managing && (
          <div style={{ marginTop: 4, marginBottom: 20 }}>
            <CategoryRow
              label="Necessary"
              description="Essential for the website to function — session handling, security, and accessibility preferences."
              always
            />
            <CategoryRow
              label="Analytics"
              description="Helps us understand which pages are most useful, so we can improve the site. We use Google Analytics with anonymised IP addresses."
              checked={prefs.analytics}
              onChange={v => setPrefs(p => ({ ...p, analytics: v }))}
            />
            <CategoryRow
              label="Marketing"
              description="Allows us to show you relevant content and measure the effectiveness of any advertising campaigns."
              checked={prefs.marketing}
              onChange={v => setPrefs(p => ({ ...p, marketing: v }))}
            />

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11.5,
              color: '#6B6459',
              lineHeight: 1.55,
              marginTop: 16,
            }}>
              For more information, read our{' '}
              <a href="/privacy-policy" style={{ color: '#1C1A17', textDecoration: 'underline' }}>
                Privacy Policy
              </a>
              . You can change your preferences at any time by clicking the cookie icon at the bottom left of the page.
            </p>
          </div>
        )}

        {/* Actions */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          alignItems: 'center',
          justifyContent: managing ? 'flex-end' : 'space-between',
          marginTop: managing ? 0 : 8,
        }}>

          {!managing && (
            <button
              onClick={() => setManaging(true)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12.5,
                color: '#6B6459',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 0',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              Manage preferences
            </button>
          )}

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {managing ? (
              <>
                <button
                  onClick={() => setManaging(false)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#6B6459',
                    background: 'none',
                    border: '1px solid rgba(28,26,23,0.2)',
                    cursor: 'pointer',
                    padding: '10px 20px',
                    transition: 'all 150ms ease',
                  }}
                >
                  Back
                </button>
                <button
                  onClick={savePrefs}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#F1EADD',
                    background: '#1C1A17',
                    border: '1px solid #1C1A17',
                    cursor: 'pointer',
                    padding: '10px 24px',
                    transition: 'all 150ms ease',
                  }}
                >
                  Save my preferences
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={rejectAll}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#3A3630',
                    background: 'none',
                    border: '1px solid rgba(28,26,23,0.25)',
                    cursor: 'pointer',
                    padding: '10px 22px',
                    transition: 'all 150ms ease',
                  }}
                >
                  Reject optional
                </button>
                <button
                  onClick={acceptAll}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#F1EADD',
                    background: '#D94A5E',
                    border: '1px solid #D94A5E',
                    cursor: 'pointer',
                    padding: '10px 24px',
                    transition: 'all 150ms ease',
                  }}
                >
                  Accept all
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Cookie icon (bottom-left, post-consent) ───────────────────
function CookieIcon({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Cookie preferences"
      aria-label="Manage cookie preferences"
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 8999,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: hovered ? '#1C1A17' : '#F1EADD',
        border: '1px solid rgba(28,26,23,0.22)',
        boxShadow: hovered
          ? '0 4px 20px rgba(28,26,23,0.25)'
          : '0 2px 10px rgba(28,26,23,0.12)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 200ms ease',
        padding: 0,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" fill={hovered ? '#F1EADD' : '#1C1A17'} opacity="0.08"/>
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
          fill={hovered ? '#F1EADD' : '#1C1A17'}
          opacity="0.12"
        />
        {/* Cookie shape */}
        <ellipse cx="12" cy="12" rx="8.5" ry="8.5" fill={hovered ? '#F1EADD' : '#3A3630'} opacity="0.85"/>
        <circle cx="8.5"  cy="9.5"  r="1.2" fill={hovered ? '#3A3630' : '#F1EADD'} />
        <circle cx="13.5" cy="8"    r="1"   fill={hovered ? '#3A3630' : '#F1EADD'} />
        <circle cx="15"   cy="13"   r="1.2" fill={hovered ? '#3A3630' : '#F1EADD'} />
        <circle cx="10"   cy="14.5" r="1"   fill={hovered ? '#3A3630' : '#F1EADD'} />
        <circle cx="12"   cy="11"   r="0.7" fill={hovered ? '#3A3630' : '#F1EADD'} />
      </svg>
    </button>
  );
}

// ── Root manager ──────────────────────────────────────────────
function GdprManager() {
  const [consent, setConsent] = useState(() => loadConsent());
  const [showPanel, setShowPanel] = useState(false);

  // Apply saved consent on mount
  useEffect(() => {
    if (consent) applyGtagConsent(consent);
  }, []);

  const handleSave = (prefs) => {
    setConsent(prefs);
    setShowPanel(false);
  };

  // First visit — show banner
  if (!consent) {
    return <CookieBanner initial onSave={handleSave} />;
  }

  // Re-managing preferences — pass current consent so toggles show correct state
  if (showPanel) {
    return <CookieBanner onSave={handleSave} currentConsent={consent} />;
  }

  // Consented — show icon only
  return <CookieIcon onClick={() => setShowPanel(true)} />;
}

// ── Mount ─────────────────────────────────────────────────────
const gdprMount = document.getElementById('gdpr-root');
if (gdprMount) {
  ReactDOM.createRoot(gdprMount).render(<GdprManager />);
}
