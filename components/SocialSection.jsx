/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react"

const SocialSection =({hoote,deviceType})=>{
  var redirectUrl;

  if(deviceType === "apple"){
    redirectUrl = "https://apps.apple.com/in/app/huut/id1566096141"
  }
  else 
  redirectUrl = "https://play.google.com/store/apps/details?id=com.amtex.hoote";

    return(
        <Fragment>
         {/* <!-- social icon --> */}
         <div className="social-section pbo-0">
                <div className="social-icons">
                  <div className="social-group">
                    <a href={redirectUrl}>
                      <img src="/img/like.svg" alt="" />
                    </a>
                    <span>{hoote?.like}</span>
                  </div>
                  <div className="social-group">
                    <a href={redirectUrl}>
                      <img src="/img/recheck.svg" alt="" />
                    </a>
                    <span>{hoote?.amplify}</span>
                  </div>
                  <div className="social-group ">
                    <a href={redirectUrl}>
                      <img src="/img/comment.svg" alt="" />
                    </a>
                    <span>{hoote?.comment}</span>
                  </div>
                </div>
                {hoote?.heard === 0 || hoote?.heard === 1 ? <p className="pto-0">{hoote?.heard}&nbsp;<span>View</span> </p> :
                <p className="pto-0">{hoote?.heard}&nbsp;<span>Views</span> </p>}
              </div>
    </Fragment>
    )
}
export default SocialSection;