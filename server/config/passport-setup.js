const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const key = require("./keys")

passport.use(
    new GoogleStrategy({
        // options of the google strategy
        clientID: key.google.clientID,
        clientSecret: key.google.clientSecret,
        callbackURL: "/user/auth/google/redirect"
    }, (accessToken, refreshToken, profile, done)=>{
        console.log(profile)
    })
)