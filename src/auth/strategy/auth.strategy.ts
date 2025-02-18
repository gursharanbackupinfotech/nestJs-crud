import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { jwtSecret } from '../auth.module';

@Injectable()
export class JwtStrategy  extends PassportStrategy(Strategy,'jwt'){
    constructor(private userService:UsersService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret
        })
    }

    async validate({userId}: {userId:number}){
        const user = await this.userService.findOne(userId);

        if(!user){
            throw new UnauthorizedException();
        }

        return user
    }
}