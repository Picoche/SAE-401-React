const GET_LOCATION_URL = "http://localhost:4000/boutiques/places?input=";
const BOUTIQUES_DETAILS_URL =
  "http://localhost:4000/boutiques/places/details?place_id=";

const getShopInfo = async (boutique) => {
  const retrievePlaceId = await fetch(
    `${GET_LOCATION_URL}${boutique.adresse_boutique}+${boutique.nom_boutique}`
  );

  const boutiqueId = await retrievePlaceId.json();

  // console.log(boutiqueId);

  if (boutiqueId.candidates) {
    const retrieveBoutiqueInfo = await fetch(
      `${BOUTIQUES_DETAILS_URL}${boutiqueId.candidates[0].place_id}`
    );

    const boutiqueInfo = await retrieveBoutiqueInfo.json();

    // console.log(boutiqueInfo);

    if (!boutiqueInfo.result.photos)
      return {
        position: [
          boutiqueInfo.result.geometry.location.lat,
          boutiqueInfo.result.geometry.location.lng,
        ],
        rating: boutiqueInfo.result.rating,
        ratingNumber: boutiqueInfo.result.user_ratings_total,
        hours: boutiqueInfo.result.opening_hours,
        reviews: boutiqueInfo.result.reviews,
        address: boutiqueInfo.result.address_components,
        name: boutiqueInfo.result.name,
        id: boutique.id_boutique,
      };

    const boutiquePhoto = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${boutiqueInfo.result.photos[0].photo_reference}&key=AIzaSyDPpCouT8a5CIliE6YhC3tJ4we32-jy6vY`;

    return {
      position: [
        boutiqueInfo.result.geometry.location.lat,
        boutiqueInfo.result.geometry.location.lng,
      ],
      rating: boutiqueInfo.result.rating,
      ratingNumber: boutiqueInfo.result.user_ratings_total,
      hours: boutiqueInfo.result.opening_hours,
      reviews: boutiqueInfo.result.reviews,
      address: boutiqueInfo.result.address_components,
      photos: boutiqueInfo.result.photos,
      name: boutiqueInfo.result.name,
      photo: boutiquePhoto,
      id: boutique.id_boutique,
    };
  } else {
    return null;
  }
};

export const getUserLocation = async (userLocation) => {
  const retrieveUserLocation = await fetch(
    `${GET_LOCATION_URL}${userLocation}`
  );

  const userLocationInfo = await retrieveUserLocation.json();
  // console.log(userLocationInfo);
  return userLocationInfo;
};

export default getShopInfo;
