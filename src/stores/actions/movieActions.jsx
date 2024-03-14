
import axios from '../../utils/axios'
import { loadMovie } from '../reducers/movieSlice'
import { removeMovie } from '../reducers/movieSlice'

export const asyncloadmovie = (id)=> async (dispatch,getState) =>{
    
    try {
        const detail = await axios.get(`/movie/${id}`)
        const externalid = await axios.get(`/movie/${id}/external_ids`)
        const recommendations = await axios.get(`/movie/${id}/recommendations`)
        const similar = await axios.get(`/movie/${id}/similar`)
        const videos = await axios.get(`/movie/${id}/videos`)
        const translations = await axios.get(`/movie/${id}/translations`)
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`) //eg netflix disney+Hotstar
        let dataDetails = {
            detail:detail.data,
            externalid : externalid.data,
            recommendations:recommendations.data,
            similar:similar.data,
            translations:translations.data.translations.map((t)=> t.english_name),
            videos:videos.data.results.find((m)=> m.type === "Trailer"),
            watchproviders:watchproviders.data.results.IN

        }
        dispatch(loadMovie(dataDetails))
        // console.log(dataDetails);
    } catch (error) {
        console.log(`Movie Detail --> ${error}`);
    }
}