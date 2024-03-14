import { configureStore } from '@reduxjs/toolkit'
import tvReducer from "./reducers/tvSlice"
import movieReducer from "./reducers/movieSlice"
import personReducer from "./reducers/personSlice"
export const store = configureStore({
  reducer: {
    movie:movieReducer,
    person:personReducer,
    tv:tvReducer
  },
})