import React, { useState, useEffect} from "react";

export default function Searchweather() {
  const [search, setSearch] = useState("Delhi");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;
  console.log(process.env.REACT_APP_API_KEY);
  console.log(componentMounted.current);
  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}`
      );
      if (componentMounted) {
        setData(await res.json());
        console.log(data);
      }
      return () => {
        componentMounted=false;
      };
    };
    fetchWeather();
  }, [search]);

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);
  
  let emoji = null;
  if(typeof data.main !="undefined"){
    if(data.weather[0].main === "Clouds"){
      emoji="fa-cloud"
    }else if(data.weather[0].main === "Thunderstorm"){
      emoji="fa-bolt"
    }else if(data.weather[0].main === "Drizzle"){
      emoji="fa-cloud-rain"
    }else if(data.weather[0].main ==="Rain"){
      emoji="fa-cloud-shower-heavy"
    }else if(data.weather[0].main === "Snow"){
      emoji="fa-snow-flake"
    }else{
      emoji="fa-smog"
    }
  }else{
    return(
      <div>Loading...</div>
    )
  }
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default",{month:'long'});
  let day = d.toLocaleString("default",{weekday:'long'});
  let time = d.toLocaleString([],{
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit'
  });

  const handleSubmit = (event) =>{
    event.preventDefault();
    setSearch(input)
  }
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-bg-dark text-center border-0">
              <img
                src={`https://source.unsplash.com/random/600x900/?${data.weather[0].main}`}
                className="card-img"
                alt="..."
              ></img>
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onInput={(e)=>setInput(e.target.value)}
                      required
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
                    {day},{month} {date},{year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <i className={`fas ${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder mb-5">{temp}</h1>
                  <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                  <p className="lead">
                    {temp_min}&deg;C | {temp_max}&deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
