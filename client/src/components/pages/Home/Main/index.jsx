import { getAllMovie } from 'api/movie';
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import Film from './Film';
import TabFooter from './TabFooter';
import TabHeader from './TabHeader';
import TabMiddle from './TabMiddle';

function Home() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const a = await getAllMovie();
      setBanner(a.data);
    }
    fetchData();
  }, []);

  if (!banner) {
    return <></>;
  }
  return (
    <div>
      <Banner banner={banner.slice(0, 2)} />
      <TabHeader />
      <TabMiddle />
      <Film />
      <TabFooter />
    </div>
  );
}

export default Home;
