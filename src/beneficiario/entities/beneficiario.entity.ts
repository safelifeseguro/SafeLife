import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Apolice } from "../../apolice/entities/apolice.entity";
import { JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: "tb_beneficiario" })
export class Beneficiario {

    @ApiProperty({
        example: 1,
        description: "ID do beneficiário",
    })
    @PrimaryGeneratedColumn() // Cria a chave primaria automaticamente
    id_beneficiario!: number;

    @ApiProperty({
        example: "Maria da Silva",
        description: "Nome do beneficiário",
    })
    @IsNotEmpty()
    @Column({ length: 255, nullable: false }) // Cria uma coluna chamada nome, com 255 caracteres e não pode ser nula
    nome!: string;

    @ApiProperty({
        example: "12345678900",
        description: "CPF do beneficiário",
    })
    @IsNotEmpty()
    @Column({ length: 255, nullable: false }) // Cria uma coluna chamada cpf, com 255 caracteres e não pode ser nula
    cpf!: string;

    @ApiProperty({
        example: "Esposa",
        description: "Parentesco do beneficiário com o segurado",
    })
    @IsNotEmpty()
    @Column({ length: 255, nullable: false }) // Cria uma coluna chamada parentesco, com 255 caracteres e não pode ser nula
    parentesco!: string;

    @ApiProperty({
        example: 50.0,
        description: "Percentual da apólice destinado ao beneficiário",
    })
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
    percentual!: number;


    @ApiProperty({
        type: () => Apolice,
        description: "Apólice vinculada ao beneficiário",
    })
    @ManyToOne(() => Apolice, (apolice) => apolice.beneficiario, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'id_apolice' })
    apolice!: Apolice;
}