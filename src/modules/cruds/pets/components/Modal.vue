<template>
  <el-dialog v-model="dialogFormVisible" title="Pets Data">
    <el-form @submit.prevent="submitForm">
      <el-input
        class="p-2"
        v-model="formData.pet_name"
        placeholder="Ingrese nombre de la mascota"
      />
      <el-date-picker
        class="m-2"
        v-model="formData.birthday"
        type="date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        placeholder="Seleccione una fecha"
      />
      <el-select
        class="p-2"
        v-model="formData.specie_id"
        filterable
        placeholder="Seleccione la especie"
      >
        <el-option
          v-for="species in species"
          :key="species.id"
          :label="species.name"
          :value="species.id"
        />
      </el-select>
      <el-input
        class="p-2"
        v-model="formData.hair_color"
        placeholder="Ingrese el color"
      />
      <el-input
        class="p-2"
        v-model="formData.image_path"
        placeholder="Imagen"
      />
      <el-select
        class="p-2"
        v-model="formData.customer_id"
        filterable
        placeholder="Responsable de la mascota"
      >
        <el-option
          v-for="customer in customers"
          :key="customer.id"
          :label="customer.name"
          :value="customer.id"
        />
      </el-select>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watch } from "vue";

export default {
  data() {
    return {
      dialogFormVisible: false
    };
  },
  // ...
  methods: {
    // ... Otros métodos del formulario ...
  },
  created() {
    // Escuchar el evento emitido desde el otro componente
    this.$parent.$on("openForm", () => {
      this.dialogFormVisible = true;
    });
  },
  beforeUnmount() {
    // Asegúrate de eliminar el listener cuando el componente se destruye
    this.$parent.$off("openForm");
  }
};
</script>
