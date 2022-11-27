import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRow,
  IonText,
  useIonToast,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  addCircle,
  atCircle,
  paw,
  person,
  walk,
  personAdd,
} from "ionicons/icons";
import "./Menu.css";
import { useContext } from "react";
import { UserContext } from "../App";
import { logout } from "../api/client";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Register",
    url: "/register",
    iosIcon: personAdd,
    mdIcon: personAdd,
  },
  {
    title: "Login",
    url: "/login",
    iosIcon: atCircle,
    mdIcon: atCircle,
  },
  {
    title: "Trip",
    url: "/trip",
    iosIcon: walk,
    mdIcon: walk,
  },
  {
    title: "Animal List",
    url: "/animals",
    iosIcon: paw,
    mdIcon: paw,
  },
  {
    title: "Add Animal",
    url: "/add",
    iosIcon: addCircle,
    mdIcon: addCircle,
  },
];

const labels = [""];

const Menu: React.FC = () => {
  const location = useLocation();
  const [showToast] = useIonToast();

  const user = useContext(UserContext);

  const handleLogout = () => {
    logout()
      .then((data) => {
        user.setEmail("");
        showToast({
          message: "Successfully logged out",
          duration: 2500,
          color: "success",
        });
      })
      .catch((err) =>
        showToast({ message: err, duration: 2500, color: "danger" })
      );
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonItem>
            <IonRow>
              <IonCol>
                <IonListHeader>
                  <IonText color="success">BioShare</IonText>
                </IonListHeader>
              </IonCol>
              {user.email ? (
                <IonCol>
                  <IonButton fill="outline" onClick={handleLogout}>
                    Log out
                  </IonButton>
                </IonCol>
              ) : null}
            </IonRow>
          </IonItem>
          <IonItem className="ion-align-items-center">
            <IonIcon slot="" ios={person} md={person}></IonIcon>
            <IonNote className="ion-margin-top">
              {user.email ? user.email : "Not logged in"}
            </IonNote>
          </IonItem>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
