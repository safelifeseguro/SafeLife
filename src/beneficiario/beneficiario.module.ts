import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beneficiario } from './entities/beneficiario.entity';
import { BeneficiarioService } from './service/beneficiario.service';


@Module({
  imports: [TypeOrmModule.forFeature([Beneficiario]), ApoliceModule], // Importa o Beneficiario como uma entidade
  controllers: [], // Adicione os controladores relacionados ao Beneficiario aqui
  providers: [BeneficiarioService], // Adicione os serviços relacionados ao Beneficiario aqui
  exports: [TypeOrmModule], // Exporte o TypeOrmModule 
})
export class BeneficiarioModule {}