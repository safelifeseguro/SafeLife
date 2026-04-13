import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from '../controllers/ClienteController';
import { ClienteService } from '../services/ClienteService';
import { Cliente } from '../entities/Cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])], // Registra o repositório aqui
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [TypeOrmModule]
})
export class ClienteModule {}