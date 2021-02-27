import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
    ){}

  public async execute({ email, password }: Request): Promise<Response> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid Email or Password', 401);
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError('Invalid Email or Password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
