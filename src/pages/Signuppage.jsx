import {
  IonAvatar,
  IonButton,
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
import "./Signuppage.css";
import weatherimage from "../assets/weatherimage.png";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setError] = useState("");
  const [presentloading, dismissloading] = useIonLoading();
  const { createUser } = UserAuth();
  const router = useIonRouter();
  const clearInputs = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };
  const Loginin = () => {
    clearInputs();
    router.push("/Loginpage");
  };
  async function handleAlert(message) {
    presentAlert({
      header: "Alert",
      message: message,
      buttons: ["OK"],
      mode: "md",
      color: "darkgreen",
    });
  }
  async function handleButtonClick(message) {
    present({
      color: "white",
      duration: 2000,
      position: "top",
      message: message,
      showCloseButton: true,
      mode: "md",
    });
  }
  const handleSubmit = async (e) => {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (username == null || username === "") {
      handleButtonClick("Please enter User Name");
    } else if (email == null || email === "") {
      handleButtonClick("Please enter Email");
    } else if (password == null || password === "") {
      handleButtonClick("Please enter Password");
    } else if (password.length < 5) {
      handleButtonClick("Password must have minimum 5 characters");
    } else if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= email.length
    ) {
      handleButtonClick("Please enter valid email");
    } else {
      try {
        presentloading({
          message: "Signingin!..",
          duration: 2000,
          spinner: "lines-small",
        });
        await createUser(email, password);
        dismissloading();
        handleButtonClick("User Added");
        clearInputs();
        router.push("/Loginpage");
      } catch (e) {
        dismissloading();
        handleAlert(e.message);
        clearInputs();
      }
    }
  };

  return (
    <IonPage>
      <IonContent className="signup-main-content">
        <IonGrid className="signup-main-grid">
          <IonRow className="signup-weather-image-row">
            <IonAvatar className="signup-weather-avathar">
              <IonImg className="signup-weather-image" src={weatherimage} />
            </IonAvatar>
          </IonRow>
          <IonRow className="signup-header-row">
            <IonLabel className="signup-header-label">SignUP</IonLabel>
          </IonRow>
          <IonRow className="signup-input-row">
            <IonInput
              onIonChange={(e) => setUsername(e.target.value)}
              value={username}
              className="signup-uname-input"
              placeholder="User Name"
              type="text"
            ></IonInput>
            <IonInput
              onIonChange={(e) => setEmail(e.target.value)}
              value={email}
              className="signup-email-input"
              placeholder="Email"
              type="email"
            ></IonInput>
            <IonInput
              onIonChange={(e) => setPassword(e.target.value)}
              value={password}
              className="signup-password-input"
              placeholder="Password"
              type="password"
            ></IonInput>
          </IonRow>
          <IonRow className="signup-button-row">
            <IonButton
              className="signup-button"
              color="fullwhite"
              shape="round"
              type="submit"
              onClick={handleSubmit}
            >
              {" "}
              SignUp{" "}
            </IonButton>
          </IonRow>
          <IonRow className="signup-text-row">
            <IonText className="signup-text">
              {" "}
              Have an account ?{" "}
              <IonText className="signup-login-text" onClick={Loginin}>
                {" "}
                Login{" "}
              </IonText>{" "}
              here{" "}
            </IonText>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
