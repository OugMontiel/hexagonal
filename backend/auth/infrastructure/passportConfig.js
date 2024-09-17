// infrastructure/passport/passportConfig.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../../user/domain/models/userModel'); // Ajusta la ruta según tu estructura

// Configuración de Passport para Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Buscar o crear usuario en tu base de datos
    const user = await User.findOrCreate({ googleId: profile.id });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

// Configuración de Passport para Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Buscar o crear usuario en tu base de datos
    const user = await User.findOrCreate({ facebookId: profile.id });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

// Configuración de Passport para Discord
passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: '/auth/discord/callback',
  scope: ['identify', 'email']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Buscar o crear usuario en tu base de datos
    const user = await User.findOrCreate({ discordId: profile.id });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

// Serializar el usuario para guardar en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializar el usuario desde la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
