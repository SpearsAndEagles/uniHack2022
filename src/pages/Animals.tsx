import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
} from "@ionic/react";
import { useContext } from "react";
import { UserContext } from "../App";
import "./Page.css";

const Animals: React.FC = () => {
  const user = useContext(UserContext);
  console.log(user);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Animals</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Animals</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {user.animals.map((animal: any) => {
            return (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{animal.denumireStiintifica}</IonCardTitle>
                  <IonCardSubtitle>{animal.tip}</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>{animal.denumire}</IonCardContent>

                <IonButton fill="clear">Edit</IonButton>
                <IonButton color={"danger"}>Delete</IonButton>
              </IonCard>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Animals;
