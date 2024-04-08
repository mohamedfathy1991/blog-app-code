import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './clics/authslics'
const store= configureStore({
      reducer:{
            auth:authReducer
      }
})


export default store