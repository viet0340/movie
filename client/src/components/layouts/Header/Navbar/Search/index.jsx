import React from 'react';
import { useEffect } from 'react';
import { searchMovie } from 'api/movie';
import { useState } from 'react';
import xoa_dau from 'configs/xoadau';
import './index.scss';
import { Link } from 'react-router-dom';

const Search = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [dataFilter, setDataFilter] = useState([]);
  const [checkSearch, setCheckSearch] = useState(false);
  const style = checkSearch ? { opacity: 1 } : { opacity: 0 };

  const clearSearch = () => {
    setSearch('');
    setDataFilter([]);
    setCheckSearch(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      setData(await searchMovie());
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    const newData = data.filter((map) => {
      return (
        xoa_dau(map.title).toLowerCase().search(xoa_dau(value).toLowerCase()) >
        -1
      );
    });
    setSearch(value);
    setDataFilter(newData);
    if (value) {
      return setCheckSearch(true);
    }
    return setCheckSearch(false);
  };

  return (
    <div className='search'>
      <input
        type='search'
        name='search'
        value={search}
        placeholder='Search...'
        onChange={handleChange}
      />
      <div className='search_list' style={style}>
        {data &&
          dataFilter.map((map, key) => (
            <span key={key}>
              <Link
                onClick={clearSearch}
                to={{
                  pathname: `/movie/${map.title_tag}`,
                  state: { id: map._id },
                }}
              >
                + {map.title}
              </Link>
            </span>
          ))}
      </div>
    </div>
  );
};

export default Search;
