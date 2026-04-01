import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ZLATA JPEG | Body Aesthetics Photography',
  description: 'Experience timeless elegance. We specialize in capturing the essence of luxury through our lens.',
};

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Abstract luxury background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(194, 153, 113, 0.08) 0%, var(--bg-color) 80%)',
          zIndex: -1
        }} />

        <div className="container" style={{ textAlign: 'center', zIndex: 10 }}>
          <div className="animate-fade-in">
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              background: 'linear-gradient(to right, var(--text-main), var(--accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Timeless <br /> Elegance
            </h1>
          </div>
          <p className="text-muted animate-fade-in stagger-1" style={{
            fontSize: '1.25rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto',
            fontWeight: 300
          }}>
            Guidance from enquiry to delivery by a female photographer. You don't need to know posing, you don't need to know your angles. All you need to do is show up.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in stagger-2">
            <Link href="/portfolio" className="btn-primary">
              Discover Portfolio
            </Link>
            <Link href="/booking" className="btn-secondary">
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container" style={{ padding: '6rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '2rem', textAlign: 'center' }}>
          <span style={{
            // color: 'var(--accent)' 
            background: 'linear-gradient(to right, var(--text-main), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'


          }}>Philosophy</span>
        </h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%' }}>
          {[
            {
              title: 'Personalized Direction',
              desc: 'From inquiry to final delivery, you are guided through every step—collaborative planning, expert posing direction, and continuous support tailored to your vision and comfort level.'
            },
            {
              title: 'Hand-Crafted Artistry',
              desc: 'Every image is personally edited without AI—meticulous attention to color harmony, light sculpting, and angles that reveal your most powerful self.'
            },
            {
              title: 'Safe, Confident Environment',
              desc: 'Whether it is your first shoot or your tenth, you will feel supported and empowered—especially when vulnerability meets the camera.'
            },
            {
              title: 'Collaborative Process',
              desc: 'Your shoot is designed together—we brainstorm concepts, refine details, and ensure every decision reflects your authentic story.'
            },
            {
              title: 'Exclusive Availability',
              desc: 'Limited monthly bookings ensure every client receives dedicated time, focus, and the meticulous quality your transformation deserves.'
            },
            {
              title: 'Timeless Legacy',
              desc: 'Walk away feeling empowered, confident, and surprised at how incredible you look—images that capture your strength and femininity in equal measure.'
            }].map((item, i) => (
              <div key={i} className="glass-panel hover-lift" style={{ padding: '3rem 2rem', textAlign: 'center', transition: 'transform 0.4s ease' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent)' }}>{item.title}</h3>
                <p className="text-muted">{item.desc}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
