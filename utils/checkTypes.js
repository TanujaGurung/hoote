const filesTypes=(files)=>{
    if(files.length > 0){
    let typeStr=[]
    for(let i=0; i< files.length; i++){
        if(!typeStr.includes(files[i].type))
       typeStr.push(files[i].type);
    }
    const types = typeStr.join("_")
   return types;
}
else return "TEXT"
}

export const checkTypes=(data)=>{
    const contentType =filesTypes(data?.files)
   
    if(contentType ===  "AUDIO"){
        if(data.text){
            return "audio_text"
        }
        else return "audio"
    }
    if(contentType ===  "IMG"){
        if(data.text){
            return "img_text"
        }
        else return "img"
    }
    if(contentType ===  "VIDEO"){
        if(data.text){
            return "video_text"
        }
        else return "video"
    }
    if(contentType ===  "TEXT"){
       return "text"
    }
    if(contentType ===  "AUDIO_VIDEO"){
        if(data.text){
            return "audio_video_text"
        }
        else return "audio_video"
    }
    if(contentType ===  "AUDIO_IMG"){
        if(data.text){
            return "audio_img_text"
        }
        else return "audio_img"
    }
}