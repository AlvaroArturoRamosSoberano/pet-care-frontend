<template>
  <div
    class="navbar h-auto bg-spindle-400 drop-shadow-2xl rounded-md flex justify-center items-center fixed top-0 left-0 right-0"
  >
    <img class="logo h-16" src="/src/assets/img/landing/logo.png" alt="pet-care-logo" />
    <div v-if="$route.path.includes('/admin')" class="container ml-auto pr-4 w-auto">
      <ul
        class="flex flex-col sm:flex-row space-x-2 sm:space-x-14 font-lusitana text-white"
      >
        <li>
          <router-link :to="{ name: 'view-pets' }">Mascotas</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'view-species' }">Species</router-link>
        </li>
        <li>Razas</li>
        <li>
          <router-link :to="{ name: 'view-vaccines' }">Vaccines</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Home-page' }">Log out</router-link>
        </li>
      </ul>
    </div>
    <div v-else class="container ml-auto pr-4 w-auto">
      <ul
        class="flex flex-col sm:flex-row space-x-2 sm:space-x-14 font-lusitana text-white"
      >
        <li>
          <router-link :to="{ name: 'Home-page' }">Inicio</router-link>
        </li>
        <li>Acerca de</li>
        <li>Servicios</li>
        <li>Contactanos</li>
        <li>
          <router-link :to="{ name: 'admin-panel' }">Login</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.navbar ul li {
  position: relative;
}

.navbar ul li::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 0%;
  width: 0%;
  height: 0.3rem;
  background-color: #6a7fc1;
  transition: 0.5s;
  border-radius: 10px;
}

.navbar ul li::after {
  content: "";
  position: absolute;
  top: 100%;
  right: 0%;
  width: 0%;
  height: 0.3rem;
  background-color: #414e6e;
  transition: 0.5s;
  border-radius: 10px;
}

.navbar ul li:hover {
  color: #4a5989;
  border-radius: 10%;
}

.navbar ul li:hover::before {
  width: 50%;
  transform: translate(100%);
}

.navbar ul li:hover::after {
  width: 50%;
  transform: translate(-100%);
}
</style>
