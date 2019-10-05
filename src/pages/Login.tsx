import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import React, { Component } from 'react';
import './Login.css';
import { Plugins } from '@capacitor/core';

const INITIAL_STATE = {
  loggedIn: false,
};

class Login extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  async getCurrentState(): Promise<boolean> {
    const result = await Plugins.FacebookLogin.getCurrentAccessToken();

    try {
      console.log(result);
      return result && result.accessToken;
    } catch (e) {
      return false;
    }
  }

  async signIn(): Promise<void> {
    const { history } = this.props;
    const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];

    const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    console.info('result', result);
    if (result && result.accessToken) {

      console.info('token', result.accessToken);
      history.push({
        pathname: '/home',
        state: { token: result.accessToken.token, userId: result.accessToken.userId }
      });
    }

  }

  async signOut(): Promise<void> {
    await Plugins.FacebookLogin.logout();
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Ionic React App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow>
            <IonCol className="text-center">
              <IonImg className="title-img" src="assets/capacitor.png" ></IonImg>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="text-center">
              <IonText className="title">
                Facebook Login in Capacitor app
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="text-center">
              <IonText className="text-center">
                By Enappd Team
              </IonText>
            </IonCol>
          </IonRow>

          <IonButton className="login-button" onClick={() => this.signIn()} expand="full" fill="solid" color="primary">
            Login with Facebook
        </IonButton>
        </IonContent>
      </IonPage>
    )
  }
}

export default Login;
