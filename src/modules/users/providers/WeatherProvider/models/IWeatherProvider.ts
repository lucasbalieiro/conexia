export default interface IWeatherProvider {
    getWeather(city: string): Promise<number | undefined>
}