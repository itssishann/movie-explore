import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import Cards from './templates/cards';
import Loader from './templates/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
    document.title = "Motique | Trending ✨"
    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState('day');
    const [trending, setTrending] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const [page, setPage] = useState(1);

    const getTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
           if (data.results.length>0) {
            setTrending((prevstate)=>[...prevstate,...data.results])
            setPage(page+1)
           } else {
              sethasMore(false)
           }
        } catch (error) {
            console.log(`Trending Comp --> ${error}`);
        }
    };
      function refreshHandler(){
          if(trending.length === 0){
            getTrending()
          }
          else{
            setPage(1)
            setTrending([])
            getTrending()
          }
      }
    useEffect(() => {
        refreshHandler();
    }, [category, duration]); // Fetch data whenever category or duration changes

    return(
        <div className='w-screen h-screen '>
            <div className='px-[5%]  flex items-center w-[80%]'>
                <h1 className='cursor-pointer text-zinc-200 text-2xl'>
                    <i onClick={() => navigate(-1)} className='text-2xl hover:text-[#6556cd] duration-100 ri-arrow-left-fill'></i>
                    Trending
                </h1>
                <Topnav />
                <Dropdown title='Category' options={['movie', 'tv', 'all']} func={e => setCategory(e.target.value)} />
                <div className='w-[2%]'></div>
                <Dropdown title='Duration' options={['week', 'day']} func={e => setDuration(e.target.value)} />
            </div>
            <InfiniteScroll
                dataLength={trending.length}
                next={getTrending}
                hasMore={hasMore} 
                loader={<h1 className='text-zinc-200'>Loading<span className='animate-ping'>...</span></h1>}
            >
                <Cards data={trending} title={category} />
            </InfiniteScroll>
        </div>
    );
};

export default Trending;
