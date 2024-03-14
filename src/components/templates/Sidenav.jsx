
import {React} from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
const Sidenav = () => {
 function contactHandler(){
  Swal.fire({
    title: "Contact admin@xyz.com",
    icon:"info",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }
  });
 }
 function aboutHandler(){
  Swal.fire({
    title: "Motique Movies: Your cinematic journey begins here.",
    icon:"success",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }
  });
 }
  return (
    <div className='w-[20%] h-full border-r-2 border-zinc-400 p-6 '>
      
      <h1 className='text-white font-bold '> 
      <i className="text-[#6556cd] mr-2 text-2xl ri-movie-2-line"></i>
        <span className='text-2xl'>Motique Movies</span>
        </h1>
        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
        <h1 className='text-white font-semibold text-xl mt-10 mb-5 '>New Feeds</h1>
        <Link to={"/trending"} className='hover:bg-[#6556cd] p-3 hover:text-white rounded-md ease-in duration-200'>
        <i className="mr-2 ri-fire-line"></i>
          Trending</Link>
        <Link to={"/popular"} className='hover:bg-[#6556cd] p-3 hover:text-white rounded-md ease-in duration-200'>
        <i className="ri-bard-line mr-2 "></i>
          Popular</Link>
        <Link to={"/movie"} className='hover:bg-[#6556cd] p-3 hover:text-white rounded-md ease-in duration-200'>
        <i className="ri-film-line mr-2"></i>
          Movies</Link>
        <Link to={"/tv"} className='hover:bg-[#6556cd] p-3 hover:text-white rounded-md ease-in duration-200'>
        <i className=" mr-2 ri-tv-line"></i>
          Tv Shows</Link>
        <Link to={"/actors"} className='hover:bg-[#6556cd] p-3 hover:text-white rounded-md ease-in duration-200'>
        <i className="ri-team-line mr-2"></i>
          Actors</Link>
          <hr className='bg-zinc-200 border-none h-[1px]' />
          
        </nav>

        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
        <h1 className='text-white font-semibold text-xl mt-10 mb-5 '>Website Information</h1>
        <Link onClick={aboutHandler} className='hover:bg-[#6556cd] p-3 hover:text-white rounded-md ease-in duration-200'>
        <i className="mr-2 ri-empathize-fill"></i>
          About Motique</Link>
        <Link onClick={contactHandler} className='hover:bg-[#6556cd] p-3 hover:text-white rounded-md ease-in duration-200'>
        <i className="ri-phone-fill mr-2 "></i>
          Contact Us</Link>
        <Link className='hover:bg-[#6556cd] p-3 hover:text-white rounded-md ease-in duration-200'/>
       
        </nav>
    </div>
  )
}

export default Sidenav