import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export let  gituserapi= createAsyncThunk('auth/gituserapi',async(bod)=>{
     
// let dipatch= useDispatch()

      console.log(bod)
try{
      
      let {data}=await axios.post("http://localhost:4000/api/auth/login",bod)

      if(data.token){
            console.log('done')
            localStorage.setItem('token',JSON.stringify(data))
      }
       console.log(data)
      // dipatch(authAction.updatauser(data.user))
      
      return data
      
}catch(err){
      console.log(err);
      return err
      
}

      
})

const authSlice=createSlice({

      name:"auth",
      initialState:{
            user:localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')): null,
            loading:false,
            error:null,
            userinfo:localStorage.getItem('token')?(JSON.parse(localStorage.getItem('token'))).user: null
      },
      reducers:{
            login(state,action){
                  state.user=action.payload
            },
            logout(state,action){
                  state.user=null
                  state.userinfo= null

            },
            updatauser(state,action){
                  state.userinfo=action.payload

            }

            
      },
      extraReducers:((builder)=>{
            builder.addCase(gituserapi.pending,(state,action)=>{
                  state.loading=true
                  


            })
            builder.addCase(gituserapi.fulfilled,(state,action)=>{
                  if(action?.payload?.response?.status==400){
                        state.error=action.payload.response.data.message

                          
                 

                  }else{
                        state.user=action.payload
                        state.userinfo=action?.payload?.user
                        state.loading=false
                        state.error=null




                  }
                  
                
               
                  
                  

            })
            builder.addCase(gituserapi.rejected,(state,action)=>{
                  console.log('errrr')
                  console.log(action)
                  state.loading = false
                  state.error = action.error.message

            })
            

      })


})

const authReducer=authSlice.reducer
const authAction=authSlice.actions
export {authAction,authReducer}