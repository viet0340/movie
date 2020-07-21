import axios from 'axios';
import queryString from 'querystring';
import xoa_dau from 'configs/xoadau';

export async function moviesWatchIsLater(ids) {
  const movies = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/api/movie/watchIsLater`,
    data: {
      id: ids,
    },
  });
  return movies.data;
}
export async function searchMovie() {
  const url = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/api/movie/search`,
  });
  return url.data;
}
export async function callURL(id) {
  const url = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/api/movie/url`,
    data: {
      id: id,
    },
  });
  return url.data.url;
}

export async function addMovie(data, image, tags, type, poster) {
  try {
    let response = {};

    const formData = new FormData();
    //Xử lý Object truyền vào FormData
    for (let prop in data) {
      formData.append(prop, data[prop]);
    }
    //Thêm image vào FormData và filename
    const filename = xoa_dau(data.title.replace(/ /g, '-')).toLowerCase();
    formData.append('image', image, filename);
    formData.append('poster', poster, filename + '-poster');

    //Xử lý tags rồi vào FormData
    formData.append('tags', JSON.stringify(tags));
    formData.append('type', JSON.stringify(type));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/api/movie`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function editMovie(data, image, tag, poster, type) {
  try {
    let response = {};

    const formData = new FormData();
    //Xử lý Object truyền vào FormData
    for (let prop in data) {
      formData.append(prop, data[prop]);
    }

    if (image) {
      //Thêm image vào FormData và filename
      const filename = xoa_dau(data.title.replace(/ /g, '-')).toLowerCase();
      formData.append('image', image, filename);
    }
    if (poster) {
      //Thêm image vào FormData và filename
      const filename = xoa_dau(data.title.replace(/ /g, '-')).toLowerCase();
      formData.append('poster', poster, filename + '-poster');
    }
    //Xử lý tags rồi vào FormData
    formData.append('newTags', JSON.stringify(tag));
    formData.append('newType', JSON.stringify(type));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/api/movie`,
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMovie(id, image, poster) {
  try {
    let response = {};
    await axios({
      url: `${process.env.REACT_APP_API_URL}/api/movie`,
      method: 'DELETE',
      data: { id: id, image: image, poster: poster },
    })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        console.log(err);
      });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllMovie(params) {
  try {
    const p = queryString.stringify(params);
    const url = params
      ? `${process.env.REACT_APP_API_URL}/api/movie?${p}`
      : `${process.env.REACT_APP_API_URL}/api/movie`;
    let response = {};
    await axios({
      url: url,
      method: 'GET',
    })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieForID(id) {
  try {
    let response = {};
    await axios({
      url: `${process.env.REACT_APP_API_URL}/api/movie/id/${id}`,
      method: 'GET',
    })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function getMovieForTitleTag(title) {
  try {
    let response = {};
    await axios({
      url: `${process.env.REACT_APP_API_URL}/api/movie/title/${title}`,
      method: 'GET',
    })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        console.log(err);
      });
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
}
export async function getMovieTagsForIdAdmin(id) {
  try {
    let response = {};
    await axios({
      url: `${process.env.REACT_APP_API_URL}/api/movie/id/${id}`,
      method: 'GET',
    })
      .then((res) => {
        response = res.data.tags;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieTypeForID(id) {
  try {
    let response = {};
    await axios({
      url: `${process.env.REACT_APP_API_URL}/api/movie/id/${id}`,
      method: 'GET',
    })
      .then((res) => {
        response = res.data.type;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getMovieForTag(query) {
  try {
    let response = {};
    await axios({
      url: `${process.env.REACT_APP_API_URL}/api/movie/tags/?tags=${query}&_limit=10`,
      method: 'GET',
    })
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getMovieForType(query) {
  try {
    let response = {};
    await axios({
      url: `${process.env.REACT_APP_API_URL}/api/movie/type/?type=${query}`,
      method: 'GET',
    })
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteMovieForSelectID(select) {
  try {
    let response = {};
    await axios({
      url: `${process.env.REACT_APP_API_URL}/api/movie/s`,
      method: 'POST',
      data: select,
    })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}
