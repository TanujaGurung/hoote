
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from "react";
// import { webPreviewUrl } from '../config';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, FacebookMessengerIcon, TwitterIcon, WhatsappIcon} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShareModal = ({ open, handleClose, huutId, userName}) => {
  const commonUrl =
    "https://hoote-frontend-3.vercel.app/preview?huut=" + huutId;
  // console.log("opened", open)
  const [isCopied, setIsCopied] = useState(false);
  const onCopyText = () => {
    setIsCopied(true);
  };

  return (
    <>
      <div
        id="myModal"
        className="modal"
        style={{ display: open ? "block" : "none" }}
      >
        {/* <!-- Modal header --> */}
        <div className="modal-header">
          <h4>Share to..</h4>
        </div>

        {/* <!-- Modal content --> */}
        <div className="modal-content">
          <div className="icon-container">
            <FacebookShareButton url={commonUrl} title={userName}  
        // hashtag={"#hashtag"}
        // description={"testing shareing hoote post in the facbeook"} 
        className="modal-subcontent">
              <FacebookIcon
                size={30} round
              />
              <span className="modal-subcontent">
                <p>Share to Facebook</p>
              </span>
            </FacebookShareButton>

            <FacebookMessengerShareButton
              url={commonUrl}
              title={userName}
              className="modal-subcontent"
            >
              <FacebookMessengerIcon
                 size={30} round
              />
              <span className="modal-subcontent">
                <p>Share to Messanger</p>
              </span>
            </FacebookMessengerShareButton>

            <WhatsappShareButton url={commonUrl} title={userName} className="modal-subcontent">
              <WhatsappIcon
                size={30} round
              />
              <span className="modal-subcontent">
                <p>Share to WhatsApp</p>
              </span>
            </WhatsappShareButton>

            <TwitterShareButton url={commonUrl} title={userName} className="modal-subcontent">
              <TwitterIcon
                //className="icon-size"
                size={30} round
              />
              <span className="modal-subcontent">
                <p>Share to Twitter</p>
              </span>
            </TwitterShareButton>

            {/* <EmailShareButton
       
        url={commonUrl}
      
        className="modal-subcontent"
      >
         <img src="/img/envelope.svg" alt="email icon" className="icon-size" /> 
        <span className="modal-subcontent" fill="black"><p>Share to Email</p></span>
      </EmailShareButton>
      <br /> */}

            {/* <LinkedinShareButton
       
        url={commonUrl}
        
        className="modal-subcontent"
      >
        <LinkedinIcon size={32} round />
        <span className="modal-subcontent"><p>Facebook</p></span>
      </LinkedinShareButton>
      <br />
      <br /> */}

            {/* <TelegramShareButton
        // title={"test"}
        url={commonUrl}
        // hashtags={["hashtag1", "hashtag2"]}
        className="modal-subcontent"
      >
        <TelegramIcon size={32} round />
        <span className="modal-subcontent"><p>Facebook</p></span>
      </TelegramShareButton>
      <br />
       */}
            <div className="modal-subcontent">
              <CopyToClipboard text={commonUrl} onCopy={onCopyText}>
                <Fragment>
                  <img
                    src="/img/copy.svg"
                    alt="forward"
                    //className="icon-size"
                    style={{ height: "23px", width: "25px" , marginRight: "5px"}}
                    onClick={onCopyText}
                  />
                  <span
                    className="modal-subcontent"
                  >
                    <p>Copy</p>
                  </span>
                  <span style={{ display: isCopied ? "block" : "none" }}>
                    Copied!
                  </span>
                </Fragment>
              </CopyToClipboard>
            </div>

            <span className="close" onClick={handleClose}>
              Cancel
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShareModal;
