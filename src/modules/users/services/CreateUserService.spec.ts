

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/fakeUsersRepository'
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository)

        const user = await createUser.execute({
            name: 'Lucas Balieiro',
            email: 'lucasbalieiro@example.com',
            hometown: 'Manaus',
            password: '123456'
        })

        expect(user)
            .toHaveProperty('id')
    })

    it('should not be able to create a new user with duplicated email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository)

        await createUser.execute({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            hometown: 'Manaus',
            password: '123456'
        })

        expect(
            createUser.execute({
                name: 'Jane Doe',
                email: 'jhondoe@example.com',
                hometown: 'Manaus',
                password: '123456'
            })
        )
            .rejects
            .toBeInstanceOf(AppError);

    })
})