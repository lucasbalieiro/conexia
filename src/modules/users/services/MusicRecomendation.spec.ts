import MusicRecomendationService from './MusicRecomendationService'


import FakeUsersRepository from '../repositories/fake/fakeUsersRepository'
import FakeWeatherRepository from '../providers/WeatherProvider/fakes/FakeWeatherProvider'
import FakeMusicProvider from '../providers/MusicProvider/fake/FakeMusicProvider'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeWeatherRepository: FakeWeatherRepository
let fakeMusicProvider: FakeMusicProvider

let musicRecomendation: MusicRecomendationService

describe('MusicRecomendationService', () => {

    beforeAll(() => {
        fakeWeatherRepository = new FakeWeatherRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeMusicProvider = new FakeMusicProvider();

        musicRecomendation = new MusicRecomendationService(
            fakeUsersRepository,
            fakeWeatherRepository,
            fakeMusicProvider
        );
    })

    it('should not be able to recomend music for non-existing user', async () => {

        await expect(
            musicRecomendation.execute({ user_id: 'fake-user-id' })
        )
            .rejects
            .toBeInstanceOf(AppError);

    })
})