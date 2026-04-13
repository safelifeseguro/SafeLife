import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, DeleteResult } from "typeorm";
import { Beneficiario } from "../entities/beneficiario.entity";
import { ApoliceService } from "../../apolice/services/apolice.service";

@Injectable()
export class BeneficiarioService {

    constructor(
        @InjectRepository(Beneficiario)
        private readonly beneficiarioRepository: Repository<Beneficiario>,
        private readonly apoliceService: ApoliceService
    ) {}

    // Buscar todos
    async findAll(): Promise<Beneficiario[]> {
        return await this.beneficiarioRepository.find({
            relations: {
                apolice: true
            }
        });
    }

    // Buscar por ID do beneficiário
    async findById(id_beneficiario: number): Promise<Beneficiario> {
        const beneficiario = await this.beneficiarioRepository.findOne({
            where: { id_beneficiario },
            relations: {
                apolice: true
            }
        });

        if (!beneficiario) {
            throw new HttpException('Beneficiário não encontrado', HttpStatus.NOT_FOUND);
        }

        return beneficiario;
    }

    // Buscar por ID da apólice
    async findById_apolice(id_apolice: number): Promise<Beneficiario[]> {
        const beneficiarios = await this.beneficiarioRepository.find({
            where: {
                apolice: {
                    id_apolice: id_apolice
                }
            },
            relations: {
                apolice: true
            }
        });

        if (beneficiarios.length === 0) {
            throw new HttpException('Nenhum beneficiário encontrado para essa apólice', HttpStatus.NOT_FOUND);
        }

        return beneficiarios;
    }

    // Buscar por nome
    async findByNome(nome: string): Promise<Beneficiario[]> {
        return await this.beneficiarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                apolice: true
            }
        });
    }

    // Cria um beneficiário
    async create(beneficiario: Beneficiario): Promise<Beneficiario> {

        if (!beneficiario.apolice || !beneficiario.apolice.id_apolice) {
            throw new HttpException('Apolice é obrigatória', HttpStatus.BAD_REQUEST);
        }

        const apolice = await this.apoliceService.findById(beneficiario.apolice.id_apolice);

        if (!apolice) {
            throw new HttpException('Apolice não encontrada', HttpStatus.NOT_FOUND);
        }

        beneficiario.apolice = apolice;

        return await this.beneficiarioRepository.save(beneficiario);
    }

    // Atualizar beneficiário
    async update(beneficiario: Beneficiario): Promise<Beneficiario> {

        if (!beneficiario.id_beneficiario) {
            throw new HttpException('ID do beneficiário é obrigatório', HttpStatus.BAD_REQUEST);
        }

        const buscaBeneficiario = await this.findById(beneficiario.id_beneficiario);

        if (beneficiario.apolice) {
            const apolice = await this.apoliceService.findById(beneficiario.apolice.id_apolice);

            if (!apolice) {
                throw new HttpException('Apolice não encontrada', HttpStatus.NOT_FOUND);
            }

            beneficiario.apolice = apolice;
        }

        return await this.beneficiarioRepository.save({
            ...buscaBeneficiario,
            ...beneficiario
        });
    }

    // Deletar beneficiário
    async delete(id_beneficiario: number): Promise<DeleteResult> {
        await this.findById(id_beneficiario);
        return await this.beneficiarioRepository.delete(id_beneficiario);
    }
}