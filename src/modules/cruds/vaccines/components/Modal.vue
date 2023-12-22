<template>
  <el-button @click="openForm" :type="type" :icon="icon" plain></el-button>
  <el-dialog class="text-left" v-model="dialogFormVisible" :title="title">
    <el-form>
      <el-input
        v-model="formData.name"
        placeholder="Ingrese el nombre de la vacuna"
        clearable
      />
    </el-form>
    <div class="flex justify-end pt-2">
      <el-button @click="dialogFormVisible = false">Cancelar</el-button>
      <el-button :type="isEditMode ? 'success' : 'primary'" @click="submitForm">
        {{ isEditMode ? "Actualizar" : "Agregar" }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
import {
  sendVaccinesData,
  updateVaccinesData,
} from "@/modules/cruds/vaccines/services/ApiVaccines.js";
import { showNotification } from "@/modules/cruds/shared/functions/Notifications.js";
export default {
  props: {
    title: String,
    type: String,
    icon: Object,
    id: Number,
    vaccine: Object,
    mode: String,
  },
  emits: ["done"],
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
          await updateVaccinesData(this.id, this.formData);
          showNotification("Éxito", "Actualizado con éxito", "success");
          this.$emit("done");
        } else {
          await sendVaccinesData(this.formData);
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
        this.formData = this.vaccine;
        this.dialogFormVisible = true;
      }
      this.dialogFormVisible = true;
    },
    resetForm() {
      this.formData.name = "";
    },
  },
};
</script>
