import React from 'react'
import axios from 'axios'
let Baseurl='http://localhost:5000/server'

export default async function Axioscall(method,endpoint,datalist,header) {

    try {
      let base_url = Baseurl+'/'+endpoint
      let data;
      let body = {
        method:method,
        url:base_url,
        data:datalist
      }
      if(header){
        const headerauth = {'Authorization': `Bearer ${localStorage.getItem('digibiztocken')}`}
        body.headers = headerauth
      }
      if(method==="get"){
        data = await axios.get(base_url,{params:datalist,headers:{'Authorization': `Bearer ${localStorage.getItem('craig-token')}`}})
      }else {
  
        data = await axios(body)
      }
      
      return data
    } catch (error) {
      console.log("error",error)
      if(error.message==="Request failed with status code 403"){
          window.localStorage.clear()
          return navigate("/");
      }
      return error
    }
      
  }