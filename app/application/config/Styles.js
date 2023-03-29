'use strict';
import {StyleSheet, Dimensions, Platform, I18nManager} from "react-native";
import ColorsApp from './ColorsApp';
import hexToRgba from 'hex-to-rgba';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PrimaryColor = ColorsApp.PRIMARY;
const SecondaryColor = ColorsApp.SECONDARY;
const BackgroundColor = ColorsApp.BACKGROUND;

module.exports = StyleSheet.create({

//////////////////////// LOGIN/SIGNUP

AuthTitle:{
	width: '100%',
	maxHeight: '100%',
	marginBottom: 20,
	alignSelf: 'center', 
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center'
},

AuthLogo:{
	width: '100%',
	height: screenHeight/12,
	maxHeight: '100%',
	marginBottom: 50
},

AuthContent:{
	marginHorizontal: 50
},

AuthInput:{
	marginBottom: 10,
},

AuthButton:{
	marginTop: 15,
	borderRadius: 100

},

AuthButtonContent:{
	paddingVertical: 10,
},

AuthButtonLabel:{
	letterSpacing: 0,
	fontWeight: 'bold',
	color: '#fff'
},

AuthCheckBoxLabel:{
	textTransform: 'capitalize',
	marginLeft: 5,
	letterSpacing: 0,
	color: '#b9b9b9',
},

AuthCheckBoxContent:{
	backgroundColor: '#fff'
},

AuthBottomText:{
	fontSize: 16
},

AuthBottomContent:{
marginTop: 20,
alignItems: 'center'
},

ForgotPass:{
	fontSize: 16,
	marginVertical: 10,
	alignSelf: 'flex-end',
	marginHorizontal: 4
},

textArea:{
	backgroundColor: '#fff'
},

//////////////////////// HEADER

headerBackground:{
	width: '100%',
	height: screenHeight*0.38,
},

headerOverlay:{
	height: screenHeight*0.38,
	justifyContent: 'center',
	paddingHorizontal: 20
},

headerTitle:{
	fontSize: 24,
	color: '#fff',
	fontWeight: 'bold',
	textAlign: 'center',
	marginBottom: 5,
	marginHorizontal: 30
},

headerSubTitle:{
	fontSize: 14,
	color: '#fff',
	textAlign: 'center',
	marginBottom: 10,
	marginHorizontal: 30
},

headerInput:{
	shadowColor: '#666',
	paddingHorizontal: 10,
	shadowRadius: 10,
	shadowOpacity: 0.15
},

header2Background:{
	height: screenHeight*0.38,
	marginBottom: 65
},

header2Overlay:{
	height: screenHeight*0.38,
	justifyContent: 'center',
	paddingHorizontal: 20
},

header2Title:{
	fontSize: 24,
	color: '#fff',
	fontWeight: 'bold',
	textAlign: 'center',
	marginBottom: 5,
	marginHorizontal: 30
},

header2SubTitle:{
	fontSize: 14,
	color: '#fff',
	textAlign: 'center',
	marginBottom: 10,
	marginHorizontal: 30
},

header2Input:{
	shadowColor: '#666',
	paddingHorizontal: 10,
	marginHorizontal: 30,
	shadowRadius: 10,
	shadowOpacity: 0.35,
	zIndex: 9999,
	marginTop: -35
},

header3Background:{
	height: screenHeight*0.38,
	marginBottom: 50
},

header3Overlay:{
	height: screenHeight*0.38,
	justifyContent: 'center',
	paddingHorizontal: 20
},

header3Title:{
	fontSize: 24,
	color: '#fff',
	fontWeight: 'bold',
	textAlign: 'center',
	marginBottom: 5,
	marginHorizontal: 30
},

header3SubTitle:{
	fontSize: 14,
	color: '#fff',
	textAlign: 'center',
	marginBottom: 10,
	marginHorizontal: 30
},

header3Input:{
	backgroundColor: '#fff',
	shadowColor: '#666',
	paddingHorizontal: 10,
	marginHorizontal: 30,
	shadowRadius: 10,
	shadowOpacity: 0.15,
	zIndex: 9999,
	marginTop: -40
},

header4Background:{
	height: screenHeight*0.38,
},

header4Overlay:{
	height: screenHeight*0.38,
	justifyContent: 'center',
	paddingHorizontal: 20,
	paddingBottom: 20
},

header4Title:{
	fontSize: 24,
	color: '#fff',
	fontWeight: 'bold',
	textAlign: 'center',
	marginBottom: 5,
	marginHorizontal: 30
},

header4SubTitle:{
	fontSize: 14,
	color: '#fff',
	textAlign: 'center',
	marginBottom: 10,
	marginHorizontal: 30
},

//////////////////////// DRAWER MENU

Drawer:{
flex: 1,
backgroundColor: "#ffffff",
paddingBottom: 30
},

DrawerHeader:{
	paddingTop: screenHeight/17,
	paddingBottom: screenHeight/24,
	backgroundColor: '#fff',
	justifyContent: 'center',
	alignItems: 'center'  
},

DrawerImage:{
	width: '100%',
	height: screenHeight/13,
	maxHeight: '100%',
	marginVertical: 10
},

DrawerMenuItem:{
	marginVertical: 5,
	marginHorizontal: 10,
	borderRadius: 6
},

DrawerTitleMenu:{
	fontSize: 16,
	fontWeight: '600', 
},

DrawerIconMenu:{
	fontSize: 30,
	marginRight: 15,
},

DrawerIconRightMenu:{
	fontSize: 25,
	opacity: 0.3
},

DrawerButton:{
	borderRadius: 6,
	marginHorizontal: 15,
	marginVertical: 10,
},

DrawerButtonLabel:{
	textTransform: 'capitalize',
	fontSize: 17,
},

DrawerButtonContent:{
	height: 50,
	width: '100%'
},

DrawerTitleHeader:{
	fontWeight: 'bold',
	fontSize: 20,
	marginBottom: 8
},

DrawerSubTitleHeader:{
	fontSize: 14,
},

DrawerFooter:{
	height: screenHeight*0.10,
	width: '100%',
	position: 'absolute',
	justifyContent: 'center',
	alignContent: 'center',
	alignItems: 'center',
	bottom: 0
},

DrawerSearchInput:{
	marginHorizontal: 15,
	marginVertical: 15
},

//////////////////////// DETAILS

singleBackground:{
	width: '100%',
	height: screenHeight*0.38,
	position: 'relative',
},

singleOverlay:{
	width: '100%',
	height: screenHeight*0.15,
	position: 'absolute',
	top:0,
	zIndex: 999,
	alignItems: 'center',
	justifyContent: 'center',
},

singleContent:{
	marginVertical: 20,
	marginHorizontal: 20,
},

singleTitle:{
	fontWeight: 'bold',
	fontSize: 20,
},

singleSubTitle:{
	marginTop:10,
	fontSize: 16,
},

singleOldPrice:{
	opacity: 0.3,
	fontWeight: 'bold',
	fontSize: 24,
	textDecorationLine: 'line-through',
	marginRight: 10
},

singlePrice:{
	fontSize: 24,
	fontWeight: 'bold',
	marginRight: 10
	
},

singleDiscountView:{
	marginRight: 10,
	backgroundColor: '#d0fcb4',
	paddingHorizontal: 15,
	paddingVertical: 3,
	borderRadius: 100
},

singleDiscountText:{
	color: '#27ae60',
	fontSize: 18,
},

singleBadge1:{
	backgroundColor: '#f1c40f',
	paddingVertical: 6,
	paddingHorizontal: 15,
	borderWidth: 1,
	borderColor: '#f1c40f',
	borderRadius: 50,
	marginBottom: 10,
	justifyContent: 'flex-end',
	flexDirection: 'row',
	alignSelf:'flex-start',
	alignItems: 'flex-start',
	marginRight: 10
},

singleBadge1Text:{
	color: '#000',
	marginLeft: 5,
	fontWeight: '600',
	fontSize: 11
},

singleBadge2:{
	color: '#f1c40f',
	backgroundColor: '#fffcf0',
	borderWidth: 1,
	borderColor: '#f1c40f',
	paddingVertical: 6,
	paddingHorizontal: 15,
	borderRadius: 50,
	marginBottom: 10,
	justifyContent: 'flex-end',
	flexDirection: 'row',
	alignSelf:'flex-start',
	alignItems: 'flex-start',
	marginRight: 10
},

singleBadge2Text:{
	color: '#f1c40f',
	marginLeft: 5,
	fontWeight: '600',
	fontSize: 11
},

single2Image:{
	width: screenWidth*0.20,
	height: screenWidth*0.20,
},

single3Image:{
	width: screenWidth,
	height: screenHeight*0.30,
},

single3Overlay:{
	width: screenWidth,
	height: screenHeight*0.30,
	justifyContent: 'center',
	alignContent: 'center',
	alignItems: 'center'
},

//////////////////////// SEARCH

chip_view:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal:15
},

chip_search:{
    height:50,
    width: screenWidth*0.45,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
	flexDirection:'row'
},

chip_label:{
    fontSize:18
},

button_filter:{
    backgroundColor: PrimaryColor,
    padding: 15,
    alignItems: 'center',
	marginHorizontal: 10,
	marginBottom: 10,
	borderRadius: 8
},

button_filter_label:{
    fontSize:18,
    color:'white',
    fontWeight:'bold'
},

//////////////////////// BUTTONS

Button2:{
backgroundColor: hexToRgba(PrimaryColor, '0.1'),
paddingHorizontal: 20,
paddingVertical: 20,
borderRadius: 80,
marginRight: 13
},

Button2Text:{
color: PrimaryColor,
fontSize: 14,
fontWeight: 'bold' 
},

Button1:{
	alignItems: 'center',
	flexDirection: 'row',
	backgroundColor: '#fff',
	borderWidth: 1,
	borderColor: 'rgba(0,0,0,0.1)',
	height: screenHeight*0.080,
	borderRadius: 60,
	width: '100%',
	paddingHorizontal: 55,
	position: 'relative',
	marginBottom: 20
},

Button1Text:{
	fontSize: 16,
},

Button1IconLeft:{
	color: PrimaryColor,
	position: 'absolute',
	left: 20,
	fontSize: 20,
},

Button1IconRight:{
	color: PrimaryColor,
	position: 'absolute',
	right: 15,
	fontSize: 20
},

//////////////////////// PROFILE

HeaderProfile:{
	width: '100%',
	height: screenHeight*0.30,
	alignItems: 'center',
	justifyContent: 'center',
	marginTop: 20
},

ImageProfile:{
	borderRadius: 100,
	width: screenWidth*0.28,
	height: 'auto',
	minHeight: screenWidth*0.28,
	marginBottom: 20	
},

ButtonProfile:{
	borderRadius: 60,
	width: '40%',
	marginHorizontal: 15,
	marginTop: 20,
},

ButtonLabelProfile:{
	fontWeight: 'bold',
	fontSize: 16,
},

ButtonContentProfile:{
	height: screenHeight*0.05,
	width: '100%'
},

SubTextProfile:{
	fontSize: 16,
	opacity:0.4
},

TextProfile:{
	fontSize: 18,
	marginRight: 4,
	fontWeight:'bold',
	marginBottom: 5
},

SignButton:{
	marginHorizontal: 15,
	marginVertical: 10,
},

SignButtonLabel:{
	color: '#fff',
	
},

SignButtonContent:{
	paddingVertical: 10,
	width: '100%',
},

SignButtonTextContent:{
	marginVertical: 20,
	fontSize: 16
},

//////////////////////// HEADING

headingTitle:{
	fontSize: 20,
	fontWeight: 'bold'
},

headingSubTitle:{
	fontSize: 16,
	color: PrimaryColor,
	textTransform: 'uppercase',
	marginBottom: 3
},

headingButton:{

	backgroundColor: '#fff',
	borderWidth: 2,
	borderColor: PrimaryColor,
	paddingHorizontal: 12,
	paddingVertical: 5,
	borderRadius: 50
},

headingButtonText:{
	color: PrimaryColor,
	fontSize: 12,
	fontWeight: 'bold',
	textTransform: 'uppercase' 
},

//////////////////////// CARDS

card1Image:{
	width: screenWidth*0.7,
	borderRadius: 10,
	height: 170,
	marginLeft: 20
},

card1Gradient:{
	width: '100%',
	height: '100%',
	padding: 20,
	justifyContent: 'flex-end',
	flexDirection: 'column',
	borderRadius: 6
},

card1Title:{
	fontSize: 16,
	fontWeight: 'bold',
	color: '#fff',
},

card1SubTitle:{
	fontSize: 14,
	color: '#fff',
},

card2View:{
	width: screenWidth*0.23,
	justifyContent: 'center',
	alignItems: 'center',
	marginRight: 15
},

card2Content:{
	justifyContent: 'center',
	alignItems: 'center',
},

card2Title:{
	marginTop: 10,
	fontSize: 15,
	textAlign: 'center',
},

card3Image:{
	width: "100%",
	height: screenWidth*0.38/1.3,
},

card3Overlay:{
	width: '100%',
	height: '100%',
	backgroundColor: "rgba(0,0,0,0.5)",
	borderRadius: 6,
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	paddingHorizontal: 20,
},

card3Title:{
	fontSize: 16,
	textAlign: 'center',
	fontWeight: 'bold',
	color: '#fff',
},

card5Image:{
	width: '100%',
	height: screenHeight*0.20,
	backgroundColor: '#000',
	borderRadius: 6,
	marginTop: 20
},

card5Gradient:{
	width: '100%',
	height: '100%',
	padding: 25,
	justifyContent: 'flex-end',
	flexDirection: 'column',
	borderRadius: 6,
},

card5Title:{
	fontSize: 16,
	fontWeight: 'bold',
	color: '#fff',
	paddingRight: 15,
	lineHeight: 25,

},

card5SubTitle:{
	fontSize: 14,
	fontWeight: 'bold',
	color: PrimaryColor,
	marginBottom: 8,
	textTransform: 'uppercase'
},

card6:{
	marginBottom: 25,
	position: 'relative',
	marginLeft: 20,
	width: screenWidth*0.80,
},

card6View:{
	borderTopLeftRadius: 6,
	borderTopRightRadius: 6,
	height: 175
},

card6OldPrice:{
	opacity: 0.3,
	fontWeight: 'bold',
	fontSize: 20,
	textDecorationLine: 'line-through',
	marginRight: 10
},

card6Price:{
	fontSize: 20,
	fontWeight: 'bold',
	marginRight: 10
	
},

card6DiscountView:{
	marginRight: 10,
	backgroundColor: '#d0fcb4',
	paddingHorizontal: 15,
	paddingVertical: 3,
	borderRadius: 100
},

card6DiscountText:{
	color: '#27ae60',
	fontSize: 16,
},

card6Expire:{
	backgroundColor: 'red',
	paddingHorizontal: 15,
	paddingVertical: 10,
	marginTop: -35,
	alignItems: 'center',
	flexDirection: 'row',
	justifyContent: 'center'
},

card7:{
	marginBottom: 25,
	position: 'relative',
	marginLeft: 20,
	width: screenWidth*0.80,
	height: screenHeight*0.28
},

card7Content:{
	width: screenWidth*0.80,
	height: screenHeight*0.28,
	borderRadius: 6,
	justifyContent: 'flex-end',
	paddingHorizontal:20,
},

card7Title:{
	color: '#fff',
	fontSize: 17,
	fontWeight: 'bold',
	marginBottom: 6
},

card7OldPrice:{
	color: '#fff',
	opacity: 0.7,
	fontWeight: 'bold',
	fontSize: 20,
	textDecorationLine: 'line-through',
	marginRight: 10
},

card7Price:{
	color: '#fff',
	fontSize: 20,
	fontWeight: 'bold',
	marginRight: 10
	
},

card7DiscountView:{
	marginRight: 10,
	backgroundColor: '#27ae60',
	paddingHorizontal: 15,
	paddingVertical: 3,
	borderRadius: 100
},

card7DiscountText:{
	color: '#d0fcb4',
	fontSize: 14,
},

card7Badge:{
	backgroundColor: 'rgba(0,0,0,0.35)',
	paddingVertical: 6,
	paddingHorizontal: 15,
	borderRadius: 50,
	marginBottom: 10,
	alignSelf: 'flex-start'
},

card7Expire:{
	position: 'absolute',
	top: 0,
	right:0,
	left: 0,
	zIndex: 9,
	backgroundColor: 'red',
	paddingVertical: 10,
	paddingHorizontal: 15,
	justifyContent: 'center',
	flexDirection: 'row',
	alignItems: 'center'
},

card8Content:{
	paddingLeft:15,
},

card8Title:{
	fontSize: 17,
	marginTop: 10,
	fontWeight: 'bold',
	marginBottom: 6
},

card8SubTitle:{
	fontSize: 14,
},

card8OldPrice:{
	opacity: 0.3,
	fontWeight: 'bold',
	fontSize: 20,
	textDecorationLine: 'line-through',
	marginRight: 10
},

card8Price:{
	fontSize: 20,
	fontWeight: 'bold',
	marginRight: 10
	
},

card8DiscountView:{
	marginRight: 10,
	backgroundColor: '#d0fcb4',
	paddingHorizontal: 15,
	paddingVertical: 3,
	borderRadius: 100
},

card8DiscountText:{
	color: '#27ae60',
	fontSize: 14,
},

card8Badge:{
	backgroundColor: '#f1c40f',
	paddingVertical: 6,
	paddingHorizontal: 15,
	borderRadius: 50,
	marginTop: 10,
	flexDirection: 'row',
	flexDirection: 'row',
	alignItems: 'center',
	alignSelf: 'flex-start'
},

card9View:{
width: screenWidth*0.38,
marginLeft: 15,
},

card9Background:{
width: screenWidth*0.38,
height: screenHeight * 0.15,
marginLeft: 10,
},

card9Gradient:{
width: screenWidth*0.38,
height: screenHeight * 0.15,
borderRadius: 6,
justifyContent: 'flex-end',
alignItems: 'flex-start'
},

card9Title:{
fontSize: 15,
paddingHorizontal:15,
paddingVertical:10,
color:'#fff',
fontWeight:'bold'
},

card9Expire:{
	position: 'absolute',
	bottom: 0,
	right:0,
	left: 0,
	zIndex: 9,
	backgroundColor: 'red',
	paddingVertical: 10,
	paddingHorizontal: 15,
	justifyContent: 'center',
	flexDirection: 'row',
	alignItems: 'center',
	borderBottomRightRadius: 6,
	borderBottomLeftRadius: 6
},

card10View:{
	width: screenWidth*0.18,
	justifyContent: 'center',
	alignItems: 'center',
	marginRight: 15
},

card10Content:{
	justifyContent: 'center',
	alignItems: 'center',
},

card10Title:{
	marginTop: 10,
	fontSize: 14,
	textAlign: 'center',
	fontWeight:'bold',
	color:'#fff'
},

card11:{
	marginBottom: 25,
	position: 'relative',
	width: '100%',
},

card11View:{
	borderTopLeftRadius: 6,
	borderTopRightRadius: 6,
	height: 175
},

card11OldPrice:{
	opacity: 0.3,
	fontWeight: 'bold',
	fontSize: 20,
	textDecorationLine: 'line-through',
	marginRight: 10
},

card11Price:{
	fontSize: 20,
	fontWeight: 'bold',
	marginRight: 10
	
},

card11DiscountView:{
	marginRight: 10,
	backgroundColor: '#d0fcb4',
	paddingHorizontal: 15,
	paddingVertical: 3,
	borderRadius: 100
},

card11DiscountText:{
	color: '#27ae60',
	fontSize: 16,
},

card11Expire:{
	backgroundColor: 'red',
	paddingHorizontal: 15,
	paddingVertical: 10,
	marginTop: -35,
	alignItems: 'center',
	flexDirection: 'row',
	justifyContent: 'center'
},

//////////////////////// MISC

badgeRightTop:{
	position: 'absolute',
	right: 10,
	top: 10,
	zIndex: 9,
	backgroundColor: '#f1c40f',
	paddingVertical: 6,
	paddingHorizontal: 15,
	borderRadius: 50,
	justifyContent: 'flex-end',
	flexDirection: 'row',
	alignItems: 'flex-start'
},

badgeLeftTop:{
	position: 'absolute',
	left: 10,
	top: 10,
	zIndex: 9,
	backgroundColor: 'rgba(0,0,0,0.35)',
	paddingVertical: 6,
	paddingHorizontal: 15,
	borderRadius: 50,
	justifyContent: 'flex-end',
	flexDirection: 'row',
	alignItems: 'flex-start'
},

ColProps:{
	justifyContent: 'flex-end',
	flexDirection: 'column',
	alignItems: 'flex-start'
},

ColPropsImage:{
	width: 40,
	height: '100%'
},

ColPropsIcon:{
	backgroundColor: '#fff',
	width: 35,
	marginTop: 5,
	marginBottom: 8
},

ColPropsText:{
	fontWeight: '500',
	fontSize: 16,
	marginRight: I18nManager.isRTL ? 0 : 10,
	marginLeft: I18nManager.isRTL ? 10 : 0,
},

ColProps2:{
	justifyContent: 'flex-start',
	flexDirection: 'row',
	alignItems: 'center',
},

ColProps2Text:{
	fontWeight: '500',
	fontSize: 18,
	color: '#999'
},

ColProps2Icon:{
	color: '#999',
	fontSize: 22,
	marginRight: 4
},

ColProps3:{
	flexDirection: 'row',
	justifyContent: 'flex-start'
},

ColProps3Text:{
	fontWeight: '500',
	fontSize: 18,
	color: '#fff'
},

ColProps3Icon:{
	color: '#fff',
	fontSize: 22,
	marginRight: 4
},

TitleHome:{
	fontSize: 20,
	marginVertical: 15,
	fontWeight: 'bold',
	textAlign: 'center' 
},

TitleList:{
	color: '#000',
},

IconList:{
	marginTop: 15,
	fontSize: 14,
	backgroundColor: '#eee',
	borderRadius: 6
},

FullHeightScreen:{
	width: '100%',
	paddingRight: 10,
	paddingVertical: 10,
	flex: 1,
	height: screenHeight
},

MembersScreen:{
	paddingHorizontal: 10,
	paddingVertical: 10,
	flex: 1,
},

FullHeightScreen2:{
	width: '100%',
	paddingHorizontal: 10,
	paddingVertical: 10,
	marginBottom: 30
},

AuthPage:{
	flex: 1,
	justifyContent: 'center',
},

SearchScreen:{
	marginHorizontal:15,
	marginTop: 20,
	flex: 1,
},

HomeScreen:{
	width: '100%',
	paddingBottom: 30,
	flex: 1,
},

Home3Screen:{
	width: '100%',
	paddingBottom: 30,
	flex: 1,
},

PageScreen:{
	width: '100%',
	paddingVertical: 20,
	flex: 1,
},

TermsAboutPageScreen:{
	width: '100%',
	paddingVertical: 30,
	paddingHorizontal: 30,
	flex: 1,
},

TransparentPageScreen:{
	width: '100%',
	paddingHorizontal: 25,
	paddingTop: Platform.OS === 'ios' ? 110 : 100,
	flex: 1,
},

CommentsScreen:{
	width: '100%',
	paddingHorizontal: 10,
	paddingVertical: 10,
	flex: 1,
},

ContactPage:{
	marginTop: 100,
	flex: 1
},

PageLogo:{
	width: '100%',
	height: screenHeight/15,
	maxHeight: '100%',
	marginBottom: 50,
},

JustifyMiddle:{
	justifyContent: 'center',
	alignContent: 'center',
	alignItems: 'center',
},

FlexDirectionCenter:{
	justifyContent: 'center',
	alignContent: 'center',
	alignItems: 'center',
	flexDirection: 'row'
},

JustifyFlexStart:{
	alignItems: 'flex-start',
},

JustifyFlexEnd:{
	alignItems: 'flex-end',
},

LoadMore:{
	borderRadius: 100,
	borderWidth: 1.5,
	borderColor: PrimaryColor,
	width: '80%',
	height: screenHeight*0.08,
	marginHorizontal: 20,
	alignSelf: 'center',
	justifyContent: 'center',
	alignContent: 'center',
	alignItems: 'center',
},

NoMoreItems:{
	height: 50,
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: 6,
	marginBottom: 60
},

paddingHorizontal: {
	paddingHorizontal: 25
},

statusbarOverlay:{
	width: '100%',
	height: screenHeight*0.13,
},

title_card:{
color: '#FFF',
fontSize: 18,
fontWeight: 'bold' 
},

subtitle_card:{
color: '#FFF',
fontSize: 16,
opacity: 0.8,
marginVertical: 6
},

category_card:{
marginBottom: 6,
color: PrimaryColor,
fontWeight: 'bold',
fontSize: 16,
},

gradient_card:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: screenHeight * 0.23,
alignItems: 'flex-start',
justifyContent: 'flex-end',
borderRadius: 8
},

background_card:{
width: screenWidth*0.9,
height: screenHeight * 0.23,
alignItems: 'flex-start',
alignSelf: 'center', 
justifyContent: 'flex-end',
padding: 15,
marginBottom: 20
},

selectModal:{
    height: screenHeight * 0.63,
    width: screenWidth * 0.80,
    alignSelf: 'center', 
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderRadius: 6
},

buttonSelectModal:{
	width: '100%',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: PrimaryColor,
	paddingVertical: 10,
	borderRadius: 6
}

});