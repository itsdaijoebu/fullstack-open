import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function CountryInfo({ country }) {
  const [temp, setTemp] = useState('')
  const [wind, setWind] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')

  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]
  const weatherKey = import.meta.env.VITE_WEATHER_KEY
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`
  useEffect(() => {
    axios
    .get(weatherUrl)
    .then(res => {
      console.log(res.data.main)
      setTemp(res.data.main.temp)
      setWind(res.data.wind.speed)
      setWeatherIcon(`https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`)
    })
  }, [])
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area} km2</p>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt="flag" width="100" />
      <h2>Weather in {country.capital}</h2>
      <p>temperature {temp} Celcius</p>
      <img src={weatherIcon} alt="" />
      <p>wind {wind} m/s</p>
    </div>
  );
}

function Countries({ countries }) {
  const showInfo = ({country}) => {
    const id=`${country.cca3}-info`
    document.getElementById(id).hidden = !document.getElementById(id).hidden;
  };

  if (countries.length > 10) {
    return (
      <section>
        <p>Too many matches, specify another filter</p>
      </section>
    );
  } else if (countries.length > 1) {
    return (
      <section>
        {countries.map((country) => (
          <div key={country.cca3}>
            <p>
              {country.name.common}{" "}
              <button onClick={() => showInfo({country})}>show</button>
            </p>
            <div id={`${country.cca3}-info`} hidden>
              <CountryInfo country={country}/>
            </div>
          </div>
        ))}
      </section>
    );
  } else if (countries.length === 1) {
    return (
      <section>
        <CountryInfo country={countries[0]} />
      </section>
    );
  }
}

function App() {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const filterCountries = (e) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <>
      <label htmlFor="find-countries">find countries</label>
      <input type="text" id="find-countries" onChange={filterCountries} />
      <Countries countries={filteredCountries} />
    </>
  );
}

export default App;
