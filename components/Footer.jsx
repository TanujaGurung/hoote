
/* eslint-disable @next/next/no-img-element */
const Footer=({deviceType})=>{
  var redirectUrl;

    if(deviceType === "apple"){
      redirectUrl = "https://apps.apple.com/in/app/huut/id1566096141"
    }
    else 
    redirectUrl = "https://play.google.com/store/apps/details?id=com.amtex.hoote";

    return(
      <footer className="footer">
      <div className="footer-content">
        <p>For more such interesting huuts</p>
        <div className="download_wrap"> 
        <div className="footer-social-icon">
          <a href="#">
            <img src="/img/google-play-logo.svg" alt="" />
          </a>
          <a href="#">
            <img src="/img/ios-logo.svg" alt="" />
          </a>
        </div>
        <div className="main-button">
          <a href={redirectUrl}> download huut</a>
        </div>
      </div>
      </div>
      
    </footer>
    )
}
export default Footer