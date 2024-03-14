import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
function maintainHandler(){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Working on this feature!"
  });
  
}
const Header = ({ data }) => {
  return (
    <div className='w-full h-[50vh] flex flex-col items-start justify-end p-16' style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
      backgroundPosition:"center",
      backgroundSize:"cover",
      objectFit:"cover"
     
    }}>
      <h1 className='w-[70%] text-4xl font-black text-white'>
      {data.name || data.title || data.orignal_name || data.orignal_title}
      </h1>
      <p className='w-2/3 text-white mt-3'>{data.overview.slice(0,180)}...
       <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-500">more</Link></p>
      <p className='text-white flex gap-1 text-md capitalize mt-2'>
      <i className="  text-yellow-500 ri-calendar-schedule-fill"> </i>      
      {data.release_date || "No Information"}
      <i className="text-yellow-500 ri-movie-2-fill"></i> {data.media_type} 
      </p>
      <Link onClick={maintainHandler} className='bg-[#6556cd] p-4 rounded-md mt-3 hover:bg-blue-600 hover:text-zinc-300 ease-in duration-150 font-bold '>Watch Trailer<span className='animate-ping'>.</span><span className='animate-ping'>.</span><span className='animate-ping'>.</span> </Link>
    </div>
  );
};

export default Header;
