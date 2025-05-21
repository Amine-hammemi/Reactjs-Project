'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './spinner.css'

const Home = () => {
  const router = useRouter();
  const [loading , setLoading] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false);
      router.push('/gameModeSelection'); 
    },2000)
    return ()=> clearTimeout(timer);
  },[router])


  return (
    <div>
      {loading &&(
        <>
        <h1>Welcome to the Tic Tac Toe Game</h1>
        <div className='spinner'>
        </div></>
      )}     
    </div>
  );
};

export default Home;
