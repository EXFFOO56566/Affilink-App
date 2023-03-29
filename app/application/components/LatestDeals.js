import React, { useState, useEffect } from 'react';
import { View, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import {getLatestDeals} from "../config/DataApp";
import { Text} from 'react-native-paper';
import TouchableScale from 'react-native-touchable-scale';
import { useNavigation } from '@react-navigation/native';
import {Grid, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Strings from "../config/Strings";
import Loading from './InnerLoading';

export default function LatestDeals() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();
  
  const onChangeScreen = (id, title) => {
    navigation.navigate('singledeal', {id, title});
  };

  useEffect(() => {
    getLatestDeals().then((response) => {
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
      <View style={{marginTop: 20, marginHorizontal: 25}}>

        {map(items, (item, i) => (

        <TouchableScale key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id, item.title)} activeScale={0.98} tension={100} friction={10}>
        <Grid style={{marginBottom: 25}}>
        <Col size={40}>
          <ImageBackground source={{ uri: item.gif ? item.gif : item.image }} style={{width: '100%', height: 150}} borderRadius={6}>

          {item.timeleft ? <View style={Styles.card9Expire}>
          <Icon name="clock-time-three-outline" color="#fff" size={15} style={{marginRight: 6}}></Icon>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 11}}>{item.timeleft}</Text>
          </View>
          : null}

          </ImageBackground>
        </Col>
        <Col size={60} style={Styles.card8Content}>

          {item.exclusive ? <View style={Styles.card8Badge}>
          <Icon name="crown" color="#000" size={15}></Icon>
          <Text style={{color: '#000', marginLeft: 5, fontWeight: '600', fontSize: 12}}>{Strings.ST29}</Text>
          </View>
          : null}

          <Text style={Styles.card8Title} numberOfLines={2}>{item.title}</Text>
          {item.oldprice ? <Text style={Styles.card8SubTitle} numberOfLines={1}>{item.tagline}</Text> : null}
          <View style={{flexDirection: 'row', marginBottom: 20, marginTop: 5}}>
          {item.oldprice ? <Text style={Styles.card8OldPrice} numberOfLines={1}>{item.oldprice}</Text> : null}
          {item.price ? <Text style={Styles.card8Price} numberOfLines={1}>{item.price}</Text> : null}
          {item.discount ? <View style={Styles.card8DiscountView}>
          <Text style={Styles.card8DiscountText} numberOfLines={1}>{item.discount}</Text>
          </View>
          : null}
          </View>

        </Col>
        </Grid>
        </TouchableScale>

          ))}

      </View>
      );
  }

}