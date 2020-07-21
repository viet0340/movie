const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    try {
      let { email, password, passwordCheck, displayName } = req.body;

      if (!email || !password || !passwordCheck) {
        return res.status(400).json({ msg: 'Không được để trống' });
      }
      if (password.length < 5) {
        return res.status(400).json({ msg: 'Mật khẩu có tối thiểu 5 ký tự.' });
      }

      if (password !== passwordCheck) {
        return res.status(400).json({ msg: 'Mật khẩu nhập lại không đúng' });
      }

      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({ msg: 'Tài khoản đã tồn tại' });
      }

      if (!displayName) displayName = email;

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        password: passwordHash,
        displayName,
      });

      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: 'Vui lòng không để trống.' });
      }

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ msg: 'Tài khoản không tồn tại.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Mật khẩu không chính xác.' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

      res.json({
        token,
        user: {
          id: user._id,
          displayName: user.displayName,
          watchIsLater: user.watchIsLater,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const deleteUser = await User.findByIdAndDelete(req.user);
      res.json(deleteUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  tokenIsValid: async (req, res) => {
    try {
      const token = req.header('x-auth-token');

      if (!token) return res.json(false);

      const verified = jwt.verify(token, process.env.JWT_TOKEN);

      if (!verified) return res.json(false);

      const user = await User.findById(verified.id);

      if (!user) return res.json(false);

      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getUser: async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
      displayName: user.displayName,
      id: user._id,
      watchIsLater: user.watchIsLater,
    });
  },
  watchIsLater: async (req, res) => {
    const user = await User.findById(req.user);
    user.watchIsLater = req.body.watchIsLater;

    const newUser = await user.save();
    res.json(newUser);
  },
};
