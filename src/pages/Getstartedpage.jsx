import {
  IonAvatar,
  IonButton,
  IonContent,
  IonGrid,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import "./Getstartedpage.css";
import weatherimage from "../assets/weatherimage.png";
const Getstarted = () => {
  return (
    <IonPage>
      <IonContent className="getstarted-main-content">
        <IonGrid>
          <IonRow className="image-row">
            <IonAvatar className="getstarted-weather-avathar">
              <IonImg src={weatherimage} className="weatherimage" />
            </IonAvatar>
          </IonRow>
          <IonRow className="label-row">
            <IonLabel className="label1-content"> Find your weather </IonLabel>
            <IonLabel className="label2-content">
              pridiction in your city
            </IonLabel>
          </IonRow>
          <IonRow className="text-row">
            <IonText className="weather-text1">
              Easy steps to pridict the weather
            </IonText>
            <IonText className="weather-text2">
              and make your day easier
            </IonText>
          </IonRow>
          <IonRow className="getstarted-button-row">
            <IonButton
              className="getstarted-button"
              color="fullwhite"
              shape="round"
              href="/Loginpage"
            >
              Get started
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Getstarted;
