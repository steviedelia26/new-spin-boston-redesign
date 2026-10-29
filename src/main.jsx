import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, Clock3, MapPin, Menu, Phone, WashingMachine, Wifi, X } from 'lucide-react';
import './styles.css';

const images = {
  storefront: '/images/new-spin-storefront.jpg',
  machines: '/images/new-spin-machines.jpg',
  lounge: '/images/new-spin-lounge.jpg',
};

const address = '100 Salem Street, Boston, MA 02113';
const phone = '+16175237746';
const directions = 'https://maps.google.com/?q=100+Salem+Street+Boston+MA+02113';

function BrandName() {
  return <a className="brand-name" href="#home" aria-label="A New Spin Laundry home">A New Spin <span>Laundry</span></a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropoffWeight, setDropoffWeight] = useState(10);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [notice, setNotice] = useState('');

  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Website question from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nReply to: ${form.email}`);
    window.location.href = `mailto:info@newspinboston.com?subject=${subject}&body=${body}`;
    setNotice('Your email app should open with your message ready to send.');
  };

  return <>
    <div className="hours-bar">
      <div className="hours-bar-inner">
        <span><Clock3 size={14}/> Open every day <b>7 am–11 pm</b><i>·</i> Last wash 9:30 pm</span>
        <a href={`tel:${phone}`}><Phone size={14}/> 617-523-7746</a>
      </div>
    </div>
    <header className="header">
      <div className="nav-wrap">
        <BrandName />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#amenities" onClick={closeMenu}>Amenities</a>
          <a href="#visit" onClick={closeMenu}>Visit</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-directions" href={directions} target="_blank" rel="noreferrer" onClick={closeMenu}>Directions <ArrowUpRight size={15}/></a>
        </nav>
      </div>
    </header>

    <main id="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">100 SALEM STREET <span> / </span> BOSTON’S NORTH END</p>
          <h1>A New Spin<br/>Laundry</h1>
          <p className="hero-description">Self-service washers and dryers, or drop off your laundry for wash, dry and fold.</p>
          <div className="hero-actions">
            <a className="button button-dark" href={directions} target="_blank" rel="noreferrer"><MapPin size={16}/> Get directions <ArrowUpRight size={15}/></a>
            <a className="text-action" href={`tel:${phone}`}><Phone size={15}/> Call the store</a>
          </div>
          <p className="hero-address">100 Salem Street <span>·</span> Between Bartlett Place and Cooper Street</p>
        </div>
        <figure className="hero-photo">
          <img src={images.storefront} alt="A New Spin Laundry storefront on Salem Street in Boston’s North End" fetchPriority="high"/>
          <figcaption><span>100 SALEM STREET</span><span>BOSTON, MASSACHUSETTS</span></figcaption>
        </figure>
      </section>

      <section className="quick-info" aria-label="Store information">
        <div><span>HOURS</span><strong>Daily, 7 am–11 pm</strong><small>Last wash at 9:30 pm</small></div>
        <div><span>LOCATION</span><strong>100 Salem Street</strong><small>Boston, MA 02113</small></div>
        <div><span>PHONE</span><strong><a href={`tel:${phone}`}>617-523-7746</a></strong><small><a href="mailto:info@newspinboston.com">info@newspinboston.com</a></small></div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-heading">
          <p className="eyebrow">SERVICES</p>
          <h2>Laundry services</h2>
          <p>Wash it yourself or drop it off for wash, dry and fold.</p>
        </div>
        <div className="service-grid">
          <article className="service-card">
            <div className="service-image"><img src={images.machines} alt="Washers and dryers inside A New Spin Laundry" loading="lazy"/></div>
            <div className="service-card-body">
              <div className="service-title"><WashingMachine size={21}/><h3>Self-service</h3></div>
              <p>High-capacity washers and dryers, with space to sort and fold.</p>
              <ul>
                <li>Washer capacities: 22, 30 and 60 lb</li>
                <li>Automated laundry card system</li>
                <li>Granite folding counters</li>
              </ul>
              <p className="payment-note">Laundry cards can be loaded with cash, debit or credit.</p>
            </div>
          </article>
          <article className="service-card dropoff-card">
            <div className="service-card-body">
              <div className="service-title"><h3>Wash, dry & fold</h3></div>
              <p>Drop off your laundry and pick it up clean and neatly folded.</p>
              <div className="price"><span>Drop-off service</span><strong>$1.50 <small>/ lb</small></strong></div>
              <div className="estimate-widget">
                <div className="estimate-heading"><label htmlFor="weight-estimate">Estimate a drop-off total</label><strong>{dropoffWeight} lb</strong></div>
                <input id="weight-estimate" className="weight-slider" type="range" min="10" max="50" step="1" value={dropoffWeight} onChange={event => setDropoffWeight(Number(event.target.value))} aria-describedby="estimate-note"/>
                <div className="estimate-endpoints"><span>10 lb minimum</span><span>50 lb estimate</span></div>
                <div className="estimate-total" aria-live="polite"><span>Estimated total</span><strong>${(dropoffWeight * 1.5).toFixed(2)}</strong></div>
                <small className="estimate-note" id="estimate-note">Estimate uses the listed $1.50/lb rate. Slider range is not a service limit; call to confirm current pricing.</small>
              </div>
              <a className="inline-link" href={`tel:${phone}`}>Call about drop-off <ArrowRight size={15}/></a>
            </div>
          </article>
        </div>
        <p className="source-note">Pricing and service details are based on information currently listed by A New Spin Laundry and may change. Please call the store to confirm.</p>
      </section>

      <section className="amenities" id="amenities">
        <div className="amenities-photo"><img src={images.lounge} alt="Customers seated inside A New Spin Laundry" loading="lazy"/><span>INSIDE A NEW SPIN LAUNDRY</span></div>
        <div className="amenities-content">
          <p className="eyebrow">AMENITIES</p>
          <h2>Inside the laundromat</h2>
          <p>New Spin is fully attended and has places to sit while you wait.</p>
          <ul className="amenity-list">
            <li><Wifi size={17}/><span>Free Wi-Fi</span></li>
            <li><span className="amenity-dot"></span><span>Open seating and deck areas</span></li>
            <li><span className="amenity-dot"></span><span>Widescreen TVs</span></li>
            <li><span className="amenity-dot"></span><span>Art gallery</span></li>
            <li><span className="amenity-dot"></span><span>Security and surveillance systems</span></li>
          </ul>
        </div>
      </section>

      <section className="visit section-pad" id="visit">
        <div className="visit-copy">
          <p className="eyebrow">LOCATION & HOURS</p>
          <h2>100 Salem Street<br/><span>Boston, MA 02113</span></h2>
          <p>In Boston’s North End, between Bartlett Place and Cooper Street.</p>
          <a className="button button-dark" href={directions} target="_blank" rel="noreferrer"><MapPin size={16}/> Open in Maps <ArrowUpRight size={15}/></a>
        </div>
        <div className="visit-details">
          <div className="visit-hours"><span>HOURS</span><strong>Monday–Sunday</strong><b>7 am–11 pm</b><small>Last wash at 9:30 pm</small></div>
          <div className="visit-contact"><span>CONTACT</span><a href={`tel:${phone}`}>617-523-7746</a><a href="mailto:info@newspinboston.com">info@newspinboston.com</a></div>
          <a className="directions-link" href={directions} target="_blank" rel="noreferrer">Directions <ArrowUpRight size={17}/></a>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-intro">
          <p className="eyebrow">CONTACT</p>
          <h2>Contact the store.</h2>
          <p>For service questions or current pricing, call or email A New Spin Laundry.</p>
          <a className="contact-phone" href={`tel:${phone}`}>617-523-7746 <ArrowUpRight size={16}/></a>
          <a className="contact-email" href="mailto:info@newspinboston.com">info@newspinboston.com</a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Your name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name"/></label>
          <label>Your email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label>
          <label>Message<textarea required rows="3" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="How can we help?"/></label>
          <div className="form-submit"><button className="button button-dark" type="submit">Open email <ArrowRight size={15}/></button><small>Your email app will open with your note ready.</small></div>
          {notice && <p className="notice" role="status">{notice}</p>}
        </form>
      </section>
    </main>

    <footer className="footer">
      <BrandName/>
      <span>100 Salem Street · Boston, MA 02113</span>
      <a href={`tel:${phone}`}>617-523-7746</a>
    </footer>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
