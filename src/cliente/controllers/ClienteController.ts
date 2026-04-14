import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ClienteService } from '../services/ClienteService';
import { Cliente } from '../entities/Cliente.entity';

@Controller('clientes')
export class ClienteController {

  constructor(private readonly service: ClienteService) {}

  @Post('/cadastrar')
  async create(@Body() dados: Cliente) {
    return await this.service.create(dados);
  }

  @Get()
  async getAll() {
    return await this.service.findAll();
  }

  @Get('/:cpf')
  async getByCpf(@Param('cpf') cpf: string) {
    return await this.service.findByCpf(cpf);
  }

  @Put('/:cpf')
  async update(@Param('cpf') cpf: string, @Body() dados: Partial<Cliente>) {
    return await this.service.update(cpf, dados);
  }

  @Delete('/:cpf')
  async delete(@Param('cpf') cpf: string) {
    const mensagem = await this.service.delete(cpf);
    return { message: mensagem };
  }
}