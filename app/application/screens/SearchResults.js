import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import Strings from "../config/Strings";
import { searchApi } from "../config/DataApp";
import {map} from 'lodash';
import AppLoading from '../components/InnerLoading';
import TouchableScale from 'react-native-touchable-scale';
import { Text} from 'react-native-paper';
import LoadMoreButton from '../components/LoadMoreButton';
import ColorsApp from '../config/ColorsApp';
import EmptyResults from '../components/EmptyResults';
import { Col, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchResults(props) {

  const { route, navigation } = props;
  const { query, category, subcategory, store, location, price, rating } = route.params;

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChangeScreen = (id, title) => {
    navigation.navigate('singledeal', {id, title});
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    searchApi(query, category, subcategory, store, location, price, rating, page+1).then((response) => {

      if (!items) {
        setItems(response);
        setLoading(false);
      }else{
        setItems([...items, ...response]);
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
      Items={items}
      Num={5}
      Click={() => loadMore()}/>
      )
  }

  useEffect(() => {
    searchApi(query, category, subcategory, store, location, price, rating).then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {

    return (
   
        <AppLoading/>
   
         );
   
      }else{

        if (items.length <= 0) {

          return(
           <EmptyResults/>
           );
    
        }else{

 return (

  <ScrollView
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
>
    
<SafeAreaView>

    <View style={Styles.SearchScreen}>

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

    {renderButton()}

    </View>
    </SafeAreaView>
    </ScrollView>

      );

}

}

}


