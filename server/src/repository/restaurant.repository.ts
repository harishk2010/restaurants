import BaseRepository from "./baseRepository";
import db from "../../db/models";
import RestaurantRepositoryMethods from "../interface/repository.interface";

export default class RestaurantRepository extends BaseRepository<typeof db.Restaurant>
    implements RestaurantRepositoryMethods {
    constructor() {
        super(db.Restaurant);
    }

    async createRestaurant(data: any): Promise<any> {
        try {
            const existData = await this.findOne(data.name)
            if (existData) {
                console.log('exist ',data)
                const error = new Error('Restaurant Already Exist')
                error.name = 'RestaurantAlreadyExist'
                throw error
            }
            const response = await this.create(data)
            return response
        } catch (error: any) {
            throw error
        }
    }

    async getAllRestaurant(): Promise<any> {
        try {
            const response = await this.findAll()
            return response
        } catch (error: any) {
            throw error
        }
    }

    async getRestaurantById(id: any): Promise<any> {
        try {
            const response = await this.findById(id)
            if (!response) {
                const error = new Error('Restaurant Not Exist')
                error.name = 'RestaurantNotExist'
                throw error
            }
            return response
        } catch (error: any) {
            throw error
        }
    }

    async updateRestaurant(id: string, data: any): Promise<any> {
        try {
            const existData = await this.findOne(data.name, id)
            if (existData) {
                const error = new Error('Restaurant Already Exist')
                error.name = 'RestaurantAlreadyExist'
                throw error
            }
            const response = await this.updateById(data, id)
            const updatedData = await this.findById(id)
            return updatedData
        } catch (error: any) {
            throw error
        }
    }

    async deleteData(id: string): Promise<any> {
        try {
            const exist = await this.findById(id)
            if (!exist) {
                const error = new Error('Restaurant Not Exist')
                error.name = 'RestaurantNotExist'
                throw error
            }

            const response = await this.deleteById(id)
            return response
        } catch (error: any) {
            throw error
        }
    }
}