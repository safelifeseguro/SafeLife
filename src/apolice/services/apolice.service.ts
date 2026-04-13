import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Apolice } from "../entities/apolice.entity";
import { Repository } from "typeorm";
import { DeleteResult } from "typeorm";

@Injectable()
export class ApoliceService {
  constructor(
    @InjectRepository(Apolice)
    private apoliceRepository: Repository<Apolice>
  ) {} 

    async findAll(): Promise<Apolice[]> {
        return await this.apoliceRepository.find();
        
    }

    async findById(id_apolice: number): Promise<Apolice> {
      const apolice = await this.apoliceRepository.findOne({ 
        where: { id_apolice } });
        if (!apolice) {
            throw new HttpException('Apolice não encontrada', HttpStatus.NOT_FOUND);
        }
        return apolice;
    }

    async create(apolice: Apolice): Promise<Apolice> {
        return await this.apoliceRepository.save(apolice);
    }
     async update(apolice: Apolice): Promise<Apolice> {
        await this.findById(apolice.id_apolice);
        return await this.apoliceRepository.save(apolice);
    }

    async delete(id_apolice: number): Promise<DeleteResult> {
        await this.findById(id_apolice);
        return await this.apoliceRepository.delete(id_apolice);
    }



//TESTE
//TESTE2
//teste3



}











    
