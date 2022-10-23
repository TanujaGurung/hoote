

export const getToken= async()=>{
  const tokenRes = await fetch(
    "https://drwhm1ofhh.execute-api.ap-south-1.amazonaws.com/qa/api/v1/auth/guest",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ip: "1696313264460",
        os: "Windows",
        version: "1.1",
      }),
    }
  );
  const jsonToken = await tokenRes.json();
  const finalToken = await jsonToken?.data?.guestToken;
  return finalToken

}
export const getPreview = async (id,finalToken) => {
  //alert(token)
  // console.log("token", token1)
  //  const token = process.env.TOKEN
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjE2OTYzMTMyNjQ0NjAiLCJvcyI6IldpbmRvd3MiLCJ0eXBlIjoiZ3Vlc3Qtd2ViIiwiaXNzdWVkQXQiOjE2NjQ5ODA4NjcsImlhdCI6MTY2NDk4MDg2NywiZXhwIjoxNjY0OTg0NDY3LCJpc3MiOiJodHRwczovLzRndjZwa2VkbmguZXhlY3V0ZS1hcGkuYXAtc291dGgtMS5hbWF6b25hd3MuY29tIn0.KbDdtTTfxjFwyXjomVghqdt4s6ICxe5Abrx-E90m-ic";
  const res = await fetch(
    `https://3mxtu0s5yl.execute-api.ap-south-1.amazonaws.com/qa/api/v1/web/hoote/${id}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${finalToken}` },
    }
  );
  return res;
};
export const getParentRefDetails = async (id,finalToken) => {
  //alert(token)
  // console.log("token", token1)
  //  const token = process.env.TOKEN
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjE2OTYzMTMyNjQ0NjAiLCJvcyI6IldpbmRvd3MiLCJ0eXBlIjoiZ3Vlc3Qtd2ViIiwiaXNzdWVkQXQiOjE2NjQ5ODA4NjcsImlhdCI6MTY2NDk4MDg2NywiZXhwIjoxNjY0OTg0NDY3LCJpc3MiOiJodHRwczovLzRndjZwa2VkbmguZXhlY3V0ZS1hcGkuYXAtc291dGgtMS5hbWF6b25hd3MuY29tIn0.KbDdtTTfxjFwyXjomVghqdt4s6ICxe5Abrx-E90m-ic";
  const res = await fetch(
    `https://3mxtu0s5yl.execute-api.ap-south-1.amazonaws.com/qa/api/v1/user/web/${id}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${finalToken}` },
    }
  );
  return res;
};

