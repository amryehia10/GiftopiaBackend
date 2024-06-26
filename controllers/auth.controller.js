const User = require("../models/user.model");
const utiles = require("../models/model.utils");
const mongoose = require("../node_modules/mongoose");
const jwt = require("../node_modules/jsonwebtoken");
const validator = require("../utiles/validators/user.validator");
const bcrypt = require("../node_modules/bcrypt");

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
    disabled: false,
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
  res.status(201).json({ token });
};

const login = async (req, res) => {
  //   console.log(await bcrypt.hash("amr123", 10));
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Invalid user data." });
  }
  // find user
  const user = await User.findOne({ email });
  if (!user)
  return res.status(401).json({ msg: "Invalid email or password" });

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
console.log(token)
let newAdmin = new utiles({
  token: token,
  userType: "admin",
});
if (user.userType === "admin") {
  await utiles.deleteOne({ userType: "admin" })
  console.log(newAdmin);
  await newAdmin.save();
  res.status(200).json({ token });
} else  {
  res.status(200).json({ token });

}

};

const updateUser = async (req, res) => {
  const _id = req.params.userId;

  if (!_id) {
    res.status(400).json({ msg: "Invalid user data." });
  }
  // find the user
  const userDb = await User.findOne({ _id });

  if (!userDb) return res.status(404).json({ msg: "User Not Found!" });

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
  const UserReq = req.body;

  if (req?.file?.path) UserReq.image = JSON.stringify(req?.file?.path);

  for (let attr in UserReq) {
    try {
      UserReq[attr] = JSON.parse(UserReq[attr]);
    } catch { }
  }

  UserReq.phone = UserReq.phone.map((phone) => phone.number);
  UserReq.address = UserReq.address.map((address) => address.address);
  //  Validate UserReq
  const errorMsgs = validatorUpdateUser(UserReq);

  // basic validation
  if (Object.keys(errorMsgs).length > 0) {
    res.status(400).json({ msg: "Input data error!", details: errorMsgs });
    return;
  }

  // check if email exists in the database
  if (UserReq.email && UserReq.email != userDb.email) {
    if (await User.findOne({ email: UserReq.email })) {
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
  }

  // check if one of phones exists in the database
  for (let idx = 0; idx < UserReq.phone.length; idx++) {
    const phone = UserReq.phone[idx].number;
    const user = await User.findOne({ phone: phone });
    if (user && user._id + "" != userDb._id + "") {
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

  // Save changes
  for (let attr in UserReq) {
    const value = UserReq[attr];
    if (value !== null && value !== undefined) {
      if (attr === "password") {
        userDb[attr] = await bcrypt.hash(value, 10);
      } else {
        userDb[attr] = value;
      }
    }
  }

  // update the user
  try {
    await userDb.save();
  } catch (error) {
    console.error("Error occurred while updating user!", error);
    return res.status(500).json({ msg: "Error occurred while updating user!" });
  }
  // return new token
  const token = jwt.sign(
    {
      _id: userDb._id,
      name: userDb.name,
      email: userDb.email,
      image: userDb.image,
      type: userDb.userType,
    },
    JWTCongig.secretKey,
    {
      expiresIn: "1y",
    }
  );
  res.status(201).json({ token });
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ msg: "Invalid user ID." });
  }

  try {
    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found!" });
    }

    // Update the disabled field
    user.disabled = true;

    // Save the updated user document
    await user.save();

    res.status(200).json({ msg: "Deleted Successfully!", user });
  } catch (error) {
    console.error("Error occurred while deleting user:", error);
    return res.status(500).json({ msg: "Error occurred while deleting user" });
  }
};

const userDetails = async (req, res) => {
  const { _id } = req?.user;
  if (!_id) {
    return res.status(400).json({ msg: "Invalid user data." });
  }

  // find user
  const user = await User.findOne({ _id });

  if (!user || user.disabled)
    return res.status(401).json({ msg: "Invalid Token!" });
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    profileImage: user.image,
    address: user.address.map((address) => ({ address })),
    age: user.age,
    phone: user.phone.map((phone) => ({ number: phone })),
    gender: user.gender,
  });
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

function validatorUpdateUser(user) {
  formMsg = {};
  // name
  if (user.name && !validateName(user.name)) {
    formMsg["name"] = {
      msg: "Name must be between 3 to 20 characters!",
      type: "error",
    };
  }

  // email
  if (user.email && !validateEmail(user.email)) {
    formMsg["email"] = {
      msg: "Email is not in correct format!",
      type: "error",
    };
  }

  //password
  if (user.password && !validatePassword(user.password)) {
    formMsg["password"] = {
      msg: "Password must be between 8 to 64 characters!",
      type: "error",
    };
  }

  // gender
  if (user.gender && user.gender == "") {
    formMsg["gender"] = {
      msg: "Please select your gender!",
      type: "error",
    };
  }

  // age
  if (user.age && !validateAge(user.age)) {
    formMsg["age"] = {
      msg: "Age must be between 10 to 150 years!",
      type: "error",
    };
  }

  // image
  if (user.profileImage && !validateImage(user.profileImage)) {
    formMsg["image"] = {
      msg: "Please add your profile photo! (.png, .jpg, .jpeg)",
      type: "error",
    };
  }

  // numbers
  for (let i = 0; i < user.phone.length; i++) {
    const phone = user.phone[i];

    if (!validatePhone(phone)) {
      formMsg[`phone_${i}`] = {
        msg: "Please add a valid phone number",
        type: "error",
      };
    }
  }

  // addresses
  for (let i = 0; i < user.address.length; i++) {
    const address = user.address[i];

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
  deleteUser,
  updateUser,
  userDetails,
};
