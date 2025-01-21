import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

export const initializeFirebase = (configService: ConfigService) => {
  const firebaseParams = {
    type: configService.get<string>('FIREBASE_TYPE'),
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKeyId: configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
    privateKey: (
      configService.get<string>('FIREBASE_PRIVATE_KEY') as string
    ).replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    clientId: configService.get<string>('FIREBASE_CLIENT_ID'),
    authUri: configService.get<string>('FIREBASE_AUTH_URI'),
    tokenUri: configService.get<string>('FIREBASE_TOKEN_URI'),
    authProviderX509CertUrl: configService.get<string>(
      'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',
    ),
    clientX509CertUrl: configService.get<string>(
      'FIREBASE_CLIENT_X509_CERT_URL',
    ),
  };

  admin.initializeApp({
    credential: admin.credential.cert(firebaseParams),
  });

  return admin.firestore();
};
