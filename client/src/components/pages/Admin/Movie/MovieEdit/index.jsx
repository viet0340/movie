import {
  getMovieForID,
  getMovieTagsForIdAdmin,
  editMovie,
  getMovieTypeForID,
} from 'api/movie';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './index.scss';
import MOVIE from 'configs/movie.input';

function MovieEdit() {
  const params = useParams();
  const [file, setFile] = useState();
  const [poster, setPoster] = useState();
  const [preview, setPreview] = useState({});
  const [previewPoster, setPreviewPoster] = useState({});
  const [updating, setUpdating] = useState();
  const [data, setData] = useState();
  const [tags, setTags] = useState();
  const [type, setType] = useState();
  useEffect(() => {
    async function fetchData() {
      setData(await getMovieForID(params.id));
      setTags(await getMovieTagsForIdAdmin(params.id));
      setType(await getMovieTypeForID(params.id));
    }

    fetchData();
  }, [params]);

  if (!data || !tags || !type) {
    return <div></div>;
  }
  const urlPreviewImg = file ? (
    <img src={preview.imagePreviewUrl} alt='' />
  ) : (
    <img src={data.image} alt='' />
  );
  const urlPreviewImgPoster = poster ? (
    <img src={previewPoster.imagePreviewUrl} alt='' />
  ) : (
    <img src={data.poster} alt='' />
  );
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function handleFile(e) {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }
  function handlePoster(e) {
    const file = e.target.files[0];
    setPoster(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPoster({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }
  function handleChecked(name) {
    const check = tags.some((some) => some === name);
    if (!check) {
      setTags([...tags, name]);
    } else {
      const data = tags;
      data.every((every, index) => {
        if (every === name) {
          data.splice(index, 1);
          return false;
        }
        return true;
      });
      setTags(data);
    }
  }

  function handleFilter(name) {
    const check = type.some((some) => some === name);
    if (!check) {
      setType([...type, name]);
    } else {
      const data = type;
      data.every((every, index) => {
        if (every === name) {
          data.splice(index, 1);
          return false;
        }
        return true;
      });
      setType(data);
    }
  }

  async function handleEditMovie() {
    setUpdating('Upload...');
    const a = await editMovie(data, file, tags, poster, type);
    if (a.status === 200) {
      setUpdating('Upload thành công.');
    } else {
      setUpdating('Có lỗi xảy ra khi upload');
    }
  }
  return (
    <div className='edit__movie-fixed'>
      <div className='edit__movie'>
        <div className='input'>
          <label>
            Tên *
            <input
              type='text'
              name='title'
              value={data.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Tên tiếng anh
            <input
              type='text'
              name='title_en'
              value={data.title_en}
              onChange={handleChange}
            />
          </label>
          <label>
            Mô tả
            <textarea
              type='text'
              name='description'
              value={data.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Thời lượng
            <input
              type='number'
              name='duration'
              value={data.duration}
              onChange={handleChange}
            />
          </label>
          <label>
            Đạo diễn
            <input
              type='text'
              name='director'
              value={data.director}
              onChange={handleChange}
            />
          </label>
          <label>
            Quốc gia
            <input
              type='text'
              name='nation'
              value={data.nation}
              onChange={handleChange}
            />
          </label>
          <label>
            Đánh giá
            <input
              type='number'
              name='evaluate'
              value={data.evaluate}
              onChange={handleChange}
            />
          </label>
          <label>
            Ngày ra mắt
            <input
              type='text'
              name='release_date'
              value={data.release_date}
              onChange={handleChange}
            />
          </label>
          <label>
            Link
            <input
              type='text'
              name='url'
              value={data.url}
              onChange={handleChange}
            />
          </label>
        </div>
        <label style={{ margin: '25px 0' }}>
          Thể loại:
          <div className='checkbox'>
            {MOVIE.tags.map((tag, key) => (
              <div className='checkbox_items' key={key}>
                <label className='span' htmlFor={tag.value}>
                  {tag.name}
                </label>
                <input
                  type='checkbox'
                  name={tag.value}
                  value={tag.value}
                  id={tag.value}
                  onChange={() => handleChecked(tag.value)}
                  defaultChecked={
                    tags && tags.some((some) => some === tag.value)
                  }
                />
              </div>
            ))}
          </div>
        </label>
        <label>
          Kiểu:
          <div className='filter_movies'>
            {MOVIE.type.map((map, key) => (
              <div className='filter_movies_items' key={key}>
                <label className='span' htmlFor={map.value}>
                  {map.name}
                </label>
                <input
                  type='checkbox'
                  name={map.value}
                  value={map.value}
                  id={map.value}
                  onChange={() => handleFilter(map.value)}
                  defaultChecked={
                    type && type.some((some) => some === map.value)
                  }
                />
              </div>
            ))}
          </div>
        </label>
        <label>
          Premium:
          <select
            name='premium'
            defaultValue={data.premium === true && true}
            onChange={handleChange}
          >
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
        </label>
        <div className='uploaded'>{updating}</div>
        <label>
          <span>Banner: </span>
          <input type='file' name='image' onChange={(e) => handleFile(e)} />
        </label>
        <label>
          <span>Poster: </span>
          <input type='file' name='poster' onChange={(e) => handlePoster(e)} />
        </label>
        <button className='edit' onClick={handleEditMovie}>
          Lưu
        </button>
        <button className='canner'>
          <Link to='/admin/movie'>Hủy</Link>
        </button>
        <div style={{ marginTop: '10px' }}>{urlPreviewImg}</div>
        <div style={{ marginTop: '10px' }}>{urlPreviewImgPoster}</div>
      </div>
    </div>
  );
}

export default MovieEdit;
