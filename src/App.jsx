import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Getstarted from "./pages/Getstartedpage";
import Login from "./pages/Loginpage";
import Signup from "./pages/Signuppage";
import Home from "./pages/Homepage";
import Settings from "./pages/Settingspage";
import UserProfile from "./pages/Profilepage";
import { AuthContextProvider } from "./context/AuthContext";
// import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
setupIonicReact();

const App = () => {
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
