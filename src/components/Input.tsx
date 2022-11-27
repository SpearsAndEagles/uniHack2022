import { ErrorMessage } from "@hookform/error-message" 
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { IonItem, IonText, IonLabel, IonInput } from '@ionic/react';

const Input : React.FC<{name : string, label: string}> = ({name, label, ...otherProps}) => {
    
    const {
        control,
        formState: { errors },
      } = useFormContext();
    
    
    return (
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field: { value, onChange, onBlur } }) => (
            <IonItem>
              <IonLabel position="stacked">{label}</IonLabel>
              <IonInput
                value={value}
                onIonChange={onChange}
                onBlur={onBlur}
                {...otherProps}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => (
                  <IonText color="danger" className="ion-padding-start">
                    <small>{message}</small>
                  </IonText>
                )}
              />
            </IonItem>
          )}
        />
      );
}
 
export default Input;