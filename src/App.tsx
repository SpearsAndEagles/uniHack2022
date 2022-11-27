import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
  useIonToast,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";
import { createContext, useEffect, useState } from "react";
import Register from "./pages/Register";
import Add from "./pages/Add";
import Login from "./pages/Login";
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
import { Animal, Observatie, TripType } from "./types";
import Trip from "./pages/Trip";
import Animals from "./pages/Animals";

setupIonicReact();

export const UserContext = createContext<{
  setEmail: Function;
  addObservation: Function;
  addAnimal: Function;
  currTrip: TripType;
  email: string;
  tripActive: boolean;
  animals: any;
}>({
  setEmail: {} as Function,
  addObservation: {} as Function,
  email: "",
  tripActive: false,
  addAnimal: {} as Function,
  currTrip: {
    descriere: "",
    titlu: "",
    observatii: [
      {
        latitudine: 0,
        longitudine: 0,
        animal: "",
        data: new Date(),
        numar: "0",
        comportament: "prezent",
      },
    ],
  },
  animals: [],
});

const App: React.FC = () => {
  const [showToast] = useIonToast();

  const [userState, setUserStatewithout] = useState({
    currTrip: {
      descriere: "",
      titlu: "",
      observatii: [
        {
          latitudine: 0,
          longitudine: 0,
          animal: "",
          data: new Date(),
          numar: "0",
          comportament: "prezent",
        },
      ],
    },
    email: "",
    animals: [],
    tripActive: false,
  });

  useEffect(() => {
    if (localStorage.userState1) {
      setUserStatewithout(JSON.parse(localStorage.userState1));
    }
  }, []);

  const setUserState = (data: any) => {
    setUserStatewithout(data);
    if (data instanceof Function) {
      const newData = data(userState);
      localStorage.userState1 = JSON.stringify(newData);
    } else {
      localStorage.userState1 = JSON.stringify(data);
    }
  };

  const addAnimal = (newAnimal: Animal) => {
    showToast({
      message: "New animal added",
      color: "success",
      duration: 2500,
    });
    setUserState((prev: any) => {
      const newState = { ...prev };
      newState.animals.push(newAnimal);
      return newState;
    });
  };

  const startTrip = (data: any) => {
    setUserState((prev: any) => {
      const newData = { ...prev };
      newData.currTrip.descriere = data.descriere;
      newData.currTrip.titlu = data.titlu;
    });
  };
  const setEmail = (newEmail: string) => {
    setUserState((prev: any) => ({ ...prev, email: newEmail }));
  };

  const addObservation = (newObs: Observatie) => {
    showToast({
      message: "New observation added",
      color: "success",
      duration: 2500,
    });
    setUserState((prev: any) => {
      const newData = { ...prev };
      newData.currTrip.observatii.push(newObs);
      return newData;
    });
  };

  return (
    <UserContext.Provider
      value={{
        setEmail: setEmail,
        addObservation: addObservation,
        email: userState.email,
        tripActive: userState.tripActive,
        currTrip: userState.currTrip as TripType,
        addAnimal: addAnimal,
        animals: userState.animals,
      }}
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
              <Route path="/trip">
                <Trip></Trip>
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register" exact>
                <Register></Register>
              </Route>
              <Route path="/animals">
                <Animals></Animals>
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
