<template>
  <div class="container">
    <Form />
    <ProductDisplay />
  </div>
</template>

<script>
import Form from '../components/Form.vue';
import ProductDisplay from '../components/ProductDisplay.vue';

export default {
  components: {
    Form,
    ProductDisplay
  }
}
</script>

<style scoped>
.container {
  padding: 1rem;
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 1rem; /* Espacio entre columnas */
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr; /* Cambia a una sola columna en pantallas pequeñas */
    flex-direction: column;
    align-items: center;
  }
}
</style>
