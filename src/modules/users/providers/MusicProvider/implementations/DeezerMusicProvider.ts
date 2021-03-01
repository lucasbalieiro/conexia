import IMusicRecomendationDTO from "../dtos/IMusicRecomendationDTO";
import IMusicProvider from "../models/IMusicProvider";

export default class DeezerMusicProvider implements IMusicProvider {
    public async getRecomendationBasedOnTemperature(temperature: number): Promise<IMusicRecomendationDTO[]> {
        
        return [{
            album: 'Test Album',
            artists: 'Test Musician',
            music: 'Test Music'
        }]
    }
}