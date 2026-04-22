const BOOKING_SERVICES = [
  { id: 'bridal',      title: 'Bridal',      italic: 'Styling',       meta: '60 min consult · free · studio or video', price: '€0 · consult' },
  { id: 'bridesmaids', title: 'Bridesmaids', italic: '& bridal party', meta: '60 min consult · studio or video',        price: '€0 · consult' },
  { id: 'editorial',   title: 'Editorial',   italic: '& campaign',     meta: 'Discovery call · 45 min · video',         price: '€0 · consult' },
];

const nextDates = () => {
  const out = [];
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const today = new Date();
  for (let i = 1; out.length < 8; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    const dow = d.getDay();
    if (dow === 0) continue;
    out.push({
      key: d.toISOString().slice(0,10),
      day: days[(dow + 6) % 7],
      num: d.getDate(),
      mon: months[d.getMonth()],
      disabled: dow === 6 && out.length % 3 === 0,
    });
  }
  return out;
};

const TIMES = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'];

const LOCATIONS = ['Nerja studio', 'Málaga', 'On location', 'Video call'];

const BookingModal = ({ onClose }) => {
  const [step, setStep] = React.useState(0);
  const [service, setService] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', email: '', notes: '' });
  const dates = React.useMemo(nextDates, []);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const canNext = [service, date && time, form.name && /^\S+@\S+\.\S+$/.test(form.email)][step];
  const steps = ['Service', 'Date & time', 'Your details', 'Confirmed'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-body">
          <div className="modal-head">
            <div className="eyebrow">Book a consultation</div>
            <h3>{step === 3 ? <span>You're <em>in.</em></span> : <span>Let's find a <em>time.</em></span>}</h3>
          </div>

          <div className="modal-steps">
            {steps.map((s, i) => (
              <div key={s} className={`modal-step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`} />
            ))}
          </div>

          {step === 0 && (
            <div>
              <div className="modal-step-label">Step 01 · Which service?</div>
              <div className="modal-options">
                {BOOKING_SERVICES.map(s => (
                  <button key={s.id}
                          className={`modal-opt ${service === s.id ? 'selected' : ''}`}
                          onClick={() => setService(s.id)}>
                    <div>
                      <div className="opt-title">{s.title} <em>{s.italic}</em></div>
                      <div className="opt-meta">{s.meta}</div>
                    </div>
                    <div className="opt-price">{s.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="modal-step-label">Step 02 · Pick a date</div>
              <div className="modal-dates">
                {dates.map(d => (
                  <button key={d.key} disabled={d.disabled}
                          className={`modal-date ${date === d.key ? 'selected' : ''}`}
                          onClick={() => setDate(d.key)}>
                    <div className="d-day">{d.day}</div>
                    <div className="d-num">{d.num}</div>
                    <div className="d-mon">{d.mon}</div>
                  </button>
                ))}
              </div>
              {date && (
                <>
                  <div className="modal-step-label" style={{ marginTop: 28 }}>And a time (CET)</div>
                  <div className="modal-times">
                    {TIMES.map((t, i) => (
                      <button key={t} disabled={i === 2}
                              className={`modal-time ${time === t ? 'selected' : ''}`}
                              onClick={() => setTime(t)}>{t}</button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="modal-step-label">Step 03 · A few details</div>
              <div className="form" style={{ border: '1px solid rgba(28,26,23,0.16)' }}>
                <div className="field">
                  <label>Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@domain.com" />
                </div>
                <div className="field full">
                  <label>Anything I should know? (optional)</label>
                  <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                            placeholder="Date of the event, the vibe, who's involved…" style={{ minHeight: 80 }} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: 16 }}>Consultation confirmed</div>
              <p style={{ fontFamily: 'var(--f-display)', fontSize: 28, lineHeight: 1.2, maxWidth: '30ch', margin: '0 auto 18px' }}>
                See you on <em style={{ color: 'var(--accent)' }}>{dates.find(d => d.key === date)?.day} {dates.find(d => d.key === date)?.num} {dates.find(d => d.key === date)?.mon}</em> at <em style={{ color: 'var(--accent)' }}>{time}</em>.
              </p>
              <p style={{ color: 'var(--ink-mute)', fontSize: 14, maxWidth: '40ch', margin: '0 auto' }}>
                A calendar invite is on its way to {form.email || 'your inbox'}. I'll send a short questionnaire 24 hours before we meet.
              </p>
            </div>
          )}

          <div className="modal-actions">
            {step > 0 && step < 3 ? (
              <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>← Back</button>
            ) : <span />}
            {step < 2 && (
              <button className="btn btn-primary" disabled={!canNext}
                      onClick={() => canNext && setStep(step + 1)}
                      style={{ opacity: canNext ? 1 : 0.4, cursor: canNext ? 'pointer' : 'not-allowed' }}>
                Continue <ArrowRight />
              </button>
            )}
            {step === 2 && (
              <button className="btn btn-primary" disabled={!canNext}
                      onClick={() => canNext && setStep(3)}
                      style={{ opacity: canNext ? 1 : 0.4, cursor: canNext ? 'pointer' : 'not-allowed' }}>
                Confirm booking <ArrowRight />
              </button>
            )}
            {step === 3 && (
              <button className="btn btn-primary" onClick={onClose}>Close</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
window.BookingModal = BookingModal;
