import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}
    async register(email: string, password: string, name: string) {
        const existingEmail = await this.userService.findByEmail(email);
        if (existingEmail) {
            throw new BadRequestException('Email already exists');
        }
        const hashed_password = await bcrypt.hash(password, 10);
        const user = await this.userService.create({
            email,
            password: hashed_password,
            name,
        });
        return user;
    }
    async login(email:string, password:string) {
        const existingUser = await this.userService.findByEmail(email);
        if (!existingUser) {
            throw new BadRequestException("Email does not exist");
        }
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            throw new BadRequestException("Wrong password");
        }
        const token = this.jwtService.sign({
            userId: existingUser._id,
        });
        return {
            access_token: token
        }
    }
}
