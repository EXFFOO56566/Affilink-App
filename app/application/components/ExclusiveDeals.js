import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import {getExclusiveDeals} from "../config/DataApp";
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

export default function ExclusiveDeals() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();
  
  const onChangeScreen = (id, title) => {
    navigation.navigate('singledeal', {id, title});
  };

  useEffect(() => {
    getExclusiveDeals().then((response) => {
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
      <View style={{marginTop: 20, marginBottom: 10}}>
      <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20, /*flexDirection: 'row-reverse'*/ }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
        {map(items, (item, i) => (

        <TouchableScale key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id, item.title)} activeScale={0.98} tension={100} friction={10}>
        <Card style={Styles.card6}>
          <View style={Styles.badgeLeftTop}>
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 12}}>{item.category}</Text>
          </View>
          <View style={Styles.badgeRightTop}>
          <Icon name="crown" color="#000" size={15}></Icon>
          <Text style={{color: '#000', marginLeft: 5, fontWeight: '600', fontSize: 12}}>{Strings.ST29}</Text>
          </View>
          <Card.Cover source={{ uri: item.gif ? item.gif : item.image }} style={Styles.card6View} />
          {item.timeleft ? <View style={Styles.card6Expire}>
          <Icon name="clock-time-three-outline" color="#fff" size={15} style={{marginRight: 6}}></Icon>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 13}}>{item.timeleft}</Text>
          </View>
          : null}
          <View style={{marginHorizontal: 13, marginTop: 8}}>
          <Rating rate={item.rating}/>
          </View>
          <Card.Title
          title={item.title}
          titleNumberOfLines={1}
          titleStyle={{fontWeight: 'bold', fontSize: 17, marginTop: 0}}
          subtitle={item.tagline}
          subtitleNumberOfLines={1}
          subtitleStyle={{fontSize: 14}}
          />

          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginBottom: 15, marginTop: 5}}>
          {item.oldprice ? <Text style={Styles.card6OldPrice} numberOfLines={1}>{item.oldprice}</Text> : null}
          {item.price ? <Text style={Styles.card6Price} numberOfLines={1}>{item.price}</Text> : null}
          {item.discount ? <View style={Styles.card6DiscountView}>
          <Text style={Styles.card6DiscountText} numberOfLines={1}>{item.discount}</Text>
          </View>
          : null}
          </View>
          
        </Card>
        </TouchableScale>

          ))}
      </ScrollView>
      </View>
      );
  }

}