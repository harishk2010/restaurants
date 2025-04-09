import { Request, Response } from "express"

export default interface IRestaurantControllerMethods{
     createRestaurant(req: Request, res: Response): Promise<any>
     getAllRestaurant(req: Request, res: Response): Promise<any>
     getRestaurantById(req: Request, res: Response): Promise<any>
     updateRestaurant(req: Request, res: Response): Promise<any>
     deleteData(req: Request, res: Response): Promise<any>
}