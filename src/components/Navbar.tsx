// import {Link} from "react-router-dom"
// import { PencilIcon } from "@heroicons/react/24/solid"
// import Button from "./Button";
// import { useEffect, useState } from "react";
// import Select from "./Select";

// const  Navbar=()=> {
   

//     const themeArray = ["light", "dark", "system"];
//     const [theme, setTheme] = useState(() => {
//         return localStorage.getItem("theme") || themeArray[2];
//     });

//     const applyTheme = (selectedTheme: string) => {
//         const isDarkModePreferred = window.matchMedia(
//             "(prefers-color-scheme: dark)"
//             ).matches;

//         document.documentElement.classList.remove("light", "dark");
//         document.documentElement.classList.add(selectedTheme);

//         if (selectedTheme === "system") {
//         document.documentElement.classList.toggle("dark", isDarkModePreferred);
//         document.documentElement.classList.toggle("light",                  !isDarkModePreferred);
//         }
//     };

//     const handleSelectTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectedTheme = e.target.value;
//         setTheme(selectedTheme);

//         // Store the selected theme in localStorage
//         localStorage.setItem("theme", selectedTheme);
//     };

//     useEffect(() => {
//         applyTheme(theme);
//     }, [theme]);


//   return (
//     <nav className="py-4 border-b-2 border-container shadow-md shadow-gray-400 w-full fixed top-0 bg-base">
//             <ul className="flex items-center justify-between  w-11/12 mx-auto">
//                 <Link to="/dashboard/createtask">
                
//                     <Button extraBtnClasses="text-main"
                     
//                         content={
//                             {
//                             text: "Taskwrite",
//                             icon: PencilIcon,
//                         }
//                     }
                       
//                     />
//                 </Link>
                
//                 <div className="flex items-center justify-between gap-6">
//                     <Link
//                         to="/dashboard/tasks"
//                         className="font-semibold hover:scale-105 transition duration-300 ease-in-out"
//                     >
//                         View Tasks
//                     </Link>
//                     <div className="flex gap-2 items-center">
//                     <span className="font-semibold"> Theme: </span>
//                     <Select
//                         defaultSelectValue={theme}
//                         selectOptions={themeArray}
//                         handleSelectChange={handleSelectTheme}
//                     />
//                 </div>
//                 </div>
//             </ul>
//         </nav>
//   )
// }

// export default Navbar



import { Link, useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from '@heroicons/react/24/solid';
import Button from "./Button";
import { useEffect, useState } from "react";
import Select from "./Select";

const Navbar = () => {
  const navigate = useNavigate();  // For navigation after logout

  const themeArray = ["light", "dark", "system"];
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || themeArray[2];
  });

  const applyTheme = (selectedTheme: string) => {
    const isDarkModePreferred = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(selectedTheme);

    if (selectedTheme === "system") {
      document.documentElement.classList.toggle("dark", isDarkModePreferred);
      document.documentElement.classList.toggle("light", !isDarkModePreferred);
    }
  };

  const handleSelectTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);

    // Store the selected theme in localStorage
    localStorage.setItem("theme", selectedTheme);
  };

  const handleLogout = () => {
    // Clear authentication status
    localStorage.removeItem("isLoggedIn");  // Assuming this is the key used for authentication
    // Redirect to login page (or authentication page)
    navigate("/auth");
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <nav className="py-4 border-b-2 border-container shadow-md shadow-gray-400 w-full fixed top-0 bg-base">
      <ul className="flex items-center justify-between w-11/12 mx-auto">
        <Link to="/dashboard/createtask">
          <Button
            extraBtnClasses="text-main"
            content={{
              text: "Taskwrite",
              icon: PencilIcon,
            }}
          />
        </Link>

        <div className="flex items-center justify-between gap-6">
          <Link
            to="/dashboard/tasks"
            className="font-semibold hover:scale-105 transition duration-300 ease-in-out"
          >
            View Tasks
          </Link>

          <div className="flex gap-2 items-center">
            <span className="font-semibold"> Theme: </span>
            <Select
              defaultSelectValue={theme}
              selectOptions={themeArray}
              handleSelectChange={handleSelectTheme}
            />
          </div>

          {/* Logout Button */}
          <Button
            extraBtnClasses="text-red-600 hover:text-red-800"
            handleClick={handleLogout}
            content={{
              text: "Logout",
              icon: LockClosedIcon,  // You can choose an appropriate icon for logout
            }}
             // Corrected event handler name to lowercase 'onClick'
          />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;

