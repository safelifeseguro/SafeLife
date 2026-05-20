import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Apolice } from '../../apolice/entities/apolice.entity';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_clientes' })
export class Cliente {

  @ApiProperty({
    example: '12345678900',
    description: 'CPF do cliente',
  })
  @PrimaryColumn()
  @IsNotEmpty()
  cpf!: string;

  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do cliente',
  })
  @Column({ length: 100, nullable: false })
  @IsNotEmpty()
  nome!: string;

  @ApiProperty({
    example: '1995-05-10',
    description: 'Data de nascimento do cliente',
  })
  @Column({ type: 'date', nullable: false })
  @IsNotEmpty()
  data_nascimento!: Date;


  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone do cliente',
  })
  @Column({ length: 15 })
  @IsNotEmpty()
  telefone!: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'E-mail do cliente',
  })
  @Column({ length: 100, unique: true })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do cliente',
  })
  @Column({ select: false }) // Senha protegida
  @IsNotEmpty()
  senha!: string;

  // Relacionamento 1 para N (Um cliente tem várias apólices)
  @ApiProperty({
    type: () => [Apolice],
    description: 'Lista de apólices do cliente',
  })
  @OneToMany(() => Apolice, (apolice) => apolice.cliente)
  apolice!: Apolice[];
}