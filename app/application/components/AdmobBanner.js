import React, {PureComponent} from 'react';
import { View, Platform} from 'react-native';
import ConfigApp from '../config/ConfigApp';
import { setTestDeviceIDAsync, AdMobBanner } from 'expo-ads-admob';
import Styles from '../config/Styles';

const bannerid = Platform.OS == "ios" ? ConfigApp.IOS_BANNER_ID : ConfigApp.ANDROID_BANNER_ID;

class AdmobBanner extends React.PureComponent {


  render () {

    return (

      <View style={{alignSelf: 'center' }}>
        <AdMobBanner
        bannerSize="banner"
        servePersonalizedAds={true}
        adUnitID={bannerid}
        setTestDeviceIDAsync={ConfigApp.TESTDEVICE_ID}
        onDidFailToReceiveAdWithError={this.bannerError} />
      </View>

      )
  }

}

export default AdmobBanner;
