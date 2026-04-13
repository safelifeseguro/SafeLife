import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/Cliente.module';
import { Cliente } from './cliente/entities/Cliente.entity';
import { Apolice } from './apolice/entities/apolice.entity';
import { Beneficiario } from './beneficiario/entities/beneficiario.entity';
import { ApoliceModule } from './apolice/apolice.module';
import { BeneficiarioModule } from './beneficiario/beneficiario.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_safelife',
      entities: [Cliente, Apolice, Beneficiario],
      synchronize: true,
    }),
    ClienteModule,
    ApoliceModule,
    BeneficiarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
