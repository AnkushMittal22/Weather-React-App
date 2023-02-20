import hotBg from "./assets/hot1.jpg";
import coldBg from "./assets/cold1.jpg";
import Description from "./components/Description";
import { useState, useEffect } from "react";
import getFormatedWeather from "./weatherService";
function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("Delhi");
  const [bg, setBg] = useState(hotBg);
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormatedWeather(city, units);
      setWeather(data);
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) {
        setBg(coldBg);
      } else {
        setBg(hotBg);
      }
    };

    // dynamicChange

    fetchWeatherData();
  }, [units, city]);

  const HandlelUnitsClick = (e) => {
    const button = e.currentTarget;

    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "*F" : "*C";
    setUnits(isCelsius ? "metric" : "imperial");
  };
  const cityTempHandler = (event) => {
    if (event.keyCode === 13) {
      setCity(event.currentTarget.value);
      event.currentTarget.blur();
    }
  };
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="overLay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={cityTempHandler}
                type="text"
                name="city"
                placeholder="Enter City...."
              />
              <button onClick={(e) => HandlelUnitsClick(e)}>°f</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather icon" />
                <h3>{weather.description}</h3>
              </div>

              <div className="temperature"></div>
              <h1>{`${weather.temp.toFixed()} °${
                units === "metric" ? "C" : "F"
              }`}</h1>
            </div>
            <div>
              <Description weather={weather} units={units} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
