const getThumbnail = (files)=>{
    let url;
    for(let i =0; i< files.length; i++){
           
        if(files[i].thumbnail){
            const temp = files[i].thumbnail;
            if(temp.includes("jpeg") || temp.includes("jpeg")){
             url= files[i].thumbnail  
             break;
            }
             
        }
        if(!files[i].thumbnail){ 
            console.log("files[i].url.includes", files[i].url.includes(".jpeg"))
            if(files[i].url.includes(".jpeg") || files[i].url.includes(".jpg")){
                url= files[i].url
               break; 
            }
            
        }
    }
    return url
}
const getDurationn = (files)=>{
    for(let i =0; i< files.length; i++){
        let duration;
        if(files[i].duration){
           duration = files[i].duration;
             return duration;  
        }
    }
}

export const getThumb=(files)=>{
    console.log("files", files)
    if(files.length > 0){
        if(files.length === 1 && files[0].type === "AUDIO"){
          const obj ={duration: files[0].duration, imgurl:"/img/audioWave.png"}
          return obj;
        }
        if(files. length >= 1){
        
            const thumb = getThumbnail(files)
            const time = getDurationn(files)
            const obj ={duration:time, imgurl:thumb}
            return obj;
        
    }
}
    
}