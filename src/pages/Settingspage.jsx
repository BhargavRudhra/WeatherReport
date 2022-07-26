import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import "./Settingspage.css";
import { arrowBack } from "ionicons/icons";
import { UserAuth } from "../context/AuthContext";

const Settings = () => {
  const { logout } = UserAuth();
  const router = useIonRouter();
  const [present] = useIonToast();

  async function handleButtonClick(message) {
    present({
      color: "black",
      duration: 2000,
      position: "top",
      message: message,
      showCloseButton: true,
      mode: "ios",
    });
  }
  const Home = () => {
    router.push("/Homepage");
  };
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/Loginpage");
      handleButtonClick("Successfully Loggedout");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <IonPage>
      <IonContent className="settings-main-content" fullscreen>
        <IonRow className="settings-row">
          <IonCol>
            <IonIcon
              className="arrow-back-icon"
              icon={arrowBack}
              size="large"
              onClick={Home}
              color="fullblack"
            />
          </IonCol>
          <IonCol className="settings-col">Settings</IonCol>
        </IonRow>
        <IonGrid className="settings-grid">
          <IonRow className="settings-grid-row"> Profile </IonRow>
          <IonRow className="settings-grid-row" onClick={handleLogout}>
            {" "}
            Logout{" "}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
