import axios from "axios";

const API = axios.create({

 baseURL:"http://localhost:5000/api"

});


// Attach token automatically

API.interceptors.request.use((req)=>{

 const token = localStorage.getItem("token");

 if(token){

  req.headers.authorization = token; // NO Bearer

 }

 return req;

});



/* TEAM APIS */


export const searchUsers=(skills)=>{

 return API.get(`/team/search?skills=${skills}`);

}


export const sendInvite=(receiverId)=>{

 return API.post("/team/invite",{

  receiverId

 });

}


export const getInvites=()=>{

 return API.get("/team/invites");

}


export const acceptInvite=(id)=>{

 return API.post(`/team/accept/${id}`);

}


export const rejectInvite=(id)=>{

 return API.post(`/team/reject/${id}`);

}

export const sendMessage=(message)=>{

 return API.post(
  "/chat/chat",
  {message}
 );

}

export default API;