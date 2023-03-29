import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Strings from "../config/Strings";
import {getCategories} from "../config/DataApp";
import { Text } from 'react-native-paper';

export default function Categories(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();
  
  const onChangeScreen = (id, title) => {
    navigation.navigate('singlecategory', {id, title});
  };

  useEffect(() => {
    getCategories().then((response) => {
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
  return(
<ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20, /*flexDirection: 'row-reverse'*/ }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
        {map(items, (item, i) => (

        <Text>
            1
        </Text>

          ))}
      </ScrollView>

    )
   }

}


