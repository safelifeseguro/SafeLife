import { IsNotEmpty } from "class-validator";
import { Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_beneficiario"})
export class Beneficiario {
    
    @PrimaryGeneratedColumn() // Cria a chave primaria automaticamente
    id_apolice!: number;

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
    @Column({ length: 255, nullable: false }) // Cria uma coluna chamada percentual, com 255 caracteres e não pode ser nula
    percentual!: number;

}