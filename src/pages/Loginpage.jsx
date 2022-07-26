import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  useIonAlert,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import "./Loginpage.css";
import weatherimage from "../assets/weatherimage.png";
import Googlebutton from "../assets/google-icon.jpg";
import facebook from "../assets/fac.png";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

 const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setError] = useState("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [presentloading, dismissloading] = useIonLoading();
  const { signin } = UserAuth();
  const router = useIonRouter();
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const Signup = () => {
    clearInputs();
    router.push("/Signuppage");
  };

  async function handleButtonClick(message) {
    present({
      color: "black",
      duration: 2000,
      position:"Top",
      message: message,
      showCloseButton: true,
      mode: "ios",
    });
  }
  async function handleAlert(message) {
    presentAlert({
      header: "Alert",
      message: message,
      buttons: ["OK"],
      mode: "md",
      animated: true,
      cssClass: "loginpage-alert",
      color: "light",
    });
  }

  const handleSubmit = async (e) => {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (email == null || email === "") {
      handleButtonClick("Please enter email");
    } else if (password == null || password === "") {
      handleButtonClick("Please enter password");
    } else if (password.length < 5) {
      handleButtonClick("Password must have minimum 5 characters");
    } else if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= email.length
    ) {
      handleButtonClick("Please enter proper email");
    }else {
      try{
        presentloading({
          message: "Loggingin..",
          duration: 2000,
          spinner: "lines-small",
        });
        await signin(email,password);
        dismissloading();
        handleButtonClick("Successfully Login");
        clearInputs();
        router.push("/Homepage");
      } catch (e) {
        dismissloading();
        handleAlert(e.message);
        clearInputs();
      }
    }
  };
  return (
    <IonPage>
      <IonContent className="login-main-content">
        <IonGrid className="login-main-grid">
          <IonRow className="login-weather-image-row">
            <IonAvatar className="login-weather-avathar">
              <IonImg src={weatherimage} className="login-weather-image" />
            </IonAvatar>
          </IonRow>
          <IonRow className="login-header-row">
            <IonLabel className="login-header-label"> Login </IonLabel>
          </IonRow>
          <IonRow className="login-input-row">
            <IonInput
              onIonChange={(e) => setEmail(e.detail.value)}
              value={email}
              type="email"
              className="login-email-input"
              placeholder="Email"
            ></IonInput>
            <IonInput
              onIonChange={(e) => setPassword(e.detail.value)}
              value={password}
              type="password"
              className="login-password-input"
              placeholder="Password"
            ></IonInput>
          </IonRow>
          <IonRow className="login-button-row">
            <IonButton
              onClick={handleSubmit}
              type="submit"
              className="login-button"
              shape="round"
              color="fullwhite"
            >
              {" "}
              Login{" "}
            </IonButton>
          </IonRow>
          <IonRow className="login-text-row">
            <IonText className="login-text">
              {" "}
              If you don't have account?
              <IonText className="login-signup-text" onClick={Signup}> SignUp </IonText>
              here{" "}
            </IonText>
          </IonRow>
          <IonRow className="or-text-row">
            <IonText className="or-text"> or </IonText>
          </IonRow>
          <IonRow className="google-button-row">
             <IonAvatar className="google-avatar"><IonImg className="google-image" src={Googlebutton} /></IonAvatar>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
