import React from "react";

export default function Searchweather() {
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div class="card text-bg-dark text-center border-0">
              <img
                src="https://source.unsplash.com/random/600x900/?nature,water"
                class="card-img"
                alt="..."
              ></img>
              <div class="card-img-overlay">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p class="card-text">
                  <small>Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
