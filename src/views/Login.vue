<template>
  <div class="signup">
    <div class="signup-connect">
      <h1>Create your account</h1>
      <a href="#" class="btn btn-social btn-facebook">
        <i class="pi pi-facebook"></i> Sign in with Facebook
      </a>
      <a :href="googleLoginUrl" class="btn btn-social btn-twitter">
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
      <h2>Or use the classical way</h2>
      <form @submit.prevent="signUp" class="form">
        <fieldset class="username">
          <input type="text" v-model="username" placeholder="Username" />
        </fieldset>
        <fieldset class="email">
          <input type="email" v-model="email" placeholder="Email" />
        </fieldset>
        <fieldset class="password">
          <input type="password" v-model="password" placeholder="Password" />
        </fieldset>
        <button type="submit" class="btn" :disabled="!isFormValid">
          Sign up
        </button>
      </form>
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
      googleLoginUrl: `https://${import.meta.env.VITE_EXPRESS_HOST}:${import.meta.env.VITE_EXPRESS_PORT}/auth/google`, // Ajusta esta URL
    };
  },
  computed: {
    isFormValid() {
      // Verificamos que los tres campos estén llenos
      return this.username && this.email && this.password;
    },
  },
  methods: {
    async signUp() {
      try {
        // console.log('Host:', import.meta.env.VITE_EXPRESS_HOST);
        // console.log('Port:', import.meta.env.VITE_EXPRESS_PORT);

        // Enviamos la solicitud POST con el cuerpo JSON
        const response = await fetch(
          `https://${import.meta.env.VITE_EXPRESS_HOST}:${import.meta.env.VITE_EXPRESS_PORT}/auth/sessionLogin`,
          {
            method: 'POST',
            credentials: 'include', // Esto permite que se envíen cookies en la solicitud
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nick: this.username, // Mapeamos el "username" al "nick" que espera el backend
              email: this.email,
              password: this.password,
            }),
          }
        );

        // Parseamos la respuesta
        const data = await response.json();

        // console.log('response.data', data);

        if (response.ok) {
          // Manejo del éxito (redireccionar, mostrar mensaje, etc.)
          console.log('Login successful:', data);
          // Puedes guardar el token en localStorage o redirigir a otra página
        } else {
          // Manejo del error
          console.error('Login failed:', data.message);
          alert('Login failed: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
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
}

.signup-connect {
  background: var(--vt-c-indigo); /* Fondo índigo */
  color: var(--vt-c-white); /* Texto blanco */

  h1 {
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 40px;
    text-shadow: 0 2px 3px var(--vt-c-divider-light-1); /* Sombra ligera */
  }
}

.signup-classic h2 {
  font-size: 16px;
  font-weight: normal;
  margin-top: 23px;
  margin-bottom: 43px;
  text-shadow: 0 2px 3px var(--vt-c-divider-light-1); /* Sombra ligera */
}

.btn {
  display: block;
  background: var(--vt-c-indigo); /* Fondo índigo */
  color: var(--vt-c-white); /* Texto blanco */
  text-decoration: none;
  margin: 20px 0;
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

.btn-twitter {
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
