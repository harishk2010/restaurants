import { useForm } from "react-hook-form";
import apiCalls from "../api/restaurant";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface RestaurantFormData {
  name: string;
  contact: string;
  address: string;
}

const AddRestaurantForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantFormData>();

  const onSubmit = async (data: RestaurantFormData) => {
    try {
      console.log("Restaurant Added:", data);
      const response = await apiCalls.createRestaurant(data);
      if (response) {
        MySwal.fire({
          title: "Success!",
          text: `"${data.name}" has been added to your list.`,
          icon: "success",
          confirmButtonColor: "#4ade80"
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error: any) {
      console.log('error', error);
      if (error && error?.response?.status === 403) {
        MySwal.fire({
          title: "Error!",
          text: "Restaurant name already exists. Please choose a different name.",
          icon: "error",
          confirmButtonColor: "#dc2626"
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            <span className="inline-block transform hover:scale-105 transition duration-300">🍽️</span> Add New Restaurant
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Add a new culinary destination to your collection
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-3 bg-gray-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition transform hover:-translate-y-1 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back to Restaurants</span>
          </button>
        </div>

        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transform transition duration-300 hover:shadow-xl"
          >
            <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Restaurant Name</label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Restaurant name is required",
                    pattern: {
                      value: /^[A-Za-z][A-Za-z0-9]*(?:\s[A-Za-z][A-Za-z0-9]*)*$/,
                      message: "Name must start with a letter and contain only single spaces",
                    },
                  })}
                  className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter restaurant name"
                />
                {errors.name && (
                  <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Contact (Phone)</label>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <input
                    type="text"
                    {...register("contact", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid phone number (10 digits)",
                      },
                    })}
                    className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="10-digit phone number"
                  />
                </div>
                {errors.contact && (
                  <p className="text-red-500 mt-1 text-sm">{errors.contact.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500 mt-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    {...register("address", {
                      required: "Address is required",
                      pattern: {
                        value: /^[A-Za-z0-9\/]+(?:,\s?[A-Za-z0-9\/]+)*(?:\s[A-Za-z0-9\/]+)*$/,
                        message: "Please enter a valid address",
                      },
                    })}
                    className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter full address"
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 mt-1 text-sm">{errors.address.message}</p>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50">
              <button
                type="submit"
                className="w-full px-5 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add Restaurant</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurantForm;