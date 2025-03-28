import { ApiKey } from './auth.model';

export const API_KEY_REPOSITORY = 'API_KEY_REPOSITORY';

export const ApiKeyRepository = {
  provide: API_KEY_REPOSITORY,
  useValue: ApiKey,
};
