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
} from "@ionic/react";
import { UserContext } from "../App";
import { FormProvider, useForm } from "react-hook-form";
import "./Page.css";
import Input from "../components/Input";
import { useContext } from "react";

const Add: React.FC = () => {
  const [showToast] = useIonToast();
  const formMethods = useForm();
  const context = useContext(UserContext);
  const { control, handleSubmit } = formMethods;

  const handleAdd: any = (data: any) => {
    context.addObservation(data);
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
                <IonButton className="ion-margin" type="submit">
                  Submit
                </IonButton>
              </form>
            </FormProvider>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Add;
