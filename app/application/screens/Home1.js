import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import FeaturedStores from '../components/FeaturedStores';
import FeaturedCategories from '../components/FeaturedCategories';
import ExclusiveDeals from '../components/ExclusiveDeals';
import FeaturedDeals from '../components/FeaturedDeals';
import LatestDeals from '../components/LatestDeals';
import FeaturedLocations from '../components/FeaturedLocations';
import { LinearGradient } from 'expo-linear-gradient';
import Heading from '../components/Heading';
import Styles from '../config/Styles';
import ColorsApp from '../config/ColorsApp';
import { Text, TextInput } from 'react-native-paper';
import Strings from "../config/Strings";
import hexToRgba from 'hex-to-rgba';
import usePreferences from '../hooks/usePreferences';
import { useNavigation } from '@react-navigation/native';

export default function Home1(props) {

  const {theme} = usePreferences();
  const [query, setQuery] = React.useState('');
  const navigation = useNavigation();

  const onSubmitEditing = (query) => {
    navigation.navigate('searchresults', {query});
  };

 return (

    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    
      <LinearGradient colors={[hexToRgba(ColorsApp.PRIMARY, '1'), theme === "dark" ? 'transparent' : '#fff']} style={Styles.headerOverlay}>
          <Text style={Styles.headerTitle}>{Strings.ST26}</Text>
          <Text style={Styles.headerSubTitle}>{Strings.ST27}</Text>
            <TextInput
              placeholder={Strings.ST21}
              mode="outlined"
              value={query}
              left={<TextInput.Icon name="magnify" color={ColorsApp.PRIMARY} />}
              style={Styles.headerInput}
              theme={{ roundness: 12 }}
              outlineColor={hexToRgba(ColorsApp.PRIMARY, '0.1')}
              activeOutlineColor={hexToRgba(ColorsApp.PRIMARY, '0.3')}
              onChangeText={text => setQuery(text)}
              onSubmitEditing={() => onSubmitEditing(query)}
            />
      </LinearGradient>
    
<SafeAreaView>

    <View style={Styles.HomeScreen}>

        <Heading title={Strings.ST46}/>
        <FeaturedLocations/>

        <Heading title={Strings.ST22}/>
        <ExclusiveDeals/>

        <FeaturedStores/>
        
        <Heading title={Strings.ST45}/>
        <FeaturedDeals/>

        <Heading title={Strings.ST24}/>
        <FeaturedCategories/>

        <Heading title={Strings.ST25}/>
        <LatestDeals/>

    </View>
    </SafeAreaView>
    </ScrollView>

)
}

