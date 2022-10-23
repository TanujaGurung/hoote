import Head from 'next/head';
import React from 'react';
import { getToken, getPreview, getParentRefDetails } from "../utils/getPreview";


const Home=({resData})=> {
  return (
    <div>
      <Head>
        <title>Social Media Preview</title>
        <meta property="og:url" content="https://team-place.com/" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="2747726002141483" />
        <meta property="og:title" content={resData?.user?.firstname} />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Hurray!! Yes Social Media Preview is Working"
        />
        <meta property="og:image" content={resData?.hotte?.files[0].thumbnail} />
      </Head>
      <h2>{resData?.user?.firstname}</h2>
    </div>
  );
}
export default Home

export const getServerSideProps = async (ctx) => {
  const { huut } = ctx.query;
  const finalToken = await getToken();
  const res = await getPreview(huut, finalToken);
  const json = await res.json();
  const resData = json.data;
  

  return {
    props: {
      resData,
    },
  };
};