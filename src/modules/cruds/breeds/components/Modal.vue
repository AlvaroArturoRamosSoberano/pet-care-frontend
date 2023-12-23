<template>
  <el-button @click="openForm" :type="type" :icon="icon" plain></el-button>

  <el-dialog v-model="dialogFormVisible" :title="title">
    <el-input
      v-model="formData.name"
      placeholder="Ingrese el nombre de la Raza"
      clearable
    ></el-input>
    <div class="flex justify-end pt-2">
      <el-button @click="dialogFormVisible = false">Cancelar</el-button>
      <el-button :type="isEditMode ? 'warning' : 'primary'" @click="submitForm">
        {{ isEditMode ? "Actualizar" : "Confirmar" }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
import { showNotification } from "@/modules/cruds/shared/functions/Notifications.js";
import {
  sendBreedsData,
  updateBreedsData,
} from "@/modules/cruds/breeds/services/ApiBreeds.js";
export default {
  emits: ["done"],
  props: {
    title: String,
    type: String,
    icon: Object,
    id: Number,
    breed: Object,
    mode: String,
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
    async submitForm() {
      try {
        if (this.mode === "edit") {
          await updateBreedsData(this.id, this.formData);
          showNotification("Éxito", "Actualizado con éxito", "success");
        } else {
          await sendBreedsData(this.formData);
          showNotification("Éxito", "Agregado con éxito", "success");
        }
        this.$emit("done");
        this.dialogFormVisible = false;
        this.resetForm();
      } catch (error) {
        showNotification("Error", error.response.data.message, "error");
      }
    },
    openForm() {
      if (this.mode === "edit") {
        this.formData = this.breed;
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
