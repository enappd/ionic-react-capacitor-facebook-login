import { IonContent, IonText, IonRow, IonItem, IonThumbnail, IonLabel, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import React, { Component } from 'react';
import './Login.css';
import { Plugins } from '@capacitor/core';

const INITIAL_STATE = {
  loggedIn: true,
  user: {}
};

class Home extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };

  }

  componentDidMount() {
    this.getUserInfo();
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.location !== this.props.location) {
      console.log(nextProps.location);
      console.log(this.props.location);
    }
  }

  async signOut(): Promise<void> {
    const { history } = this.props;
    await Plugins.FacebookLogin.logout();
    history.goBack();
  }

  async getUserInfo() {
    const response = await fetch(`https://graph.facebook.com/${this.props.location.state.userId}?fields=id,name,gender,link,picture&type=large&access_token=${this.props.location.state.token}`);
    const myJson = await response.json();
    console.log(myJson);
    this.setState({
      user: myJson
    })
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Logged in ... </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">

          <IonRow>
            <IonCol className="text-center">
              <IonText className="title">
                You are logged in !
              </IonText>
            </IonCol>
          </IonRow>

          {this.state.user.name &&
            <IonItem>
              <IonThumbnail slot="start">
                <img src={this.state.user.picture.data.url} />
              </IonThumbnail>
              <IonLabel>
                <h3>{this.state.user.name}</h3>
              </IonLabel>
            </IonItem>
          }

          <IonButton className="login-button" onClick={() => this.signOut()} expand="full" fill="solid" color="danger">
            Logout from Facebook
        </IonButton>
        </IonContent>
      </IonPage>
    )
  }
}

export default Home;
