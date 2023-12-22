<template>
  <el-button @click="openForm" :type="type" :icon="icon" plain></el-button>
  <el-dialog v-model="dialogFormVisible" :title="title" class="text-left">
    <el-input
      class="pb-2"
      v-model="formData.name"
      placeholder="Ingrese el nombre de la enfermedad"
      clearable
    ></el-input>
    <el-input
      class="pb-2"
      v-model="formData.description"
      :rows="3"
      type="textarea"
      placeholder="Escriba una breve descripcion"
    ></el-input>
    <el-input
      v-model="formData.symptom"
      :rows="3"
      type="textarea"
      placeholder="Escriba los sintomas"
    ></el-input>
    <div class="flex justify-end pt-2">
      <el-button @click="dialogFormVisible = false">Cancelar</el-button>
      <el-button :type="isEditMode ? 'warning' : 'primary'" @click="submitForm">
        {{ isEditMode ? "Actualizar" : "Agregar" }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
import { showNotification } from "@/modules/cruds/shared/functions/Notifications.js";
import {
  sendDiseasesData,
  updateDiseasesData,
} from "@/modules/cruds/diseases/services/ApiDiseases.js";
export default {
  emits: ["done"],
  props: {
    title: String,
    type: String,
    icon: Object,
    id: Number,
    disease: Object,
    mode: String,
  },
  data() {
    return {
      formData: {
        name: "",
        description: "",
        symptom: "",
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
    async submitForm() {
      try {
        if (this.mode === "edit") {
          await updateDiseasesData(this.id, this.formData);
          showNotification("Éxito", "Actualizado con éxito", "success");
          this.$emit("done");
        } else {
          await sendDiseasesData(this.formData);
          showNotification("Éxito", "Agregado con éxito", "success");
          this.$emit("done");
        }
        this.dialogFormVisible = false;
        this.resetForm();
      } catch (error) {
        showNotification("Error", error.response.data.message, "error");
      }
    },
    openForm() {
      if (this.id !== null) {
        this.formData = this.disease;
        this.dialogFormVisible = true;
      } else {
        this.dialogFormVisible = true;
      }
    },
    resetForm() {
      this.formData.name = "";
    },
  },
};
</script>
