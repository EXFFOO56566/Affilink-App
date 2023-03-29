import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import {getFeaturedDeals} from "../config/DataApp";
import ConfigApp from "../config/ConfigApp";
import { Avatar, Button, Card, Title, Text, Badge} from 'react-native-paper';
import Heading from './Heading';
import TouchableScale from 'react-native-touchable-scale';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {Grid, Row, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Strings from "../config/Strings";
import Loading from './InnerLoading';
import Rating from './Rating';

export default function FeaturedDeals() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();

  const onChangeScreen = (id, title) => {
    navigation.navigate('singledeal', {id, title});
  };

  useEffect(() => {
    getFeaturedDeals().then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return (
      <Loading/>
      );
  }

  if (isLoaded) {
    return (
      <View style={{marginTop: 20}}>
      <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20, /*flexDirection: 'row-reverse'*/ }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
        {map(items, (item, i) => (

        <TouchableScale key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id, item.title)} activeScale={0.98} tension={100} friction={10}>
        <ImageBackground source={{ uri: item.gif ? item.gif : item.image }} style={Styles.card7} borderRadius={6}>
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={Styles.card7Content}>

          {item.timeleft ? <View style={Styles.card7Expire}>
          <Icon name="clock-time-three-outline" color="#fff" size={15} style={{marginRight: 6}}></Icon>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 13}}>{item.timeleft}</Text>
          </View>
          : null}

          <View style={Styles.card7Badge}>
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 12}}>{item.category}</Text>
          </View>

          <Text style={Styles.card7Title} numberOfLines={1}>{item.title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 5}}>
          {item.oldprice ? <Text style={Styles.card7OldPrice} numberOfLines={1}>{item.oldprice}</Text> : null}
          {item.price ? <Text style={Styles.card7Price} numberOfLines={1}>{item.price}</Text> : null}
          {item.discount ? <View style={Styles.card7DiscountView}>
          <Text style={Styles.card7DiscountText} numberOfLines={1}>{item.discount}</Text>
          </View>
          : null}

          </View>

        </LinearGradient>
        </ImageBackground>
        </TouchableScale>

          ))}
      </ScrollView>
      </View>
      );
  }

}