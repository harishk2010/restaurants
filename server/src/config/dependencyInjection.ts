import RestaurantController from "../controllers/restaurant.controller";
import RestaurantControllerMethods from "../interface/controller.interface";
import RestaurantRepositoryMethods from "../interface/repository.interface";
import RestaurantServiceMethods from "../interface/services.interface";
import RestaurantRepository from "../repository/restaurant.repository";
import RestaurantServices from "../services/restaurant.services";

const restaurantRepository:RestaurantRepositoryMethods=new RestaurantRepository()
const restaurantServices:RestaurantServiceMethods=new RestaurantServices(restaurantRepository)
const restaurantController:RestaurantControllerMethods=new RestaurantController(restaurantServices)

export {restaurantController}