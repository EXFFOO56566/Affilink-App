import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import SliderStores from '../components/SliderStores';
import FeaturedCategories from '../components/FeaturedCategories';
import ExclusiveDeals from '../components/ExclusiveDeals';
import FeaturedDeals from '../components/FeaturedDeals';
import LatestDeals from '../components/LatestDeals';
import FeaturedLocations from '../components/FeaturedLocations';
import Heading from '../components/Heading';
import Styles from '../config/Styles';
import ColorsApp from '../config/ColorsApp';
import Strings from "../config/Strings";
import usePreferences from '../hooks/usePreferences';

export default function Home3(props) {

  const {theme} = usePreferences();

 return (

    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

  <View style={{backgroundColor: theme === "dark" ? "rgba(255,255,255,0.11)" : ColorsApp.PRIMARY,
  width: '100%', marginBottom:20,
  height: 160, flex: 1, justifyContent:'center',
  borderBottomRightRadius: 70, overflow:'hidden'
  }}>
  <SliderStores/>
  </View>

<SafeAreaView>

    <View style={Styles.Home3Screen}>

        <Heading title={Strings.ST22}/>
        <ExclusiveDeals/>

        <Heading title={Strings.ST24}/>
        <FeaturedCategories/>
        
        <Heading title={Strings.ST45}/>
        <FeaturedDeals/>

        <Heading title={Strings.ST46}/>
        <FeaturedLocations/>

        <Heading title={Strings.ST25}/>
        <LatestDeals/>

    </View>
    </SafeAreaView>
    </ScrollView>

      );
}

