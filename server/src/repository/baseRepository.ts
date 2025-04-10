import db from "../../db/models";
import { Op } from "sequelize";
import { ModelCtor, Model } from "sequelize";

export default class BaseRepository<T extends Model> {
    protected model: ModelCtor<T>;

    constructor(model: ModelCtor<T>) {
        this.model = model;
    }

    async create(data: any): Promise<any> {
        try {
            return await this.model.create(data);
        } catch (error: any) {
            throw error;
        }
    }

    async findOne(name: string, id?: string): Promise<any> {
        try {
            const whereCondition: any = { name };

            if (id) {
                whereCondition.id = { [Op.ne]: id };
            }

            return await this.model.findOne({ where: whereCondition });
        } catch (error: any) {
            throw error;
        }
    }

    async findAll(): Promise<any> {
        try {
            return await this.model.findAll({
                order: [['id', 'DESC']],
            });
        } catch (error: any) {
            throw error;
        }
    }

    async findById(id: string): Promise<any> {
        try {
            return await this.model.findByPk(id);
        } catch (error: any) {
            throw error;
        }
    }


    async updateById(data: Partial<T>, id: string): Promise<any> {
        try {
            return await this.model.update(data, {
                where: { id } as any,
            });
        } catch (error: any) {
            throw error;
        }
    }
    
    async deleteById(id: string): Promise<any> {
        try {
            return await this.model.destroy({
                where: { id } as any,
                force: true,
            });
        } catch (error: any) {
            throw error;
        }
    }

    

   
}
