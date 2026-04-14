import { HttpCode, HttpStatus, Param, ParseIntPipe, Post, Get, Body, Put, Delete } from "@nestjs/common";
import { BeneficiarioService } from "../service/beneficiario.service";
import { Beneficiario } from "../entities/beneficiario.entity";
import { Controller } from "@nestjs/common";

@Controller("/beneficiarios")
export class BeneficiarioController{
    constructor(private readonly beneficiarioService : BeneficiarioService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Beneficiario[]> {
        return this.beneficiarioService.findAll();
    }

    @Get('/:id_apolice')
    @HttpCode(HttpStatus.OK)
    findById_apolice(@Param('id_apolice', ParseIntPipe) id_apolice: number): Promise<Beneficiario[]>{
        return this.beneficiarioService.findById_apolice(id_apolice);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Beneficiario[]> {
        return this.beneficiarioService.findByNome(nome);
    }

    @Post() // Criar um novo beneficiário
    @HttpCode(HttpStatus.CREATED)
    create(@Body() beneficiario: Beneficiario): Promise<Beneficiario> {
        return this.beneficiarioService.create(beneficiario);
    }

    @Put() // Atualiza um beneficiario existente
    @HttpCode(HttpStatus.OK)
    update(@Body() beneficiario: Beneficiario): Promise<Beneficiario> {
        return this.beneficiarioService.update(beneficiario);
    }

    @Delete('/:id_beneficiario')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id_beneficiario', ParseIntPipe) id: number) {
    await this.beneficiarioService.delete(id);
    return { message: 'Beneficiário deletado com sucesso' };
    }

}