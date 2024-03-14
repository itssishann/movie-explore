import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import NoImg from "/noImg.jpeg"
function Topnav() {
    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState(null);

    const getSearches = async () => {
        try {
            const response = await axios.get(`/search/multi?query=${query}`);
            setSearches(response.data.results);
           
        } catch (error) {
            console.log(`Error --> ${error}`);
        }
    };

    useEffect(() => {
        getSearches();
    }, [query]);

    return (
        <div className='w-full  h-[10vh] relative flex justify-center items-center '>
            <i className="text-zinc-400 text-3xl ri-search-line"></i>
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className='w-[50%] mx-10 text-zinc-200 p-5 text-xl outline-none border-none bg-transparent'
                type="text"
                name=""
                placeholder='Search any movie'
                id="" />
            {query.length > 0 && (<i onClick={() => setQuery("")} className="ri-close-large-line text-zinc-200 text-2xl"></i>)}
            <div className='w-[50%] max-h-[50vh] ml-4  z-40 absolute top-[100%] bg-zinc-200 overflow-auto rounded-md'>
                {searches !== null && searches.map((res, i) => (
                    <Link to={`/${res.media_type}/details/${res.id}`} key={i} className='w-[100%] p-8 flex  hover:bg-zinc-300 duration-150 items-center border-b-2 border-zinc-100 text-zinc-700 font-semibold hover:text-black'>
                        <img 
                         className='w-[10vh] h-[10vh] object-cover rounded-md shadow-lg  mr-5 '
                        src={ res.backdrop_path || res.profile_path ? `https://image.tmdb.org/t/p/original/${res.backdrop_path} || ${res.profile_path}` : NoImg} alt="" />
                        <span>{res.name || res.title || res.orignal_name || res.orignal_title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Topnav;
