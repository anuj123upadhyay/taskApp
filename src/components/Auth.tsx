// import React, { useState, useEffect } from "react";
// import { account, databases } from "../utils/appwrite";
// import conf from "../config/conf";
// import { Models } from "appwrite";
// import { useNavigate } from "react-router-dom";

// const Auth = () => {
//   const navigate = useNavigate();

//   const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

//   const [signupData, setSignupData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     phone_number: "",
//     notification_type: "sms",
//   });

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     checkSession();
//   }, []);

//   const checkSession = async () => {
//     try {
//       const userData = await account.get();
//       setIsLoggedIn(true);
//       setUser(userData);
//       localStorage.setItem("isLoggedIn", "true");
//     } catch {
//       setIsLoggedIn(false);
//       setUser(null);
//       localStorage.removeItem("isLoggedIn");
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { email, password, name, phone_number, notification_type } = signupData;

//     try {
//       await account.create("unique()", email, password, name);
//       await databases.createDocument(
//         conf.appwriteDatabaseId,
//         conf.appwiteUserCollectionId,
//         "unique()",
//         { email, phone_number, name, notification_type }
//       );
//       alert("Signup successful! Please log in.");
//       setIsSignup(false); // Switch to login after signup
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { email, password } = loginData;

//     try {
//       await account.createSession(email, password);
//       checkSession();
//       navigate("/dashboard"); // Redirect to dashboard on successful login
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await account.deleteSession("current");
//       setIsLoggedIn(false);
//       setUser(null);
//       navigate("/auth"); // Redirect to auth page on logout
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         {isLoggedIn ? (
//           <>
//             <h2 className="text-center text-2xl font-bold text-gray-800">
//               Welcome, {user?.name || "User"}!
//             </h2>
//             <p className="text-center text-gray-600">Email: {user?.email}</p>
//             <button
//               onClick={handleLogout}
//               className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <h2 className="text-center text-2xl font-bold text-gray-800">
//               {isSignup ? "Signup" : "Login"}
//             </h2>
//             {isSignup ? (
//               <form onSubmit={handleSignup} className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={signupData.name}
//                   onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={signupData.email}
//                   onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   value={signupData.phone_number}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, phone_number: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <select
//                   value={signupData.notification_type}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, notification_type: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 >
//                   <option value="email">Email</option>
//                   <option value="sms">SMS</option>
//                 </select>
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={signupData.password}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, password: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
//                 >
//                   Signup
//                 </button>
//               </form>
//             ) : (
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={loginData.email}
//                   onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={loginData.password}
//                   onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
//                 >
//                   Login
//                 </button>
//               </form>
//             )}
//             <button
//               onClick={() => setIsSignup((prev) => !prev)}
//               className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition mt-4"
//             >
//               {isSignup ? "Switch to Login" : "Switch to Signup"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Auth;
// import React, { useState, useEffect } from "react";
// import { account, databases } from "../utils/appwrite";
// import conf from "../config/conf";
// import { Models } from "appwrite";
// import { useNavigate } from "react-router-dom";

// const Auth = () => {
//   const navigate = useNavigate();

//   const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

//   const [signupData, setSignupData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     phone_number: "",
//     notification_type: "sms",
//   });

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     checkSession();
//   }, []);

//   const checkSession = async () => {
//     try {
//       const userData = await account.get();
//       setIsLoggedIn(true);
//       setUser(userData);
//       localStorage.setItem("isLoggedIn", "true");
//     } catch {
//       setIsLoggedIn(false);
//       setUser(null);
//       localStorage.removeItem("isLoggedIn");
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { email, password, name, phone_number, notification_type } = signupData;

//     try {
//       // Create the user with a unique ID and set email, password, and name
//       const user = await account.create('unique()', email, password, name);

//       // Create a database document for user information
//       await databases.createDocument(
//         conf.appwriteDatabaseId,
//         conf.appwiteUserCollectionId,
//         user.$id,  // Store the Appwrite user ID from the response
//         { email, phone_number, name, notification_type }
//       );

//       alert("Signup successful! Please log in.");
//       setIsSignup(false); // Switch to login after signup
//     } catch (error: any) {
//       alert(error.message);  // Show any errors encountered during signup
//     }
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { email, password } = loginData;

//     try {
//       // Create a session for the user using email and password
//       await account.createSession(email, password);

//       // Check if the user session was created and redirect to the dashboard
//       checkSession();
//       navigate("/dashboard"); // Redirect to dashboard on successful login
//     } catch (error: any) {
//       alert(error.message); // Handle errors such as incorrect credentials
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await account.deleteSession("current"); // Delete the current session
//       setIsLoggedIn(false);
//       setUser(null);
//       localStorage.removeItem("isLoggedIn"); // Remove the login status
//       navigate("/auth"); // Redirect to auth page on logout
//     } catch (error: any) {
//       alert(error.message); // Handle any errors during logout
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         {isLoggedIn ? (
//           <>
//             <h2 className="text-center text-2xl font-bold text-gray-800">
//               Welcome, {user?.name || "User"}!
//             </h2>
//             <p className="text-center text-gray-600">Email: {user?.email}</p>
//             <button
//               onClick={handleLogout}
//               className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <h2 className="text-center text-2xl font-bold text-gray-800">
//               {isSignup ? "Signup" : "Login"}
//             </h2>
//             {isSignup ? (
//               <form onSubmit={handleSignup} className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={signupData.name}
//                   onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={signupData.email}
//                   onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   value={signupData.phone_number}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, phone_number: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <select
//                   value={signupData.notification_type}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, notification_type: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                 >
//                   <option value="email">Email</option>
//                   <option value="sms">SMS</option>
//                 </select>
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={signupData.password}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, password: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
//                 >
//                   Signup
//                 </button>
//               </form>
//             ) : (
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={loginData.email}
//                   onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={loginData.password}
//                   onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
//                 >
//                   Login
//                 </button>
//               </form>
//             )}
//             <button
//               onClick={() => setIsSignup((prev) => !prev)}
//               className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition mt-4"
//             >
//               {isSignup ? "Switch to Login" : "Switch to Signup"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Auth;



import React, { useState, useEffect } from "react";
import { account, databases } from "../utils/appwrite";
import conf from "../config/conf";
import { Models } from "appwrite";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
    phone_number: "",
    notification_type: "sms",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const userData = await account.get();
      setIsLoggedIn(true);
      setUser(userData);
      localStorage.setItem("isLoggedIn", "true");
    } catch {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("isLoggedIn");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, name, phone_number, notification_type } = signupData;

    try {
      // Create the user with a unique ID and set email, password, and name
      const createdUser = await account.create('unique()', email, password, name);

      // Use the generated user ID from the response
      const userId = createdUser.$id;

      // Create a database document for user information
      await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwiteUserCollectionId,
        userId, // Use the generated user ID for the document
        { email, phone_number, name, notification_type }
      );

      alert("Signup successful! Please log in.");
      setIsSignup(false); // Switch to login after signup
    } catch (error: any) {
      alert(error.message);  // Show any errors encountered during signup
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = loginData;

    try {
      // Create a session for the user using email and password
      await account.createEmailPasswordSession(email, password);

      // Check if the user session was created and redirect to the dashboard
      checkSession();
      navigate("/dashboard"); // Redirect to dashboard on successful login
    } catch (error: any) {
      alert(error.message); // Handle errors such as incorrect credentials
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // Delete the current session
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("isLoggedIn"); // Remove the login status
      navigate("/auth"); // Redirect to auth page on logout
    } catch (error: any) {
      alert(error.message); // Handle any errors during logout
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {isLoggedIn ? (
          <>
            <h2 className="text-center text-2xl font-bold text-gray-800">
              Welcome, {user?.name || "User"}!
            </h2>
            <p className="text-center text-gray-600">Email: {user?.email}</p>
            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-center text-2xl font-bold text-gray-800">
              {isSignup ? "Signup" : "Login"}
            </h2>
            {isSignup ? (
              <form onSubmit={handleSignup} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={signupData.phone_number}
                  onChange={(e) =>
                    setSignupData({ ...signupData, phone_number: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <select
                  value={signupData.notification_type}
                  onChange={(e) =>
                    setSignupData({ ...signupData, notification_type: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
                <input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                >
                  Signup
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Login
                </button>
              </form>
            )}
            <button
              onClick={() => setIsSignup((prev) => !prev)}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition mt-4"
            >
              {isSignup ? "Switch to Login" : "Switch to Signup"}
            </button>
          </>
        )}
        {isLoggedIn && (
            <Link to="/dashboard" className="text-blue-500 hover:underline">
              Go to Dashboard
              </Link>
            )}
      </div>
    </div>
  );
};

export default Auth;

