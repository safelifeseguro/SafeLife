import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cliente } from "../../cliente/entities/Cliente.entity";
import { Beneficiario } from "../../beneficiario/entities/beneficiario.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: "tb_apolice" })
export class Apolice {

    @ApiProperty({
        example: 1,
        description: "ID da apólice",
    })
    @PrimaryGeneratedColumn()
    id_apolice!: number;

    @ApiProperty({
        example: "2026-05-20",
        description: "Data de início da apólice",
    })
    @UpdateDateColumn()
    data_inicio!: Date;

    @ApiProperty({
        example: 199.99,
        description: "Valor da mensalidade da apólice",
    })
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false, })
    mensalidade!: number;

    @ApiProperty({
        example: 100000.00,
        description: "Valor segurado da apólice",
    })
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 9, scale: 2, nullable: false, })
    valor_segurado!: number;

    @ApiProperty({
        example: "Ativa",
        description: "Status da apólice",
    })
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    status!: string;

    @ApiProperty({
        example: "Cobertura completa",
        description: "Tipo de cobertura da apólice",
    })
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    cobertura!: string;

    @ApiProperty({
        type: () => Cliente,
        description: "Cliente vinculado à apólice",
    })
    @ManyToOne(() => Cliente, (cliente) => cliente.apolice, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'cpf' })
    cliente!: Cliente;

    @ApiProperty({
        type: () => [Beneficiario],
        description: "Lista de beneficiários da apólice",
    })
    @OneToMany(() => Beneficiario, (beneficiario) => beneficiario.apolice, {
        onDelete: "CASCADE"
    })
    beneficiario!: Beneficiario[];

}    