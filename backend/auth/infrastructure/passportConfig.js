// infrastructure/passport/passportConfig.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const AuthRepository = require('../domain/repositories/authRepository'); // Ajusta la ruta según tu estructura

// Configuración de Passport para Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://localhost:3000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const User = new AuthRepository()
        // Busca si el usuario ya existe en la base de datos
        let user = await User.getUserByEmail(profile.emails[0].value);

        if (!user) {
          try {
            // Datos del nuevo usuario a crear
            const newUser = {
              cedula: '', // Si no tienes este dato, puedes asignar algo por defecto o pedirlo luego
              names: profile.name.givenName || profile.displayName.split(' ')[0],
              surnames: profile.name.familyName || profile.displayName.split(' ')[1],
              nick: profile.displayName.split(' ').join('_').toLowerCase(), // Genera un nick basado en el nombre
              email: profile.emails[0].value,
              password: profile.id, // Usa una contraseña generada o segura
              phone: 'N/A', // Puedes asignar un valor por defecto o pedir este dato más tarde
              role: 'Usuario Estandar' // Asigna el rol que desees, en este caso 'Usuario'
            };
            // console.log('newUser',newUser);
        
            // Hacer la solicitud POST con fetch para crear el usuario
            const response = await fetch('https://localhost:3000/users/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Indica que estamos enviando JSON
              },
              body: JSON.stringify(newUser), // Convierte el objeto newUser a JSON para enviar
            });
        
            // Verificar si la respuesta es exitosa (HTTP 200-299)
            if (!response.ok) {
              throw new Error(`Error en la creación del usuario: ${response.statusText}`);
            }
        
            // Obtener los datos de la respuesta (el nuevo usuario creado)
            const createdUser = await response.json();
        
            // Asignamos el nuevo usuario a la variable user
            user = createdUser;
        
          } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw new Error('Error al crear el usuario con Google');
          }
        }        
        return done(null, user); // Pasa el usuario a Passport para manejar la sesión
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// // Configuración de Passport para Facebook
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: '/auth/facebook/callback',
//   profileFields: ['id', 'emails', 'name']
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     // Buscar o crear usuario en tu base de datos
//     const user = await User.findOrCreate({ facebookId: profile.id });
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// }));

// // Configuración de Passport para Discord
// passport.use(new DiscordStrategy({
//   clientID: process.env.DISCORD_CLIENT_ID,
//   clientSecret: process.env.DISCORD_CLIENT_SECRET,
//   callbackURL: '/auth/discord/callback',
//   scope: ['identify', 'email']
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     // Buscar o crear usuario en tu base de datos
//     const user = await User.findOrCreate({ discordId: profile.id });
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// }));

// Serializar el usuario para guardar en la sesión
passport.serializeUser((user, done) => {
  done(null, user._id);
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
