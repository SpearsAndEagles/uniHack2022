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
  fish,
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
    iosIcon: atCircle,
    mdIcon: atCircle,
  },
  {
    title: "Add",
    url: "/Add",
    iosIcon: addCircle,
    mdIcon: addCircle,
  },
  {
    title: "Favorites",
    url: "/page/Favorites",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: "Archived",
    url: "/page/Archived",
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: "Trash",
    url: "/page/Trash",
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: "Spam",
    url: "/page/Spam",
    iosIcon: warningOutline,
    mdIcon: warningSharp,
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
          <IonRow>
            <IonCol>
              <IonListHeader>
                <IonText color="success">BioShare</IonText>
              </IonListHeader>
            </IonCol>
            <IonCol>
              <IonButton fill="outline" onClick={handleLogout}>
                Log out
              </IonButton>
            </IonCol>
          </IonRow>
          <IonNote>{user.email}</IonNote>
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
