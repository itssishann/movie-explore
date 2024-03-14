import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {asyncloadmovie} from "../../stores/actions/movieActions"
import Loader from './Loader';
import { removeMovie } from '../../stores/reducers/movieSlice';
import { LiaImdb } from "react-icons/lia";
import { LuLanguages } from "react-icons/lu";
import Swal from 'sweetalert2';
const Moviedetails = () => {
  
  const {info} = useSelector((state)=>state.movie)
  const navigate = useNavigate()

 
  const dispatch = useDispatch();
  const {id} = useParams()
  useEffect(()=>{
    dispatch(asyncloadmovie(id))
    return () =>{
      dispatch(removeMovie())
    }
  },[])



  function trailerHandler() {
    if (info.videos === undefined) {
        Swal.fire({
            title: "No Trailer Found!",
            icon: 'error',
            showCloseButton: true,
            showConfirmButton: true
        });
    } else {
        Swal.fire({
            title: "Trailer!",
            html: `<iframe class="rounded-lg" width="450" height="320" src="https://www.youtube.com/embed/${info.videos.key}?autoplay=1;" frameborder="0" allow="autoplay" allowfullscreen></iframe>`,
            showCloseButton: true,
            showConfirmButton: true
        });
    }
}



  return  info ? (
    <div style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
      backgroundPosition:"center",
      backgroundSize:"cover",
      objectFit:"cover"
     
    }} className='relative w-screen h-full px-[10%]'>
      {/* part 1 navabr */}
   <nav className='w-full h-[10vh] flex gap-10 text-xl items-center text-zinc-200'>
    <Link onClick={()=>navigate(-1)}
      className='hover:text-blue-300 ri-arrow-left-line'
    >
       
    </Link>
    <a target='_blank' href={info.detail.homepage}>
     <i className='ri-external-link-fill'></i> 
    </a>
    <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
     <i className='ri-earth-fill'></i> 
    </a>
    <a target='_blank' href={`https://imdb.com/title/${info.externalid.imdb_id}`}>
      <LiaImdb className='hover:text-yellow-300 duration-200 fab text-4xl'/>
    </a>
   </nav>
 {/* Part 2 poster details  */}
    <div className='w-full flex'>
    <img loading='lazy' className=' my-16 rounded-md shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[55vh] object-cover' src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.profile_path}`} alt={info.detail.original_title} /> 
    <div className="content ml-[5%]">
      <h1 className='text-5xl font-black  text-zinc-100'>
        {
          info.detail.name || info.detail.title || info.detail.orignal_name || info.detail.orignal_title
        }
          <span className='pl-2 font-bold text-2xl text-zinc-300'>({info.detail.release_date.split("-")[0]})</span>
      </h1>
      
      {info.detail.vote_average && (
             <div className=' bg-green-500 mt-4 font-semibold text-md text-white w-[5vh] h-[5vh] flex justify-center items-center rounded-full border-2'>
             {(info.detail.vote_average*10).toFixed()} <sup>%</sup>
            
           </div>
           )} 
           <div className='flex mt-4 text-2xl items-center gap-x-2 text-zinc-200'>
           <h1><i className="ri-calendar-schedule-fill"> </i>
            Release Date
            </h1>
             <h1> {info.detail.release_date}</h1>
             <h1 > <i className="ri-star-smile-fill"> </i>  </h1>
            {info.detail.genres.map((g)=><p key={g.name} className='rounded-lg p-[1px] border-[1px] text-md  '> <span className='text-[1.2rem]'>{g.name}</span> </p>)}
           </div>
           <div  className=' mt-2 flex text-2xl items-center gap-x-2 text-zinc-200'>
           <i className="ri-time-fill"> </i>
           <h2>{info.detail.runtime} min</h2>
           </div>
           <div className='mt-2  '>
            <h1 className='text-2xl font-semibold text-zinc-200 italic' >{info.detail.tagline}</h1>
            <h1 className='text-3xl  text-zinc-200 font-bold'>Overview..</h1>
            <h2 className='text-xl  mt-1 text-zinc-300' >{info.detail.overview}</h2>
            <h1 className='text-3xl  text-zinc-200 font-bold'> <LuLanguages/>Translation</h1>
            <h2 className='text-xl  mt-1 text-zinc-300' >{info.translations.join(" ")}</h2>
            <p className='mb-5'></p>
            <Link className='hover:bg-blue-500 duration-150 px-4 text-2xl py-2 rounded-md bg-blue-300' onClick={trailerHandler}>
  <i class="ri-play-large-fill"></i>Play Trailer
</Link>

           </div>
    </div> 
    </div>
   
  
    </div>
  ) : (<Loader/>)
}

export default Moviedetails