import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate  = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try{
    const res = await axios.post('/api/auth/signup', {
      username, 
      email, 
      password
    });

    if(res.data.success) {
      setError(null);
      setUser(res.data.user);
      navigate('/');
    } else {
      setError(res.data.message || "Unexpected error");
    }

  } catch(err) {
    setError(err.response?.data?.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      {error && 
        <p className='text-red-500 mb-4 text-center'>
          {error}
        </p>
      }
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input 
          type="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          className='border p-3 rounded-lg focus:outline-none'
          required
        />
        <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Email'
            className='border p-3 rounded-lg focus:outline-none'
            required
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='border p-3 rounded-lg focus:outline-none'
          required
        />
        <button 
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer'>
            { loading ? "Sign up..." : "Sign up" }
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