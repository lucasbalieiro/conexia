import IWeatherProvider from "../models/IWeatherProvider";
import ApiConfig from '@config/openWeatherApi'
import axios from 'axios'
export default class OpenWeatherProvider implements IWeatherProvider {
    public async getWeather(city: string): Promise<number | undefined> {
        const client = await axios.get(`https://${ApiConfig.api.url}/weather?q=${city}&units=${ApiConfig.api.units}&&appid=${ApiConfig.api.key}`)
        console.log(client.data.main.temp)
        return client.data.main.temp
    }
}