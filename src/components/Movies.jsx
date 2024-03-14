import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/cards';
const Movies = () => {
    document.title= "Motique | Movies🍿"
    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [duration, setDuration] = useState('day');
    const [movie, setmovie] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const [page, setPage] = useState(1);

    const getMovie = async () => {
        try {
            const { data } = await axios.get(`movie/${category}?page=${page}`);
            
           if (data.results.length>0) {
            setmovie((prevstate)=>[...prevstate,...data.results])
            setPage(page+1)
            
           } else {
              sethasMore(false)
           }
        } catch (error) {
            console.log(`movie Comp --> ${error}`);
        }
    };
      function refreshHandler(){
          if(movie.length === 0){
            getMovie()
          }
          else{
            setPage(1)
            setmovie([])
            getMovie()
          }
      }
    useEffect(() => {
        refreshHandler();
    }, [category])
  return (
    <div className='w-screen h-screen '>
    <div className='px-[5%]  flex items-center w-[80%]'>
        <h1 className='cursor-pointer  text-zinc-200 text-2xl'>
            <i onClick={() => navigate(-1)} className='  hover:text-[#6556cd] duration-100 ri-arrow-left-fill'></i>
            Movies 
        </h1>
        <Topnav/>
        <Dropdown title='Category' options={['popular', 'top_rated', 'upcoming',"now_playing"]} func={e => setCategory(e.target.value)} />
        <div className='w-[2%]'></div>
       
    </div>
    <InfiniteScroll
        dataLength={movie.length}
        next={getMovie}
        hasMore={hasMore} 
        loader={<h1 className='text-zinc-200'>Loading<span className='animate-ping'>...</span></h1>}
    >
        <Cards data={movie} title="movie" />
    </InfiniteScroll>
</div>
  )
}

export default Movies