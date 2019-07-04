import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from './client.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ClientRepository]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
