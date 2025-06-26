import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TeamsAdminController } from './teams-admin.controller';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [TeamsModule],
  controllers: [AdminController, TeamsAdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
