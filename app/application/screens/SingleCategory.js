import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { getDealsByCategory } from "../config/DataApp";
import Styles from '../config/Styles';
import {map} from 'lodash';
import Loading from '../components/InnerLoading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadMoreButton from '../components/LoadMoreButton';
import Empty from '../components/Empty';
import UserContext from '../context/UserContext';
import Strings from "../config/Strings";
import TouchableScale from 'react-native-touchable-scale';
import Rating from '../components/Rating';

export default function SingleCategory(props) {

  const contextState = useContext(UserContext);
  const userInfo = contextState.user;



  const { route } = props;
  const { navigation } = props;
  const { id, title } = route.params;
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChangeScreen = (id, title) => {
    navigation.navigate('singledeal', {id, title});
  };

useEffect(() => {

  props.navigation.setOptions({
    title:title,
  });

}, []);

  useEffect(() => {

    getDealsByCategory(id).then(response => {
        setData(response);
        setIsLoaded(true);
    })

  }, []);

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getDealsByCategory(id, page+1).then((response) => {

      if (!data) {
        setData(response);
        setLoading(false);
      }else{
        setData([...data, ...response]);
        setLoading(false);
      }

      if (response.length <= 0) {
        setshowButton(false);
      }

      setIsLoaded(true);

    });

  };


  const renderButton = () => {

    return (
      <LoadMoreButton
      Indicator={loading}
      showButton={showButton}
      Items={data}
      Num={10}
      Click={() => loadMore()}/>
      )
  }

  if (isLoaded) {

   return (
    <ScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}>

    <View style={{marginTop: 20, marginHorizontal: 20}}>

        {data && data.length ? null : <Empty/>}

        {map(data, (item, i) => (

          <TouchableScale key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id, item.title)} activeScale={0.98} tension={100} friction={10}>
        <Card style={Styles.card11}>
          <View style={Styles.badgeLeftTop}>
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 12}}>{item.category}</Text>
          </View>
          {item.exclusive === 1 ? <View style={Styles.badgeRightTop}>
          <Icon name="crown" color="#000" size={15}></Icon>
          <Text style={{color: '#000', marginLeft: 5, fontWeight: '600', fontSize: 12}}>{Strings.ST29}</Text>
          </View> : null}
          <Card.Cover source={{ uri: item.gif ? item.gif : item.image }} style={Styles.card11View} />
          {item.timeleft ? <View style={Styles.card11Expire}>
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
          {item.oldprice ? <Text style={Styles.card11OldPrice} numberOfLines={1}>{item.oldprice}</Text> : null}
          {item.price ? <Text style={Styles.card11Price} numberOfLines={1}>{item.price}</Text> : null}
          {item.discount ? <View style={Styles.card11DiscountView}>
          <Text style={Styles.card11DiscountText} numberOfLines={1}>{item.discount}</Text>
          </View>
          : null}
          </View>
          
        </Card>
        </TouchableScale>

        ))}

        {renderButton()}

    <View style={{height: 50}}></View>

    </View>

    </ScrollView>

    );

 }else{
   return (
     <Loading/>
     );
 }

}


