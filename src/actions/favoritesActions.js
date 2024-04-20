export const addToFavorites = (stationName) => ({
    type: 'ADD_FAVORITE',
    payload: stationName
  });
  
  export const removeFromFavorites = (stationName) => ({
    type: 'REMOVE_FAVORITE',
    payload: stationName
  });
  