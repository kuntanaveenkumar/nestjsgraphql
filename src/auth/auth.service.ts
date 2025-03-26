
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.orm.entity';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}


  async validateToken(token: string) {
      return this.jwtService.verify(token, {
          secret : process.env.JWT_SECRET_KEY
      });
  }

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlckBnbWFpbC5jb20iLCJpYXQiOjE3NDI5MDgxMjgsImV4cCI6MTc0MjkwODE4OH0.opQK4ZmjS1r_ldQ6kFAFbXnoTd8m-f51nW6MLz7vg2c
  async validateUser(username: string, pass: string): Promise<User | undefined | null> {
    const user = await this.usersService.findOneObservable(username).toPromise();

    

    console.log(user?.password)
    console.log(username+""+pass)

     if (user && user.password === pass) {
       //const { password, ...result } = user;
       return user;
     }
      
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
