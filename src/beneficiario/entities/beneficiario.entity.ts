import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Apolice } from "../../apolice/entities/apolice.entity";
import { JoinColumn } from "typeorm";

@Entity({ name: "tb_beneficiario"})
export class Beneficiario {
    
    @PrimaryGeneratedColumn() // Cria a chave primaria automaticamente
    id_beneficiario!: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false }) // Cria uma coluna chamada nome, com 255 caracteres e não pode ser nula
    nome!: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false }) // Cria uma coluna chamada cpf, com 255 caracteres e não pode ser nula
    cpf!: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false }) // Cria uma coluna chamada parentesco, com 255 caracteres e não pode ser nula
    parentesco!: string;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
    percentual!: number;

    @ManyToOne(() => Apolice, (apolice) => apolice.beneficiario, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'id_apolice' })
    apolice!: Apolice;
}