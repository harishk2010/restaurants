import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Restaurants from '../components/restaurant';
import AddRestaurantForm from '../components/addRestaurant';
import EditRestaurant from '../components/editRestaurant';


function Body() {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Restaurants />
        },
        {
            path: '/add-restaurant',
            element: <AddRestaurantForm />
        },
        {
            path: '/edit-restaurant',
            element: <EditRestaurant />
        }
    ])

    return(
        <RouterProvider router={appRouter} />
    )
}

export default Body
