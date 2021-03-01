import IMusicRecomendationDTO from "../dtos/IMusicRecomendationDTO";
import IMusicProvider from "../models/IMusicProvider";
import axios from 'axios'

export default class DeezerMusicProvider implements IMusicProvider {
    public async getRecomendationBasedOnTemperature(temperature: number): Promise<IMusicRecomendationDTO[]> {]
        const client = axios.get('https://developers.deezer.com/api/explorer?url=search/radio?q=Pop')
        return [{
            album: 'Test Album',
            artists: 'Test Musician',
            music: 'Test Music'
        }]
    }
}