
import axios from '../../utils/axios'
import { loadperson } from '../reducers/personSlice'
import { removeperson } from '../reducers/personSlice'

export const asyncloadperson = (id)=> async (dispatch,getState) =>{
    
    try {
        const detail = await axios.get(`/person/${id}`)
        const externalid = await axios.get(`/person/${id}/external_ids`)
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`)
        const tvCredits = await axios.get(`/person/${id}/tv_credits`)
        const movieCredits = await axios.get(`/person/${id}/movie_credits`)
        
        
        let dataDetails = {
            detail:detail.data,
            externalid : externalid.data,
            combinedCredits:combinedCredits.data,
            movieCredits:movieCredits.data
        }
        dispatch(loadperson(dataDetails))
        
    } catch (error) {
        console.log(`person Detail --> ${error}`);
    }
}