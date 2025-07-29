


import React, { useContext } from 'react';
import Logo from './Logo';
import { GrSearch } from 'react-icons/gr';
import { FaUserCircle, FaRegHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Header = () => {
    const navigate = useNavigate();
    const { user, setUser, loading } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8080/api/v1/users/logout', { withCredentials: true });
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="h-16 shadow-md bg-white sticky top-0 z-40">
            <div className="h-full container mx-auto flex items-center px-4 justify-between">
                <Link to={'/'}>
                    <Logo w={90} h={50} />
                </Link>
                <div className="hidden lg:flex items-center w-full max-w-sm border rounded-full focus-within:shadow pl-2">
                    <input type="text" placeholder="Search products..." className="w-full outline-none" />
                    <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer">
                        <GrSearch />
                    </div>
                </div>
                <div className="flex items-center gap-4 md:gap-7">
                    {!loading && (
                        <>
                            {user ? (
                                <>
                                    <Link to={"/dashboard/profile"}>
                                        {user.profilePicture ? (
                                            <img src={user.profilePicture} alt='User' className='w-9 h-9 rounded-full object-cover'/>
                                        ) : (
                                            <FaUserCircle className="text-3xl text-slate-600 hover:text-red-600"/>
                                        )}
                                    </Link>
                                    <Link to="/favorites" className="text-2xl text-slate-600 relative hover:text-red-600" title="Favorites">
                                        <FaRegHeart />
                                    </Link>
                                    <button onClick={handleLogout} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="px-3 py-1 whitespace-nowrap rounded-full text-white bg-red-600 hover:bg-red-700">
                                    Login
                                </Link>
                            )}

                            <Link
                                to="/post-ad"
                                className="hidden md:inline-block bg-red-600 text-white font-bold py-2 px-5 rounded-full hover:bg-red-700 transition-all text-sm shadow-md"
                            >
                                Post Your Ad
                            </Link> 
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;