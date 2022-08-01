import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonIcon,
  useIonRouter,
  IonCard,
  IonCol,
  IonLabel,
  IonButton,
  IonText,
  IonInput,
  IonTitle,
} from "@ionic/react";
import { DateTime } from "luxon";
import "./Homepage.css";
import { ellipsisVerticalOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
const API_KEY = "e7e847df4963667bf6f12f51c883214b";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const Home = () => {
  const [city, setCity] = useState();
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState();
  const [query, setQuery] = useState();
  const { setOneweekWeather } = UserAuth();
  const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    return fetch(url).then((res) => res.json());
  };
  const formatCurrentWeather = (data) => {
    const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed },
    } = data;
    const { main: details, description, icon } = weather[0];
    return {
      lat,
      lon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      name,
      dt,
      country,
      sunrise,
      sunset,
      details,
      description,
      icon,
      speed,
    };
  };
  const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(0, 8).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "ccc"),
        temp: d.temp.day,
        temp_max: d.temp.day,
        temp_min: d.temp.day,
        description: d.weather[0].description,
        icon: d.weather[0].icon,
      };
    });
    hourly = hourly.slice(1, 6).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
        temp: d.temp,
        icon: d.weather[0].icon,
      };
    });
    return { timezone, daily, hourly };
  };
  const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);
    const { lat, lon } = formattedCurrentWeather;
    const formattedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "minutely,alerts",
      units: searchParams.units,
    }).then(formatForecastWeather);
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  };
  const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' |'hh:mm a"
  ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
        setOneweekWeather(data);
        console.log(data);
      });
    };
    fetchWeather();
  }, [query, units]);
  const router = useIonRouter();
  const setQueryInfo = () => {
    try {
      let query = {
        q: `${city}`,
      };
      console.log(JSON.stringify(query));
      setQuery(query);
      setCity("");
    } catch (error) {
      console.log(error);
    }
  };
  const Settings = () => {
    router.push("/Settingspage");
  };
  const Oneweek = () => {
    router.push("/oneweektemp");
  };
  return (
    <IonPage>
      <IonContent className="home-main-content">
        <IonGrid className="home-main-grid">
          <IonRow className="homepage-first-row">
            <IonInput
              className="search-input"
              value={city}
              onIonChange={(e) => setCity(e.detail.value)}
              placeholder="Enter City"
            />
            <IonButton
              className="search-button"
              shape="round"
              color="fullwhite"
              onClick={(e) => setQueryInfo()}
            >
              Search
            </IonButton>
            <IonIcon
              icon={ellipsisVerticalOutline}
              className="dotted-icon"
              size="large"
              color="lightwhite"
              onClick={Settings}
            />
          </IonRow>
          <IonRow className="city-name-row">
            {weather && (
              <IonLabel className="city-name-label"> {weather.name} </IonLabel>
            )}
          </IonRow>
          <IonRow className="date-row">
            {weather && (
              <IonLabel className="date-label">
                {formatToLocalTime(weather.dt, weather.timezone)}
              </IonLabel>
            )}
          </IonRow>
          <IonRow className="temperature-row">
            {weather && (
              <IonLabel className="temperature-label">
                {`${weather.temp.toFixed()}°c`}
              </IonLabel>
            )}
          </IonRow>
          <IonRow className="weather-description-row">
            {weather && (
              <IonLabel className="weather-description-label">
                {weather.description}
              </IonLabel>
            )}
          </IonRow>
          <IonRow className="sunrise-sunset-row">
            <IonCol className="sunrise-col">
              {weather && (
                <IonLabel className="sunrise-label"> Sunrise : {formatToLocalTime(
                    weather.sunrise,
                    weather.timezone,
                    "hh:mm a"
                  )}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="sunset-col">
              {weather && (
                <IonLabel className="sunset-label"> Sunset : {formatToLocalTime(
                    weather.sunset,
                    weather.timezone,
                    "hh:mm a"
                  )}
                </IonLabel>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="hourly-temperature-row">
            <IonCol className="first-hour-temp-col">
              {weather && (
                <IonLabel className="first-hour-label">
                  {weather.hourly[0].title}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="second-hour-temp-col">
              {weather && (
                <IonLabel className="second-hour-label">
                  {weather.hourly[1].title}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="third-hour-temp-col">
              {weather && (
                <IonLabel className="third-hour-label">
                  {weather.hourly[2].title}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="fourth-hour-temp-col">
              {weather && (
                <IonLabel className="fourth-hour-label">
                  {weather.hourly[3].title}
                </IonLabel>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="first-hour-temp-text-col">
              {weather && (
                <IonText className="first-hour-temp">
                  {`${weather.hourly[0].temp.toFixed()}°c`}
                </IonText>
              )}
            </IonCol>
            <IonCol className="second-hour-temp-text-col">
              {weather && (
                <IonText className="second-hour-temp">
                  {`${weather.hourly[1].temp.toFixed()}°c`}
                </IonText>
              )}
            </IonCol>
            <IonCol className="third-hour-temp-text-col">
              {weather && (
                <IonText className="third-hour-temp">
                  {`${weather.hourly[2].temp.toFixed()}°c`}
                </IonText>
              )}
            </IonCol>
            <IonCol className="fourth-hour-temp-text-col">
              {weather && (
                <IonText className="fourth-hour-temp">
                  {`${weather.hourly[3].temp.toFixed()}°c`}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="today-temperature-row">
            <IonCol className="today-temp-label-col">
              {weather && (
                <IonLabel className="today-temp-label"> Today </IonLabel>
              )}
            </IonCol>
            <IonCol className="today-temp-text-col">
              {weather && (
                <IonText className="today-temp-text">
                  {" "}
                  {`${weather.temp.toFixed()}°c`} / {weather.description}{" "}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="tomorrow-temperature-row">
            <IonCol className="tomorrow-temp-label-col">
              {weather && (
                <IonLabel className="tomorrow-temp-label"> Tomorrow </IonLabel>
              )}
            </IonCol>
            <IonCol className="tomorrow-temp-text-col">
              {weather && (
                <IonText className="tomorrow-temp-text">
                  {" "}
                  {`${weather.daily[1].temp.toFixed()}°c`} /{" "}
                  {weather.daily[1].description}{" "}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="cards-row">
            <IonCol className="humidity-card-col">
              <IonCard className="humidity-card">
                <IonRow className="weather-humidity-row">
                  {weather && (
                    <IonLabel className="weather-humidity-label">
                      {`${weather.humidity}%`}
                    </IonLabel>
                  )}
                  {weather && (
                    <IonText className="humidity-text"> Humidity </IonText>
                  )}
                </IonRow>
              </IonCard>
            </IonCol>
            <IonCol className="wind-speed-card-col">
              <IonCard className="wind-speed-card">
                <IonRow className="wind-speed-row">
                  {weather && (
                    <IonLabel className="wind-speed-label">
                      {`${weather.speed}m/s`}
                    </IonLabel>
                  )}
                  {weather && <IonText className="Winds-text"> Winds</IonText>}
                </IonRow>
              </IonCard>
            </IonCol>
            <IonCol className="feels-like-card-col">
              <IonCard className="feels-like-card">
                <IonRow className="feels-like-row">
                  {weather && (
                    <IonLabel className="feels-like-label">
                      {`${weather.feels_like}°c`}
                    </IonLabel>
                  )}
                  {weather && (
                    <IonText className="feels-like-text"> Feels Like </IonText>
                  )}
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className="one-week-temp-card-row">
            <IonCard className="one-week-temp-card">
              <IonLabel className="one-week-temp-button" onClick={Oneweek}>
                {" "}
                One week forecast{" "}
              </IonLabel>
            </IonCard>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Home;
