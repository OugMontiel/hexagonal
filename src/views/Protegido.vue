<template>

  <span class="message">MVC by express</span>
  <div class="container">
    <div class="admin-product-form-container">
      <form id="myForm" action="/user/v1" method="POST"> <!-- enctype="multipart/form-data" -->
        <h3>add a new info</h3>
        <input type="number" placeholder="Enter the user code" name="codigo" class="box">
        <input type="text" placeholder="Enter the username" name="nombre" class="box">
        <input type="text" placeholder="Enter the user's last name" name="apellido" class="box">
        <input type="text" placeholder="Enter the user's nickname" name="nick" class="box">
        <input type="email" placeholder="Enter the user's email" name="corro_electronico" class="box">
        <input type="number" placeholder="Enter the user's phone number" name="telefono" class="box">
        <input type="rol" placeholder="Enter the user role" name="rol" class="box">
        <!-- <input type="file" accept="image/png, image/jpeg, image/jpg" name="product_image" class="box"> -->
        <input type="submit" class="btn" name="add" value="add">
      </form>
    </div>
    <div class="product-display">
      <table class="product-display-table">
        <thead>
          <tr>
            <td>Codigo</td>
            <td>Name</td>
            <td>Last name</td>
            <td>Nick</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Rol</td>
            <td>Accion</td>
          </tr>
        </thead>
        <tbody id="myTbody">
          <tr>
            <td><img src="//" height="100" alt=""></td>
            <td contenteditable></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <a href="#" class="btn"> edit </a>
              <a href="#" class="btn"> delete </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
<style scoped>
* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  border: none;
  text-decoration: none;
  text-transform: capitalize;
}

html {
  font-size: 62.5%;
  overflow-x: hidden;
}

.btn {
  display: block;
  width: 100%;
  cursor: pointer;
  border-radius: .5rem;
  margin-top: 1rem;
  font-size: 1.7rem;
  padding: 1rem 3rem;
  background: var(--green);
  color: var(--white);
  text-align: center;
}

.btn:hover {
  background: var(--black);
}

.message {
  display: block;
  background: var(--bg-color);
  padding: 1.5rem 1rem;
  font-size: 2rem;
  color: var(--black);
  margin-bottom: 2rem;
  text-align: center;
}

.container {
  display: flex;
  justify-content: space-around;
}

.admin-product-form-container.centered {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

}

.admin-product-form-container form {
  max-width: 50rem;
  padding: 2rem;
  border-radius: .5rem;
  background: var(--bg-color);
}

.admin-product-form-container form h3 {
  text-transform: uppercase;
  color: var(--black);
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2.5rem;
}

.admin-product-form-container form .box {
  width: 100%;
  border-radius: .5rem;
  padding: 1.2rem 1.5rem;
  font-size: 1.7rem;
  margin: 1rem 0;
  background: var(--white);
  text-transform: none;
}

.product-display {
  /* margin: 2rem 0; */
  width: 65%;
  height: 85svh;
  overflow-y: auto;
}

.product-display .product-display-table {
  width: 100%;
  text-align: center;
}

.product-display .product-display-table thead {
  background: var(--bg-color);
}

.product-display .product-display-table th {
  padding: 1rem;
  font-size: 2rem;
}


.product-display .product-display-table td {
  padding: 1rem;
  font-size: 2rem;
  border-bottom: var(--border);
}

.product-display .product-display-table .btn:first-child {
  margin-top: 0;
}

.product-display .product-display-table .btn:last-child {
  background: crimson;
}

.product-display .product-display-table .btn:last-child:hover {
  background: var(--black);
}

@media (max-width:991px) {

  html {
    font-size: 55%;
  }

}

@media (max-width:768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .product-display {
    margin-top: 2rem;
    width: 100%;
    height: 100svh;
    overflow-y: scroll;
  }

}

@media (max-width:450px) {

  html {
    font-size: 50%;
  }

  .product-display .product-display-table {
    width: 80rem;
  }
}
</style>
