import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Beneficiario } from "../../beneficiario/entities/beneficiario.entity";
import { Cliente } from "../../cliente/entities/Cliente.entity";
import { Apolice } from "../../apolice/entities/apolice.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_safelife',
      entities: [Cliente, Apolice, Beneficiario],
      synchronize: true,
    };
  }
}