import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/cards';

const Person = () => { 
    document.title = "Motique | Actors😎"
    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const [page, setPage] = useState(1);

    const getPerson = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);
            
           if (data.results.length>0) {
            setperson((prevstate)=>[...prevstate,...data.results])
            setPage(page+1)
       
           } else {
              sethasMore(false)
           }
        } catch (error) {
            console.log(`person Comp --> ${error}`);
        }
    };
      function refreshHandler(){
          if(person.length === 0){
            getPerson()
          }
          else{
            setPage(1)
            setperson([])
            getPerson()
          }
      }
    useEffect(() => {
        refreshHandler();
    }, [category]); 

  return (
   <>
     <div className='w-screen h-screen '>
            <div className='px-[5%]  flex items-center w-[80%]'>
                <h1 className='cursor-pointer flex text-zinc-200 text-2xl'>
                    <i onClick={() => navigate(-1)} className='text-2xl hover:text-[#6556cd] duration-100 ri-arrow-left-fill'></i>
                    Person <i className="p-1 text-[#6556cd] text-3xl ri-user-follow-fill"></i>
                </h1>
                <Topnav/>
              
               
            </div>
            <InfiniteScroll
                dataLength={person.length}
                next={getPerson}
                hasMore={hasMore} 
                loader={<h1 className='text-zinc-200'>Loading<span className='animate-ping'>...</span></h1>}
            >
                <Cards data={person} title="person" />
            </InfiniteScroll>
        </div>
   </>
  )
}

export default Person