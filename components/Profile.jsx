/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, Fragment } from "react";
import { calcTime } from "../utils/calcTime";
import ShareModal from "./ShareModel";

const Profile = ({
  userImg,
  userName,
  handleName,
  huutId,
  createdTime,
  rehuut,
  verified,
  hootType,
  handleModal,
}) => {
  const [open, setOpen] = useState(false);
  const commonUrl =
    "https://web.huut.com/preview/preview?huut=" + huutId;

  const [time, setTime] = useState("1h");

  useEffect(() => {
    const t = calcTime(createdTime);
    if (t.hh > 0) {
      if (t.hh < 24) {
        const temp = Math.floor(t.hh).toString() + "h";
        setTime(temp);
      }

      if (t.hh >= 24) {
        const temp = Math.floor(t.hh / 24).toString() + "d";
        setTime(temp);
      }
    } else {
      const temp = t.mm.toString() + "m";
      setTime(temp);
    }
  }, [createdTime]);
 
  return (
    <Fragment>
      <div className="profile-section pbo-0">
        <div className="profile-img">
          <img
            className="actual-img"
            src={userImg ? userImg : "/img/avatar.png"}
            alt="profile"
          />
          <div className="profile-subcontent">
            <div className="name">
            {userName.length < 19 ? (
              <p>
                {userName}{" "}
                {verified === "true" && (
                  <span>
                    <img src="/img/verified.svg" alt="virified" />
                  </span>
                )}
              </p>
            ) : (
              <p>
                {userName.substring(0, 19)}..{" "}
                {verified === "true" && (
                  <span>
                    <img src="/img/verified.svg" alt="virified" />
                  </span>
                )}
              </p>
            )}
            </div>

            <p className="subcontent-child">
              @{handleName} <span> </span> {time}
            </p>
            {hootType === "REHOOTE_QUOTE" && (
              <p className="subcontent-child">Rehuuted</p>
            )}
            
            {hootType === "RAH_REQ" && (
              <p className="subcontent-child">Requested</p>
            )}
             {hootType === "RAH_RESP" && (
              <p className="subcontent-child">Responded</p>
            )}
          </div>
        </div>
        <div>
          <img
            src="/img/forward-icon.svg"
            alt="forward"
            onClick={handleModal}
          />
        </div>

        {/* <CopyToClipboard text={commonUrl} onCopy={onCopyText}>
        <div>
          <img src="/img/forward-icon.svg" alt="forward" />
          <span style={{ display: isCopied ? "block" : "none" }}>Copied!</span>
        </div>
      </CopyToClipboard> */}
      </div>

    </Fragment>
  );
};
export default Profile;
