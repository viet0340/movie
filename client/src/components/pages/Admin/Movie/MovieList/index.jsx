import { deleteMovie, deleteMovieForSelectID } from 'api/movie';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';
MovieList.propTypes = {
  movieData: PropTypes.array,
};

MovieList.defaultProps = {
  movieData: null,
};

function MovieList(props) {
  const { movieData } = props;
  const [checkbox, setCheckbox] = useState([]);

  if (!movieData) {
    return <div></div>;
  }

  async function handleDelete(id, image, poster) {
    const a = await deleteMovie(id, image, poster);
    if (a.status === 200) {
      alert('Xóa thành công');
      window.location.reload();
    }
  }

  async function handleDeleteForSelectId() {
    const a = await deleteMovieForSelectID(checkbox);
    if (a.status === 200) {
      window.location.reload();
      console.log(a);
    }
  }

  function handleCheckBox(e) {
    const check = checkbox.some((some) => some === e.target.name);

    if (!check) {
      setCheckbox([...checkbox, e.target.name]);
    } else {
      const data = checkbox;
      data.every((every, index) => {
        if (every === e.target.name) {
          checkbox.splice(index, 1);
          return false;
        }
        return true;
      });
      setCheckbox(data);
    }
  }

  return (
    <div>
      <div className='controller'>
        <div>
          <button
            className='delete deleteSelect'
            onClick={handleDeleteForSelectId}
          >
            Xóa mục đã chọn
          </button>
          <button className='delete deleteAll'>Xóa tất cả</button>
        </div>
        <div>
          <Link to='/admin/movie/add'>
            <button className='addMovie'>Thêm</button>
          </Link>
        </div>
      </div>
      <div className='movie__list'>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='th_title'>Tên</th>
              <th className='th_tags'>Thể loại</th>
              <th className='th_duration'>Thời gian</th>
              <th className='th_edit'>Sửa</th>
              <th className='th_delete'>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {movieData.map((map, key) => (
              <tr key={key}>
                <td className='input'>
                  <input
                    type='checkbox'
                    name={map._id}
                    id={map._id}
                    onChange={handleCheckBox}
                  />
                </td>
                <td>
                  <label htmlFor={map._id}>{map.title}</label>
                </td>
                <td>{map.tags.join(' / ')}</td>
                <td>{map.duration}</td>
                <td>
                  <Link to={`/admin/movie/edit/${map._id}`}>
                    <button className='edit'>
                      <i className='fas fa-edit'></i>
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className='delete'
                    onClick={() => handleDelete(map._id, map.image, map.poster)}
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MovieList;
