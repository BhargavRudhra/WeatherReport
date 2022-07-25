import {
  IonAvatar,
  IonCol,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { UserAuth } from "../context/AuthContext";
import { arrowBack } from "ionicons/icons";
import "./Profilepage.css";

const UserProfile = () => {
  const { googleuser } = UserAuth();
  console.log(googleuser.email);
  console.log(googleuser.familyName);
  console.log(googleuser.givenName);
  console.log(googleuser.imageUrl);
  const router = useIonRouter();
  const routeToSettingsPage = () => {
    router.push("/Settingspage");
  };
  return (
    <IonPage>
      <IonContent className="profile-main-content">
        <IonRow className="profile-row">
          <IonCol>
            <IonIcon
              className="profile-arrow-back-icon"
              icon={arrowBack}
              size="large"
              onClick={routeToSettingsPage}
            />
          </IonCol>
          <IonCol className="profile-col"> Profile </IonCol>
        </IonRow>
        <IonAvatar className="profile-avatar">
          <IonImg className="profile-image" src={googleuser.imageUrl} />{" "}
        </IonAvatar>
        <IonRow className="username-row">
          {" "}
          {googleuser.familyName} {googleuser.givenName}{" "}
        </IonRow>
        <IonRow className="useremail-row"> {googleuser.email} </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
