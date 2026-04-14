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

    dados.cpf = dados.cpf.replace(/\D/g, '');

    const clienteExistente = await this.repository.findOne({
    where: { cpf: dados.cpf }
    });
    
    if (clienteExistente) {
    throw new HttpException('CPF já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const emailExistente = await this.repository.findOne({
   where: { email: dados.email }
   });

    if (emailExistente) {
  throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
   }

    const hoje = new Date();
    const nascimento = new Date(dados.data_nascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();

    if (idade < 18) {
      throw new HttpException('Idade não elegivel para esse tipo de seguro.', HttpStatus.BAD_REQUEST);
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

  async delete(cpf: string): Promise<string> {
    let cliente = await this.findByCpf(cpf);
    await this.repository.remove(cliente);
    return "Cliente deletado com sucesso";
  }

  
}