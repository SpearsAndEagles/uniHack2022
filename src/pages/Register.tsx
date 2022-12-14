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
  IonRouterLink,
  IonText,
} from "@ionic/react";
import { FormProvider, useForm } from "react-hook-form";
import "./Page.css";
import Input from "../components/Input";
import { registerUser } from "../api/client";
import { useContext } from "react";
import { UserContext } from "../App";

const Register: React.FC = () => {
  const [showToast] = useIonToast();
  const formMethods = useForm();
  const { control, handleSubmit } = formMethods;

  const user = useContext(UserContext);

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
      .then(() => {
        user.setEmail(data.email);
        showToast({ message: "User successfully created", duration: 2500 });
      })
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
        <IonText className="ion-padding center-text">
          Already have an account?{" "}
          <IonRouterLink href="/login">Login</IonRouterLink>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Register;
