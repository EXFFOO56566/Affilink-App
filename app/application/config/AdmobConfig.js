import {AdMobInterstitial, setTestDeviceIDAsync} from 'expo-ads-admob';
import { Platform} from 'react-native';
import ConfigApp from './ConfigApp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdmobConfig = {
  
    ShowInterstitial: 

  initAds = async () => {

  try {

      const INTERSTITIAL_ID = Platform.OS == "ios" ? ConfigApp.IOS_INTERSTITIAL_ID : ConfigApp.ANDROID_INTERSTITIAL_ID;

      const value = await AsyncStorage.getItem('showAd');

      if(value !== null) {
          if(value == "10"){ 

          await AsyncStorage.setItem('showAd', "1");
          AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
          await setTestDeviceIDAsync(ConfigApp.TESTDEVICE_ID);
          await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
          await AdMobInterstitial.showAdAsync();

          }else{
             var temp = parseInt(value)+1;
             await AsyncStorage.setItem('showAd', temp.toString() );
          }
      }else{
          await AsyncStorage.setItem('showAd', "1");
          AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
          await setTestDeviceIDAsync(ConfigApp.TESTDEVICE_ID);
          await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
          await AdMobInterstitial.showAdAsync();

          }
      }catch(e) {
        console.log(e);
      }

	},

}

export default AdmobConfig;