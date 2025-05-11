import React from "react";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';  // Ajusta la ruta según tu estructura
import { logout } from '../redux/slices/authSlice';  // Ajusta la ruta según tu estructura

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="backdrop-blur-sm flex gap-5 justify-between px-14 pt-3.5 pb-6 w-full bg-white bg-opacity-10 max-md:flex-wrap max-md:px-5 overflow-x-hidden">
      <div className="text-xl text-white">
        <span className="font-semibold">Melody</span>
        <br />
        Music Platform
      </div>

      <nav className="flex gap-5 items-center self-start mt-2.5 max-md:flex-wrap">
        <div className="grow self-stretch my-auto text-base text-white uppercase">
          <Link href="/">Home</Link>
        </div>
        <div className="self-stretch my-auto text-base text-white uppercase">
          <a href="#about" className="no-underline hover:underline">About</a>
        </div>
        <div className="self-stretch my-auto text-base text-white uppercase">
          <Link href="/Dashboard">Dashboard</Link>
        </div>
        <div className="self-stretch my-auto text-base text-white uppercase">
          <Link href="/download">Download</Link>
        </div>
        {isAuthenticated && (
          <div className="self-stretch my-auto text-base text-white uppercase">
            <Link href="/userProfile">Profile</Link>
          </div>
        )}
      </nav>
      <div className="flex gap-5 justify-between my-auto">
        {!isAuthenticated ? (
          <>
            <div className="grow self-stretch my-auto text-base text-purple-500 uppercase">
              <Link href="/login">LOGIN</Link>
            </div>
            <div className="grow self-stretch my-auto text-base text-purple-500 uppercase">
              <Link href="/register">Register</Link>
            </div>
          </>
        ) : (
          <div className="grow self-stretch my-auto text-base text-purple-500 uppercase cursor-pointer" onClick={handleLogout} role = "button">
            LOGOUT
          </div>
        )}
      </div>
    </div>
  );
}
