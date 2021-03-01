import { injectable, inject } from 'tsyringe'

// import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/provider/MailProvider/models/IMailProvider'
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) { }

  public async execute({
    email
  }: IRequest): Promise<void> {

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email not registered')

    }

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(email,
      `Pedido de recuperação de senha recebido: ${token}`,
    )
  }
}

export default SendForgotPasswordEmailService;
