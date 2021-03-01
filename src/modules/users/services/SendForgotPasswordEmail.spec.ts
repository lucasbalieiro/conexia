import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fake/fakeUsersRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/provider/MailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '../repositories/fake/FakeUSerTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let fakeUserTokensRepository: FakeUserTokensRepository;

describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository
        )
    });

    it('should be able recover the password by email', async () => {

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

        await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password: '123456',
            hometown: 'Manaus'
        })
        await sendForgotPasswordEmail.execute({
            email: 'jhondoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled()
    })

    it('should not be able to recover the password of a non-existing user', async () => {
        await expect(sendForgotPasswordEmail.execute({
            email: 'jhondoe@example.com',
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

        const user = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password: '123456',
            hometown: 'Manaus'
        })
        await sendForgotPasswordEmail.execute({
            email: 'jhondoe@example.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id)
    })
})