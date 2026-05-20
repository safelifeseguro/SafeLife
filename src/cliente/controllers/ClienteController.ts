import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ClienteService } from '../services/ClienteService';
import { Cliente } from '../entities/Cliente.entity';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {

  constructor(private readonly service: ClienteService) { }

  @Post('/cadastrar')
  @ApiBody({ type: Cliente })
  @ApiResponse({ status: 201, type: Cliente })
  async create(@Body() dados: Cliente) {
    return await this.service.create(dados);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes',
    type: [Cliente],
  })
  async getAll() {
    return await this.service.findAll();
  }

  @Get('/:cpf')
  @ApiParam({
    name: 'cpf',
    example: '12345678900',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado',
    type: Cliente,
  })
  async getByCpf(@Param('cpf') cpf: string) {
    return await this.service.findByCpf(cpf);
  }

  @Put('/:cpf')
  @ApiParam({
    name: 'cpf',
    example: '12345678900',
  })
  @ApiBody({ type: Cliente })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso',
    type: Cliente,
  })
  async update(@Param('cpf') cpf: string, @Body() dados: Partial<Cliente>) {
    return await this.service.update(cpf, dados);
  }

  @Delete('/:cpf')
  @ApiParam({
    name: 'cpf',
    example: '12345678900',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente removido com sucesso',
  })
  async delete(@Param('cpf') cpf: string) {
    const mensagem = await this.service.delete(cpf);
    return { message: mensagem };
  }
}