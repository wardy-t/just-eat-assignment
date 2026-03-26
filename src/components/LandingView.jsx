import bannerImage from '../assets/just-eat-banner.jpeg'
import cardImage from '../assets/just-eat-card.jpeg'
import PostcodeForm from './PostcodeForm'

function LandingView({ postcode, setPostcode, handleSearch, loading }) {
  return (
    <main className="landing-page">
      <section className="hero">
        <img
          src={bannerImage}
          alt="Just Eat banner"
          className="hero-banner"
        />
      </section>

      <section className="landing-content">
        <div className="landing-card">
          <img
            src={cardImage}
            alt="Just Eat food"
            className="landing-card-image"
          />

          <h1 className="landing-title">
            Order restaurant food to your door
          </h1>

          <p className="landing-subtitle">
            Enter your postcode to find local restaurant options.
          </p>

          <PostcodeForm
            postcode={postcode}
            onPostcodeChange={setPostcode}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>
      </section>
    </main>
  )
}

export default LandingView