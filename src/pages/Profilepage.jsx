import {
  IonAvatar,
  IonCol,
  IonContent,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { UserAuth } from "../context/AuthContext";
import { arrowBack } from "ionicons/icons";
import "./Profilepage.css";

const UserProfile = () => {
  const { googleuser,iscurrentuser,isgooglelogin} = UserAuth();
  console.log(googleuser.email);
  console.log(googleuser.familyName);
  console.log(googleuser.givenName);
  console.log(googleuser.imageUrl);
  console.log(iscurrentuser);
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
        {
          isgooglelogin ?
          <IonAvatar className="profile-avatar">
          <IonImg className="profile-image" src={googleuser.imageUrl} />{" "}
        </IonAvatar> :
        <IonLabel> Current user </IonLabel>
        }
        <IonRow className="username-row">
          {
            isgooglelogin ?
            <IonLabel>{googleuser.familyName} {googleuser.givenName}</IonLabel> :
            <IonLabel> Current user </IonLabel>
          }
        </IonRow>
        <IonRow className="useremail-row">
          {
            isgooglelogin ?
            <IonLabel> {googleuser.email} </IonLabel> : 
            <IonLabel> {iscurrentuser}</IonLabel>
          }
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
