import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApoliceService } from "../services/apolice.service";
import { Apolice } from "../entities/apolice.entity";

@Controller("/apolices")
export class ApoliceController {
    constructor(private readonly apoliceService: ApoliceService) {}
     
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Apolice[]> {
        return this.apoliceService.findAll();
        }
        
    @Get("/:id_apolice")
    @HttpCode(HttpStatus.OK)
    findById(@Param('id_apolice', ParseIntPipe) id_apolice: number): Promise<Apolice> {
        return this.apoliceService.findById(id_apolice);
}

@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() apolice: Apolice): Promise<Apolice> {
    return this.apoliceService.create(apolice);
    }

@Put("/:id_apolice")
@HttpCode(HttpStatus.OK)
update(@Body() apolice: Apolice): Promise<Apolice> {
    return this.apoliceService.update(apolice);
    }

@Delete("/:id_apolice")
 async delete(@Param('id_apolice') id_apolice: number){
        const mensagem = await this.apoliceService.delete(id_apolice);
        return { message: mensagem };
    }
}