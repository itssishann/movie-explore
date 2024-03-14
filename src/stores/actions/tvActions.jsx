
import axios from '../../utils/axios'
import { loadtv } from '../reducers/tvSlice'
import { removetv } from '../reducers/tvSlice'

export const asyncloadtv = (id)=> async (dispatch,getState) =>{
    
    try {
        const detail = await axios.get(`/tv/${id}`)
        const externalid = await axios.get(`/tv/${id}/external_ids`)
        const recommendations = await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const videos = await axios.get(`/tv/${id}/videos`)
        const translations = await axios.get(`/tv/${id}/translations`)
        
        let dataDetails = {
            detail:detail.data,
            externalid : externalid.data,
            recommendations:recommendations.data,
            similar:similar.data,
            translations:translations.data.translations.map((t)=> t.english_name),
            videos:videos.data.results.find((m)=> m.type === "Trailer")

        }
        dispatch(loadtv(dataDetails))
        // console.log(dataDetails);
    } catch (error) {
        console.log(`tv Detail --> ${error}`);
    }
}