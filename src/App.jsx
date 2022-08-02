import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  isPlatform,
  setupIonicReact,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Getstarted from "./pages/Getstartedpage";
import Login from "./pages/Loginpage";
import Signup from "./pages/Signuppage";
import Home from "./pages/Homepage";
import Settings from "./pages/Settingspage";
import UserProfile from "./pages/Profilepage";
import { AuthContextProvider } from "./context/AuthContext";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Browser } from "@capacitor/browser";
import { App as app } from "@capacitor/app";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

import "@ionic/react/css/core.css";

import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./theme/variables.css";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
setupIonicReact();

const App = () => {
  const [updateDetails,setUpdateDetails] = useState({});
  const [appVersion,setAppVersion] = useState("");

  const  updateRef = doc(db,"WeatherReport_app_config", "sfkh4b3AnbkZ4RqfjSXk");
  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();
  const handleToast = (msg) => {
    present({
      message: msg,
      position: "top",
      animated: true,
      duration : 2000,
      color: "lightwhite",
      mode: "ios",
    });
  };
  const handleAlert = (msg, title, btn, appVersion) => {
    presentAlert({
      header: title,
      subHeader: `Version : ${appVersion}`,
      message: msg,
      buttons: [
        {
          text: btn,
          role: "Download",
          handler:async () => {
            handleToast("Download Clicked");
            await Browser.open({
              url: "https://play.google.com/store/apps/details?id=com.WeatherReport.app",
            });
          },
        },
      ],
      backdropDismiss: true,
      translucent: true,
      animated: true,
      cssClass: "lp-sp-alert",
    });
  };
  const getAppInfo = async () => {
    let info = await app.getInfo();
    return info;
  };
  const getConfigData = async () => {
    const docSnap = await getDoc(updateRef);
    if (docSnap.exists()){
      const data = docSnap.data();
      console.log("Document data:",docSnap.data());
      setUpdateDetails(data.updateMsg);
      setAppVersion(data.current);
    }else {
      console.log("No such document!");
    }
  };
  const checkUpdate = async () => {
    try {
      if (isPlatform("android")) {
        const currentAppInfo = getAppInfo();
        if (appVersion > (await currentAppInfo).version) {
          const msg = updateDetails.msg;
          const title = updateDetails.title;
          const btn = updateDetails.btn;
          handleAlert(msg, title, btn, appVersion);
        }
      }
    } catch (error){}
  };
  useEffect(() => {
    getConfigData();
    if (isPlatform("android")) {
      getAppInfo();
    }
  }, [0]);
  checkUpdate();
  return (
    <AuthContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/getstartedpage">
              <Getstarted />
            </Route>
            <Route exact path="/loginpage">
              <Login />
            </Route>
            <Route path="/signuppage">
              <Signup />
            </Route>
            <Route path="/homepage">
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/getstartedpage" />
            </Route>
            <Route path ="/settingspage">
              <Settings />
            </Route>
            <Route path="/profilepage">
              <UserProfile />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AuthContextProvider>
  );
};

export default App;
