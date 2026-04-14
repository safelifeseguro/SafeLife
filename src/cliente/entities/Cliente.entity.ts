import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Apolice } from '../../apolice/entities/apolice.entity';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'tb_clientes' })
export class Cliente {
  @PrimaryColumn()

  @PrimaryColumn()
  @IsNotEmpty()
  cpf!: string;

  @Column({ length: 100, nullable: false })
  @IsNotEmpty()
  nome!: string;

  @Column({ type: 'date', nullable: false })
  @IsNotEmpty()
  data_nascimento!: Date;

  @Column({ length: 15 })
  @IsNotEmpty()
  telefone!: string;

  @Column({ length: 100, unique: true })
  @IsNotEmpty()
  email!: string;

  @Column({ select: false }) // Senha protegida
  @IsNotEmpty()
  senha!: string;

  // Relacionamento 1 para N (Um cliente tem várias apólices)
  @OneToMany(() => Apolice, (apolice) => apolice.cliente)
  apolice!: Apolice[]

}