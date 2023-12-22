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
    <section v-else>
      <div class="w-screen p-4">
        <div v-if="loading" v-loading="loading"></div>
        <div v-else class="bg-white rounded-xl p-4 shadow-xl">
          <div
            class="bg-water-300 border border-gray-500 flex justify-between items-center p-2"
          >
            <h1 class="text-left font-bold text-lg">Listado de Enfermedades</h1>
            <modal
              title="Agregar Enfermedad"
              type="primary"
              :icon="icons.Plus"
              :id="null"
              @done="getDiseases"
            ></modal>
          </div>
          <table
            class="w-full border border-b-0 border-gray-500 border-separate border-t-0 p-2"
          >
            <thead>
              <tr>
                <th class="border border-gray-500 rounded-md">ID</th>
                <th class="border border-gray-500 rounded-md">Enfermedad</th>
                <th class="border border-gray-500 rounded-md">Acciones</th>
              </tr>
            </thead>
            <tbody v-for="disease in diseases" :key="disease.id">
              <tr class="text-center">
                <td class="border border-gray-500 rounded-lg">{{ disease.id }}</td>
                <td class="border border-gray-500 rounded-lg">{{ disease.name }}</td>
                <td class="border border-gray-500 rounded-lg">
                  <modal
                    title="Editar Enfermedad"
                    type="warning"
                    :icon="icons.Edit"
                    :id="disease.id"
                    :disease="disease"
                    :mode="isEditMode ? 'edit' : 'create'"
                    @done="getDiseases"
                  ></modal>
                  <el-button
                    type="danger"
                    :icon="icons.Delete"
                    @click="deleteData(disease.id)"
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
    </section>
  </div>
</template>

<script>
import {
  getDiseasesData,
  deleteDiseasesData,
} from "@/modules/cruds/diseases/services/ApiDiseases.js";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import {
  showMessage,
  showConfirmation,
} from "@/modules/cruds/shared/functions/Notifications.js";
import { markRaw, defineAsyncComponent } from "vue";

export default {
  components: {
    modal: defineAsyncComponent(() =>
      import("@/modules/cruds/diseases/components/Modal.vue")
    ),
  },
  data() {
    return {
      id: "",
      diseases: [],
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
      isEditMode: true,
    };
  },
  created() {
    this.getDiseases();
  },
  methods: {
    async getDiseases(params) {
      try {
        const response = await getDiseasesData(params);
        this.diseases = response.data.data;
        this.filterParams.total = response.data.total;
        this.filterParams.pages = response.data.last_page;
      } catch (error) {
        this.errored = true;
        console.log("Errot to get data from Api", error);
      } finally {
        this.loading = false;
      }
    },
    async deleteData(id) {
      try {
        const confirmed = await showConfirmation(
          " La información será eliminada permanentemente. ¿Continuar?"
        );
        if (confirmed) {
          await deleteDiseasesData(id);
          showMessage("success", "Eliminado con éxito");
          this.getDiseases();
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
      this.getDiseases({ page: value });
    },
  },
};
</script>
