<template>
  <div class="h-screen bg-gray-100 flex justify-center pt-14 items-center">
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
            class="bg-water-300 border border-gray-500 p-2 flex justify-between items-center"
          >
            <h1 class="font-bold text-lg">Listado de Vacunas</h1>
            <modal
              title="Agregar Vacuna"
              type="primary"
              :icon="icons.Plus"
              @done="getVaccines"
              :id="null"
            ></modal>
          </div>
          <table
            class="w-full p-2 border-separate border-t-0 border-b-0 border border-gray-500"
          >
            <thead>
              <tr>
                <th class="border-gray-500 border rounded-md">ID</th>
                <th class="border-gray-500 border rounded-md">Vacuna</th>
                <th class="border-gray-500 border rounded-md">Acciones</th>
              </tr>
            </thead>
            <tbody v-for="vaccine in vaccines" :key="vaccine.id">
              <tr>
                <td class="border-gray-500 border rounded-lg text-center">
                  {{ vaccine.id }}
                </td>
                <td class="border-gray-500 border rounded-lg text-center">
                  {{ vaccine.name }}
                </td>
                <td class="border-gray-500 border rounded-lg text-center">
                  <modal
                    title="Editar Vacuna"
                    type="warning"
                    :icon="icons.Edit"
                    :id="vaccine.id"
                    :vaccine="vaccine"
                    :mode="isEditMode ? 'edit' : 'normal'"
                    @done="getVaccines"
                  ></modal>
                  <el-button
                    type="danger"
                    :icon="icons.Delete"
                    @click="deleteVaccines(vaccine.id)"
                    plain
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
            :total="filterParams.total"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getVaccinesData,
  deleteVaccinesData,
} from "@/modules/cruds/vaccines/services/ApiVaccines.js";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import {
  showConfirmation,
  showMessage,
} from "@/modules/cruds/shared/functions/Notifications.js";
import { markRaw, defineAsyncComponent } from "vue";

export default {
  components: {
    modal: defineAsyncComponent(() =>
      import("@/modules/cruds/vaccines/components/Modal.vue")
    ),
  },
  data() {
    return {
      id: "",
      vaccines: [],
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
    this.getVaccines();
  },
  methods: {
    async getVaccines(params) {
      try {
        const response = await getVaccinesData(params);
        this.vaccines = response.data.data;
        this.filterParams.total = response.data.total;
        this.filterParams.pages = response.data.last_page;
      } catch (error) {
        console.log("Error to get data from API: ", error);
        this.errored = true;
      } finally {
        this.loading = false;
      }
    },
    async deleteVaccines(id) {
      try {
        const confirmed = await showConfirmation(
          "La información será eliminada permanentemente. ¿Continuar?"
        );
        if (confirmed) {
          await deleteVaccinesData(id);
          showMessage("success", "Eliminado con éxito");
          this.getVaccines();
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
      this.getVaccines({ page: value });
    },
  },
};
</script>
