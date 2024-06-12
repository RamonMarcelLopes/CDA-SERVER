import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmblemaModule } from './emblema/emblema.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, EmblemaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
