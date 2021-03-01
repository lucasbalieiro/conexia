import IMusicRecomendationDTO from "../dtos/IMusicRecomendationDTO";
import IMusicProvider from "../models/IMusicProvider";

export default class FakeMusicProvider implements IMusicProvider {
    private musics: IMusicRecomendationDTO[] = []
    public async getRecomendationBasedOnTemperature(temperature: number): Promise<IMusicRecomendationDTO[]> {
        this.musics.push(
            {
                album: 'Test Album',
                artists: 'Test Musician',
                music: 'Test Music'
            }
        )
        return this.musics;
    }

}