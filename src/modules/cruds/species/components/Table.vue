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
            <h1 class="font-bold text-lg text-center">Listado de species</h1>
            <modal
              title="Agregar especie"
              :type="buttons.primary"
              :icon="icons.Plus"
            ></modal>
          </div>
          <table
            class="w-full p-2 border-separate border-t-0 border-b-0 border border-gray-500"
          >
            <thead>
              <tr>
                <th class="border rounded-md border-gray-500">ID</th>
                <th class="border rounded-md border-gray-500">Nombre</th>
                <th class="border rounded-md border-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="specie in species" :key="specie.id">
                <td class="border rounded-lg text-center border-gray-500">
                  {{ specie.id }}
                </td>
                <td class="border rounded-lg text-center border-gray-500">
                  {{ specie.name }}
                </td>
                <td class="border rounded-lg text-center border-gray-500">
                  <!-- <router-link :to="'species/form/edit/' + specie.id">
                    <el-button type="warning" plain :icon="Edit"
                  /></router-link> -->
                  <modal
                    title="Editar especie"
                    :type="buttons.warning"
                    :icon="icons.Edit"
                  ></modal>
                  <el-button
                    type="danger"
                    @click="deletePets(specie.id)"
                    plain
                    :icon="icons.Delete"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <el-pagination
            class="flex justify-end rounded-tl-none rounded-tr-none rounded-bl-xl rounded-br-xl border-t-0 border border-gray-500 p-2"
            background
            @current-change="changePage"
            small
            :pager-count="filterParams.pages"
            :total="filterParams.total"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { markRaw, defineAsyncComponent, ref } from "vue";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import {
  getSpeciesData,
  deleteSpeciesData,
} from "@/modules/cruds/species/services/ApiSpecies.js";
import {
  showMessage,
  showConfirmation,
} from "@/modules/cruds/shared/functions/Notifications.js";
export default {
  components: {
    modal: defineAsyncComponent(() =>
      import("@/modules/cruds/species/components/Modal.vue")
    ),
  },
  data() {
    return {
      species: [],
      errored: false,
      loading: true,
      icons: markRaw({
        Edit,
        Delete,
        Plus,
      }),
      filterParams: {
        total: "",
        pages: "",
      },
      buttons: {
        warning: "warning",
        primary: "primary",
      },
    };
  },
  created() {
    this.getSpecies();
  },
  methods: {
    async getSpecies(params) {
      try {
        const response = await getSpeciesData(params);
        this.species = response.data.data;
        this.filterParams.total = response.data.total;
        this.filterParams.pages = response.data.last_page;
      } catch (error) {
        console.error("Error to get data from API:", error);
        this.errored = true;
      } finally {
        this.loading = false;
      }
    },
    async deletePets(id) {
      try {
        const confirmed = await showConfirmation(
          "La información será eliminada permanentemente. ¿Continuar?"
        );
        if (confirmed) {
          await deleteSpeciesData(id);
          showMessage("success", "Eliminado con éxito");
          this.getSpecies();
        } else {
          showMessage("info", "Operación cancelada");
        }
      } catch (error) {
        showMessage("error", "Error al eliminar especie. Por favor, inténtalo de nuevo.");
      }
    },
    changePage(value) {
      this.getSpecies({ page: value });
    },
  },
};
</script>
