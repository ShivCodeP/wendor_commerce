import { Inject, Injectable } from '@nestjs/common';
import { ApiKey } from './auth.model';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { API_KEY_REPOSITORY } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(API_KEY_REPOSITORY) private apiKeyRepository: typeof ApiKey,
  ) {}

  // Generate a new API key (returns the raw key, stores only the hash)
  async generateApiKey(location_id: string): Promise<string> {
    const apiKey = randomBytes(32).toString('hex'); // Generate secure API key
    const hashedKey = await bcrypt.hash(apiKey, 10); // Hash before storing

    await this.apiKeyRepository.create({
      key_hash: hashedKey,
      location_id,
      status: 'active',
    } as ApiKey);

    return apiKey; // Return plaintext key to the user
  }

  // Validate API Key & Location ID
  async validateApiKey(apiKey: string, location_id: string): Promise<boolean> {
    const key = await this.apiKeyRepository.findOne({
      where: { status: 'active', location_id },
    });
    if (!key) return false; // No active key found for this location

    const isEqual = await bcrypt.compare(apiKey, key.dataValues.key_hash);
    if (isEqual) return true; // API Key is valid

    return false; // API Key is invalid or does not match location
  }

  // Revoke an API Key
  async revokeApiKey(apiKey: string, location_id: string): Promise<boolean> {
    const keys = await this.apiKeyRepository.findAll({
      where: { status: 'active', location_id },
    });

    for (const key of keys) {
      if (await bcrypt.compare(apiKey, key.key_hash)) {
        await key.update({ status: 'inactive' }); // Mark as inactive
        return true;
      }
    }

    return false;
  }
}
