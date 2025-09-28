import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md '>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/" className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>true</span>
          <span className='text-slate-700'>Nest</span>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input 
            type="text" 
            placeholder='Search...' 
            className='bg-transparent focus:outline-none w-24 sm:w-64'/>
          <IoSearch className='text-slate-500'/>
        </form>
        <ul className='flex gap-4'>
          <Link className='hidden sm:inline text-slate-700 hover:underline duration-300' to="/">
            Home
          </Link>
          <Link className='hidden sm:inline text-slate-700 hover:underline duration-300' to="/about">
            About
          </Link>
          <Link className='text-slate-700 hover:underline duration-300' to="/signin">
            Sign in
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header