import React, { useEffect,useState } from 'react'
import Sidenav from './templates/Sidenav'
import Topnav from './templates/Topnav'
import axios from '../utils/axios'
import Header from './templates/Header'
import TrendCards from './templates/TrendCards'
import Loader from './templates/Loader'

const Home = () => {

  document.title = "Motique | Home🍿"
  const [wallpaper, setWallpaper] = useState(null)
  const [trending, setTrending] = useState(null)
  async function getHeaderWallpaper() {
    try {
      const {data} = await axios.get(`trending/all/day`)
  let randomWallpaper = data.results[Math.floor(Math.random()*data.results.length)]
      setWallpaper(randomWallpaper)
    } catch (err) {
      console.log('Home Err -->',err);
    }
  }
   
  async function getTrending() {
    try {
      const {data} = await axios.get(`trending/all/day`)
  
      setTrending(data.results)
    } catch (err) {
      console.log('Home Err -->',err);
    }
  }
  useEffect(()=>{
    !wallpaper && getHeaderWallpaper();
    !trending && getTrending()
   },[])

  return wallpaper && trending ? (
    <>
    <Sidenav/>
    <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
    <Topnav/>
    
    <Header data={wallpaper}/>
    <TrendCards data={trending} />
    </div>
   
    
    </>
  ) : <Loader/>
}

export default Home