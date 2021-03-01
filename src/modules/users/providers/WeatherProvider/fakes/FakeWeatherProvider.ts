import IWeatherProvider from "../models/IWeatherProvider";

export default class FakeWeatherProvider implements IWeatherProvider {
    public async getWeather(user_id: string): Promise<number> {
        const fakeTemperature = Math.floor(
            Math.random() * (35 - 2) + 2
        )
        return fakeTemperature;
    }
}