import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js"
dotenv.config();

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        error: "Cet email est déjà utilisé.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: "Email ou mot de passe incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Email ou mot de passe incorrect",
      });
    }
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};