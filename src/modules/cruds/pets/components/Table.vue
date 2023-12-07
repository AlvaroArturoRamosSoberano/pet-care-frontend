<template>
  <div class="h-screen bg-gray-100 flex justify-center items-center ">
    <section v-if="errored" class="flex justify-center items-center">
      <div class="text-center">
        <h2> 
          Lo sentimos, no es posible obtener la información en este momento, por
          favor intente nuevamente mas tarde.
        </h2>
      </div>
    </section>

    <section v-else>
      <div class="w-screen p-4">
      <div v-if="loading" class="text-center">Cargando...</div>
      <div v-else class="bg-white rounded-xl p-4 "> 
        <h1 class="font-bold text-lg text-center p-2">Listado de mascotas</h1>
          <table class="w-full p-2 bg-white border-separate rounded-xl shadow-xl border border-gray-500" >
            <thead>
              <tr>
                <th class="border rounded-md border-gray-500">ID</th>
                <th class="border rounded-md border-gray-500">Nombre</th>
                <th class="border rounded-md border-gray-500">Cumpleaños</th>
                <th class="border rounded-md border-gray-500">Especie</th>
                <th class="border rounded-md border-gray-500">Color</th>
                <th class="border rounded-md border-gray-500">Imagen</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pet in pets" :key="pet.id">
                <td class="border rounded-lg text-center border-gray-500">{{ pet.id }}</td>
                <td class="border rounded-lg text-center border-gray-500">{{ pet.pet_name }}</td>
                <td class="border rounded-lg text-center border-gray-500">{{ pet.birthday }}</td>
                <td class="border rounded-lg text-center border-gray-500">{{ pet.specie.name }}</td>
                <td class="border rounded-lg text-center border-gray-500">{{ pet.hair_color }}</td>
                <td class="border rounded-lg text-center border-gray-500 h-2 w-2">
                  <img class="rounded-xl" :src="pet.image_path" alt="Imagen de la mascota" />
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Table",
  data() {
    return {
      pets: null,
      loading: true,
      errored: false
    };
  },
  mounted() {
    this.getPets();
  },
  methods: {
    getPets() {
      axios
        .get("http://127.0.0.1:8000/api/pets")
        .then((response) => {
          /* console.log(response.data.data); */
          this.pets = response.data.data;
        })
        .catch((error) => {
          console.error("Error al obtener datos de la API:", error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    
  }
};
</script>

<style></style>
