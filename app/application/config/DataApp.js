import ConfigApp from "./ConfigApp";
import AsyncStorage from '@react-native-async-storage/async-storage';

const JSON_FOLDER = ConfigApp.URL+'json/';
const LIMIT_ITEMS = 10;
const RECENT_LIMIT = 10;
const FEATURED_LIMIT = 10;

////////////////////////////////// API

export async function getFeaturedDeals(){
  try {
    const url = `${JSON_FOLDER}data_deals.php?filter=featured&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getExclusiveDeals(){
  try {
    const url = `${JSON_FOLDER}data_deals.php?filter=exclusive&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getLatestDeals(){
  try {
    const url = `${JSON_FOLDER}data_deals.php?limit=8&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getGalleryByDeal(id){
  try {
    const url = `${JSON_FOLDER}data_gallery.php?id=${id}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getDealById(id){
  try {
    const url = `${JSON_FOLDER}data_deals.php?id=${id}&limit=1`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getDealsByCategory(id, page){
  try {
    const url = `${JSON_FOLDER}data_deals.php?category=${id}&page=${page}&limit=${LIMIT_ITEMS}&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getDealsByStore(id, page){
  try {
    const url = `${JSON_FOLDER}data_deals.php?store=${id}&page=${page}&limit=${LIMIT_ITEMS}&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getDealsByLocation(id, page){
  try {
    const url = `${JSON_FOLDER}data_deals.php?location=${id}&page=${page}&limit=${LIMIT_ITEMS}&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getPrices(){
  try {
    const url = `${JSON_FOLDER}data_prices.php`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getFeaturedCategories(){
  try {
    const url = `${JSON_FOLDER}data_categories.php?featured=true`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getCategories(){
  try {
    const url = `${JSON_FOLDER}data_categories.php`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getSubCategories(id){
  try {
    const url = `${JSON_FOLDER}data_subcategories.php?category=${id}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getFeaturedStores(){
  try {
    const url = `${JSON_FOLDER}data_stores.php?featured=true`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getStores(){
  try {
    const url = `${JSON_FOLDER}data_stores.php`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getStoreById(id){
  try {
    const url = `${JSON_FOLDER}data_stores.php?id=${id}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getFeaturedLocations(){
  try {
    const url = `${JSON_FOLDER}data_locations.php?featured=true`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getLocations(){
  try {
    const url = `${JSON_FOLDER}data_locations.php`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getLocationById(id){
  try {
    const url = `${JSON_FOLDER}data_locations.php?id=${id}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getSlider(){
  try {
    const url = `${JSON_FOLDER}data_sliders.php`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function searchApi(query, category, subcategory, store, location, price, rating, page){

  const url = `${JSON_FOLDER}data_deals.php?query=${query}&category=${category}&subcategory=${subcategory}&store=${store}&location=${location}&price=${price}&rating=${rating}&page=${page}&limit=${LIMIT_ITEMS}`;

  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getFavorites(id, page){
  try {
    const url = `${JSON_FOLDER}data_favorites.php?user=${id}&page=${page}&limit=${LIMIT_ITEMS}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getComments(item, page){
  try {
    const url = `${JSON_FOLDER}data_reviews.php?item=${item}&page=${page}&limit=${LIMIT_ITEMS}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getStrings(){

  const url = `${JSON_FOLDER}data_strings.php`;
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    
  }
}

////////////////////////////////// Like & Follow System

export const submitComment = async (id, user, rating, body) => {

  const url = `${JSON_FOLDER}data_review.php`;
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment_rating: rating,
                comment_item: id,
                comment_user: user,
                comment_text: body
            })
        })
        const json = await resp.json();
        return json;
    }catch (e) {
          // console.log('Error...', e.message);
      }
}

export async function checkLike(user, item){
  try {
    const url = `${JSON_FOLDER}data_checklike.php?user=${user}&item=${item}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export const submitLike = async (user, item) => {

  const url = `${JSON_FOLDER}data_like.php`;
    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                action: 'like',
                user_id: user,
                item_id: item

            })
        })
        const json = await resp.json();
        return json;
    
    }catch (e) {

          // console.log('Error...', e.message);

      }
}

export const submitUnLike = async (user, item) => {

  const url = `${JSON_FOLDER}data_like.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                action: 'unlike',
                user_id: user,
                item_id: item

            })
        })
        const json = await resp.json();
        return json;
    
    }catch (e) {

          // console.log('Error...', e.message);

      }
}

////////////////////////////////// Authentication


export const checkUserApi = async (email) => {

	const url = `${JSON_FOLDER}data_check.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                user_email: email,

            })
        })
        const json = await resp.json();
        return json;
		
		}catch (e) {

          // console.log('Error...', e.message);

      }
}

export const restPassApi = async (email) => {

	const url = `${JSON_FOLDER}data_forgot.php?user=${email}`;

    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      return responseJson;
		}catch (e) {
          // console.log('Error...', e.message);
      }
}

export const signInApi = async (email, password) => {

	const url = `${JSON_FOLDER}data_signin.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                user_email: email,
                user_password: password

            })
        })
        const json = await resp.json();

        return json;
		
		}catch (e) {

          // console.log('Error...', e.message);

      }
}

export const contactForm = async (name, email, message) => {

  const url = `${JSON_FOLDER}contact_form.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: name,
                user_email: email,
                user_message: message
            })
        })
        const json = await resp.json();
        return json;
    
    }catch (e) {

          // console.log('Error...', e.message);

      }
}

export const signUpApi = async (name, email, password) => {

	const url = `${JSON_FOLDER}data_signup.php`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                user_name: name,
                user_email: email,
                user_password: password

            })
        })
        const json = await resp.json();
        

        return json;
		
		}catch (e) {

          // console.log('Error...', e.message);

      }
}

export const signOutApi = async () => {

	try {
		await AsyncStorage.removeItem("isLogged");
		await AsyncStorage.removeItem("userData");
	} catch (error) {
		//console.log("Error", error);
	}

}

export const getLogged = async () => {
	try {
		const isLogged = await AsyncStorage.getItem("isLogged");
		return isLogged;
	} catch (error) {
		//console.log("Error", error);

	}
}

export const setLogged = async (value) => {
	try {
		await AsyncStorage.setItem("isLogged", `${value}`);
	} catch (error) {
		//console.log("Error", error);
	}

}

export const setUserData = async (user) => {

	try {
		await AsyncStorage.setItem("userData", JSON.stringify(user));
	} catch (error) {
		//console.log("Error", error);
	}

}

export const getUserData = async () => {

	try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      return data;
	} catch (error) {
		//console.log("Error", error);
	}
}

////////////////////////////////// Favorites

export const setRecipeBookmark = async (item, id) => {

  try {

  await AsyncStorage.getItem('recipesFav').then(response => {

    const res = JSON.parse(response);

    if (res !== null) {
      let data = res.find(e => e.id === res.id);
      if (data == null) {
        res.push(item);
        AsyncStorage.setItem('recipesFav', JSON.stringify(res));
      }
    } else {
      let data = [];
      data.push(item);
      AsyncStorage.setItem('recipesFav', JSON.stringify(data));

    }

  });

    return true;

  } catch (error) {
    //console.log("Error", error);
  }

}

export const removeRecipeBookmark = async (id) => {

  try {

     const data = await AsyncStorage.getItem('recipesFav').then(token => {
     const res = JSON.parse(token);
     return res.filter(e => e.id !== id);

  });

   await AsyncStorage.setItem('recipesFav', JSON.stringify(data));
   return true;
   
  } catch (error) {
    //console.log("Error", error);
  }

}

export const getFavrecipes = async () => {

  try {
      let items = await AsyncStorage.getItem("recipesFav");
      let data = JSON.parse(items);
      return data;
  } catch (error) {
    //console.log("Error", error);
  }
}