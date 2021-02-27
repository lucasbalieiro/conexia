import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../entities/User';
import AppError from '../../../shared/errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  hometown: string;
}

class CreateUserService {
  public async execute({
    name, email, password, hometown,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const emailAlreadyRegistered = await userRepository.findOne({ where: { email } });

    if (emailAlreadyRegistered) {
      throw new AppError('Email already registered', 409);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      hometown,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
