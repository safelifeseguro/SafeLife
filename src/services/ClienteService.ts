import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/Cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private repository: Repository<Cliente>,
  ) {}

  async create(dados: Cliente): Promise<Cliente> {
    const hoje = new Date();
    const nascimento = new Date(dados.data_nascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();

    if (idade < 18) {
      throw new HttpException('Não elegível para este tipo de seguro.', HttpStatus.BAD_REQUEST);
    }
    return await this.repository.save(dados);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.repository.find();
  }

  async findByCpf(cpf: string): Promise<Cliente> {
    const cliente = await this.repository.findOne({ where: { cpf } });
    if (!cliente) throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    return cliente;
  }

  async update(cpf: string, dados: Partial<Cliente>): Promise<Cliente> {
    let cliente = await this.findByCpf(cpf);
    Object.assign(cliente, dados);
    return await this.repository.save(cliente);
  }

  async delete(cpf: string): Promise<void> {
    let cliente = await this.findByCpf(cpf);
    await this.repository.remove(cliente);
  }
}