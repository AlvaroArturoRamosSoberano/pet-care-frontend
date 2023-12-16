<template>
  <div class="h-screen bg-gray-100 flex justify-center items-center">
    <section v-if="errored" class="flex justify-center items-center">
      <div class="text-center">
        <h2>
          Lo sentimos, no es posible obtener la información en este momento, por favor
          intente nuevamente mas tarde.
        </h2>
      </div>
    </section>

    <section v-else>
      <div class="w-screen p-4" v-loading="loading">
        <div v-if="loading" class="text-center">Cargando...</div>
        <div v-else class="bg-white rounded-xl p-4 shadow-xl">
          <div
            class="bg-water-300 flex justify-between items-center p-2 border border-gray-500"
          >
            <h1 class="font-bold text-lg text-center">Listado de mascotas</h1>
            <RouterLink :to="{name:'view-pets-create'}"
              ><el-button type="primary" plain>Agregar</el-button></RouterLink
            >
          </div>
          <table
            class="w-full p-2 border-separate border-t-0 border-b-0 border border-gray-500"
          >
            <thead>
              <tr>
                <th class="border rounded-md border-gray-500">ID</th>
                <th class="border rounded-md border-gray-500">Nombre</th>
                <th class="border rounded-md border-gray-500">Cumpleaños</th>
                <th class="border rounded-md border-gray-500">Especie</th>
                <th class="border rounded-md border-gray-500">Color</th>
                <th class="border rounded-md border-gray-500">Imagen</th>
                <th class="border rounded-md border-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pet in pets" :key="pet.id">
                <td class="border rounded-lg text-center border-gray-500">
                  {{ pet.id }}
                </td>
                <td class="border rounded-lg text-center border-gray-500">
                  {{ pet.pet_name }}
                </td>
                <td class="border rounded-lg text-center border-gray-500">
                  {{ pet.birthday }}
                </td>
                <td class="border rounded-lg text-center border-gray-500">
                  {{ pet.specie ? pet.specie.name:"Sexo" }}
                </td>
                <td class="border rounded-lg text-center border-gray-500">
                  {{ pet.hair_color }}
                </td>
                <td class="border rounded-lg text-center border-gray-500 h-4 w-4">
                  <img
                    class="rounded-lg"
                    :src="pet.image_path"
                    alt="Imagen de la mascota"
                  />
                </td>
                <td class="border rounded-lg text-center border-gray-500">
                  <router-link :to="'pets/form/edit/' + pet.id">
                    <el-button type="warning" plain :icon="Edit"
                  /></router-link>
                  <el-button
                    type="danger"
                    @click="deletePets(pet.id)"
                    plain
                    :icon="Delete"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <el-pagination
            class="flex justify-end rounded-tl-none rounded-tr-none rounded-bl-xl rounded-br-xl border-t-0 border border-gray-500 p-2"
            background
            layout="prev, pager, next"
            :total="1000"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { markRaw } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { deletePetsData, getPetsData } from "@/modules/cruds/pets/services/ApiPets.js";
export default {
  data() {
    return {
      id: "",
      pets: [],
      errored: false,
      loading: true,
      Edit: markRaw(Edit),
      Delete: markRaw(Delete),
    };
  },
  created() {
    this.getPets();
  },
  methods: {
    async getPets() {
      try {
        const response = await getPetsData();
        this.pets = response.data.data;
      } catch (error) {
        console.error("Error to get data from API:", error);
        this.errored = true;
      } finally {
        this.loading = false;
      }
    },
    deletePets(id) {
      deletePetsData(id);
      ElMessageBox.confirm(
        "La información será eliminada permanentemente. ¿Continuar?",
        "Advertencia",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
        .then((response) => {
          ElMessage({
            type: "success",
            message: "Eliminado con éxito",
          });
          this.getPets();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Operación cancelada",
          });
        });
    },
  },
};
</script>
