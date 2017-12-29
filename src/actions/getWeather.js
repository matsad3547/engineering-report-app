import {
  setDataProperty,
  setDataError,
  setWeatherData,
} from './index'

const wundergroundApiKey = process.env.REACT_APP_WUNDERGROUND_API_KEY

const getWeather = () => {

  return (dispatch, getState) => {

    const error = err => {
      console.error(`There was a geolocation error: ${err.message}`)
      dispatch(setDataError({weatherErr: err.message}))
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition( pos => {
        console.log('there is geolocation', pos);
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        fetch(`http://api.wunderground.com/api/${wundergroundApiKey}/conditions/q/${lat},${lng}.json`)
        .then( res => res.json() )
        .then( res => {
          const weatherData = res.current_observation

          const {
            relative_humidity,
            weather,
            temp_f,
            wind_dir,
            wind_gust_mph,
            wind_mph,
            image,
          } = weatherData

          const locale = weatherData.display_location.full

          dispatch(setWeatherData({
                relative_humidity,
                weather,
                temp_f,
                wind_dir,
                wind_gust_mph,
                wind_mph,
                image,
                locale,
              })
            )
         })
        .catch( err => {
          console.error('an error occurred while fetching weather:', err);
          dispatch(setDataError({weatherErr: err}))
          dispatch(setDataProperty({loading: false}))
        })
      }, error)
    }
    else {
      console.error('location and weather are not available');
      dispatch(setDataError({weatherErr: 'location not available'}))
      dispatch(setDataProperty({loading: false}))
    }
  }
}

export default getWeather
