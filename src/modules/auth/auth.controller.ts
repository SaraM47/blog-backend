import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import { User } from "../users/user.model";
import { signToken } from "../../plugins/jwt";

/**
 * Types for request bodies
 */
interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody {
  email: string;
  password: string;
}

/**
 * Controllers for authentication routes: register, login, logout, me
 */

// POST /auth/register to creates a new user with hashed password, returns user info (no token)
export async function register(
  req: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;

  if (!email || !password) {
    return reply.code(400).send({
      error: "Email and password are required",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return reply.code(409).send({
      error: "User already exists",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    passwordHash,
  });

  reply.code(201).send({
    user: {
      id: user._id.toString(),
      email: user.email,
    },
  });
}

// POST /auth/login to validates credentials, issues JWT, sets cookie
export async function login(
  req: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return reply.code(401).send({ error: "Invalid credentials" });
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return reply.code(401).send({ error: "Invalid credentials" });
  }

  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
  });

  const isProd = process.env.NODE_ENV === "production";

  reply
    .setCookie("token", token, {
      httpOnly: true,
      secure: true, // true on Render (HTTPS), false locally
      sameSite: "none", // allows cross-site cookies for local development and production
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    })
    .send({
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
}

// POST /auth/logout to clears the authentication cookie
export async function logout(_req: FastifyRequest, reply: FastifyReply) {
  reply
    .clearCookie("token", {
      path: "/",
      sameSite: "none",
      secure: true
    })
    .send({ ok: true });
}

// GET /auth/me to returns the current authenticated user
export async function me(req: FastifyRequest, reply: FastifyReply) {
  reply.send({ user: req.user });
}
