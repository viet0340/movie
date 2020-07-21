const Movie = require('../models/movie.model');
const unlinkAsync = require('./removeImage');
const xoa_dau = require('./xoadau');

module.exports = {
  moviesWatchIsLater: async (req, res) => {
    const data = await Movie.find({
      _id: { $in: req.body.id },
    });
    const newData = data.map((map) => {
      return {
        title: map.title,
        poster: map.poster,
        title_tag: map.title_tag,
        release_date: map.release_date,
        evaluate: map.evaluate,
      };
    });
    res.json(newData);
  },
  searchMovie: async (req, res) => {
    const data = await Movie.find();
    const a = data.map((map) => {
      return {
        title_tag: map.title_tag,
        _id: map._id,
        title: map.title,
      };
    });
    res.json(a);
  },
  getURL: async (req, res) => {
    const data = await Movie.findById(req.body.id);
    res.json({
      url: data.url,
    });
  },
  findAll: (req, res) => {
    if (req.query._name === 'a') {
      return Movie.find()
        .sort({
          title_tag: 1,
        })
        .then((movie) =>
          res.json({
            data: movie,
            pagination: {
              _page: req.query._page,
              _limit: req.query._limit,
            },
          })
        )
        .catch((err) => res.status(500).json(err));
    }
    if (req.query._name === 'z') {
      return Movie.find()
        .sort({
          title_tag: -1,
        })
        .then((movie) =>
          res.json({
            data: movie,
            pagination: {
              _page: req.query._page,
              _limit: req.query._limit,
            },
          })
        )
        .catch((err) => res.status(500).json(err));
    }
    if (req.query._name === 'latest') {
      return Movie.find()
        .sort({
          year: -1,
        })
        .then((movie) =>
          res.json({
            data: movie,
            pagination: {
              _page: req.query._page,
              _limit: req.query._limit,
            },
          })
        )
        .catch((err) => res.status(500).json(err));
    }
    if (req.query._name === 'oldest') {
      return Movie.find()
        .sort({
          year: 1,
        })
        .then((movie) =>
          res.json({
            data: movie,
            pagination: {
              _page: req.query._page,
              _limit: req.query._limit,
            },
          })
        )
        .catch((err) => res.status(500).json(err));
    }

    return Movie.find()
      .then((movie) => {
        return res.json({
          data: movie,
          pagination: {
            _page: req.query._page,
            _limit: req.query._limit,
            _total: movie.length,
          },
        });
      })
      .catch((err) => res.status(500).json(err));
  },

  findById: (req, res) => {
    Movie.findById(req.params.id)
      .then((data) => {
        const dataMovie = {
          description: data.description,
          director: data.director,
          duration: data.duration,
          evaluate: data.evaluate,
          image: data.image,
          nation: data.nation,
          release_date: data.release_date,
          title: data.title,
          title_tag: data.title_tag,
          tags: data.tags,
          type: data.type,
          _id: data._id,
        };
        return res.json(dataMovie);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  findByTitleTag: (req, res) => {
    Movie.find({ title_tag: req.params.title })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(500).json('Error: ' + err));
  },
  editMovie: (req, res) => {
    Movie.findById(req.body._id)
      .then((e) => {
        e.title = req.body.title;
        e.title_tag = xoa_dau(req.body.title).replace(/ /g, '-').toLowerCase();
        e.tags = JSON.parse(req.body.newTags);
        e.image = req.body.image;
        e.poster = req.body.poster;
        e.url = req.body.url;
        e.title_en = req.body.title_en;
        e.director = req.body.director;
        e.release_date = req.body.release_date;
        e.nation = req.body.nation;
        e.evaluate = req.body.evaluate;
        e.duration = req.body.duration;
        e.description = req.body.description;
        e.type = JSON.parse(req.body.newType);
        e.year = req.body.release_date.slice(req.body.release_date.length - 4);
        if (req.files.image) {
          // Định dạng file giống nhau sẽ ghi đè
          e.image = '/uploads/film/' + req.files.image[0].filename;

          // Kiểm tra định dạng file khác nhau thì xóa file cũ
          if (req.body.image !== e.image) {
            unlinkAsync('./client/build' + req.body.image);
          }
        }
        if (req.files.poster) {
          // Định dạng file giống nhau sẽ ghi đè
          e.poster = '/uploads/film/' + req.files.poster[0].filename;

          // Kiểm tra định dạng file khác nhau thì xóa file cũ
          if (req.body.poster !== e.poster) {
            unlinkAsync('./client/build' + req.body.poster);
          }
        }
        e.save()
          .then(() => res.json({ Message: 'Edit Complete' }))
          .catch((err) => {
            res.status(500).json('Error: ' + err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  add: (req, res) => {
    const {
      title_en,
      director,
      release_date,
      nation,
      evaluate,
      duration,
      description,
      url,
    } = req.body;

    const title = req.body.title.toLowerCase();
    const poster = '/uploads/film/' + req.files.poster[0].filename;
    const image = '/uploads/film/' + req.files.image[0].filename;
    const year = req.body.release_date.slice(req.body.release_date.length - 4);
    const title_tag = xoa_dau(req.body.title).replace(/ /g, '-').toLowerCase();
    const tags = JSON.parse(req.body.tags);
    const type = JSON.parse(req.body.type);

    const newMovie = new Movie({
      title,
      title_en,
      image,
      tags,
      url,
      director,
      release_date,
      nation,
      duration,
      description,
      evaluate,
      type,
      poster,
      title_tag,
      year,
    });
    newMovie
      .save()
      .then(() => res.json({ Message: 'Upload Complete' }))
      .catch((err) => console.log(err));
  },
  delete: (req, res) => {
    unlinkAsync('./client/build' + req.body.image);
    unlinkAsync('./client/build' + req.body.poster);
    Movie.findByIdAndDelete(req.body.id)
      .then(() =>
        res.json({
          Message: 'Delete Complete',
        })
      )
      .catch((err) => res.status(500).json('Error: ' + err));
  },
  deleteMulti: (req, res) => {
    Movie.deleteMany({
      _id: { $in: req.body },
    })
      .then(() => res.json({ Message: 'Delete Complete' }))
      .catch((err) => res.status(500).json('Error: ' + err));
  },
  getMovieForTag: (req, res) => {
    if (req.query._limit) {
      Movie.find({ tags: req.query.tags })
        .limit(parseInt(req.query._limit))
        .then((movie) => {
          return res.json({
            data: movie,
            pagination: {
              _page: req.query._page,
              _total: movie.length,
            },
          });
        })
        .catch((err) => res.status(500).json(err));
    } else {
      Movie.find()
        .then((movie) => {
          const data = movie.filter((filter) => {
            if (filter.tags.search(req.query.tags) > 0) {
              return true;
            }
            return false;
          });
          res.json(data);
        })
        .catch((err) => res.status(500).json('Error: ' + err));
    }
  },
  getMovieForType: (req, res) => {
    Movie.find({ type: req.query.type })
      .then((movie) => res.json(movie))
      .catch((err) => res.status(500).json('Error: ' + err));
  },
};
