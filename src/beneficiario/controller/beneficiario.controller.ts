import { HttpCode, HttpStatus, Param, ParseIntPipe, Post, Get, Body, Put, Delete } from "@nestjs/common";
import { BeneficiarioService } from "../service/beneficiario.service";
import { Beneficiario } from "../entities/beneficiario.entity";
import { Controller } from "@nestjs/common";
import { ApiTags, ApiBody, ApiResponse, ApiParam, } from "@nestjs/swagger";

@ApiTags('Beneficiários')
@Controller("/beneficiarios")
export class BeneficiarioController {
    constructor(private readonly beneficiarioService: BeneficiarioService) { }


    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'Lista de beneficiários',
        type: [Beneficiario],
    })
    findAll(): Promise<Beneficiario[]> {
        return this.beneficiarioService.findAll();
    }

    @Get('/id/:id_beneficiario')
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id_beneficiario',
        example: 1,
    })
    @ApiResponse({
        status: 200,
        description: 'Beneficiário encontrado',
        type: Beneficiario,
    })
    findById(
        @Param('id_beneficiario', ParseIntPipe) id: number
    ): Promise<Beneficiario> {
        return this.beneficiarioService.findById(id);
    }

    @Get('/:id_apolice')
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id_apolice',
        example: 1,
    })
    @ApiResponse({
        status: 200,
        description: 'Beneficiários da apólice',
        type: [Beneficiario],
    })
    findById_apolice(@Param('id_apolice', ParseIntPipe) id_apolice: number): Promise<Beneficiario[]> {
        return this.beneficiarioService.findById_apolice(id_apolice);
    }


    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'nome',
        example: 'Maria',
    })
    @ApiResponse({
        status: 200,
        description: 'Beneficiários encontrados',
        type: [Beneficiario],
    })
    findByNome(@Param('nome') nome: string): Promise<Beneficiario[]> {
        return this.beneficiarioService.findByNome(nome);
    }

    @Post() // Criar um novo beneficiário
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: Beneficiario })
    @ApiResponse({
        status: 201,
        description: 'Beneficiário criado com sucesso',
        type: Beneficiario,
    })
    create(@Body() beneficiario: Beneficiario): Promise<Beneficiario> {
        return this.beneficiarioService.create(beneficiario);
    }

    @Put() // Atualiza um beneficiario existente
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: Beneficiario })
    @ApiResponse({
        status: 200,
        description: 'Beneficiário atualizado com sucesso',
        type: Beneficiario,
    })
    update(@Body() beneficiario: Beneficiario): Promise<Beneficiario> {
        return this.beneficiarioService.update(beneficiario);
    }

    @Delete('/:id_beneficiario')
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id_beneficiario',
        example: 1,
    })
    @ApiResponse({
        status: 200,
        description: 'Beneficiário deletado com sucesso',
    })
    async delete(@Param('id_beneficiario', ParseIntPipe) id: number) {
        await this.beneficiarioService.delete(id);
        return { message: 'Beneficiário deletado com sucesso' };
    }

}