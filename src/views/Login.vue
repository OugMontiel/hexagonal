<template>
  <div class="signup">
    <div class="signup-connect">
      <h2 v-if="!isSignUpMode">Log in to your account</h2>
      <h2 v-else>Create your account</h2>
      <a href="#" class="btn btn-social btn-facebook">
        <i class="pi pi-facebook"></i> Sign in with Facebook
      </a>
      <a :href="googleLoginUrl" class="btn btn-social btn-google">
        <i class="pi pi-google"></i> Sign in with Google
      </a>
      <a href="#" class="btn btn-social btn-discord">
        <i class="pi pi-discord"></i> Sign in with Discord
      </a>
      <a href="#" class="btn btn-social btn-linkedin">
        <i class="pi pi-linkedin"></i> Sign in with LinkedIn
      </a>
    </div>

    <div class="signup-classic">
      <h2 v-if="!isSignUpMode">Or log in the classical way</h2>
      <h2 v-else>Or create your account the classical way</h2>
      
      <form @submit.prevent="isSignUpMode ? signUp() : logIn()" class="form">
        <fieldset class="username" v-if="isSignUpMode">
          <input type="text" v-model="username" placeholder="Username" />
        </fieldset>
        <fieldset class="email">
          <input type="email" v-model="email" placeholder="Email" />
        </fieldset>
        <fieldset class="password">
          <input type="password" v-model="password" placeholder="Password" />
        </fieldset>
        <button type="submit" class="btn" :disabled="!isFormValid">
          {{ isSignUpMode ? 'Sign up' : 'Log in' }}
        </button>
      </form>

      <div class="toggle-auth">
        <p v-if="!isSignUpMode">Don't have an account? 
          <a href="#" @click.prevent="isSignUpMode = true">Sign up here</a>
        </p>
        <p v-else>Already have an account? 
          <a href="#" @click.prevent="isSignUpMode = false">Log in here</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      isSignUpMode: false, // Variable para alternar entre login y registro
      googleLoginUrl: `https://${import.meta.env.VITE_EXPRESS_HOST}:${import.meta.env.VITE_EXPRESS_PORT}/auth/google`, // Ajusta esta URL
    };
  },
  computed: {
    isFormValid() {
      // Verificamos que el formulario es válido. Para registro, se requiere username
      return this.email && this.password && (this.isSignUpMode ? this.username : true);
    },
  },
  methods: {
    async signUpOrLogIn() {
      try {
        const url = `https://${import.meta.env.VITE_EXPRESS_HOST}:${import.meta.env.VITE_EXPRESS_PORT}/auth/sessionLogin`;
        const body = {
          email: this.email,
          password: this.password,
        };

        // Si está en modo registro, añadimos el nombre de usuario
        if (this.isSignUpMode) {
          body.nick = this.username;
        }

        // Enviamos la solicitud POST con el cuerpo JSON
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include', // Esto permite que se envíen cookies en la solicitud
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(`${this.isSignUpMode ? 'Signup' : 'Login'} successful:`, data);
          // Manejo del éxito (guardar token, redireccionar, etc.)
        } else {
          console.error(`${this.isSignUpMode ? 'Signup' : 'Login'} failed:`, data.message);
          alert(`${this.isSignUpMode ? 'Signup' : 'Login'} failed: ` + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert(`An error occurred during ${this.isSignUpMode ? 'signup' : 'login'}`);
      }
    },
  },
};
</script>

<style scoped>
/* Adaptación del CSS para usar las variables de color proporcionadas */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: 'Open Sans', sans-serif;
}

body {
  background: var(--vt-c-white); /* Cambiado a blanco */
}

.signup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 800px;
  background: var(--vt-c-white); /* Fondo blanco */
  border-radius: 10px;
  box-shadow: 0 3px 25px var(--vt-c-divider-light-1); /* Usando el color del divisor */
  overflow: hidden;
  display: flex;
}

.signup-connect,
.signup-classic {
  width: 50%;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
}

.signup-connect {
  background: var(--vt-c-indigo); /* Fondo índigo */
  color: var(--vt-c-white); /* Texto blanco */

  h1 {
    text-shadow: 0 2px 3px var(--vt-c-divider-light-1); /* Sombra ligera */
  }
}

.signup-classic h2 {
  font-size: 16px;
  font-weight: normal;
  text-shadow: 0 2px 3px var(--vt-c-divider-light-1); /* Sombra ligera */
}

.btn {
  display: block;
  background: var(--vt-c-indigo); /* Fondo índigo */
  color: var(--vt-c-white); /* Texto blanco */
  text-decoration: none;
  padding: 15px 15px;
  border-radius: 5px;
  position: relative;
}

.btn-social {
  padding-left: 64px;
  position: relative;
  z-index: 1;
}

.pi {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 50px;
  height: 100%;
  text-align: center;
  background: var(--vt-c-divider-light-1); /* Fondo divisor ligero */
  line-height: 3.2;
  border-radius: 5px 0 0 5px;
}

.btn-facebook {
  background-color: #3b5998;
}

.btn-google {
  background-color: #00aced;
}

.btn-discord {
  background-color: #7289da;
}

.btn-linkedin {
  background-color: #0077b5;
}

.form fieldset {
  border: none;
  padding: 0;
  margin: 20px 0;
  position: relative;
}

.form input {
  width: 100%;
  height: 48px;
  color: var(--vt-c-black); /* Texto negro */
  padding: 15px 40px 15px 15px;
  border-radius: 5px;
  font-size: 14px;
  outline: none !important;
  border: 1px solid var(--vt-c-divider-light-1); /* Borde ligero */
  box-shadow: inset 0 1px 4px var(--vt-c-divider-light-1); /* Sombra interior */
  vertical-align: top;
}

button {
  width: 100%;
  outline: none !important;
  background: linear-gradient(
    -5deg,
    var(--vt-c-indigo),
    var(--vt-c-text-light-1)
  ); /* Fondo gradiente usando índigo */
  border: none;
  text-transform: uppercase;
  font-weight: bold;
  box-shadow: 0 3px 0px var(--vt-c-divider-light-1); /* Sombra ligera */
  text-shadow: 0 2px 3px var(--vt-c-divider-light-1); /* Sombra de texto */
}
</style>
