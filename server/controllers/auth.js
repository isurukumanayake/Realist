const User = require("../models/user");
const { AWSSES } = require("../config/aws");
const jwt = require("jsonwebtoken");
const emailTemplate = require("../helpers/email");
const { hashPassword, comparePassword } = require("../helpers/auth");
const { nanoid } = require("nanoid");
const validator = require("email-validator");

const welcome = (req, res) => {
  res.json({ message: "Hello" });
};

const preRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!validator.validate(email)) {
      return res.json({ error: "A valid email is required" });
    }

    if (!password) {
      return res.json({ error: "Password is required" });
    }

    if (password && password.length < 6) {
      return res.json({ error: "Password should be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ error: "Email is taken" });
    }

    const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    AWSSES.sendEmail(
      emailTemplate(
        email,
        `
        <p>Please click the link below to activate you account.</p>
        <a href="${process.env.CLIENT_URL}/auth/account-activate/${token}">Activate my  account</a>
        `,
        process.env.REPLY_TO,
        "Activate you account"
      ),
      (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ ok: false });
        } else {
          console.log(data);
          return res.json({ ok: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong. Try again" });
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = jwt.verify(
      req.body.token,
      process.env.JWT_SECRET
    );

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ error: "Email is taken" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      username: nanoid(6),
      email,
      password: hashedPassword,
    }).save();

    return tokenAndUserResponse(req, res, user);
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong. Try again" });
  }
};

const tokenAndUserResponse = (req, res, user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  user.password = undefined;
  user.resetCode = undefined;

  return res.json({
    token,
    refreshToken,
    user,
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "Invalid email or password" });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.json({ error: "Invalid email or password" });
    }

    return tokenAndUserResponse(req, res, user);
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong. Try again" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "Could not find user" });
    } else {
      const resetCode = nanoid(6);
      user.resetCode = resetCode;
      user.save();

      const token = jwt.sign({ resetCode }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      AWSSES.sendEmail(
        emailTemplate(
          email,
          `
          <p>Please click the link below to access your account.</p>
          <a href="${process.env.CLIENT_URL}/auth/access-account/${token}">Access my account</a>
          `,
          process.env.REPLY_TO,
          "Access your account"
        ),
        (err, data) => {
          if (err) {
            console.log(err);
            return res.json({ ok: false });
          } else {
            console.log(data);
            return res.json({ ok: true });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong. Try again" });
  }
};

const accessAccount = async (req, res) => {
  try {
    const { resetCode } = jwt.verify(
      req.body.resetCode,
      process.env.JWT_SECRET
    );

    const user = await User.findOneAndUpdate({ resetCode }, { resetCode: "" });

    return tokenAndUserResponse(req, res, user);
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong. Try again" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { _id } = jwt.verify(
      req.headers.refesh_token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(_id);

    return tokenAndUserResponse(req, res, user);
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Refresh token failed" });
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password = undefined;
    user.resetCode = undefined;
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Unauthorized" });
  }
};

const publicProfile = async (req, res) => {
  try {
    user = await User.findOne({ username: req.params.username });

    user.password = undefined;
    user.resetCode = undefined;

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json({ error: "User not found" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.json({ error: "Password is required" });
    }

    if (password && password.length < 6) {
      return res.json({ error: "Password should be at least 6 characters" });
    }

    user = await User.findByIdAndUpdate(req.user._id, {
      password: await hashPassword(password),
    });

    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.json({ error: "User not found" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, name, address, company, phone, about, photo } = req.body;
    user = await User.findByIdAndUpdate(
      req.user._id,
      {
        username,
        name,
        address,
        company,
        phone,
        about,
        photo,
      },
      { new: true }
    );

    user.password = undefined;
    user.resetCode = undefined;

    return res.json(user);
  } catch (error) {
    console.log(error);
    if (error.codeName === "DuplicateKey") {
      return res.json({ error: "Username is taken" });
    } else {
      return res.status(403).json({ error: "Unauthorized" });
    }
  }
};

module.exports = {
  welcome,
  preRegister,
  register,
  login,
  forgotPassword,
  accessAccount,
  refreshToken,
  currentUser,
  publicProfile,
  updatePassword,
  updateProfile,
};
