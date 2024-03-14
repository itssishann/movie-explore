import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({data,title}) => {
  return (
    <div className='flex scroll-smooth flex-wrap h-full w-full px-[5%] bg-[#1f1e24]'>
      {data.map((s,i)=>(
        <Link to={`/${s.media_type || title}/details/${s.id}`} className=' relative w-[25vh] mr-[5%] mb-[5%]' key={i}>
            <img loading='lazy' className=' rounded-md shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' src={`https://image.tmdb.org/t/p/original/${s.poster_path || s.profile_path}`} alt="" />
           <h1 className='p-2 text-2xl text-zinc-200 font-semibold'> {s.name || s.title || s.orignal_name || s.orignal_title}</h1>

           {s.vote_average && (
             <div className='absolute bg-green-500 right-[-8%] bottom-[20%] font-semibold text-md text-white w-[5vh] h-[5vh] flex justify-center items-center rounded-full border-2'>
             {(s.vote_average*10).toFixed()} <sup>%</sup>
           </div>
           )} 
         
        </Link>
      ))}
    </div>
  )
}

export default Cards