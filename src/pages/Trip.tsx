import {
  IonRow,
  IonButtons,
  IonContent,
  IonHeader,
  IonButton,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  useIonToast,
  IonItemDivider,
  IonLabel,
} from "@ionic/react";
import { UserContext } from "../App";
import { FormProvider, useForm } from "react-hook-form";
import "./Page.css";
import Input from "../components/Input";
import { useContext } from "react";

const Trip: React.FC = () => {
  const [showToast] = useIonToast();
  const formMethods = useForm();
  const user = useContext(UserContext);
  const { control, handleSubmit } = formMethods;

  const handleStartTrip: any = (data: any) => {
    user.currTrip = data;
  };

  const handleAdd: any = (data: any) => {
    user.addObservation(data);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonTitle className="center-text">Start Trip</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(handleAdd)}>
                <Input name="titlu" label="Trip title" />
                <Input name="descriere" label="Trip description" />
                <IonButton color="success" className="ion-margin" type="submit">
                  Start
                </IonButton>
              </form>
            </FormProvider>
          </IonCardContent>
        </IonCard>
        <IonItemDivider>
          <IonLabel>Add Observations</IonLabel>
        </IonItemDivider>
        <IonCard>
          <IonCardHeader>
            <IonTitle className="center-text">Add Specimen</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(handleAdd)}>
                <Input name="species" label="Enter the species' name" />
                <Input name="comportament" label="Introduceti comportamentul" />
                <Input
                  name="numar"
                  label="Enter the number"
                  {...{ type: "number" }}
                />
                <IonButton color="success" className="ion-margin" type="submit">
                  Add
                </IonButton>
              </form>
            </FormProvider>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Trip;
