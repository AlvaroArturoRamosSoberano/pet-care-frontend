<template>
  <div class="h-screen bg-gray-100 flex justify-center items-center pt-14">
    <section v-if="errored" class="flex justify-center items-center">
      <div class="text-center">
        <h2>
          Lo sentimos, no es posible obtener la información en este momento, por favor
          intente nuevamente mas tarde.
        </h2>
      </div>
    </section>
    <div class="w-screen p-4">
      <div v-if="loading" v-loading="loading"></div>
      <div v-else class="bg-white p-4 rounded-xl shadow-xl">
        <div
          class="bg-water-300 border border-gray-500 flex justify-between items-center p-2"
        >
          <h1 class="font-bold text-lg ps-2">Listado de Razas</h1>
          <modal
            title="Agregar Raza"
            type="primary"
            :icon="icons.Plus"
            @done="getBreeds"
          ></modal>
        </div>
        <table
          class="w-full border border-gray-500 border-separate border-t-0 border-b-0 p-2"
        >
          <thead>
            <tr>
              <th class="border border-gray-500 rounded-md">ID</th>
              <th class="border border-gray-500 rounded-md">Raza</th>
              <th class="border border-gray-500 rounded-md">Acciones</th>
            </tr>
          </thead>
          <tbody v-for="breed in breeds" :key="breed.id">
            <tr class="text-center">
              <td class="border border-gray-500 rounded-lg">{{ breed.id }}</td>
              <td class="border border-gray-500 rounded-lg">{{ breed.name }}</td>
              <td class="border border-gray-500 rounded-lg">
                <modal
                  title="Editar Raza"
                  :icon="icons.Edit"
                  type="warning"
                  :id="breed.id"
                  :breed="breed"
                  :mode="isEditMode ? 'edit' : 'create'"
                  @done="getBreeds"
                ></modal>
                <el-button
                  type="danger"
                  :icon="icons.Delete"
                  @click="deleteBreed(breed.id)"
                  plain
                />
              </td>
            </tr>
          </tbody>
        </table>
        <el-pagination
          class="flex justify-end rounded-tl-none rounded-tr-none rounded-bl-xl rounded-br-xl border-t-0 border border-gray-500 p-4"
          background
          @current-change="changePage"
          small
          :total="filterParams.total"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBreedsData,
  deleteBreedsData,
} from "@/modules/cruds/breeds/services/ApiBreeds.js";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import {
  showConfirmation,
  showMessage,
} from "@/modules/cruds/shared/functions/Notifications.js";
import { markRaw, defineAsyncComponent } from "vue";

export default {
  components: {
    modal: defineAsyncComponent(() =>
      import("@/modules/cruds/breeds/components/Modal.vue")
    ),
  },
  data() {
    return {
      breeds: [],
      errored: false,
      loading: true,
      icons: markRaw({
        Edit,
        Plus,
        Delete,
      }),
      filterParams: {
        total: "",
        pages: "",
      },
      isEditMode: true,
    };
  },
  created() {
    this.getBreeds();
  },
  methods: {
    async getBreeds(params) {
      try {
        const response = await getBreedsData(params);
        this.breeds = response.data.data;
        this.filterParams.total = response.data.total;
        this.filterParams.pages = response.data.last_page;
      } catch (error) {
        this.errored = true;
        console.log("Errot to get data from Api", error);
      } finally {
        this.loading = false;
      }
    },
    async deleteBreed(id) {
      try {
        const confirmed = await showConfirmation(
          " La información será eliminada permanentemente. ¿Continuar?"
        );
        if (confirmed) {
          await deleteBreedsData(id);
          showMessage("success", "Eliminado con éxito");
          this.getBreeds();
        } else {
          showMessage("info", "Operación cancelada");
        }
      } catch (error) {
        showMessage(
          "error",
          "Error al eliminar registro. Por favor, inténtalo de nuevo."
        );
      }
    },
    changePage(value) {
      this.getBreeds({ page: value });
    },
  },
};
</script>
