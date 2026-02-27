import socket from "../socket/socket";

export default function Leaderboard(){

 socket.on("leaderboardUpdate",(data)=>{

  console.log(data);

 });

 return(

  <div className="p-10">

   <h1>Leaderboard</h1>

  </div>

 );

}