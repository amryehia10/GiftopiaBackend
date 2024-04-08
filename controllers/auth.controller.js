const User = require("../models/user.model");
const jwt = require("../packages/node_modules/jsonwebtoken");
const validator = require("../utiles/validators/user.validator");
const bcrypt = require("../packages/node_modules/bcrypt");

const { JWT: JWTCongig } = require("../config.json");

const register = async (req, res) => {
  /*
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number | null;
  profileImage: File | null;
  phone: { number: string }[];
  address: { address: string }[];
  */
  const user = req.body;
  user.profileImage = JSON.stringify(req.file.path);

  for (let attr in user) {
    user[attr] = JSON.parse(user[attr]);
  }
  const errorMsgs = validatorUser(user);

  // basic validation
  if (Object.keys(errorMsgs).length > 0) {
    res.status(400).json({ msg: "Input data error!", details: errorMsgs });
    return;
  }

  // check if email exists in the database
  if (await User.findOne({ email: user.email })) {
    res.status(400).json({
      msg: "Input data error!",
      details: {
        email: {
          msg: "Email is already in use on another account!",
          type: "error",
        },
      },
    });
    return;
  }

  // check if one of phones exists in the database
  for (let idx = 0; idx < user.phone.length; idx++) {
    const phone = user.phone[idx].number;
    if (await User.findOne({ phone: phone })) {
      res.status(400).json({
        msg: "Input data error!",
        details: {
          [`phone_${idx}`]: {
            msg: "Phone is already in use on another account!",
            type: "error",
          },
        },
      });
      return;
    }
  }

  // add user to the datbase
  const newUser = new User({
    name: user.name,
    image: user.profileImage,
    address: user.address.map((a) => a.address),
    email: user.email,
    age: user.age,
    password: await bcrypt.hash(user.password, 10),
    phone: user.phone.map((p) => p.number),
    gender: user.gender,
    userType: "customer",
  });

  // Save the new user to the database
  try {
    await newUser.save();
  } catch (error) {
    console.error("Error occurred while saving user:", error);
    return res.status(500).json({ msg: "Error occurred while saving user" });
  }

  // return new token
  const token = jwt.sign(
    {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      type: newUser.userType,
    },
    JWTCongig.secretKey,
    {
      expiresIn: "1y",
    }
  );
  res.status(200).json({ token });
};

const login = async (req, res) => {
  //   console.log(await bcrypt.hash("amr123", 10));
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "Invalid user data." });
  }
  // find user
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ msg: "Invalid email or password" });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res.status(401).json({ msg: "Invalid email or password" });

  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      userType: user.userType,
    },
    JWTCongig.secretKey,
    {
      expiresIn: "1y",
    }
  );

  res.status(200).json({ token });
};

/* Validatoes Fuctions */
function validatorUser(user) {
  formMsg = {};
  // name
  if (!validateName(user.name)) {
    formMsg["name"] = {
      msg: "Name must be between 3 to 20 characters!",
      type: "error",
    };
  }

  // email
  if (!validateEmail(user.email)) {
    formMsg["email"] = {
      msg: "Email is not in correct format!",
      type: "error",
    };
  }

  //password
  if (!validatePassword(user.password)) {
    formMsg["password"] = {
      msg: "Password must be between 8 to 64 characters!",
      type: "error",
    };
  }

  // gender
  if (user.gender == "") {
    formMsg["gender"] = {
      msg: "Please select your gender!",
      type: "error",
    };
  }

  // age
  if (!validateAge(user.age)) {
    formMsg["age"] = {
      msg: "Age must be between 10 to 150 years!",
      type: "error",
    };
  }

  // image
  if (!validateImage(user.profileImage)) {
    formMsg["image"] = {
      msg: "Please add your profile photo! (.png, .jpg, .jpeg)",
      type: "error",
    };
  }

  // numbers
  for (let i = 0; i < user.phone.length; i++) {
    const phone = user.phone[i].number;

    if (!validatePhone(phone)) {
      formMsg[`phone_${i}`] = {
        msg: "Please add a valid phone number",
        type: "error",
      };
    }
  }

  // addresses
  for (let i = 0; i < user.address.length; i++) {
    const address = user.address[i].address;

    if (!validateAddress(address)) {
      formMsg[`address_${i}`] = {
        msg: "Address must be between 3 to 256 characters!",
        type: "error",
      };
    }
  }

  return formMsg;
}

function validateName(name) {
  if (!name) return false;
  return name.length >= 3 && name.length <= 100;
}

function validateEmail(email) {
  if (!email) return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

function validatePassword(password) {
  if (!password) return false;
  return password.length >= 8 && password.length <= 64;
}

function validateAge(age) {
  if (!age) return false;
  return age >= 10 && age <= 150;
}

function validateImage(image) {
  if (!image) return false;
  return ["png", "jpg", "jpeg"].includes(image.split(".").pop());
}

function validatePhone(phone) {
  if (!phone) return false;
  const re = /^(\+?2?)?(01[0125])\d{8}$/;
  return re.test(phone);
}

function validateAddress(address) {
  if (!address) return false;
  return address.length >= 3 && address.length <= 256;
}

module.exports = {
  login,
  register,
};
