import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import AppLoading from '../components/InnerLoading';
import { getStores, getLocations, getCategories, getSubCategories, getPrices } from "../config/DataApp";
import Styles from '../config/Styles';
import { RadioButton, Text, TextInput } from 'react-native-paper';
import Strings from "../config/Strings";
import SearchSelect from '../components/SearchSelect';
import { map, size } from 'lodash';
import ColorsApp from '../config/ColorsApp';
import hexToRgba from 'hex-to-rgba';
import TouchableScale from 'react-native-touchable-scale';
import Rating from '../components/Rating';
import usePreferences from '../hooks/usePreferences';

export default function SearchWorkout(props) {

	const {navigation} = props;

  const {theme} = usePreferences();
  
  const [query, setQuery] = useState('');

  const [store, setStore] = useState('');
  const [stores, setStores] = useState([]);

  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);

  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const [subcategory, setSubCategory] = useState('');
  const [subcategories, setSubCategories] = useState([]);

  const [price, setPrice] = useState('all');
  const [prices, setPrices] = useState([]);

  const [rating, setRating] = useState('all');
  const ratings = [{ "rate": 1},{ "rate": 2},{ "rate": 3},{ "rate": 4},{ "rate": 5}];

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getStores().then((response) => {
     setStores(response);
   });
  }, []);

  useEffect(() => {
    getLocations().then((response) => {
     setLocations(response);
   });
  }, []);

  useEffect(() => {
    getCategories().then((response) => {
     setCategories(response);
   });
  }, []);

  useEffect(() => {
    getPrices().then((response) => {
     setPrices(response);
   });
  }, []);

  useEffect(() => {
    getSubCategories(category).then((response) => {
     setSubCategories(response);
   });
  }, [category]);

  useEffect(() => {
    
    if(size(stores) >= 1 || size(locations) >= 1 || size(categories) >= 1){
      setIsLoaded(true)
    }
    
  }, [stores, locations, categories, prices]);

  const showResults = () => {
    navigation.navigate('searchresults', {
      query: query,
      store: store,
      category: category,
      subcategory: subcategory,
      location: location,
      price: price,
      rating: rating
    });    
  };

  const onSubmitEditing = (query) => {
    navigation.navigate('searchresults', {query});
  };

  if (isLoaded) {

      return(

    <View style={{flex:1}}>

    <ScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}>

    <SafeAreaView style={{marginBottom:20}}>
    
    <TextInput
              placeholder={Strings.ST21}
              mode="outlined"
              value={query}
              left={<TextInput.Icon name="magnify" color={ColorsApp.PRIMARY} />}
              style={[Styles.header1Input, {marginHorizontal: 15, marginTop: 10}]}
              theme={{ roundness: 12 }}
              outlineColor={theme === "dark" ? 'transparent' : 'white'}
              activeOutlineColor={hexToRgba(ColorsApp.PRIMARY, '0.3')}
              onChangeText={text => setQuery(text)}
              onSubmitEditing={() => onSubmitEditing(query)}
            />

    <SearchSelect data={stores} showImage={true} title={Strings.ST59} selected={store} setValue={(value) => setStore(value)}/>

    <SearchSelect data={locations} title={Strings.ST60} selected={location} setValue={(value) => setLocation(value)}/>

    <SearchSelect data={categories} title={Strings.ST69} selected={category} setValue={(value) => setCategory(value)}/>

    {subcategories.length > 0 ? <SearchSelect data={subcategories} title={Strings.ST41} selected={subcategory} setValue={(value) => setSubCategory(value)}/> : null}

    <Text style={{marginLeft:15, marginTop:15, fontSize:18, fontWeight:'bold'}}>{Strings.ST71}</Text>
    <View style={{height: 4, width: 40, backgroundColor: ColorsApp.PRIMARY, marginLeft:15, marginTop:5, marginBottom:20}}></View>
    
    <TouchableScale
            activeOpacity={1}
            onPress={() => setPrice('all')}
            activeScale={0.98}
            tension={100}
            friction={10}>
            <View style={{flexDirection:'row', alignItems: 'center', marginHorizontal:15}}>
            <RadioButton onPress={() => setPrice('all')} status={ price == 'all' ? 'checked' : 'unchecked' } />
            <Text style={{fontSize: 15}}>{Strings.ST113}</Text>
            </View>
            </TouchableScale>

    {map(prices, (item, i) => (
            <TouchableScale
            key={i}
            activeOpacity={1}
            onPress={() => setPrice(item.id)}
            activeScale={0.98}
            tension={100}
            friction={10}>
            <View style={{flexDirection:'row', alignItems: 'center', marginHorizontal:15, marginBottom:5}}>
            <RadioButton onPress={() => setPrice(item.id)} status={ price == item.id ? 'checked' : 'unchecked' } />
            <Text style={{fontSize: 15}}>{item.title}</Text>
            </View>
            </TouchableScale>
        ))}

        <Text style={{marginLeft:15, marginTop:15, fontSize:18, fontWeight:'bold'}}>{Strings.ST85}</Text>
        <View style={{height: 4, width: 40, backgroundColor: ColorsApp.PRIMARY, marginLeft:15, marginTop:5, marginBottom:20}}></View>

        <TouchableScale
            activeOpacity={1}
            onPress={() => setRating('all')}
            activeScale={0.98}
            tension={100}
            friction={10}>
            <View style={{flexDirection:'row', alignItems: 'center', marginHorizontal:15}}>
            <RadioButton onPress={() => setRating('all')} status={ rating == 'all' ? 'checked' : 'unchecked' } />
            <Text style={{fontSize: 15}}>{Strings.ST113}</Text>
            </View>
            </TouchableScale>

    {map(ratings, (item, i) => (
            <TouchableScale
            key={i}
            activeOpacity={1}
            onPress={() => setRating(item.rate)}
            activeScale={0.98}
            tension={100}
            friction={10}>
            <View style={{flexDirection:'row', alignItems: 'center', marginHorizontal:15, marginBottom:5}}>
            <RadioButton onPress={() => setRating(item.rate)} status={ rating == item.rate ? 'checked' : 'unchecked' } />
            <Rating rate={item.rate}></Rating>
            </View>
            </TouchableScale>
        ))}

    </SafeAreaView>

    </ScrollView>

    <TouchableOpacity onPress={() => showResults()} activeOpacity={1}>
    <View style={Styles.button_filter}>
    <Text style={Styles.button_filter_label}>{Strings.ST70}</Text>
    </View>
    </TouchableOpacity>

    </View>

        );

  }else{
   return (
     <AppLoading/>
     );
 }
 
}

