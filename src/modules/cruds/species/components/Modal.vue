<template>
  <el-button @click="openForm" :type="type" :icon="icon" plain></el-button>
  <el-dialog v-model="dialogFormVisible">
    <h1 class="p-2 text-2xl font-bold flex justify-start">{{ title }}</h1>
    <el-form @submit.prevent="submitForm">
      <el-input
        v-model="formData.name"
        class="p-2"
        placeholder="Ingrese nombre de la especie"
      ></el-input>
      <div class="flex justify-end p-2">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button :type="isEditMode ? 'success' : 'primary'" @click="submitForm">
          {{ isEditMode ? "Actualizar" : "Confirmar" }}
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
import {
  sendSpeciesData,
  updateSpeciesData,
} from "@/modules/cruds/species/services/ApiSpecies.js";
import { showNotification } from "@/modules/cruds/shared/functions/Notifications.js";
export default {
  emits: ["species-updated", "species-added"],
  props: {
    title: String,
    type: String,
    text: String,
    icon: Object,
    id: Number,
    mode: String,
    specie: Object,
  },
  data() {
    return {
      formData: {
        name: "",
      },
      dialogFormVisible: ref(false),
    };
  },
  computed: {
    isEditMode() {
      return this.mode === "edit";
    },
  },
  methods: {
    getData(id) {
      if (id !== null) {
        this.formData = this.specie;
      } else {
        console.log("id es null");
      }
    },
    async submitForm() {
      try {
        if (this.mode === "edit") {
          await updateSpeciesData(this.id, this.formData);
          showNotification("Éxito", "Actualizado con éxito", "success");
          this.$emit("species-updated");
        } else {
          await sendSpeciesData(this.formData);
          showNotification("Éxito", "Agregado con éxito", "success");
          this.$emit("species-added");
        }
        this.dialogFormVisible = false;
        this.resetForm();
      } catch (error) {
        showNotification("Error", error.response.data.message, "error");
      }
    },
    openForm() {
      if (this.id !== null) {
        this.getData(this.id);
      }
      this.dialogFormVisible = true;
    },
    resetForm() {
      this.formData.name = "";
    },
  },
};
</script>
