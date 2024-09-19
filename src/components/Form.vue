<template>
    <div class="admin-product-form-container">
      <form id="myForm" action="/user/v1" method="POST">
        <!-- enctype="multipart/form-data" -->
        <h3>Add a New Info</h3>
        <input
          type="number"
          placeholder="Enter the user code"
          name="codigo"
          class="box"
        />
        <input
          type="text"
          placeholder="Enter the username"
          name="nombre"
          class="box"
        />
        <input
          type="text"
          placeholder="Enter the user's last name"
          name="apellido"
          class="box"
        />
        <input
          type="text"
          placeholder="Enter the user's nickname"
          name="nick"
          class="box"
        />
        <input
          type="email"
          placeholder="Enter the user's email"
          name="corro_electronico"
          class="box"
        />
        <input
          type="number"
          placeholder="Enter the user's phone number"
          name="telefono"
          class="box"
        />
        <input
          type="text"
          placeholder="Enter the user role"
          name="rol"
          class="box"
        />
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          name="product_image"
          class="box"
        />
        <a href="#" class="btn">Add</a>
      </form>
    </div>
  </template>
  
  <style scoped>
  .admin-product-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 80%;
    width: 100%;
    background: var(--vt-c-indigo);
    padding: 2rem;
    border-radius: 0.5rem;
  }
  
  h3 {
    margin-bottom: 1rem;
    color: var(--vt-c-white);
    text-align: center;
  }
  
  .box {
    width: 100%;
    max-width: 30rem;
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 0.5rem 0;
    background: var(--vt-c-white);
  }
  
  .btn {
    display: block;
    width: 100%;
    max-width: 15rem;
    cursor: pointer;
    border-radius: 0.5rem;
    margin-top: 1rem;
    padding: 1rem;
    background: var(--vt-c-divider-light-1);
    color: var(--vt-c-white);
    text-align: center;
    border: 1px solid var(--vt-c-black);
    text-decoration: none;
  }
  
  .btn:hover {
    background: var(--vt-c-black);
  }
  </style>
  