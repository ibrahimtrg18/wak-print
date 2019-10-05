const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const key = require("./keys")
const connection = require("./db");

passport.serializeUser((id, done) => {
    return done(null, id);
});

passport.deserializeUser((id, done) => {
    connection.query("SELECT * FROM user WHERE id_user = ?", id, (err, result) => {
        if (err) {
            return done(err, null);
        }
        return done(null, result);
    })
});


passport.use(
    new GoogleStrategy({
        // options of the google strategy
        clientID: key.google.clientID,
        clientSecret: key.google.clientSecret,
        callbackURL: "/user/auth/google/redirect"
    }, (accessToken, refreshToken, profile, done) => {
        connection.query("SELECT * FROM user WHERE email_user = ?", profile.emails[0].value, (err, results) => {
            if (err) {
                return done(err, null)
            } else if (results && results.length > 0) {
                return done(null, results[0].id_user)
            } else {
                connection.query("INSERT INTO user SET ?", {
                    email_user: profile.emails[0].value,
                    nama_lengkap_user: profile.displayName
                }, (err, result) => {
                    if (err) {
                        return done(err, null)
                    } else {
                        return done(null, result.insertId)
                    }
                })
            }
        })
    })
)