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
  IonText,
  IonRouterLink,
} from "@ionic/react";
import { FormProvider, useForm } from "react-hook-form";
import "./Page.css";
import Input from "../components/Input";
import { login } from "../api/client";
import { useContext } from "react";
import { UserContext } from "../App";

const Login: React.FC = () => {
  const [showToast] = useIonToast();
  const formMethods = useForm();
  const { control, handleSubmit } = formMethods;

  const user = useContext(UserContext);

  const handleUserLogin: any = (data: any) => {
    login(data)
      .then((res) => {
        user.setEmail(data.email);
        showToast({
          message: "Login successful!",
          color: "success",
          duration: 2500,
        });
      })
      .catch((err) => {
        showToast({ message: err, color: "danger", duration: 2500 });
      });
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
            <IonTitle className="center-text">Login</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(handleUserLogin)}>
                <Input
                  name="email"
                  label="Enter your email address"
                  {...{ type: "email" }}
                />
                <Input
                  name="password"
                  label="Enter your password"
                  {...{ type: "password" }}
                />
                <IonButton className="ion-margin" type="submit">
                  Login
                </IonButton>
              </form>
            </FormProvider>
          </IonCardContent>
        </IonCard>
        <IonText className="ion-padding center-text">
          Don't have an account?{" "}
          <IonRouterLink href="/register">Register</IonRouterLink>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Login;
