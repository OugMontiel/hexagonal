<template>
    <div class="product-display">
        <div class="product-display-grid">
            <!-- Encabezados -->
            <div class="product-header">Codigo</div>
            <div class="product-header">Name</div>
            <div class="product-header">Last Name</div>
            <div class="product-header">Nick</div>
            <div class="product-header">Email</div>
            <div class="product-header">Phone</div>
            <div class="product-header">Rol</div>
            <div class="product-header">Acción</div>

            <!-- Productos (los datos se iteran dinámicamente) -->
            <div v-for="(product, index) in products" :key="index" class="product-row">
                <!-- Aquí se muestran los valores de cada producto -->
                <div class="product-data">{{ product.codigo }}</div>
                <div class="product-data">{{ product.name }}</div>
                <div class="product-data">{{ product.lastName }}</div>
                <div class="product-data">{{ product.nick }}</div>
                <div class="product-data">{{ product.email }}</div>
                <div class="product-data">{{ product.phone }}</div>
                <div class="product-data">{{ product.rol }}</div>
                <div class="product-actions">
                    <a href="#" class="btn">Edit</a>
                    <a href="#" class="btn delete">Delete</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [
                // Ejemplo de datos de productos
                {
                    codigo: '001',
                    name: 'John',
                    lastName: 'Doe',
                    nick: 'Johnny',
                    email: 'john.doe@example.com',
                    phone: '123456789',
                    rol: 'Admin',
                },
                {
                    codigo: '002',
                    name: 'Jane',
                    lastName: 'Smith',
                    nick: 'Janey',
                    email: 'jane.smith@example.com',
                    phone: '987654321',
                    rol: 'User',
                },
                // Puedes agregar más productos aquí
            ],
        };
    },
};
</script>

<style scoped>
.product-display {
    /* height: 85vh; */
    overflow-y: auto;

}

.product-display-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    max-width: 1200px;
}

/* Estilos para los encabezados */
.product-header {
    background-color: var(--vt-c-indigo);
    color: var(--vt-c-white);
    padding: .2rem;
    text-align: center;
    /* font-weight: bold; */
    border-bottom: 1px solid var(--vt-c-text-light-1);
}

/* Estilos para los datos de cada producto */
.product-data {
    background-color: var(--vt-c-white);
    padding: .5rem;
    text-align: center;
    border-bottom: 1px solid var(--vt-c-text-light-1);
}

/* Estilos para las acciones (botones) */
.product-actions {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
}

.product-actions .btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--vt-c-divider-light-1);
    color: var(--vt-c-white);
    text-decoration: none;
    border-radius: 0.5rem;
    text-align: center;
}

.product-actions .btn.delete {
    background: crimson;
}

.product-actions .btn:hover {
    background: var(--vt-c-black);
}
</style>