const User = require("../../models/User");

const bcrypt = require("bcryptjs");
const { Secret_KEY } = require("../../config");

const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,

      info
    ) {
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        confirmPassword,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
          createdAt: res.createdAt,
          password: res.password,
        },
        Secret_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
