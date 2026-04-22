import bannerImage from '../assets/just-eat-banner.jpeg'
import logoImage from '../assets/just-eat-logo.jpeg'

/* =========================
   BANNER COMPONENT
   =========================
   Reusable branding component with two variants:
   - hero (landing page banner)
   - logo (compact header version)
========================= */

function Banner({ variant = 'hero' }) {

  // Compact logo version (used on results page)
  if (variant === 'logo') {
    return (
      <div className="banner banner-logo">
        <img
          src={logoImage}
          alt="Just Eat logo"
          className="banner-logo-image"
        />
      </div>
    )
  }

  // Default hero banner (used on landing page)
  return (
    <div className="banner banner-hero">
      <img
        src={bannerImage}
        alt="Just Eat banner"
        className="banner-hero-image"
      />
    </div>
  )
}

export default Banner