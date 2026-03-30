import bannerImage from '../assets/just-eat-banner.jpeg'

function Banner({ compact = false }) {
  return (
    <div className={`banner ${compact ? 'banner-compact' : ''}`}>
      <img src={bannerImage} alt="Just Eat banner" />
    </div>
  )
}

export default Banner