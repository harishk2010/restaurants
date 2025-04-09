import RestaurantRepositoryMethods from "../interface/repository.interface";
import RestaurantRepository from "../repository/restaurant.repository";


export default class RestaurantServices implements RestaurantRepositoryMethods {
    private restaurantRepository: RestaurantRepositoryMethods

    constructor(restaurantRepository: RestaurantRepositoryMethods) {
        this.restaurantRepository = restaurantRepository
    }

    async createRestaurant(data: any): Promise<any> {
        try {
            const response = await this.restaurantRepository.createRestaurant(data)
            return response
        } catch (error: any) {
            throw error
        }
    }

    async getAllRestaurant(): Promise<any> {
        try {
            const response = await this.restaurantRepository.getAllRestaurant()
            return response
        } catch (error: any) {
            throw error
        }
    }

    async getRestaurantById(id: any): Promise<any> {
        try {
            const response = await this.restaurantRepository.getRestaurantById(id)
            return response
        } catch (error: any) {
            throw error
        }
    }

    async updateRestaurant(id: string, data: any): Promise<any> {
        try {
            const response = await this.restaurantRepository.updateRestaurant(id, data)
            return response
        } catch (error: any) {
            throw error
        }
    }

    async deleteData(id: string): Promise<any> {
        try {
            const response = await this.restaurantRepository.deleteData(id)
            return response
        } catch (error: any) {
            throw error
        }
    }

}

const restaurantRepository = new RestaurantRepository()
export const restaurantServices = new RestaurantServices(restaurantRepository)