import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/cards';

const Popular = () => {
    document.title = "Motique | Popular"
    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [popular, setpopular] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const [page, setPage] = useState(1);

    const getpopular = async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${page}`);
            console.log(`Data `,data);
           if (data.results.length>0) {
            setpopular((prevstate)=>[...prevstate,...data.results])
            setPage(page+1)
            console.log(data);
           } else {
              sethasMore(false)
           }
        } catch (error) {
            console.log(`popular Comp --> ${error}`);
        }
    };
      function refreshHandler(){
          if(popular.length === 0){
            getpopular()
          }
          else{
            setPage(1)
            setpopular([])
            getpopular()
          }
      }
    useEffect(() => {
        refreshHandler();
    }, [category]); 

  return (
   <>
     <div className='w-screen h-screen '>
            <div className='px-[5%]  flex items-center w-[80%]'>
                <h1 className='cursor-pointer text-zinc-200 text-2xl'>
                    <i onClick={() => navigate(-1)} className='text-2xl hover:text-[#6556cd] duration-100 ri-arrow-left-fill'></i>
                    Popular
                </h1>
                <Topnav/>
                <Dropdown title='Category' options={['movies', 'tv']} func={e => setCategory(e.target.value)} />
                <div className='w-[2%]'></div>
               
            </div>
            <InfiniteScroll
                dataLength={popular.length}
                next={getpopular}
                hasMore={hasMore} 
                loader={<h1 className='text-zinc-200'>Loading<span className='animate-ping'>...</span></h1>}
            >
                <Cards data={popular} title={category} />
            </InfiniteScroll>
        </div>
   </>
  )
}

export default Popular