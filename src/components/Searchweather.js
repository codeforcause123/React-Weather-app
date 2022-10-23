import React, { useState,useEffect, useRef } from "react";

export default function Searchweather() {
  const [search,setSearch] =  useState("Delhi");
  const [data,setData] =  useState([]);
  const [input,setInput] = useState("");
  let componentMounted = useRef(true);
  useEffect(() => {
    const fetchWeather = async ()=>{
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}`);
      if(componentMounted){
        setData(await res.json());
        console.log(data);
      }
      return ()=>{
        componentMounted.current.value=false;
      }
    }
    fetchWeather();
  },[data,search])

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);
  // console.log(process.env.REACT_APP_API_KEY);
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-bg-dark text-center border-0">
              <img
                src="https://source.unsplash.com/random/600x900/?nature,water"
                className="card-img"
                alt="..."
              ></img>
              <div className="card-img-overlay">
                <form>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                    ></input>
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h3 className="card-title">{data.name}</h3>
                  <p className="card-text lead">
                    Sunday,October 23,2022
                  </p>
                  <hr />
                  <i className="fas fa-cloud fa-4x"></i>
                  <h1 className="fw-bolder mb-5">{temp}</h1>
                  <p className="lead fw-bolder mb-0">Cloudy</p>
                  <p className="lead">{temp_min}&deg;C | {temp_max}&deg;C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
