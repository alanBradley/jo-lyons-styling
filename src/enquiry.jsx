const Enquiry = () => {
  const [form, setForm] = React.useState({
    name: '', email: '', service: '', date: '', location: '', message: '', referrer: '',
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Needed';
    if (!form.email.trim()) e.email = 'Needed';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Check email';
    if (!form.service) e.service = 'Pick one';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'A few words please';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const SERVICE_LABELS = {
    bridal: 'Bridal styling',
    bridesmaids: 'Bridesmaids / bridal party',
    editorial: 'Editorial / campaign',
    occasion: 'Occasion / MOB',
    personal: 'Personal styling',
    other: 'Something else',
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Build a natural WhatsApp message from the form fields
    const lines = [];
    lines.push(`Hi Jo, my name is ${form.name}.`);
    lines.push('');
    if (form.service) lines.push(`I\'m enquiring about: ${SERVICE_LABELS[form.service] || form.service}`);
    if (form.date) lines.push(`Date: ${form.date}`);
    if (form.location) lines.push(`Location: ${form.location}`);
    if (form.message) { lines.push(''); lines.push(form.message); }
    if (form.referrer) { lines.push(''); lines.push(`Found you via: ${form.referrer}`); }
    lines.push('');
    lines.push(`Best, ${form.name.split(' ')[0]}`);

    openWhatsApp(lines.join('\n'));
    setSubmitted(true);
  };

  return (
    <section className="section section-deep" id="enquire">
      <div className="enquiry">
        <div className="enquiry-left">
          <div className="eyebrow" style={{ marginBottom: 24 }}>07 · Let's begin</div>
          <h2>Tell me what you're <em>dressing for.</em></h2>
          <p>I read every enquiry myself. I reply within 48 hours. There's no obligation. Just a conversation to see if we're a fit.</p>
          <div className="enquiry-promises">
            <div className="enquiry-promise"><span className="dash" /><span>I respond personally, within 48 hours.</span></div>
            <div className="enquiry-promise"><span className="dash" /><span>Consultations are free. Paid work begins only if we both want to.</span></div>
            <div className="enquiry-promise"><span className="dash" /><span>Everything we discuss stays between us.</span></div>
          </div>
        </div>

        {submitted ? (
          <div className="enquiry-success">
            <div className="mono-tag" style={{ marginBottom: 18 }}>Message received</div>
            <h3>Thank you, <em>{form.name.split(' ')[0] || 'friend'}.</em></h3>
            <p>Your note is with me. I'll reply personally within 48 hours. Usually much sooner. No need to do anything in the meantime.</p>
            <div className="mono-tag">Jo</div>
          </div>
        ) : (
          <form className="form" onSubmit={submit} noValidate>
            <div className={`field ${errors.name ? 'has-error' : ''}`}>
              <label>Your name</label>
              <input type="text" value={form.name} onChange={set('name')} placeholder="Aoife Ruiz" />
              {errors.name && <div className="err">{errors.name}</div>}
            </div>
            <div className={`field ${errors.email ? 'has-error' : ''}`}>
              <label>Email</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="you@domain.com" />
              {errors.email && <div className="err">{errors.email}</div>}
            </div>
            <div className={`field ${errors.service ? 'has-error' : ''}`}>
              <label>What are you dressing for?</label>
              <select value={form.service} onChange={set('service')}>
                <option value="">Select</option>
                <option value="bridal">Bridal styling</option>
                <option value="bridesmaids">Bridesmaids / bridal party</option>
                <option value="editorial">Editorial / campaign</option>
                <option value="occasion">Occasion / MOB</option>
                <option value="personal">Personal styling</option>
                <option value="other">Something else</option>
              </select>
              {errors.service && <div className="err">{errors.service}</div>}
            </div>
            <div className="field">
              <label>Date (if relevant)</label>
              <input type="text" value={form.date} onChange={set('date')} placeholder="e.g. 14 June 2026" />
            </div>
            <div className="field full">
              <label>Where are you?</label>
              <input type="text" value={form.location} onChange={set('location')} placeholder="Málaga / London / New York / elsewhere" />
            </div>
            <div className={`field full ${errors.message ? 'has-error' : ''}`}>
              <label>A little more</label>
              <textarea value={form.message} onChange={set('message')}
                        placeholder="Tell me about the occasion, the wardrobe, the feeling. As much or as little as you like." />
              {errors.message && <div className="err">{errors.message}</div>}
            </div>
            <div className="field full">
              <label>How did you find me? <span style={{ textTransform: 'none', letterSpacing: 0, opacity: 0.6 }}>(optional)</span></label>
              <input type="text" value={form.referrer} onChange={set('referrer')} placeholder="Referral · Instagram · press" />
            </div>
            <div className="form-footer">
              <div className="disclaimer">
                By sending this, you agree to Jo replying from her personal email. Nothing else. No list. No newsletter.
              </div>
              <button type="submit" className="form-submit">
                Send enquiry <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
window.Enquiry = Enquiry;
