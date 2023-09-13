import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config";
import passport from "passport";
import User from "../models/UserModel";
import { generateToken } from "../utils/generateToken";
// console.log(process.env.GOOGLE_CLIENT_ID)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URL,
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log(profile);
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existingUser) {
          // if(existingUser.provider!='google'){
          //   const message="only google authenticated users!"
          //   return done(message,null)
          // }
          const { _id, firstname, email, role } = existingUser;
          const person = { _id, firstname, email, role };
          const token = generateToken(person);

          return done(null, { user: existingUser, token });
        } else {
          const newUser = {
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            profilePic: profile._json.picture,
            email: profile.emails[0].value,
            isEmailVerified: true,
            provider: "google",
          };
          const createUser = await User.create(newUser);
          const { _id, firstname, email, role } = createUser;
          const person = { _id, firstname, email, role };
          const token = generateToken(person);
          return done(null, { user: createUser, token });
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.email);
});
passport.deserializeUser((email, done) => {
  User.findOne({ email })
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
