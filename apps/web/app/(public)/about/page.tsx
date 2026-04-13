import type { Metadata } from 'next'
import { StaffSection } from '@/components/about/StaffSection'

export const metadata: Metadata = {
  title: 'About — Nails by Su',
  description: 'The story, values, and policies behind Nails by Su.',
}

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100dvh', background: '#14161f' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 160, paddingBottom: 96, paddingLeft: 48, paddingRight: 48, background: '#0e1019', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/joylynne.png" alt="" aria-hidden style={{
          position: 'absolute', right: 0, top: 0, height: '100%', width: '32%',
          objectFit: 'cover', objectPosition: 'center top', opacity: 0.1, filter: 'saturate(0.5)',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', position: 'relative', zIndex: 1 }}>
          <div>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(200,185,170,0.4)', marginBottom: 20 }}>Our story</p>
            <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(3.5rem,8vw,7rem)', color: '#f4efe8', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
              About<br />
              <span style={{ color: '#e05070', fontStyle: 'italic' }}>Nails by Su</span>
            </h1>
          </div>
          <div>
            <p style={{ fontSize: 15, color: 'rgba(210,196,182,0.62)', lineHeight: 1.85, maxWidth: '44ch', marginBottom: 20 }}>
              Nails by Su was founded on a simple conviction: nail care should feel like art, not a chore. Every client who sits in this chair deserves craftsmanship, warmth, and a result that genuinely surprises them.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(210,196,182,0.62)', lineHeight: 1.85, maxWidth: '44ch' }}>
              Located in the heart of Montreal, the studio is a quiet, intentional space where quality takes its time — and that time is always worth it.
            </p>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

      {/* ── Full story ────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 48px', background: '#14161f' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(200,185,170,0.4)', marginBottom: 20 }}>
              How it started
            </p>
            <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#f4efe8', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 32 }}>
              A decade of craft,<br />one chair at a time.
            </h2>
            <div style={{ width: 32, height: 2, background: '#e05070', borderRadius: 9999, marginBottom: 40 }} />
            <p style={{ fontSize: 14, color: 'rgba(210,196,182,0.58)', lineHeight: 1.9, maxWidth: '46ch', marginBottom: 20 }}>
              Su began her journey into nail artistry over ten years ago, training under master nail technicians in both Montreal and Paris. What started as a passion for colour and precision quickly became a calling — a way to help people feel extraordinary in their own skin, one set of nails at a time.
            </p>
            <p style={{ fontSize: 14, color: 'rgba(210,196,182,0.58)', lineHeight: 1.9, maxWidth: '46ch', marginBottom: 20 }}>
              After years working in high-end salons across the city, she opened her own private studio in 2019 — a deliberate, intimate space that could hold the standard she had always worked toward. No assembly-line appointments. No rush. Every client from the first consultation to the final coat gets her undivided attention.
            </p>
            <p style={{ fontSize: 14, color: 'rgba(210,196,182,0.58)', lineHeight: 1.9, maxWidth: '46ch' }}>
              The name is simple because the work should be the statement: Nails by Su. Nothing more needs to be said.
            </p>
          </div>

          {/* Side image mosaic */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { src: '/nails-alice.png',      rows: '1 / 3' },
              { src: '/nails-bambi.png',       rows: '1 / 2' },
              { src: '/nails-lacebow.jpg',     rows: '2 / 3' },
            ].map(({ src, rows }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" aria-hidden style={{
                width: '100%', aspectRatio: rows === '1 / 3' ? '3/4' : '1/1',
                objectFit: 'cover', borderRadius: 4,
                gridRow: rows,
                filter: 'saturate(1.05)',
              }} />
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 48px', background: '#0e1019' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(200,185,170,0.4)', marginBottom: 16 }}>
            What we stand for
          </p>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#f4efe8', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 48 }}>
            Our pillars
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
            {[
              {
                title: 'Precision',
                body: 'Every line, curve, and detail is executed with jeweler-grade focus. Nothing leaves this studio until it meets the standard.',
                img: '/svc-french.png',
              },
              {
                title: 'Quality',
                body: 'We use only premium, long-wearing products that protect the natural nail while delivering a finish that outlasts the competition.',
                img: '/svc-structured.png',
              },
              {
                title: 'Care',
                body: 'This is a relationship, not a transaction. Your comfort, your preferences, and your time are always respected and remembered.',
                img: '/svc-art2.png',
              },
            ].map(({ title, body, img }) => (
              <div key={title} style={{ background: '#1e2132', padding: 40, position: 'relative', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" aria-hidden style={{
                  position: 'absolute', bottom: -20, right: -20,
                  width: 100, height: 130, objectFit: 'cover',
                  borderRadius: 8, opacity: 0.08, filter: 'saturate(0)',
                  pointerEvents: 'none',
                }} />
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#e05070', marginBottom: 16 }}>{title}</p>
                <p style={{ fontSize: 14, color: 'rgba(210,196,182,0.6)', lineHeight: 1.85, maxWidth: '32ch' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

      {/* ── Philosophy ────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 48px', background: '#14161f' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <div>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(200,185,170,0.4)', marginBottom: 20 }}>
              The approach
            </p>
            <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#f4efe8', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Every appointment starts with a conversation.
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(210,196,182,0.58)', lineHeight: 1.9, maxWidth: '46ch', marginBottom: 20 }}>
              Before a single product is opened, Su takes the time to understand what you're looking for — your lifestyle, your nail health, the occasion, and even your mood that day. Great nail art begins with great listening.
            </p>
            <p style={{ fontSize: 14, color: 'rgba(210,196,182,0.58)', lineHeight: 1.9, maxWidth: '46ch' }}>
              Whether you arrive with a saved reference or a blank canvas, she will guide you through every choice — from shape and length to finish and colour — until the vision is clear and the result is something you'll genuinely love wearing.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(200,185,170,0.4)', marginBottom: 20 }}>
              What to expect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { step: '01', label: 'Consultation',    desc: 'A brief discussion of your goals, nail condition, and preferred style.' },
                { step: '02', label: 'Preparation',     desc: 'Nail health is assessed. Shaping, cuticle care, and prep done properly.' },
                { step: '03', label: 'Application',     desc: 'Product applied with precision — no rushing, no shortcuts.' },
                { step: '04', label: 'Art & Finishing', desc: 'Details, accents, and hand-painted elements added to spec.' },
                { step: '05', label: 'Review',          desc: 'You approve every nail before you leave. No surprises.' },
              ].map(({ step, label, desc }) => (
                <div key={step} style={{ display: 'flex', gap: 24, padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: 11, color: '#e05070', letterSpacing: '0.1em', flexShrink: 0, marginTop: 2 }}>{step}</span>
                  <div>
                    <p style={{ fontSize: 13, color: '#f4efe8', marginBottom: 4, fontWeight: 500 }}>{label}</p>
                    <p style={{ fontSize: 13, color: 'rgba(210,196,182,0.5)', lineHeight: 1.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

      {/* ── Privacy & Policies ────────────────────────────────────────────── */}
      <section style={{ padding: '96px 48px', background: '#0e1019' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(200,185,170,0.4)', marginBottom: 16 }}>
            Policies &amp; privacy
          </p>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem,3.5vw,3rem)', color: '#f4efe8', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 56 }}>
            How we treat your trust
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            {[
              {
                icon: '◎',
                title: 'Your data, your terms',
                body: 'We collect only what is necessary to manage your appointment — your name, contact, and booking history. This information is never sold, never shared with third parties, and never used for any purpose beyond delivering your service. You may request deletion of your data at any time by emailing us directly.',
              },
              {
                icon: '◎',
                title: 'Photography & gallery',
                body: 'We occasionally photograph finished sets for our portfolio and social media. We will always ask for your explicit permission before taking or posting any image. If you prefer no photography, simply say so — your preference is respected without question or pressure.',
              },
              {
                icon: '◎',
                title: 'Cancellations',
                body: 'We ask for at least 48 hours notice if you need to cancel or reschedule. Cancellations made with less than 24 hours notice, or no-shows, may incur a fee of 30% of the service value. We understand life happens — contact us as early as possible and we will always do our best to accommodate.',
              },
              {
                icon: '◎',
                title: 'Deposits & payments',
                body: 'A deposit of 20% is required at the time of booking to secure your appointment. This deposit is applied directly to your total service cost. We accept credit/debit card, Interac e-Transfer, and cash. The deposit is non-refundable for late cancellations as described above.',
              },
              {
                icon: '◎',
                title: 'Health & safety',
                body: 'Your nail health is our priority. We use hospital-grade sanitization between every client and refuse to work over damaged or infected nails — for your protection, not convenience. If we identify a concern during your appointment, we will always be transparent and refer you to a professional if needed.',
              },
              {
                icon: '◎',
                title: 'Satisfaction guarantee',
                body: 'If something doesn\'t look right within 72 hours of your appointment — a lift, a chip, or anything that shouldn\'t happen — contact us and we will fix it at no charge. We stand behind our work completely. Your satisfaction is not optional; it is the standard.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: 18, color: '#e05070', marginBottom: 12 }}>{icon}</p>
                <p style={{ fontSize: 13, color: '#f4efe8', fontWeight: 500, marginBottom: 12, letterSpacing: '0.01em' }}>{title}</p>
                <p style={{ fontSize: 13, color: 'rgba(210,196,182,0.55)', lineHeight: 1.85, maxWidth: '44ch' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────────────────── */}
      <StaffSection />

    </div>
  )
}
