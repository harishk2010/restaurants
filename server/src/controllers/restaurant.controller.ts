import { Request, Response } from "express";
import RestaurantServices, { restaurantServices } from "../services/restaurant.services";
import RestaurantControllerMethods from "../interface/controller.interface";
import RestaurantServiceMethods from "../interface/services.interface";

export default class RestaurantController implements RestaurantControllerMethods{
    private restaurantServices: RestaurantServiceMethods

    constructor(restaurantServices: RestaurantServiceMethods) {
        this.restaurantServices = restaurantServices
    }

    async createRestaurant(req: Request, res: Response): Promise<any> {
        try {
            const data = req.body;

            const response = await this.restaurantServices.createRestaurant(data)

            return res.status(201).json({
                success: true,
                message: "Restaurant created successfully!",
                data: response,
            });

        } catch (error: any) {
            console.error("Create controller error :::", error);
            console.error("error Name :::", error.name);
            if (error && error.name === 'RestaurantAlreadyExist') {
                return res.status(403).json({
                    success: false,
                    message: "Restaurant Name Already Exist!!",
                });
            }
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }

    async getAllRestaurant(req: Request, res: Response): Promise<any> {
        try {
            const response = await this.restaurantServices.getAllRestaurant()
            return res.status(201).json({
                success: true,
                message: "Restaurant all got it successfully!",
                data: response,
            });
        } catch (error: any) {
            console.error("Create controller error :::", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }


    async getRestaurantById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params; // Get ID from request params

            const restaurant = await this.restaurantServices.getRestaurantById(id)

            return res.status(200).json({
                success: true,
                message: "Restaurant fetched successfully!",
                data: restaurant,
            });

        } catch (error: any) {
            console.error("Get by ID error :::", error);
            if (error && error.name === 'RestaurantNotExist') {
                return res.status(404).json({
                    success: false,
                    message: "Restaurant not found!",
                });
            }
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }


    async updateRestaurant(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.query
            const { name, contact, address } = req.body;

            const response = await this.restaurantServices.updateRestaurant(String(id), { name, contact, address })

            return res.status(200).json({
                success: true,
                message: "Restaurant updated successfully!",
                data: response,
            });

        } catch (error: any) {
            console.error("update by ID error :::", error);
            if (error && error.name === 'RestaurantAlreadyExist') {
                return res.status(403).json({
                    success: false,
                    message: "Restaurant Name Already Exist!!",
                });
            }
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }

    async deleteData(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.query

            const deleteData = await this.restaurantServices.deleteData(String(id))

            return res.status(200).json({
                success: true,
                message: "Restaurant Deleted successfully!",
                data: deleteData,
            });

        } catch (error: any) {
            console.error("Delete by ID error :::", error);
            if (error && error.name === 'RestaurantNotExist') {
                return res.status(404).json({ success: false, message: "Restaurant not found" });
            }
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }


}

export const restaurantController = new RestaurantController(restaurantServices);
