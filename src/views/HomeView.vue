<template>
  <div class="home-container">
    <section class="hero">
      <div class="hero-content">
        <h1>Bienvenido a <span class="highlight">TuAppDeVentas</span></h1>
        <p>La mejor plataforma para gestionar tus ventas y aumentar tu productividad.</p>
        <RouterLink to="/login" class="cta-button">Comenzar ahora</RouterLink>
      </div>
    </section>

    <section class="features">
      <h2>¿Por qué usar TuAppDeVentas?</h2>
      <div class="feature-grid">
        <div class="feature-item">
          <!-- <img src="@/assets/sales.svg" alt="Gestión de ventas" /> -->
          <h3>Gestión de Ventas</h3>
          <p>Administra tus ventas con facilidad, con reportes detallados y seguimiento de inventario.</p>
        </div>
        <div class="feature-item">
          <!-- <img src="@/assets/customers.svg" alt="Clientes felices" /> -->
          <h3>Clientes Felices</h3>
          <p>Mantén a tus clientes contentos con una atención personalizada y seguimiento de compras.</p>
        </div>
        <div class="feature-item">
          <!-- <img src="@/assets/growth.svg" alt="Incrementa tus ingresos" /> -->
          <h3>Incrementa tus Ingresos</h3>
          <p>Descubre oportunidades de crecimiento con nuestras herramientas avanzadas de análisis.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  padding: 2rem;
  text-align: center;
}

.hero {
  background-color: var(--vt-c-divider-light-1);
  padding: 3rem 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--vt-c-text-light-1);
}

.highlight {
  color: var(--vt-c-indigo);
}

p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--vt-c-text-light-1);
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
}

.cta-button:hover {
  background-color: var(--vt-c-black);
}

.features {
  background-color: var(--vt-c-white);
  padding: 2rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1.5rem;
  color: var(--vt-c-text-light-1);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.feature-item {
  text-align: center;
}

.feature-item img {
  width: 80px;
  margin-bottom: 1rem;
}

h3 {
  margin-bottom: 0.5rem;
  color: var(--vt-c-text-light-1);
}

p {
  font-size: 1rem;
  color: var(--vt-c-black);
}
</style>

