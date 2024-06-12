import { Module } from '@nestjs/common';
import { EmblemaService } from './emblema.service';
import { EmblemaController } from './emblema.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EmblemaController],
  providers: [EmblemaService],
  imports: [PrismaModule],
})
export class EmblemaModule {}
