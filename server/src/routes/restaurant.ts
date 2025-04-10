import { Router } from "express";
import { restaurantController } from "../config/dependencyInjection";


const router = Router();


router
  .route("/")
  .post(restaurantController.createRestaurant.bind(restaurantController))
  .get(restaurantController.getAllRestaurant.bind(restaurantController))
  .patch(restaurantController.updateRestaurant.bind(restaurantController))
  .delete(restaurantController.deleteData.bind(restaurantController));
router
  .route("/:id")
  .get(restaurantController.getRestaurantById.bind(restaurantController))
  

export default router;