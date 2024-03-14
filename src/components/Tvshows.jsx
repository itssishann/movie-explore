import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/cards';
const Tvshow = () => {
    document.title= "Motique | Tv 📺"
    const navigate = useNavigate();
    const [category, setCategory] = useState("india");
    const [tv, settv] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const [page, setPage] = useState(1);

    const getTv = async () => {
        try {
            const { data } = await axios.get(`search/tv?query=${category}`);
            
           if (data.results.length>0) {
            settv((prevstate)=>[...prevstate,...data.results])
            setPage(page+1)
            
           } else {
              sethasMore(false)
           }
        } catch (error) {
            console.log(`tv Comp --> ${error}`);
        }
    };
      function refreshHandler(){
          if(tv.length === 0){
            getTv()
          }
          else{
            setPage(1)
            settv([])
            getTv()
          }
      }
    useEffect(() => {
        refreshHandler();
    }, [category])
  return (
    <div className='w-screen h-screen  overflow-x-hidden '>
    <div className='px-[5%]  flex items-center w-[80%]'>
        <h1 className='cursor-pointer flex text-zinc-200 text-2xl'>
            <i onClick={() => navigate(-1)} className='  hover:text-[#6556cd] duration-100 ri-arrow-left-fill'></i>
            Tv Show <i className="text-md ri-computer-line"></i>
        </h1>
        <Topnav/>
        <Dropdown title='Category' options={['Italy', 'france', 'china',"usa","india"]} func={e => setCategory(e.target.value)} />
        <div className='w-[2%]'>
        </div>

       <sup className='animate-ping text-pink-600 text-xl'>*</sup><h2 className='text-zinc-100 text-md'>TV Shows will be Repeated when you scroll page<span className='animate-ping text-2xl'>...</span> </h2>

    </div>
    <InfiniteScroll
        dataLength={tv.length}
        next={getTv}
        hasMore={hasMore} 
        loader={<h1 className='text-zinc-200'>Loading<span className='animate-ping'>...</span></h1>}
    >
        <Cards data={tv} title="tv" category={category} />
    </InfiniteScroll>
</div>
  )
}

export default Tvshow