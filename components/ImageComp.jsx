/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImageComp = ({ file }) => {
  const [imgUrl, setImgUrl] = useState([]);
  let comp;
  useEffect(() => {
    if(file){
    const imgArr =[] 
    for (let i = 0; i < file.length; i++) {    
      if (file[i].type === "IMG") {
        imgArr.push(file[i].url)
      }
    }
    setImgUrl(imgArr)
  }
  
  }, [file]);
 
  useEffect(() => {
    if(imgUrl){
   comp = imgUrl.map((item, id)=>{
      return <img src={item} alt={id} key={id} />
       })
      //  setComp(finalComp)
      }
  }, [file, imgUrl]);
 
   
  return (
    <Fragment>
     {comp ? <div>Loding..</div>: 
     
     <div className="carosal-img-fix">
      
     <Carousel showIndicators={false} showThumbs={false}>
            {imgUrl.map((item, id)=>{
              return(
                // style={{backgroundImage: `url('${item}')`}}
              <div key={id} className="background-cover" ><img src={item} alt="key"  className="img-caurosel"/></div>)
            })}
            </Carousel>
             {/* </AspectRatio> */}
             </div>
          }
            
            
    </Fragment>
  );
};
export default ImageComp;
