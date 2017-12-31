import React from 'react'
import PropTypes from 'prop-types'
import './Weather.css'

const Weather = ({ weather }) => (
  weather ?
    <div  className="weather">
      <hr/>
      <table>
        <tbody>
          <tr>
            {weather.weather ?
              <td>{weather.weather}</td> : <td></td>
            }
            {weather.temp_f ?
              <td>{weather.temp_f}&#8457;</td> : <td></td>
            }
            {weather.relative_humidity ?
              <td>{weather.relative_humidity}</td> : <td></td>
            }
            <td>Humidity</td>
          </tr>
          <tr>
            <td>Wind avg/gust(mph)</td>
            {weather.wind_mph !== undefined ?
              <td>{weather.wind_mph}</td> : <td></td>
            }
            {weather.wind_gust_mph !== undefined  ?
              <td>{weather.wind_gust_mph}</td> : <td></td>
            }
            {weather.wind_dir !== undefined ?
              <td>{weather.wind_dir}</td> : <td></td>
            }
          </tr>
        </tbody>
      </table>
      <div className="wu-img">
        <p>Powered by</p>
        <img
          src={weather.image.url}
          height={30}
          alt="Wunderground"></img>
      </div>
      <hr/>
    </div>
   : null
)

Weather.propTypes = {
  weather: PropTypes.object,
}

export default Weather
