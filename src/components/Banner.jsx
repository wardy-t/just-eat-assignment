import bannerImage from '../assets/just-eat-banner.jpeg'
import logoImage from '../assets/just-eat-logo.jpeg'

function Banner({ variant = 'hero' }) {
  if (variant === 'logo') {
    return (
      <div className="banner banner-logo">
        <img src={logoImage} alt="Just Eat logo" className="banner-logo-image" />
      </div>
    )
  }

  return (
    <div className="banner banner-hero">
      <img src={bannerImage} alt="Just Eat banner" className="banner-hero-image" />
    </div>
  )
}

export default Banner