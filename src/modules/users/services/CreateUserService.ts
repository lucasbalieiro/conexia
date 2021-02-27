import { hash } from 'bcrypt';
import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  hometown: string;
}

@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  public async execute({
    name, email, password, hometown,
  }: IRequest): Promise<User> {

    const emailAlreadyRegistered = await this.userRepository.findByEmail(email);

    if (emailAlreadyRegistered) {
      throw new AppError('Email already registered', 409);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      hometown,
    });

    return user;
  }
}

export default CreateUserService;
