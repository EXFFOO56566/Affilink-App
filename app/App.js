import "react-native-gesture-handler";
import React, {useState, useEffect, useMemo} from 'react';
import { I18nManager, LogBox, StatusBar } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import AdmobBanner from './application/components/AdmobBanner';
import AdmobConfig from './application/config/AdmobConfig';
import Loading from './application/components/AppLoading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Preferences from './application/context/Preferences';
import { Provider as PaperProvider, DefaultTheme as DefaultThemePaper, DarkTheme as DarkThemePaper } from 'react-native-paper';
import { NavigationContainer, DefaultTheme as DefaultThemeNav, DarkTheme as DarkThemeNav } from '@react-navigation/native';
import Navigation from './application/navigation/TabNavigation';
import ColorsApp from './application/config/ColorsApp';
import ConfigApp from './application/config/ConfigApp';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { checkUserApi, getUserData, setUserData, setLogged } from "./application/config/DataApp";
import UserContext from './application/context/UserContext';
import moment from 'moment';
import 'moment/locale/es';

DarkThemePaper.colors.primary = ColorsApp.PRIMARY;
DarkThemePaper.colors.accent = ColorsApp.PRIMARY;
DarkThemePaper.roundness = 6;

DefaultThemePaper.colors.primary = ColorsApp.PRIMARY;
DefaultThemePaper.colors.accent = ColorsApp.PRIMARY;
DefaultThemePaper.roundness = 6;
DefaultThemeNav.colors.background = "#fff";

LogBox.ignoreAllLogs();

const getLayout = () => {

  if (ConfigApp.DEFAULTLAYOUT === "rtl") {
    I18nManager.forceRTL(true)
  }else {
    I18nManager.forceRTL(false)
  }
}

const cacheImages = (images) => {

  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

  const loadAssetsAsync = async () => {

    const imageAssets = cacheImages([
      require('./assets/header.jpg'),
      require('./assets/logo.png'),
      require('./assets/logo-white.png'),
    ]);

    await Promise.all([...imageAssets]);
  }

const App = () => {

  const [isReady, setIsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [theme, setTheme] = useState(ConfigApp.THEMEMODE);

  const updateValue = (user) => {
    setUser(user);
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    AsyncStorage.setItem('themeSetting', theme);
  }

  const preference = useMemo(
    () => ({
    toggleTheme, theme
  }),
  [theme],
  );

  useEffect(() => {

    getLayout();
  
  }, []);

  useEffect(() => {

    async function checkTheme() {
      
      await AsyncStorage.getItem('themeSetting')
      .then((value) => {
        if (value) {
          setTheme(value === "dark" ? "light" : "dark");
        }
      });
    }
  
    checkTheme();
  
  }, []);

  const checkUser = async () => {

    try {

       await getUserData().then((resp) => {

       if (resp.length >= 1 && resp != null) {

        const email = resp[0]['user_email'];

        setUser(resp[0]);
        updateValue(resp[0]);

        checkUserApi(email).then(response => {

          if (response != 'error') {

              setUserData(response).then(response => {
              setLogged(true);

            });

          }else if(response === 'error'){

            setLogged(false);

          }

        });

      }else{
        setLogged(false);

      }

    })

      } catch (error) {
        setLogged(false);
        // console.log("Error", error);
      }

    }

  useEffect(() => {

    //moment.locale("es");

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    checkUser();
    setTimeout(() => {
      setLoaded(true);
    }, 1500);

  }, []);


  useEffect(() => {

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  }, []);

    if (!isReady) {
      return (
        <AppLoading
          startAsync={loadAssetsAsync}
          onFinish={() => setIsReady(true)}
          onError={console.warn}
        />
      );
    }

    if (!loaded) {
      return (
        <Loading/>
        );
    }

    if (loaded && isReady) {
      return (
      <UserContext.Provider value={{ user, updateValue }}>
      <Preferences.Provider value={preference}>
      <PaperProvider theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper} settings={{ icon: props => <MaterialIcons {...props} />, }}>
      <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"}/>
      <NavigationContainer theme={theme === "dark" ? DarkThemeNav : DefaultThemeNav}>
      <Navigation/>
      <AdmobBanner/>
      </NavigationContainer>
      </PaperProvider>
      </Preferences.Provider>
      </UserContext.Provider>
        );
    }

    };

    export default App;