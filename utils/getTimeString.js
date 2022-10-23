export const getTimeString = (time_in_sec) =>{
    // console.log("time_in_sec",time_in_sec )
    const dateObj = new Date(time_in_sec * 1000);
    const minutes = dateObj.getUTCMinutes();
   const  seconds = dateObj.getSeconds();
   const  timeString =  minutes.toString().padStart(2, "0") +  ":" +  seconds.toString().padStart(2, "0");
   return timeString;
}