import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOkResponse({ type:AuthEntity })
    login(@Body() {email,password} : LoginDto){
      return this.authService.login(email,password);
    }
  }

