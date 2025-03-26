import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // ✅ Get GraphQL context correctly
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req; // ✅ Extract request object

      if (!request) {
        throw new UnauthorizedException('Request object is undefined');
      }

      console.log(request); // Debugging

      const { authorization } = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide a token');
      }

      const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = await this.authService.validateToken(authToken);
      request.decodedData = resp;

      return true;
    } catch (error) {
      console.log('auth error - ', error.message);
      throw new ForbiddenException(error.message || 'Session expired! Please sign in');
    }
  }
}
