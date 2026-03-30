# Just Eat Web Application

A web application built with  as part of the **Just Eat Takeaway Early Careers - Software Developer** interview process. It allows users to search for restaurants based on UK postcodes and displays four data points pulled from the Just Eat Takeaway API.

---

## Features

- **Responsive Build** - Suitable for web and mobile browsers
- **Search by Postcode** – Enter a UK postcode to find restaurants in that area
- **Restaurant Details** – Each result displays the restaurant's name, cuisines, rating, and address
- **API Integration** – Data is retrieved from the Just Eat Takeaway API via a Vite proxy
- **Result Limit** – Only the first 10 restaurants from the API response are shown
- **Tag & Search Filtering** – Filter restaurants by cuisine, deals, or name using a search input and quick filter buttons
- **Sorting** – Sort results by closest distance or highest rating
- **Map View** – Toggle between list view and a map view of restaurant locations, powered by Leaflet (OpenStreetMap)

---

## Tech Stack

- [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
- [Leaflet](https://leafletjs.com/) / [React Leaflet](https://react-leaflet.js.org/)

---

## Installation

### Prerequisites

Ensure the following are installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes bundled with Node.js)

You can verify your installations by running:
```bash
node -v
npm -v
```

### Steps

1. **Clone the repository**
```bash
   git clone https://github.com/wardy-t/just-eat-assignment.git
   cd just-eat-assignment
```

   > If `package.json` is not in the root folder, navigate into the correct subfolder first.

2. **Install dependencies**
```bash
   npm install
```

3. **Start the development server**
```bash
   npm run dev
```

4. **Open the app**

   Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Improvements/Next Steps

- **Integrate Docker** - Easier collaboration
- **Create user models, database, JWT authentication** - Allows storage of user data and preferences
- 
