import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cliente } from "../../cliente/entities/Cliente.entity";
import { Beneficiario } from "../../beneficiario/entities/beneficiario.entity";

@Entity({ name: "tb_apolice" })
export class Apolice {
    @PrimaryGeneratedColumn()
    id_apolice!: number;

    @IsNotEmpty()
    @UpdateDateColumn()
    data_inicio!: Date;

    @IsNotEmpty()
    @Column({type: 'decimal', precision: 6, scale: 2, nullable:false, })
    mensalidade!: number;

    @IsNotEmpty()
    @Column({type: 'decimal', precision: 9, scale: 2, nullable:false, })
    valor_segurado!: number;

    @IsNotEmpty()
    @Column({length:255, nullable:false})
    status!: string;

    @IsNotEmpty()
    @Column({length:255, nullable:false})
    cobertura!: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.apolice, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name:  'cpf' })
    cliente!: Cliente;


    @OneToMany(() => Beneficiario, (beneficiario) => beneficiario.apolice, {
        onDelete: "CASCADE"
    })
    beneficiario!: Beneficiario[];

}    