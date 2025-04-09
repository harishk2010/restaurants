import { Router } from "express";
import { restaurantController } from "../config/dependencyInjection";


const router = Router();

// Using router chaining for cleaner code organization
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