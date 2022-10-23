export const calcTime=(createdTime)=>{
    var date1 = new Date(createdTime);
  var date2 = new Date();
    var diff = date2.getTime() - date1.getTime();

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
   const objTime={hh:hh, mm:mm}
    return objTime;
  }