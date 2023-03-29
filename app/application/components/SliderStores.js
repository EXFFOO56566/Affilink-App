import React, { useState, useEffect } from 'react';
import { ScrollView, View} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import {getFeaturedStores} from "../config/DataApp";
import TouchableScale from 'react-native-touchable-scale';
import { Text, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Loading from './InnerLoading';

export default function SliderStores() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getFeaturedStores().then((response) => {
        setIsLoaded(true);
        setItems(response);
    });
  }, []);

  if (!isLoaded) {
    return (
      <Loading/>
      );
  }

  if (isLoaded) {
    return (
      <View>
      
      <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{ flexGrow: 1, marginLeft: 26, paddingRight: 20 }}
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
    navigation.navigate('singlestore', {
      id: id,
      title: title
    });    
  };

    const { item } = props;

      return (
    <View style={Styles.card10View}>
    <TouchableScale onPress={() => onChangeScreen(item.id, item.title)} activeOpacity={1} activeScale={0.98} tension={100} friction={10}>
      <View style={Styles.card10Content}>
      <Avatar.Image source={{ uri: item.image }} size={60} />
      <Text style={Styles.card10Title} numberOfLines={1}>{item.title}</Text>
      </View>
    </TouchableScale>
      </View>

      )

}