import { EncryptStorage } from 'encrypt-storage';
import { environment } from '../../../../environments/environment';

export const encryptLocalStorage = new EncryptStorage(
  environment.encriptKey || '',
  {
    storageType: 'localStorage',
  },
);
