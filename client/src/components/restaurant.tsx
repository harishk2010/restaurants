import { useEffect, useState } from 'react'
import apiCalls from '../api/restaurant'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

interface RestaurantData {
  id: string
  name: string
  contact: string
  address: string
}

function Restaurants() {
  const [data, setData] = useState<RestaurantData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await apiCalls.getAllRestaurants()
      const resData = (response as { data: { data: RestaurantData[] } })?.data?.data
      setData(resData)
    } catch (error) {
      console.error('Failed to fetch restaurants:', error)
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load restaurants. Please try again later.',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClick = (restaurant: RestaurantData) => {
    MySwal.fire({
      title: `Manage "${restaurant.name}"`,
      text: "Select an action for this restaurant",
      icon: "info",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Edit",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      denyButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      customClass: {
        popup: 'rounded-xl',
        title: 'text-xl',
        confirmButton: 'text-md',
        denyButton: 'text-md',
        cancelButton: 'text-md',
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiCalls.deleteRestaurant(restaurant.id)
          fetchData()
          Swal.fire({
            title: "Deleted!",
            text: `"${restaurant.name}" has been removed from your list.`,
            icon: "success",
            confirmButtonColor: "#4ade80"
          })
        } catch (error) {
          console.error('Delete failed:', error)
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the restaurant. Please try again.",
            icon: "error",
            confirmButtonColor: "#dc2626"
          })
        }
      } else if (result.isDenied) {
        navigate(`/edit-restaurant?id=${restaurant.id}`)
        localStorage.setItem('restaurantData', JSON.stringify(restaurant))
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            <span className="inline-block transform hover:scale-105 transition duration-300">🍽️</span> Culinary Destinations
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Discover and manage your favorite dining establishments
          </p>
        </div>
        
        <div className="flex justify-end mb-8">
          <button
            onClick={() => navigate('/add-restaurant')}
            className="px-5 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition transform hover:-translate-y-1 flex items-center gap-2"
          >
            <span>Add Restaurant</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              No restaurants found
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Get started by adding your first restaurant
            </p>
            <div className="mt-8">
              <button
                onClick={() => navigate('/add-restaurant')}
                className="px-5 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Your First Restaurant
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((restaurant, index) => (
              <div
                key={restaurant.id || index}
                onClick={() => handleClick(restaurant)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-100 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 capitalize">{restaurant.name}</h2>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>{restaurant.contact}</span>
                    </div>
                    <div className="flex items-start text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="line-clamp-2">{restaurant.address}</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Tap to manage</span>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Popular
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Restaurants