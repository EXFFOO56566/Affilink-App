import React from 'react';
import { View } from 'react-native';
import { Title, Subheading, Button, IconButton } from 'react-native-paper';
import Strings from "../config/Strings";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from '../config/Styles';

export default function ExclusiveContent(){

	const navigation = useNavigation();

	const onChangeScreen = (screen) => {
		navigation.navigate(screen);
	};

	return(
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
		<Icon name='crown' size={80} color={'#f1c40f'} style={{marginBottom: 10}}/>
		<Title style={{fontWeight: 'bold', fontSize:22, marginBottom: 10}}>{Strings.ST98}</Title>
		<Subheading style={{textAlign: 'center', marginBottom: 20, marginHorizontal: 30}}>{Strings.ST99}</Subheading>
		<Button mode="contained" style={{borderRadius: 100}} contentStyle={Styles.SignButtonContent} labelStyle={Styles.SignButtonLabel} onPress={() => onChangeScreen("login")}>
			{Strings.ST10}
			</Button>
		</View>
		);
}