import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: '1d' },
    };
  },
};
