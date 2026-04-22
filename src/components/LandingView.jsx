import Banner from './Banner'
import cardImage from '../assets/just-eat-card.jpeg'
import PostcodeForm from './PostcodeForm'

/* =========================
   LANDING VIEW
   =========================
   Initial screen shown before a search is made.
   - Displays branding and introductory content
   - Provides postcode search entry point
   - Reuses PostcodeForm component
========================= */

function LandingView({ postcode, setPostcode, handleSearch, loading }) {
  return (
    <main className="landing-page">

      {/* Hero banner / branding */}
      <Banner variant="hero" />

      <section className="landing-content">
        <div className="landing-card">

          {/* Supporting image */}
          <img
            src={cardImage}
            alt="Just Eat food"
            className="landing-card-image"
          />

          {/* Headline and description */}
          <h1 className="landing-title">
            Order restaurant food to your door
          </h1>

          <p className="landing-subtitle">
            Enter your postcode to find local restaurant options.
          </p>

          {/* Reusable postcode search form */}
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