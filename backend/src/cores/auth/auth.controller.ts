import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api-key')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Generate API Key (Only for authenticated users)
  @Post('generate')
  async generateApiKey(@Body() body: { location_id: string }) {
    return { apiKey: await this.authService.generateApiKey(body.location_id) };
  }
}
