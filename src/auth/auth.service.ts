import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from "./constants";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId, expiresIn: jwtConstants.tokenLife };
        const refreshPayload = { sub: user.userId, expiresIn: jwtConstants.refreshTokenLife };

        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(refreshPayload),
        };

    }

    async refresh(req) {
        const { refreshToken } = req.token;

    }
}
