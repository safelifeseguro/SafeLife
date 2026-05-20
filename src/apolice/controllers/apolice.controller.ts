import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApoliceService } from "../services/apolice.service";
import { Apolice } from "../entities/apolice.entity";
import { ApiTags, ApiBody, ApiResponse, ApiParam, } from "@nestjs/swagger";

@ApiTags('Apólices')
@Controller("/apolices")
export class ApoliceController {
    constructor(private readonly apoliceService: ApoliceService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: 'Lista de apólices',
        type: [Apolice],
    })
    findAll(): Promise<Apolice[]> {
        return this.apoliceService.findAll();
    }

    @Get("/:id_apolice")
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id_apolice',
        example: 1,
    })
    @ApiResponse({
        status: 200,
        description: 'Apólice encontrada',
        type: Apolice,
    })
    findById(@Param('id_apolice', ParseIntPipe) id_apolice: number): Promise<Apolice> {
        return this.apoliceService.findById(id_apolice);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: Apolice })
    @ApiResponse({
        status: 201,
        description: 'Apólice criada com sucesso',
        type: Apolice,
    })
    create(@Body() apolice: Apolice): Promise<Apolice> {
        return this.apoliceService.create(apolice);
    }

    @Put("/:id_apolice")
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id_apolice',
        example: 1,
    })
    @ApiBody({ type: Apolice })
    @ApiResponse({
        status: 200,
        description: 'Apólice atualizada com sucesso',
        type: Apolice,
    })
    update(@Body() apolice: Apolice): Promise<Apolice> {
        return this.apoliceService.update(apolice);
    }

    @Delete("/:id_apolice")
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id_apolice',
        example: 1,
    })
    @ApiResponse({
        status: 200,
        description: 'Apólice removida com sucesso',
    })
    async delete(
        @Param('id_apolice') id_apolice: number,
    ) {
        const mensagem = await this.apoliceService.delete(id_apolice);

        return {
            message: mensagem,
        };
    }
}