<!-- src/app.vue -->
<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="logo-nav-container">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" height="25" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/Protegido">Protegido</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Estilo principal del header */
header {
  line-height: 1.5;
  max-height: 100vh;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.logo-nav-container {
  display: flex; /* Para que logo y opciones estén en línea */
  align-items: center; /* Alinear verticalmente el logo y las opciones */
  justify-content: space-between; /* Espacio entre el logo y las opciones */
}

.logo {
  margin-right: 2rem;
}

nav {
  font-size: 1rem;
  display: flex;
  gap: 1rem; /* Espacio entre las opciones de navegación */
}

nav a {
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0; /* Eliminar el borde en la primera opción */
}

nav a.router-link-exact-active {
  color: var(--color-text);
  font-weight: bold; /* Para resaltar la opción activa */
}

nav a:hover {
  background-color: var(--vt-c-white-soft);
}
</style>
