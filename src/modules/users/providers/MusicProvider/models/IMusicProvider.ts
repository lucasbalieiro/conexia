import IMusicRecomendationDTO from "../dtos/IMusicRecomendationDTO";

export default interface IMusicProvider {
    getRecomendationBasedOnTemperature(temperature: number) : Promise<IMusicRecomendationDTO[]>
}