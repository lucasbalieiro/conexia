
import { v4 } from 'uuid'

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '../../infra/typeorm/entities/User'

class UsersRepository implements IUsersRepository {
    private users: User[] = []

    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(user => user.id === id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === email);
        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User()

        Object.assign(user, { id: v4() }, userData)

        this.users.push(user);

        return user;
    }
}

export default UsersRepository;