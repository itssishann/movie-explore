import React from 'react'
import { Link } from 'react-router-dom'

const TrendCards = ({data}) => {
  return (
    <div className='w-screen  overflow-hidden overflow-x-auto overflow-y-auto p-5 '>
       <div className='mb-5'>
       <h1 className=' text-3xl text-zinc-400 font-semibold'>Trending..</h1>
   
       </div>
        <div className='w-full flex  overflow-x-visible mb-4 '>
            {data.map((data,i)=> <div key={i} className=' border-2 rounded-md min-w-[15%]  mr-5 '>
              <Link key={i} to={`/${data.media_type}/details/${data.id}`}>
                <img className='w-full rounded-md  object-cover' loading='lazy' src={`https://image.tmdb.org/t/p/original/${data.backdrop_path || data.poster_path}`} alt={`Image-${i+1}`} />
                </Link>
            <div className='p-2'>
            <h1 className='text-2xl font-black text-white'>
      {(data.name || data.title || data.orignal_name || data.orignal_title).slice(0,14)}
      </h1>
      <p className=' overflow-y-visible text-white mt-3'>{data.overview.slice(0,80)}... <Link className="text-blue-500">more</Link></p>
            </div>
            </div>)}
        </div>
    </div>
  )
}

export default TrendCards