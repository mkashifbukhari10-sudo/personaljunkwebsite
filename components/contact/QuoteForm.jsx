'use client';

import { useId, useState } from 'react';
import { c, mono } from '@/lib/theme';
/** `areaNames` comes from the server page via the content layer. */
const TIMES = ['Today, as soon as possible', 'Today, afternoon', 'Tomorrow, morning', 'Tomorrow, afternoon', 'This week', 'Weekend'];

const fieldLabel = { fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.body };
const lineField = { border: 'none', borderBottom: '2px solid rgba(16,23,38,0.2)', background: 'transparent', padding: '12px 2px', fontSize: 17, color: c.ink, minHeight: 44, fontFamily: 'inherit' };

/**
 * Quote request panel. Client-only so the page can stay a server component.
 *
 * Submitting posts to /api/quote, which stores the request in Payload as a
 * Pickup request, and the customer is thanked in place.
 *
 * This button used to open WhatsApp with the details prefilled. It no longer
 * does, which means the save is now the only channel behind it, so a failure
 * has to be shown rather than logged quietly: there is no hand-off left to
 * carry the lead if the request does not land. The WhatsApp and phone buttons
 * beside the form still cover anyone who would rather use them.
 */
export default function QuoteForm({ areaNames }) {
  const AREAS = [...areaNames, 'Other'];
  const [form, setForm] = useState({ name: '', phone: '', area: '', items: '', time: '' });
  // Honeypot. Hidden from real users, so anything in it came from a bot.
  const [company, setCompany] = useState('');
  const [note, setNote] = useState('');
  const [isError, setIsError] = useState(false);
  const [sending, setSending] = useState(false);
  const noteId = useId();

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (sending) return;
    if (!form.name || !form.phone) {
      setIsError(true);
      setNote('Add your name and phone number so we can reply.');
      return;
    }
    setIsError(false);
    setSending(true);
    setNote('Sending your request...');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, company })
      });
      if (!res.ok) throw new Error('Request failed with status ' + res.status);
      setIsError(false);
      setNote('Thank you. Your pickup request is in, and we will get back to you urgently.');
      // Cleared so a second click cannot resend the same request by accident.
      setForm({ name: '', phone: '', area: '', items: '', time: '' });
    } catch {
      setIsError(true);
      setNote('That did not send. Please try again, or reach us on WhatsApp or by phone.');
    } finally {
      setSending(false);
    }
  };

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

        {/*
          Honeypot. Off-screen rather than display:none, which some bots skip,
          and removed from the tab order and the accessibility tree so nobody
          using a keyboard or a screen reader ever reaches it. A filled value
          means a bot, and /api/quote discards the submission.
        */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
        />
      </div>

      <button type="submit" className="jk-btn-primary" disabled={sending} style={{ marginTop: 28, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: c.bronze, color: c.ink, border: 'none', padding: '22px 24px', fontSize: 15, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: sending ? 'progress' : 'pointer', opacity: sending ? 0.7 : 1 }}>
        Book the pickup <span style={{ fontFamily: mono }}>&#8594;</span>
      </button>

      <div id={noteId} role="status" aria-live="polite" style={{ marginTop: 16, fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.6, color: isError ? '#B4460A' : c.sageDeep, minHeight: 18 }}>{note}</div>
    </form>
  );
}
