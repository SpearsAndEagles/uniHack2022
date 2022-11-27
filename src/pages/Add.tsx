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
    context.addAnimal(data);
    (document.getElementById("formBruh") as HTMLFormElement).reset();
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
              <form onSubmit={handleSubmit(handleAdd)} id="formBruh">
                <Input name="denumire" label="Common Name" />
                <Input name="denumireStiintifica" label="Scientific Name" />
                <Input name="tip" label="Type" {...{ type: "text" }} />
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

export default Add;
