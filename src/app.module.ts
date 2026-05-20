import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/Cliente.module';
import { ApoliceModule } from './apolice/apolice.module';
import { BeneficiarioModule } from './beneficiario/beneficiario.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        useClass: ProdService,
        imports: [ConfigModule],
    }),
    ClienteModule,
    ApoliceModule,
    BeneficiarioModule
  ],
  controllers: [AppController],
  providers: [],

})
export class AppModule { }
