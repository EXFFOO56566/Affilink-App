import React, { useState, useEffect } from 'react';
import { ScrollView, View} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import {getFeaturedStores} from "../config/DataApp";
import TouchableScale from 'react-native-touchable-scale';
import { Text, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ColorsApp from '../config/ColorsApp';
import Strings from "../config/Strings";
import Loading from './InnerLoading';
import Heading from './Heading';
import hexToRgba from 'hex-to-rgba';

export default function FeaturedStores() {

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
      <View style={{marginBottom: 20, marginBottom: 20, backgroundColor: hexToRgba(ColorsApp.PRIMARY, '0.03'), paddingVertical: 20}}>
      <Heading title={Strings.ST23}/>
      
      <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{ flexGrow: 1, marginLeft: 20, marginTop: 20 }}
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
    const { id, title } = item;

      return (
    <View style={Styles.card2View}>
    <TouchableScale onPress={() => onChangeScreen(item.id, item.title)} activeOpacity={1} activeScale={0.98} tension={100} friction={10}>
      <View style={Styles.card2Content}>
      <Avatar.Image source={{ uri: item.image }} size={80} />
      <Text style={Styles.card2Title} numberOfLines={1}>{item.title}</Text>
      </View>
    </TouchableScale>
      </View>

      )

}