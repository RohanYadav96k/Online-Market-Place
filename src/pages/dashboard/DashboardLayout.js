// import React from 'react';
// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { FaUser, FaHeart, FaListAlt, FaSignOutAlt } from 'react-icons/fa';
// import axios from 'axios';

// const DashboardLayout = () => {
//     const navigate = useNavigate();

//     const linkClasses = "flex items-center gap-3 p-3 rounded-md transition-colors text-gray-700";
//     const activeLinkClass = "bg-red-600 text-white font-semibold";
//     const inactiveLinkClass = "hover:bg-red-100 hover:text-red-700";
    
//     const handleLogout = async () => {
//         try {
//             await axios.get('http://localhost:3001/api/v1/users/logout', { withCredentials: true });
//             localStorage.removeItem('isLoggedIn');
//             navigate('/login');
//         } catch (error) {
//             console.error('Logout failed:', error);
//             alert('Logout failed. Please try again.');
//         }
//     };

//     return (
//         <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
//             <aside className="w-full md:w-1/4 lg:w-1/5 bg-white p-4 shadow-md rounded-lg h-fit">
//                 <h2 className="text-xl font-bold mb-4 border-b pb-2">My Account</h2>
//                 <nav className="flex flex-col gap-2">
//                     <NavLink 
//                         to="/dashboard/profile" 
//                         className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}
//                     >
//                         <FaUser /> Profile Settings
//                     </NavLink>
//                     <NavLink 
//                         to="/dashboard/my-ads" 
//                         className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}
//                     >
//                         <FaListAlt /> My Ads
//                     </NavLink>
//                     <NavLink 
//                         to="/dashboard/favorites" 
//                         className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}
//                     >
//                         <FaHeart /> Favorites
//                     </NavLink>
//                     <button 
//                         onClick={handleLogout}
//                         className={`${linkClasses} ${inactiveLinkClass} w-full text-left`}
//                     >
//                        <FaSignOutAlt /> Logout
//                     </button>
//                 </nav>
//             </aside>
//             <main className="w-full md:w-3/4 lg:w-4/5">
//                 {/*  MyAds, Favorites, etc., will be rendered here */}
//                 <Outlet />
//             </main>
//         </div>
//     );
// };

// export default DashboardLayout;



import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FaUser, FaListAlt, FaHeart, FaSignOutAlt
} from 'react-icons/fa';
import axios from 'axios';

const items = [
  { to: 'profile', icon: <FaUser />, text: 'Profile Settings' },
  { to: 'my-ads', icon: <FaListAlt />, text: 'My Ads' },
  { to: '../favorites', icon: <FaHeart />, text: 'Favorites' }
];

const DashboardLayout = () => {
  const nav = useNavigate();
  const logout = async () => {
    await axios.get('/api/v1/users/logout', { withCredentials: true });
    nav('/login');
  };

  return (
    <div className="container mx-auto p-4 flex gap-6">
      <aside className="w-64 bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">My Account</h2>
        <nav className="flex flex-col gap-2">
          {items.map(o => (
            <NavLink key={o.to} to={o.to}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                }`}>
              {o.icon} {o.text}
            </NavLink>
          ))}
          <button onClick={logout} className="flex items-center gap-2 p-2 rounded hover:bg-red-100 w-full">
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
