import { useState } from 'react';
import {Link} from 'react-router-dom';
// import axios from 'axios';

const SignUp = () => {
const [formData, setFormData] = useState({});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  })
}

const handleSubmit = async (e) => {
  e.preventDefault();

    const res = await fetch('/api/auth/signup', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
  });
  const data = await res.json();
  console.log(data);
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input 
          type="text" 
          placeholder='Username'
          className='border p-3 rounded-lg focus:outline-none'
          id='username'
          onChange={handleChange}
        />
        <input 
          type="email" 
          placeholder='Email'
          className='border p-3 rounded-lg focus:outline-none'
          id='email'
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder='Password'
          className='border p-3 rounded-lg focus:outline-none'
          id='Password'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?
          <Link to="/signin" className='text-blue-700'>
            sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp