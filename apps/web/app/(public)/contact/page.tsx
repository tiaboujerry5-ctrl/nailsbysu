import { ContactForm } from '@/components/contact/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Nails by Su.',
}

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100dvh', background: '#14161f', paddingTop: 160, paddingBottom: 96, paddingLeft: 48, paddingRight: 48 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        {/* Left */}
        <div>
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(200,185,170,0.4)', marginBottom: 16 }}>
            Say hello
          </p>
          <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(3rem,6vw,6rem)', color: '#f0ebe3', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            Contact
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { label: 'Email', content: <a href="mailto:hello@nailsbysu.com" style={{ color: 'rgba(200,185,170,0.6)', textDecoration: 'none', fontSize: 14 }}>hello@nailsbysu.com</a> },
              { label: 'Phone', content: <a href="tel:+15143927841" style={{ color: 'rgba(200,185,170,0.6)', textDecoration: 'none', fontSize: 14 }}>+1 (514) 392-7841</a> },
              { label: 'Hours', content: <p style={{ color: 'rgba(200,185,170,0.6)', fontSize: 14, margin: 0, lineHeight: 1.7 }}>Tue – Sat, 10:00 – 19:00<br />Sun &amp; Mon, closed</p> },
              { label: 'Location', content: <p style={{ color: 'rgba(200,185,170,0.6)', fontSize: 14, margin: 0 }}>Montreal, QC, Canada</p> },
            ].map(({ label, content }) => (
              <div key={label}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(200,185,170,0.35)', marginBottom: 6 }}>{label}</p>
                {content}
              </div>
            ))}
          </div>
          {/* Nail image decoration */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svc-french.png" alt="" aria-hidden style={{
            marginTop: 48, width: 120, height: 150, objectFit: 'cover',
            borderRadius: 8, opacity: 0.25, filter: 'saturate(0.5)',
          }} />
        </div>

        {/* Right — form */}
        <div style={{ background: '#1e2132', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', padding: 40 }}>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
