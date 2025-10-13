import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
const [formData, setFormData] = useState({});
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const res = await fetch('/api/auth/signup', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
  );
  
  const data  = await res.json();

  if(data.success === false) {
    setLoading(false);
    setError(data.message);
    return;
  }
  
  setLoading(false);
};

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form 
          onSubmit={handleSubmit} 
          className='flex flex-col gap-4 '>
        <input 
          type="text"
          id="username"
          placeholder='Username'
          className='border p-3 rounded-lg focus:outline-none'
          onChange={handleChange}
          required
        />
        <input 
            type="email"
            id="email"
            placeholder='Email'
            className='border p-3 rounded-lg focus:outline-none'
            onChange={handleChange} 
            required
        />
        <input 
          type="password"
          id="password"
          placeholder='Password'
          className='border p-3 rounded-lg focus:outline-none'
          onChange={handleChange}
          required
        />
        <button 
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer'>
            { loading ? "Loading..." : "Sign up" }
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?
          <Link 
            to="/signin" 
            className='text-blue-700'>
            sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp