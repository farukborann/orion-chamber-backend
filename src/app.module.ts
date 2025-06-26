import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { StorageModule } from './storage/storage.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { VtonModule } from './vton/vton.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    AuthModule,
    AdminModule,
    StorageModule,
    UsersModule,
    TeamsModule,
    VtonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
