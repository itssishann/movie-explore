import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {asyncloadperson} from "../../stores/actions/personActions"
import Loader from './Loader';
import { removeperson } from '../../stores/reducers/personSlice';

const Persondetails = () => {
  
  const {info} = useSelector((state)=>state.person)
  const navigate = useNavigate()
 
  
  console.log(info);
  const dispatch = useDispatch();
  const {id} = useParams()
  useEffect(()=>{
    dispatch(asyncloadperson(id))
    return () =>{
      dispatch(removeperson())
    }
  },[])







  return  info ? (
    <div className="px-[10%] w-screen h-[150vh]  bg-[#1F1E24] ">
    {/* Part 1 navigation */}
    <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl ">
        <Link
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
    </nav>

    <div className="w-full flex overflow-x-hidden ">
        
        <div className="w-[20%] ">
            <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
                src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
                alt=""
            />
            <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
            
            <div className="text-2xl text-white flex gap-x-5">
                <a
                    target="_blank"
                    href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                >
                    <i className="hover:text-emerald-400 duration-200  ri-earth-fill"></i>
                </a>

                <a
                    target="_blank"
                    href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                >
                    <i className="hover:text-blue-600 duration-200 ri-facebook-circle-fill"></i>
                </a>

                <a
                    target="_blank"
                    href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                >
                    <i className="hover:text-pink-500 duration-200  ri-instagram-fill"></i>
                </a>
                <a
                    target="_blank"
                    href={`https://x.com/${info.externalid.twitter_id}`}
                >
                    <i className="hover:text-zinc-600 duration-200  ri-twitter-x-fill"></i>
                </a>
            </div>
        
            <h1 className="text-2xl text-zinc-400 font-semibold my-5">
                Person Info
            </h1>

            <h1 className="text-lg text-zinc-400 font-semibold ">
                Known For
            </h1>
            <h1 className=" text-zinc-400 ">
                {info.detail.known_for_department}
            </h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                Gender
            </h1>
            <h1 className=" text-zinc-400 ">
                {info.detail.gender === 2 ? "Male" : "Female"}
            </h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
            <i className=" text-xl text-zinc-100 ri-cake-2-line"></i> Birthday
            </h1>
            <h1 className=" text-zinc-400 ">{info.detail.birthday}</h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                Deathday
            </h1>
            <h1 className=" text-zinc-400 ">
                {info.detail.deathday
                    ? info.detail.deathday
                    : "Still Alive"}
            </h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
            <i className="text-white text-xl ri-map-pin-user-line"> </i>
           Place Of Birth
            </h1>
            <h1 className=" text-zinc-400 ">
             {info.detail.place_of_birth}
            </h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                Also Known As
            </h1>
            <h1 className=" text-zinc-400 ">
                {info.detail.also_known_as.join(", ")}
            </h1>
        </div>

        
        <div className="w-[80%] ml-[5%]">
            <h1 className="text-6xl text-zinc-400 font-black my-5">
                {info.detail.name}
            </h1>

            <h1 className="text-xl text-zinc-400 font-semibold ">
                Biography
            </h1>
            <p className="text-zinc-400 mt-3 ">
                {info.detail.biography}
            </p>

            <h1 className="mt-5 text-lg text-zinc-400 font-semibold ">
                Known For
            </h1>
           

            <div className="w-full flex justify-between">
                <h1 className="mt-5 text-xl text-zinc-400 font-semibold ">
                   {info.detail.known_for_department}
                </h1>

                
            </div>

           
        </div>
    </div>
</div>
  ) : (<Loader/>)
}

export default Persondetails