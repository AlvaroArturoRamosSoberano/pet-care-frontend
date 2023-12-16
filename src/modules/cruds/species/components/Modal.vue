<template>
  <el-button @click="openForm" :type="type" :icon="icon" plain></el-button>
  <el-dialog v-model="dialogFormVisible">
    <h1 class="p-2 text-2xl font-bold flex justify-start">{{ title }}</h1>
    <el-form @submit.prevent="submitForm">
      <el-input
        v-model="formData.name"
        class="p-2"
        placeholder="Ingrese nombre de la especie"
      />
      <div class="flex justify-end p-2">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="success" @click="submitForm"> Confirmar </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
import {
  sendSpeciesData,
  getSpecieData,
  updateSpeciesData
} from "@/modules/cruds/species/services/ApiSpecies.js";
import { showNotification } from "@/modules/cruds/shared/functions/Notifications.js";
export default {
  props: ["title", "type", "text", "icon"],
  data() {
    return {
      formData: {
        name: "",
      },
      dialogFormVisible: ref(false),
      editMode: ref(false),
    };
  },
  mounted() {
  /*   this.getData(); */
  },
  methods: {
    async submitForm() {
      try {
        await sendSpeciesData(this.formData);
        showNotification("Éxito", "Excelente", "success");
        this.dialogFormVisible = false;
        this.resetForm();
      } catch (error) {
        showNotification("Error", error.response.data.message, "error");
      }
    },
    /* async getData(id) {
      try {
        await getSpecieData(id);
        this.formData = response.data.data;
      } catch (error) {
        console.error("Error al obtener datos para editar:", error);
      }
    }, */
    openForm() {
      this.dialogFormVisible = true;
    },
    resetForm() {
      this.formData.name = "";
    },
  },
};
</script>
