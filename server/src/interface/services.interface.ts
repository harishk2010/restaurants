export default interface RestaurantServiceMethods {
    createRestaurant(data: any): Promise<any>
    getAllRestaurant(): Promise<any>
    getRestaurantById(id: any): Promise<any>
    updateRestaurant(id: string, data: any): Promise<any>
    deleteData(id: string): Promise<any>
}
