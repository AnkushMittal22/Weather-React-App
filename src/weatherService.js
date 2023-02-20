const Api_key = "1129cb1c521d196c60f8a02e00f64e40";
const makeIconUrl = (iconId) =>
  `http://openweathermap.org/img/wn/${iconId}@2x.png`;
const getFormatedWeather = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];
  return {
    description,
    iconURL: makeIconUrl(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

export default getFormatedWeather;
