// // // import "./index.css";
// // // import { Route,Routes } from "react-router-dom";
// // // import Task from "./routes/Task"
// // // import Index from "./routes/Index"
// // // import Navbar from "./components/Navbar"


// // // const App = ()=> {
  
// // //   return (
// // //     <>
// // //     <Navbar/>
// // //     <Routes>
// // //       <Route path="/" element={<Index/>} />
// // //       <Route path="/tasks" element={<Task/>} />
// // //     </Routes>
// // //     </>
// // //   )
// // // }

// // // export default App


// // import React from "react";
// // import {  Routes, Route, Navigate } from "react-router-dom";
// // import Auth from "./components/Auth";
// // import Dashboard from "./components/Dashboard";
// // import Task from "./routes/Task";
// // import Index from "./routes/Index";

// // const App: React.FC = () => {
// //   // Check user authentication status from localStorage
// //   const isAuthenticated = !!localStorage.getItem("isLoggedIn");

// //   return (
    
// //       <Routes>
// //         {/* Authentication Route */}
// //         <Route path="/auth" element={<Auth />} />

// //         {/* Dashboard Route */}
// //         <Route
// //           path="/dashboard"
// //           element={
// //             isAuthenticated ? (
// //               <Routes>
// //                   <Dashboard/>
// //                   {/* Nested Routes within Dashboard */}
// //                   <Route path="/createTask" element={<Index />} />
// //                   <Route path="/tasks" element={<Task />} />
// //                 </Routes>
             
// //             ) : (
// //               <Navigate to="/auth" replace />
// //             )
// //           }
// //         />

// //         {/* Redirect Root to Dashboard */}
// //         <Route
// //           path="/"
// //           element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />}
// //         />

// //         {/* Fallback for Undefined Routes */}
// //         <Route
// //           path="*"
// //           element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />}
// //         />
// //       </Routes>
  
// //   );
// // };

// // export default App;




// ////////////////////////////////////////
// // import React from "react";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import Auth from "./components/Auth";
// // import Dashboard from "./components/Dashboard";
// // import Task from "./routes/Task";
// // import Index from "./routes/Index";

// // const App: React.FC = () => {
// //   // Check user authentication status from localStorage
// //   const isAuthenticated = !!localStorage.getItem("isLoggedIn");

// //   return (
// //     <Routes>
// //       {/* Authentication Route */}
// //       <Route path="/auth" element={<Auth />} />

// //       {/* Dashboard Route */}
// //       <Route
// //         path="/dashboard"
// //         element={
// //           isAuthenticated ? (
// //             <Dashboard />
// //           ) : (
// //             <Navigate to="/auth" replace />
// //           )
// //         }
// //       >
// //         {/* Nested Routes within Dashboard */}
// //         <Route path="/dashboard/createTask" element={<Index />} />
// //         <Route path="/dashboard/tasks" element={<Task />} />
// //       </Route>

// //       {/* Redirect Root to Dashboard */}
// //       <Route
// //         path="/"
// //         element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />}
// //       />

// //       {/* Fallback for Undefined Routes */}
// //       <Route
// //         path="*"
// //         element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />}
// //       />
// //     </Routes>
// //   );
// // };

// // export default App;



// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Auth from "./components/Auth";
// import Dashboard from "./components/Dashboard";
// import Task from "./routes/Task";
// import Index from "./routes/Index";

// const App: React.FC = () => {
//   const isAuthenticated = !!localStorage.getItem("isLoggedIn");

//   return (
//     <Routes>
//       {/* Authentication Route */}
//       <Route path="/auth" element={<Auth />} />

//       {/* Dashboard Route */}
//       <Route
//         path="/dashboard"
//         element={
//           isAuthenticated ? (
//             <Dashboard />
//           ) : (
//             <Navigate to="/auth" replace />
//           )
//         }
//       >
//         {/* Nested Routes for Dashboard */}
//         <Route path="createTask" element={<Index />} />
//         <Route path="tasks" element={<Task />} />
//       </Route>

//       {/* Redirect Root to Dashboard */}
//       <Route
//         path="/"
//         element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />}
//       />

//       {/* Fallback for Undefined Routes */}
//       <Route
//         path="*"
//         element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />}
//       />
//     </Routes>
//   );
// };

// export default App;




/////////////////////////
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Task from "./routes/Task";
import Index from "./routes/Index";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("isLoggedIn");

  return (
    <>
    <Navbar/> 
    <Routes>
     
      {/* Authentication Route */}
      <Route path="/auth" element={<Auth />} />

      {/* Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard /> // Render the Dashboard only for the /dashboard route
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      >
        {/* Do not render Dashboard for nested routes */}
      </Route>

      {/* Nested Routes without Dashboard layout */}
      <Route
        path="/dashboard/createTask"
        element={isAuthenticated ? <Index /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/dashboard/tasks"
        element={isAuthenticated ? <Task /> : <Navigate to="/auth" replace />}
      />

      {/* Redirect Root to Dashboard */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />}
      />

      {/* Fallback for Undefined Routes */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />}
      />
    </Routes>
    </>
  );
};

export default App;

