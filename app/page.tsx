import type { Metadata } from 'next';
import Hero from '@/components/Hero';

export const metadata: Metadata = {
  title: 'ZLATA JPEG | Body Aesthetics Photography',
  description: 'Experience timeless elegance. We specialize in capturing the essence of luxury through our lens.',
};

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Hero />

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
