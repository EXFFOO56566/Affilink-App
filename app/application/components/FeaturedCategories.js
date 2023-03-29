import React, { useState, useEffect } from 'react';
import { ScrollView, View} from 'react-native';
import {map} from 'lodash';
import Loading from './InnerLoading';
import {getFeaturedCategories} from "../config/DataApp";
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import TouchableScale from 'react-native-touchable-scale';
import Styles from '../config/Styles';

export default function FeaturedCategories() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);


  useEffect(() => {
    getFeaturedCategories().then((response) => {
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
      <View style={{marginVertical: 20, marginBottom: 35}}>
      <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{ flexGrow: 1, marginLeft: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
        {map(items, (item, index) => (
        <RenderItem key={index} item={item} />

          ))}
      </ScrollView>
      </View>
      );
  }

}

function RenderItem(props) {

    const navigation = useNavigation();

    const onChangeScreen = (id, title) => {
    navigation.navigate('singlecategory', {
      id: id,
      title: title
    });    
  };

    const { item } = props;
    const { id, title } = item;

      return (
          
    <TouchableScale onPress={() => onChangeScreen(item.id, item.title)} activeOpacity={1} activeScale={0.98} tension={100} friction={10}>
        <View style={Styles.Button2}>
        <Text style={Styles.Button2Text}>{item.title}</Text>
      </View>
    </TouchableScale>

      )

}