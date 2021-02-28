import { injectable, inject } from 'tsyringe'
import { differenceInHours } from 'date-fns'

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {

    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({
        token, password
    }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User Token does not exist')

        }
        const user = await this.userRepository.findById(userToken.user_id)

        if (!user) {
            throw new AppError("User does not exist");

        }

        const tokenCreatedAt = userToken.created_at;

        if (differenceInHours(tokenCreatedAt, Date.now()) > 2) {
            throw new AppError("Expired Token");
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.userRepository.save(user);
    }
}

export default ResetPasswordService;
