import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Text } from 'react-native-paper';
import Styles from '../config/Styles';
import { map } from 'lodash';
import TouchableScale from 'react-native-touchable-scale';
import ColorsApp from '../config/ColorsApp';
import hexToRgba from 'hex-to-rgba';
import usePreferences from '../hooks/usePreferences';

export default function SearchSelect(props){

  const {theme} = usePreferences();
  
  const {data, title, showImage, selected, setValue} = props;

    const onChangeValue = (value) => {
        if(selected === value){
            setValue('');
        }else{
            setValue(value);
        }
    }

		return(
        <View>
        
        {title ? <Text style={{marginLeft:15, marginTop:15, fontSize:18, fontWeight:'bold'}}>{title}</Text> : <View style={{marginVertical:0}}></View>}
        <View style={{height: 4, width: 40, backgroundColor: ColorsApp.PRIMARY, marginLeft:15, marginTop:5, marginBottom:20}}></View>
        <View style={Styles.chip_view}>
        {map(data, (item, i) => (
            <TouchableScale
            key={i}
            activeOpacity={1}
            onPress={() => onChangeValue(item.id)}
            activeScale={0.98}
            tension={100}
            friction={10}>
            <View
            style={selected === item.id ?
            [Styles.chip_search, { backgroundColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)", color: '#fff', justifyContent: showImage ? 'flex-start' : 'center'}]
            :
            [Styles.chip_search, { backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: ColorsApp.PRIMARY, justifyContent: showImage ? 'flex-start' : 'center'}]}>
            {showImage ? <ImageBackground source={{uri: item.image}} imageStyle={{borderRadius: 4}} style={{width: 30, height: 30, marginHorizontal: 10}}></ImageBackground> : null}
            {selected === item.id ? <Text style={{color: theme === "dark" ? "white" : "black", fontSize: 15}}>{item.title}</Text> : <Text style={{color: theme === "dark" ? "white" : "black", fontSize: 15}}>{item.title}</Text>}
            </View>
            </TouchableScale>
        ))}
        </View>
        </View>
    );
}