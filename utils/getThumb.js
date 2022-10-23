export const getThumb=(files)=>{
    if(files.length > 0){
        if(files.length === 1 && files[0].type === "AUDIO"){
          const obj ={duration: files[0].duration, imgurl:"/img/audioWave.png"}
          return obj;
        }
        if(files. length > 1){
        for(let i =0; i< files.length; i++){
           
            let url;
            if(files[i].thumbnail){
                const temp = files[i].thumbnail;
                if(temp.includes("jpeg"))
                 url= files[i].thumbnail    
            }
            // if(!files[i].thumbnail){ 
            //     if(files[i].url.includes("mp3"))
            //         url= files[i].url
                
            // }
                const obj ={duration: files[i].duration, imgurl:url}
                if(obj.duration && obj.imgurl)
                return obj;
            
        }
        
    }
}
    
}