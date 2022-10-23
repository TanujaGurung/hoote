const getParentHuutDetails=({files})=>{
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