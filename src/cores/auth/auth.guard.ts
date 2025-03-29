import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { CanContextService } from 'src/common/context';

@Injectable()
export class CanAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string;
    const locationId = request.headers['location-id'] as string;

    if (!apiKey || !locationId)
      throw new UnauthorizedException('API Key and Location ID are required');

    const appContext = CanContextService.getAppContext();
    const authService = appContext.get(AuthService);

    const isValid = await authService.validateApiKey(apiKey, locationId);
    if (!isValid)
      throw new UnauthorizedException('Invalid API Key or Location ID');

    return true;
  }
}
