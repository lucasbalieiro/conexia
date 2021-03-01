import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider'
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import IWeatherProvider from './WeatherProvider/models/IWeatherProvider';
import OpenWeatherProvider from './WeatherProvider/implementations/OpenWeatherProvider';
import IMusicProvider from './MusicProvider/models/IMusicProvider';
import DeezerMusicProvider from './MusicProvider/implementations/DeezerMusicProvider';


container
    .registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
container
    .registerSingleton<IWeatherProvider>('WeatherProvider', OpenWeatherProvider)
container.registerSingleton<IMusicProvider>('MusicProvider', DeezerMusicProvider)