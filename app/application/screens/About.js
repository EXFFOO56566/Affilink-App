import React, { useState, useEffect } from 'react';
import { getStrings } from "../config/DataApp";
import { View, ScrollView, Image } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { HTMLStyles } from '../config/HTMLStyles';
import AppLoading from '../components/AppLoading';
import Styles from '../config/Styles';
import Strings from '../config/Strings';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import usePreferences from '../hooks/usePreferences';

export default function About() {

  	const {theme} = usePreferences();
    const [isLoaded, setIsLoaded] = useState(false);
  	const [item, setItem] = useState('');

useEffect(() => {

  getStrings().then((response) => {
    setItem(response[0]);
    setIsLoaded(true);
  });

}, []);

  if (isLoaded) {

 return (

	<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <View style={Styles.TermsAboutPageScreen}>
    <HTMLView value={item.tr_aboutus} stylesheet={theme === "dark" ? HTMLStylesDark : HTMLStyles}/>
    </View>
    </ScrollView>

      );

   }else{
   return (
     <AppLoading/>
     );
 }
 
}

