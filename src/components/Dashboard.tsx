

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-2xl w-full bg-white shadow-lg p-8 rounded-lg">
//         <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
//         <p className="text-gray-600 mt-4">Welcome to your dashboard!</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate

// const Dashboard = () => {
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   const handleCreateTask = () => {
//     // Navigate to the /dashboard/createTask route
//     navigate("/dashboard/createTask");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-2xl w-full bg-white shadow-lg p-8 rounded-lg">
//         <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
//         <p className="text-gray-600 mt-4">Welcome to your dashboard!</p>

//         {/* Button to navigate to /dashboard/createTask */}
//         <button
//           onClick={handleCreateTask}
//           className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
//         >
//           Go to Create Task
//         </button>

//         {/* Nested routes will be rendered here */}
//         <div className="mt-8">
//           <Outlet /> {/* The Outlet component will render the nested routes */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
//////////////////////////////////////

import { useNavigate } from "react-router-dom"; 

const Dashboard = () => {
  const navigate = useNavigate(); 

  const handleCreateTask = () => {
    // Navigate to the /dashboard/createTask route
    navigate("/dashboard/createTask");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full bg-white shadow-lg p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-4">Welcome to your dashboard!</p>

        {/* Button to navigate to /dashboard/createTask */}
        <button
          onClick={handleCreateTask}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Go to Create Task
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

