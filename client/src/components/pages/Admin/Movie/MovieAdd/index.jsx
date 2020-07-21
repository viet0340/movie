import { addMovie } from 'api/movie';
import React, { useState } from 'react';
import './index.scss';
import MOVIE from 'configs/movie.input';

function MovieAdd() {
  const [data, setData] = useState({});
  const [file, setFile] = useState();
  const [poster, setPoster] = useState();
  const [tags, setTags] = useState([]);
  const [type, setType] = useState([]);
  const [uploaded, setUploaded] = useState();
  const [preview, setPreview] = useState({});
  const [previewPoster, setPreviewPoster] = useState({});

  const urlPreviewImg = file ? (
    <img src={preview.imagePreviewUrl} alt='' />
  ) : (
    ''
  );
  const urlPreviewImgPoster = poster ? (
    <img src={previewPoster.imagePreviewUrl} alt='' />
  ) : (
    ''
  );
  async function onUpload() {
    if (!data.title || !data.description || !data.url || !data.evaluate) {
      return alert('Không được để trống những mục có *');
    }
    if (!file || !poster) {
      return alert('Phải có file , poster trước khi Upload');
    }
    setUploaded('Đang Upload...');
    const a = await addMovie(data, file, tags, type, poster);
    if (a.status === 200) {
      setUploaded('Upload thành công.');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      setUploaded('Có lỗi xảy ra khi Upload');
    }
  }
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
  function handleCheckBox(name) {
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
  return (
    <div className='add__movie-fixed'>
      <div className='add__movie'>
        <div className='input'>
          {MOVIE.input.map((input, key) => {
            if (input.name === 'description') {
              return (
                <label key={key}>
                  {input.label} *
                  <textarea
                    type={input.type}
                    name={input.name}
                    onChange={handleChange}
                    required
                  />
                </label>
              );
            }
            return (
              <label key={key}>
                {input.label}
                {input.required && ' *'}
                <input
                  type={input.type}
                  name={input.name}
                  onChange={handleChange}
                  required
                />
              </label>
            );
          })}
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
                  onChange={() => handleCheckBox(tag.value)}
                />
              </div>
            ))}
          </div>
        </label>
        <label>
          Kiểu:
          <div className='filter_movies'>
            {MOVIE.type.map((type, key) => (
              <div className='filter_movies_items' key={key}>
                <label className='span' htmlFor={type.value}>
                  {type.name}
                </label>
                <input
                  type='checkbox'
                  name={type.value}
                  value={type.value}
                  id={type.value}
                  onChange={() => handleFilter(type.value)}
                />
              </div>
            ))}
          </div>
        </label>
        <label>
          Premium:
          <select name='premium' defaultValue='false' onChange={handleChange}>
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
        </label>
        <div className='uploaded'>{uploaded}</div>
        <label>
          <span>Banner: </span>
          <input type='file' name='image' onChange={(e) => handleFile(e)} />
        </label>
        <label>
          <span>Poster: </span>
          <input type='file' name='poster' onChange={(e) => handlePoster(e)} />
        </label>
        <button onClick={onUpload}>Upload</button>
        <div style={{ marginTop: '10px' }}>{urlPreviewImg}</div>
        <div style={{ marginTop: '10px' }}>{urlPreviewImgPoster}</div>
      </div>
    </div>
  );
}

export default MovieAdd;
