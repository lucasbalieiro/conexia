

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider'
import FakeUsersRepository from '../repositories/fake/fakeUsersRepository'
import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';


describe('Authentication', () => {
    it('should be able to create a new session', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider()
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
        const createSession = new CreateSessionService(fakeUsersRepository, fakeHashProvider)

        await createUser.execute({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            hometown: 'Manaus',
            password: '123456'
        })

        const session = await createSession.execute({
            email: 'jhondoe@example.com',
            password: '123456'
        })

        expect(session)
            .toHaveProperty('token')
    })

    it('should not be able to create a new session with wrong email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider()
        const createSession = new CreateSessionService(fakeUsersRepository, fakeHashProvider)

        expect(createSession.execute({
            email: 'jhondoe@example.com',
            password: '123456'
        }))
            .rejects
            .toBeInstanceOf(AppError);
    })

    it('should not be able to create a new session with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider()
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
        const createSession = new CreateSessionService(fakeUsersRepository, fakeHashProvider)

        await createUser.execute({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            hometown: 'Manaus',
            password: '123456'
        })
        expect(createSession.execute({
            email: 'jhondoe@example.com',
            password: 'wrongpassword'
        }))
            .rejects
            .toBeInstanceOf(AppError);
    })
})