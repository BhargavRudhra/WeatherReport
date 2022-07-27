import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonIcon,
  useIonRouter,
  IonLabel
} from "@ionic/react";
import "./Homepage.css";
import { ellipsisVerticalOutline } from "ionicons/icons";
const Home = () => {
  const router = useIonRouter();
  const Settings = () => {
    router.push("/Settingspage");
  };
  return (
    <IonPage>
      <IonContent className="home-main-content">
        <IonGrid className="home-main-grid">
          <IonRow className="home-icon-row">
            <IonIcon
              icon={ellipsisVerticalOutline}
              className="dotted-icon"
              size="large"
              color="lightwhite"
              onClick={Settings}
            />
          </IonRow>
          <IonRow className="Welcome-text-row">
          <IonLabel className="label-text"> Welcome To Weather Report </IonLabel>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Home;
