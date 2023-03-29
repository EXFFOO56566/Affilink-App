import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorsApp from '../config/ColorsApp';
import StarRating from 'react-native-star-rating';

export default class Rating extends PureComponent{

	render () {

	const {rate, iconsize} = this.props;
    const Color = ColorsApp.PRIMARY;
    const NoColor = "rgba(255,255,255,0.5)";
    const Size = iconsize ? iconsize : 18;
    const IconName = "lightning-bolt";

        return(
            <StarRating ref="rating" disabled={true} maxStars={5} emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'} rating={rate} containerStyle={{width: 100, marginTop: 5}} starSize={20} emptyStarColor={'#f1c40f'} fullStarColor={'#f1c40f'} />
        );

    }
}
