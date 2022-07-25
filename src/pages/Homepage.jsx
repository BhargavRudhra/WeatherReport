import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonIcon,
  useIonRouter,
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
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Home;
