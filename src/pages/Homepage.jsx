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
} from "@ionic/react";
import "./Homepage.css";
import { ellipsisVerticalOutline } from "ionicons/icons";
import { useState } from "react";
import axios from "axios";
const Home = () => {
  const [city, updateCity] = useState("");
  const [data, setData] = useState("");
  const [datamain, setDataMain] = useState("");
  const [datawindsspeed, setDataWinds] = useState();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e9de0e9781e9560a9cd34cad42cf5942`;
  const searchLocation = () => {
    axios.get(url).then((response) => {
      console.log(response.data);
      console.log(response.data.main);
      console.log(response.data.wind.speed);
      console.log(response.data.weather[0].description);
      setData(response.data);
      setDataMain(response.data.main);
      setDataWinds(response.data.wind.speed);
    });
    updateCity("");
  };
  console.log(data);
  console.log(datamain);
  console.log(datawindsspeed);
  const router = useIonRouter();
  const Settings = () => {
    router.push("/Settingspage");
  };
  return (
    <IonPage>
      <IonContent className="home-main-content">
        <IonGrid className="home-main-grid">
          <IonRow className="dotted-icon-row">
            <IonIcon
              icon={ellipsisVerticalOutline}
              className="dotted-icon"
              size="large"
              color="lightwhite"
              onClick={Settings}
            />
          </IonRow>
          <IonRow className="header-row">
            <IonCol>
              <IonInput
                className="search-input"
                value={city}
                onIonChange={(e) => updateCity(e.detail.value)}
                placeholder="Enter City"
              />
            </IonCol>
            <IonCol className="button-col">
              <IonButton
                className="search-button"
                color="lightwhite"
                onClick={searchLocation}
              >
                Search
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="temperature-row">
            {datamain && (
              <IonLabel className="temperature-label">
                {`${Math.floor(datamain.temp - 273)}°C`}
              </IonLabel>
            )}
          </IonRow>
          <IonRow className="weather-description-row">
            {data && (
              <IonLabel className="weather-description-label">
                {data.weather[0].description}
              </IonLabel>
            )}
          </IonRow>
          <IonRow className="city-name-row">
            {data && (
              <IonLabel className="city-name-label"> {data.name} </IonLabel>
            )}
          </IonRow>
          <IonRow className="cards-row">
            <IonCard className="humidity-card">
              <IonRow className="weather-humidity-row">
                {datamain && (
                  <IonLabel className="weather-humidity-label">
                    {`${datamain.humidity}%`}
                  </IonLabel>
                )}
                {datamain && (
                  <IonText className="humidity-text"> Humidity </IonText>
                )}
              </IonRow>
            </IonCard>
            <IonCard className="wind-speed-card">
              <IonRow className="wind-speed-row">
                {datawindsspeed && (
                  <IonLabel className="wind-speed-label">
                    {`${datawindsspeed}m/s`}
                  </IonLabel>
                )}
                {datawindsspeed && (
                  <IonText className="Winds-text"> Winds</IonText>
                )}
              </IonRow>
            </IonCard>
            <IonCard className="feels-like-card">
              <IonRow className="feels-like-row">
                {datamain && (
                  <IonLabel className="feels-like-label">
                    {`${Math.floor(datamain.feels_like - 273)}°c`}
                  </IonLabel>
                )}
                {datamain && (
                  <IonText className="feels-like-text"> Feels Like </IonText>
                )}
              </IonRow>
            </IonCard>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Home;
