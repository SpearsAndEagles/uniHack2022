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
import { FormProvider, useForm } from "react-hook-form";
import "./Page.css";
import Input from "../components/Input";
import { registerUser } from "../api/client";

const Register: React.FC = () => {
  const [showToast] = useIonToast();
  const formMethods = useForm();
  const { control, handleSubmit } = formMethods;

  const handleRegisterUser: any = (data: any) => {
    if (data.password != data.confirm) {
      showToast({
        message: "Passwords do not match!",
        color: "danger",
        duration: 2500,
      });
      return;
    }
    registerUser(data)
      .then(() =>
        showToast({ message: "User successfully created", duration: 2500 })
      )
      .catch((err) =>
        showToast({ message: err, color: "danger", duration: 2500 })
      );
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
            <IonTitle className="center-text">Register</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(handleRegisterUser)}>
                <Input
                  name="email"
                  label="Enter an email address"
                  {...{ type: "email" }}
                />
                <Input
                  name="password"
                  label="Choose a password"
                  {...{ type: "password" }}
                />
                <Input
                  name="confirm"
                  label="Confirm Password"
                  {...{ type: "password" }}
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

export default Register;
