import { Module } from '@nestjs/common';
import { VtonController } from './vton.controller';
import { VtonService } from './vton.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [VtonController],
  providers: [VtonService],
  exports: [VtonService],
})
export class VtonModule {}