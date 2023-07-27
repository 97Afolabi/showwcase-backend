import { Container } from "inversify";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import envVars from "./validate-env";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from "passport-jwt";
import { TYPES } from "./types";
import AuthService from "../modules/auth/services/auth.service";

const JWT_SECRET = envVars.JWT_SECRET;
const JWT_EXPIRES = envVars.JWT_EXPIRES;

export function setupPassport(container: Container): void {
  const userService = container.get<AuthService>(TYPES.AuthService);

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  };

  passport.use(
    "jwt",
    new JwtStrategy(jwtOptions, async (jwtPayload, done: VerifiedCallback) => {
      try {
        const user = await userService.findById(jwtPayload.sub);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Unauthorized" });
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
}

export default passport;

export function generateJwtToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}
