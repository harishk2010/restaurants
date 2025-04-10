import { Request, Response } from "express";
import db from "../../db/models"; 
import { error } from "console";
import { Op } from "sequelize";

export default class RestaurantController {

    async createRestaurant(req: Request, res: Response): Promise<any> {
        try {
            const data = req.body;
            console.log("Received Data:", data);

            console.log("Loaded Models:", Object.keys(db));

            if (!db.Restaurant) {
                throw new Error("Restaurant model is not initialized.");
            }

            const existData = await db.Restaurant.findOne({ where: { name: data.name } })
            if (existData) {
                return res.status(403).json({
                    success: false,
                    message: "Restaurant Name Already Exist!!",
                });
            }
            const response = await db.Restaurant.create(data);

            return res.status(201).json({
                success: true,
                message: "Restaurant created successfully!",
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


    async getAllRestaurant(req: Request, res: Response): Promise<any> {
        try {
            console.log("enetred")
            const response = await db.Restaurant.findAll({
                order: [
                    ['id', 'DESC'],
                ],
            })
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

            const restaurant = await db.Restaurant.findByPk(id); // ✅ Find by Primary Key

            if (!restaurant) {
                return res.status(404).json({
                    success: false,
                    message: "Restaurant not found!",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Restaurant fetched successfully!",
                data: restaurant,
            });

        } catch (error: any) {
            console.error("Get by ID error :::", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }

    //Find By Id and Update
    async updateRestaurant(req: Request, res: Response): Promise<any> {
        try {
            console.log("updatee")
            const { id } = req.params
            console.log('id ', id)
            const { name, contact, address } = req.body;
            console.log('data ', req.body)

            const existData = await db.Restaurant.findOne({ 
                where: { 
                    name,
                    id: { [Op.ne]: id }
                 },
                
             })
            if (existData) {
                return res.status(403).json({
                    success: false,
                    message: "Restaurant Name Already Exist!!",
                });
            }

            const [updatedRows] = await db.Restaurant.update(
                { name, contact, address },
                { where: { id } }
            )

            if (updatedRows === 0) {
                
                throw error
            }


            const updatedRestaurant = await db.Restaurant.findByPk(id);

            return res.status(200).json({
                success: true,
                message: "Restaurant updated successfully!",
                data: updatedRestaurant,
            });

        } catch (error: any) {
            console.error("update by ID error :::", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }

    async deleteData(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params
            console.log('id ',id)
            const restaurant = await db.Restaurant.findByPk(id);
            if (!restaurant) {
                return res.status(404).json({ success: false, message: "Restaurant not found" });
            }
            console.log('restaurant ',restaurant)

            const deleteData = await db.Restaurant.destroy({ where: { id }, force: true });

            return res.status(200).json({
                success: true,
                message: "Restaurant Deleted successfully!",
                data: deleteData,
            });

        } catch (error: any) {
            console.error("Delete by ID error :::", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }


}

export const restaurantController = new RestaurantController()