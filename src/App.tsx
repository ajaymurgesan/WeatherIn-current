
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './App.css';

interface WeatherData {
    main: {
        temp: number;
    };
    sys: {
        country: string;
    };
    weather: Array<{
        icon: string;
        description: string;
    }>;
    name: string;
}

interface WeatherState {
    loading: boolean;
    data: WeatherData | {};
    error: boolean;
}

const GfGWeatherApp: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [weather, setWeather] = useState<WeatherState>({
        loading: false,
        data: {},
        error: false,
    });

    const toDateFunction = (): string => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const WeekDays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const currentDate = new Date();
        const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
        return date;
    };

    const search = async (event: KeyboardEvent<HTMLInputElement>): Promise<void> => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setInput('');
            setWeather({ ...weather, loading: true });
            const url = 'https://api.openweathermap.org/data/2.5/weather';
            const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

            await axios
                .get(url, {
                    params: {
                        q: input,
                        units: 'metric',
                        appid: api_key,
                    },
                })
                .then((res) => {
                    console.log('res', res);
                    setWeather({ data: res.data as WeatherData, loading: false, error: false });
                })
                .catch((error) => {
                    setWeather({ ...weather, data: {}, error: true });
                    setInput('');
                    console.log('error', error);
                });
        }
    };

    return (
        <div className="App">
            <h1 className="app-name">
                GeeksforGeeks Weather App
            </h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="city-search"
                    placeholder="Enter City Name.."
                    name="query"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyPress={search}
                />
            </div>
            {weather.loading && (
                <>
                    <br />
                    <br />
                    {/*<Oval type="Oval" color="black" height={100} width={100} />*/}
                </>
            )}
            {weather.error && (
                <>
                    <br />
                    <br />
                    <span className="error-message">
                         <FontAwesomeIcon icon={faFrown} />
                         <span style={{ fontSize: '20px' }}>City not found</span>
                     </span>
                </>
            )}
            {weather && (weather.data as WeatherData).main && (
                <div>
                    <div className="city-name">
                        <h2>
                            {(weather.data as WeatherData).name},
                            <span>{(weather.data as WeatherData).sys.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{toDateFunction()}</span>
                    </div>
                    <div className="icon-temp">
                        <img
                            src={`https://openweathermap.org/img/wn/${(weather.data as WeatherData).weather[0].icon}@2x.png`}
                            alt={(weather.data as WeatherData).weather[0].description}
                        />
                        {Math.round((weather.data as WeatherData).main.temp)}
                        <sup className="deg">°C</sup>
                    </div>
                    <div className="des-wind">
                        <p>{(weather.data as WeatherData).weather[0].description.toUpperCase()}</p>
                        <p>Wind Speed: {(weather.data as WeatherData).wind.speed}m/s</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GfGWeatherApp;
