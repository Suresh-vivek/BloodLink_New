import React from "react";
import Map from "../components/Map";
import Problems from "../components/Problems";
import Solution from "../components/Solution";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-main">
      <div className="map">
        <Map />
      </div>
      <div>
        <Problems />
      </div>
      <div>
        <Solution />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
