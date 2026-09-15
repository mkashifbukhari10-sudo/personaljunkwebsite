'use client';

import { useId, useState } from 'react';
import { c, mono, contact } from '@/lib/theme';
/** `areaNames` comes from the server page via the content layer. */
const TIMES = ['Today, as soon as possible', 'Today, afternoon', 'Tomorrow, morning', 'Tomorrow, afternoon', 'This week', 'Weekend'];

const fieldLabel = { fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.body };
const lineField = { border: 'none', borderBottom: '2px solid rgba(16,23,38,0.2)', background: 'transparent', padding: '12px 2px', fontSize: 17, color: c.ink, minHeight: 44, fontFamily: 'inherit' };

/** Quote request panel that hands off to WhatsApp. Client-only so the page can stay a server component. */
export default function QuoteForm({ areaNames }) {
  const AREAS = [...areaNames, 'Other'];
  const [form, setForm] = useState({ name: '', phone: '', area: '', items: '', time: '' });
  const [note, setNote] = useState('');
  const noteId = useId();

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    if (e) e.preventDefault();
    if (!form.name || !form.phone) {
      setNote('Add your name and phone number so we can reply.');
      return;
    }
    const msg = [
      'Pickup request — Junk Services Dubai',
      'Name: ' + form.name,
      'Phone: ' + form.phone,
      'Area: ' + (form.area || 'not specified'),
      'Items: ' + (form.items || 'not specified'),
      'Preferred time: ' + (form.time || 'any available slot')
    ].join('\n');
    window.open(contact.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    setNote('Opening WhatsApp with your details — attach your photo there and send.');
  };

  const isError = note.startsWith('Add');

  return (
    <form onSubmit={submit} noValidate aria-describedby={noteId} style={{ background: c.panel, border: '1px solid ' + c.line, padding: 'clamp(24px, 3vw, 40px)' }}>
      <h2 className="jk-h" style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.muted }}>Quote request</h2>

      <div style={{ marginTop: 24, display: 'grid', gap: 20 }}>
        <label style={{ display: 'grid', gap: 8 }}>
          <span style={fieldLabel}>Name</span>
          <input className="jk-field" type="text" name="name" autoComplete="name" required placeholder="Your name" value={form.name} onChange={set('name')} style={lineField} />
        </label>

        <label style={{ display: 'grid', gap: 8 }}>
          <span style={fieldLabel}>Phone number</span>
          <input className="jk-field" type="tel" name="phone" autoComplete="tel" inputMode="tel" required placeholder="+971 5X XXX XXXX" value={form.phone} onChange={set('phone')} style={lineField} />
        </label>

        <label style={{ display: 'grid', gap: 8 }}>
          <span style={fieldLabel}>Dubai area</span>
          <select className="jk-field" name="area" autoComplete="address-level2" value={form.area} onChange={set('area')} style={lineField}>
            <option value="">Select your community</option>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'grid', gap: 8 }}>
          <span style={fieldLabel}>What needs removing</span>
          <textarea className="jk-field" name="items" rows={3} placeholder="e.g. 3-seater sofa, mattress and 6 boxes, 2nd floor" value={form.items} onChange={set('items')} style={{ border: '1px solid rgba(16,23,38,0.2)', background: '#fff', padding: 14, fontSize: 16, color: c.ink, resize: 'vertical', fontFamily: 'inherit' }} />
        </label>

        <label style={{ display: 'grid', gap: 8 }}>
          <span style={fieldLabel}>Preferred pickup time</span>
          <select className="jk-field" name="time" value={form.time} onChange={set('time')} style={lineField}>
            <option value="">Any available slot</option>
            {TIMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'grid', gap: 8 }}>
          <span style={fieldLabel}>Photo (optional)</span>
          <input type="file" name="photo" accept="image/*" style={{ fontSize: 14, color: c.body, padding: '10px 0', minHeight: 44 }} />
        </label>
      </div>

      <button type="submit" className="jk-btn-primary" style={{ marginTop: 28, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: c.bronze, color: c.ink, border: 'none', padding: '22px 24px', fontSize: 15, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
        Get my quote <span style={{ fontFamily: mono }}>&#8594;</span>
      </button>

      <div id={noteId} role="status" aria-live="polite" style={{ marginTop: 16, fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.6, color: isError ? '#B4460A' : c.sageDeep, minHeight: 18 }}>{note}</div>
    </form>
  );
}
