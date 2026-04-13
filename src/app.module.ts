import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './module/Cliente.module';
import { Cliente } from './entities/Cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_safelife',
      entities: [Cliente],
      synchronize: true,
    }),
    ClienteModule,
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
