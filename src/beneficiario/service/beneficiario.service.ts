import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Beneficiario } from "../entities/beneficiario.entity";
import { ILike } from "typeorm";
import { timeStamp } from "console";
import { DeleteResult } from "typeorm/browser";



@Injectable()
export class BeneficiarioService {

    constructor(
        @InjectRepository(Beneficiario)
        private readonly beneficiarioRepository: Repository<Beneficiario>,
        private apoliceService: ApoliceService
    ) { }

    async findAll(): Promise<Beneficiario[]> { // busca todos
        return await this.beneficiarioRepository.find({
            relations: {
                //criar relações aqui
            }
        });
    }

    async findById_apolice(id_apolice: number): Promise<Beneficiario[]> { 
        const beneficiario = await this.beneficiarioRepository.find({
            where: { 
                id_apolice: id_apolice // vair procurar por uma id de uma police que podde ter varios beneficiarios (minha id é: 1 na 1 via mostrar joão, maria, pinóquio...) Nome / cpf / parentesco...
            },
            relations: {
                //criar relações aqui
            }
        });

      if (!beneficiario)
            throw new HttpException('Beneficiário não encontrado', HttpStatus.NOT_FOUND);
        return beneficiario;
    }

    async findByNome(nome: string): Promise<Beneficiario[]> {
        return await this.beneficiarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`) // Filtrar Por todos os beneficiarios chamados "Lucas Araujo Fernandes"
            },
            relations: {
                //criar relações aqui
            }
        });
    }

    async create(beneficiario: Beneficiario): Promise<Beneficiario> {

        if (beneficiario.apolice != null){


            // Verificar se a apoliice existe antes de criar o beneficiário
            let apolice = await this.apoliceService.findById(beneficiario.apolice.id);
            if (!apolice) {
                throw new HttpException('Apolice não encontrada', HttpStatus.NOT_FOUND);
                
                return await this.beneficiarioRepository.save(beneficiario);
            }else {
                throw new HttpException('Apolice não pode ser nula', HttpStatus.NOT_FOUND);
            }

        

        }
    }

    async update(beneficiario: Beneficiario): Promise<Beneficiario> {
    
        let buscaBeneficiario: Beneficiario = await this.findById_apolice(beneficiario.id_apolice);

        if (!buscaBeneficiario || !beneficiario.id_apolice )
            throw new HttpException('Beneficiario não encontrado', HttpStatus.NOT_FOUND);

        if(beneficiario.apolice){
            let apolice = await this.apoliceService.findById(beneficiario.apolice.id);

            if(!apolice)
                throw new HttpException('Apolice não encontrada', HttpStatus.NOT_FOUND)
                
            return await this.beneficiarioRepository.save(beneficiario);
        } else {
            throw new HttpException('Apolice não pode ser nula', HttpStatus.NOT_FOUND)
        }
        
        
    }

    async delete (id_apolice: number): Promise<DeleteResult> {

        await this.findById_apolice(id_apolice);
        return await this.beneficiarioRepository.delete(id_apolice);

    }

}