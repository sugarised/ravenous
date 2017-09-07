const clientId = 'iF55A-Sa5vA2CefHCbWWTA';
const secret = 'YpitdLd6FbJYxUmkmQ1hQCP2qZvAE8k2AtrSqLJRJSAeF9IsfvLqlFAIxNGy8LyW';
let access_token;
let Yelp = {
  getAccessToken(){
    if(access_token){
      new Promise(function(resolve){
        resolve(access_token);
      })
    }
    return fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + secret,{
      method: 'POST'
    }).then(response => {return response.json();
    }).then(jsonResponse => {access_token = jsonResponse.access_token})
  },
  search(term, location, sortBy){
    return Yelp.getAccessToken().then(() => {fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + term + '&location=' + location + '&sort_by=' + sortBy, {
      headers: {
        Authorization: 'Bearer ${accessToken}'
      }
    }).then(()=>{
      return fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + secret, {
        method: 'POST'}
      )}
    ).then(
      jsonResponse => {
        if(jsonResponse.businesses){
          return jsonResponse.businesses.map(business => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.address,
              city: business.city,
              state: business.state,
              zipCode: business.zipCode,
              category: business.category,
              rating: business.rating,
              reviewCount: business.reviewCount
            }
          });
        }
      }
    );
    })
  }

};

export default Yelp;
