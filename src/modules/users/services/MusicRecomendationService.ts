import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IWeatherProvider from '../providers/WeatherProvider/models/IWeatherProvider';
import IMusicProvider from '../providers/MusicProvider/models/IMusicProvider';
import IMusicRecomendationDTO from '../providers/MusicProvider/dtos/IMusicRecomendationDTO';

interface IRequest {
    user_id: string;
}

@injectable()
class MusicRecomendationService {

    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('WeatherProvider')
        private weatherProvider: IWeatherProvider,

        @inject('MusicProvider')
        private musicProvider: IMusicProvider,
    ) { }

    public async execute({
        user_id
    }: IRequest): Promise<IMusicRecomendationDTO[]> {

        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new AppError('Invalid User');
        }

        const temperature = await this.weatherProvider.getWeather(user.hometown)

        if(!temperature){
            throw new AppError('Temperature could not be fetched', 500);
            
        }

        const musicRecomendations =
            await this.musicProvider.getRecomendationBasedOnTemperature(temperature)

        return musicRecomendations;

    }
}

export default MusicRecomendationService;
