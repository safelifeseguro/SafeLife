import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'tb_clientes' })
export class Cliente {
  @PrimaryColumn()
  cpf!: string;

  @Column({ length: 100, nullable: false })
  nome!: string;

  @Column({ type: 'date', nullable: false })
  data_nascimento!: Date;

  @Column({ length: 15 })
  telefone!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ select: false }) // Senha protegida
  senha!: string;

  // Relacionamento 1 para N (Um cliente tem várias apólices)
  @OneToMany('Apolice', (apolice: any) => apolice.cliente)
  apolices!: any[];
}