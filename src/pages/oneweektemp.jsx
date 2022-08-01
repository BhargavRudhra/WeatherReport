import {
  IonContent,
  IonLabel,
  IonPage,
  IonRow,
  IonCol,
  IonIcon,
  useIonRouter,
  IonGrid,
  IonText,
} from "@ionic/react";
import { UserAuth } from "../context/AuthContext";
import { arrowBack } from "ionicons/icons";
import "./oneweektemp.css";
const OneweekTemp = () => {
  const { oneweekweather } = UserAuth();
  const router = useIonRouter();
  const Home = () => {
    router.push("/Homepage");
  };
  return (
    <IonPage>
      <IonContent className="oneweek-main-content">
        <IonRow className="oneweek-temp-header-row">
          <IonIcon
            className="one-week-temp-arrow-back-icon"
            icon={arrowBack}
            size="large"
            onClick={Home}
            color="fullwhite"
          />
          <IonLabel className="one-week-temp-forecast-label">
            {" "}
            One week forecast{" "}
          </IonLabel>
        </IonRow>
        <IonGrid className="one-week-temp-main-grid">
          <IonRow className="one-week-city-name-row">
            {oneweekweather && (
              <IonLabel className="one-week-city-name-label">
                {" "}
                {oneweekweather.name}{" "}
              </IonLabel>
            )}
          </IonRow>
          <IonRow className="one-week-today-temperature-row">
            <IonCol className="one-week-today-temp-label-col">
              {oneweekweather && (
                <IonLabel className="one-week-today-temp-label">
                  {" "}
                  Today{" "}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="one-week-today-temp-text-col">
              {oneweekweather && (
                <IonText className="one-week-today-temp-text">
                  {" "}
                  {`${oneweekweather.temp.toFixed()}°c`} /{" "}
                  {oneweekweather.description}{" "}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="one-week-tomorrow-temperature-row">
            <IonCol className="one-week-tomorrow-temp-label-col">
              {oneweekweather && (
                <IonLabel className="one-week-tomorrow-temp-label">
                  {" "}
                  Tomorrow{" "}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="one-week-tomorrow-temp-text-col">
              {oneweekweather && (
                <IonText className="one-week-tomorrow-temp-text">
                  {" "}
                  {`${oneweekweather.daily[1].temp.toFixed()}°c`} /{" "}
                  {oneweekweather.daily[1].description}{" "}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="one-week-third-day-temperature-row">
            <IonCol className="one-week-third-day-temp-label-col">
              {oneweekweather && (
                <IonLabel className="one-week-third-day-temp-label">
                  {" "}
                  {oneweekweather.daily[2].title}{" "}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="one-week-third-day-temp-text-col">
              {oneweekweather && (
                <IonText className="one-week-third-day-temp-text">
                  {" "}
                  {`${oneweekweather.daily[2].temp.toFixed()}°c`} /{" "}
                  {oneweekweather.daily[2].description}{" "}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="one-week-fourth-day-temperature-row">
            <IonCol className="one-week-fourth-day-temp-label-col">
              {oneweekweather && (
                <IonLabel className="one-week-fourth-day-temp-label">
                  {" "}
                  {oneweekweather.daily[3].title}{" "}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="one-week-fourth-day-temp-text-col">
              {oneweekweather && (
                <IonText className="one-week-fourth-day-temp-text">
                  {" "}
                  {`${oneweekweather.daily[3].temp.toFixed()}°c`} /{" "}
                  {oneweekweather.daily[3].description}{" "}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="one-week-fifth-day-temperature-row">
            <IonCol className="one-week-fifth-day-temp-label-col">
              {oneweekweather && (
                <IonLabel className="one-week-fifth-day-temp-label">
                  {" "}
                  {oneweekweather.daily[4].title}{" "}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="one-week-fifth-day-temp-text-col">
              {oneweekweather && (
                <IonText className="one-week-fifth-day-temp-text">
                  {" "}
                  {`${oneweekweather.daily[4].temp.toFixed()}°c`} /{" "}
                  {oneweekweather.daily[4].description}{" "}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="one-week-sixth-day-temperature-row">
            <IonCol className="one-week-sixth-day-temp-label-col">
              {oneweekweather && (
                <IonLabel className="one-week-sixth-day-temp-label">
                  {" "}
                  {oneweekweather.daily[5].title}{" "}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="one-week-sixth-day-temp-text-col">
              {oneweekweather && (
                <IonText className="one-week-sixth-day-temp-text">
                  {" "}
                  {`${oneweekweather.daily[5].temp.toFixed()}°c`} /{" "}
                  {oneweekweather.daily[5].description}{" "}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="one-week-seventh-day-temperature-row">
            <IonCol className="one-week-seventh-day-temp-label-col">
              {oneweekweather && (
                <IonLabel className="one-week-seventh-day-temp-label">
                  {" "}
                  {oneweekweather.daily[6].title}{" "}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="one-week-seventh-day-temp-text-col">
              {oneweekweather && (
                <IonText className="one-week-seventh-day-temp-text">
                  {" "}
                  {`${oneweekweather.daily[6].temp.toFixed()}°c`} /{" "}
                  {oneweekweather.daily[6].description}{" "}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="one-week-eigth-day-temperature-row">
            <IonCol className="one-week-eigth-day-temp-label-col">
              {oneweekweather && (
                <IonLabel className="one-week-eigth-day-temp-label">
                  {" "}
                  {oneweekweather.daily[7].title}{" "}
                </IonLabel>
              )}
            </IonCol>
            <IonCol className="one-week-eigth-day-temp-text-col">
              {oneweekweather && (
                <IonText className="one-week-eigth-day-temp-text">
                  {" "}
                  {`${oneweekweather.daily[7].temp.toFixed()}°c`} /{" "}
                  {oneweekweather.daily[7].description}{" "}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="empty-col"></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default OneweekTemp;
