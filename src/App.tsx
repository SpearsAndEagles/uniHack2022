import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";
import { createContext, useState } from "react";
import Register from "./pages/Register";
import Add from "./pages/Add";
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

export const UserContext = createContext<{
  setEmail: Function;
  addObservation: Function;
}>({ setEmail: {} as Function, addObservation: {} as Function });

const App: React.FC = () => {
  const [userState, setUserState] = useState({
    currTrip: { descriere: "", titlu: "", observatii: [{}] },
    email: "",
  });

  const setEmail = (newEmail: any) => {
    setUserState((prev) => ({ ...prev, email: newEmail }));
  };

  const addObservation = (newObs: any) => {
    setUserState((prev) => {
      const newData = { ...prev };
      newData.currTrip.observatii.push(newObs);
      return newData;
    });
  };

  return (
    <UserContext.Provider
      value={{ setEmail: setEmail, addObservation: addObservation }}
    >
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                {userState.email ? (
                  <Redirect to="/page/Inbox" />
                ) : (
                  <Redirect to="/login"></Redirect>
                )}
              </Route>
              <Route path="/register" exact>
                <Register></Register>
              </Route>
              <Route path="/add" exact>
                <Add></Add>
              </Route>

              <Route path="/page/:name" exact={true}>
                <Page />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </UserContext.Provider>
  );
};

export default App;
