import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fake/fakeUsersRepository'
import ResetPasswordService from './ResetPasswordService';
import FakeMailProvider from '@shared/provider/MailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '../repositories/fake/FakeUSerTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let resetPassword: ResetPasswordService;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider()
        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            fakeHashProvider
        )
    });

    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password: '123456',
            hometown: 'Manaus'
        })

        const userToken = await fakeUserTokensRepository.generate(user.id)

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

        await resetPassword.execute({ token: userToken.token, password: '654321' });

        const updatedUser = await fakeUsersRepository.findById(user.id)

        expect(updatedUser?.password).toBe('654321')
        expect(generateHash).toHaveBeenCalledWith('654321')
    })

    it('should not be able to reset password with non-existing token', async () => {

        await expect(
            resetPassword.execute({ token: 'fake-token', password: '123456' })
        )
            .rejects
            .toBeInstanceOf(AppError)
    })

    it('should not be able to reset password with non-existing user', async () => {

        const userToken = await fakeUserTokensRepository.generate('fake-user-id')

        await expect(
            resetPassword.execute({ token: userToken.token, password: '123456' })
        )
            .rejects
            .toBeInstanceOf(AppError)
    })

    it('should not be able to reset password after 2 hours of token existence', async () => {

        const userToken = await fakeUserTokensRepository.generate('fake-user-id')

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date()
            return customDate.setHours(customDate.getHours() + 5)
        })

        await expect(
            resetPassword.execute({ token: userToken.token, password: '123456' })
        )
            .rejects
            .toBeInstanceOf(AppError)
    })

})