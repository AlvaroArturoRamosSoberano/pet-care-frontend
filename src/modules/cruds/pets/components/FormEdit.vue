import { getSpeciesData } from '@/modules/cruds/species/services/ApiSpecies.js';
<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <div class="bg-white rounded-xl shadow-xl">
      <div class="p-4 md:p-4 lg:p-4 xl:p-4">
        <h1 class="p-4 font-bold text-2xl">Editar mascota</h1>
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
          <div class="p-2 flex justify-end">
            <el-button @click="submitForm" type="success" plain
              >Actualizar</el-button
            >
            <router-link to="/admin/pets"
              ><el-button type="primary" plain>Volver</el-button></router-link
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPetData,
  updatePetsData
} from "@/modules/cruds/pets/services/ApiPets.js";
import { getSpeciesData } from "@/modules/cruds/species/services/ApiSpecies.js";
import { getCustomersData } from "@/modules/cruds/customers/services/ApiCustomers.js";
export default {
  data() {
    return {
      id: null,
      species: [],
      customers: [],
      formData: {
        pet_name: "",
        birthday: "",
        specie_id: "",
        hair_color: "",
        image_path: "",
        customer_id: ""
      }
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getData(this.id);
    this.getSpecies();
    this.getCustomers();
  },
  methods: {
    async getData(id) {
      try {
        const response = await getPetData(id);
        this.formData = response.data.data;
      } catch (error) {
        console.error("Error al obtener datos para editar:", error);
      }
    },
    async getSpecies() {
      try {
        const response = await getSpeciesData();
        this.species = response.data.data;
      } catch (error) {}
    },
    async getCustomers() {
      try {
        const response = await getCustomersData();
        this.customers = response.data.data;
      } catch (error) {}
    },
    async submitForm() {
      try {
        await updatePetsData(this.id, this.formData);
        this.showNotification("Éxito", "Excelente", "success");
        this.$router.go(-1);
      } catch (error) {
        this.showNotification("Error", error.response.data.message, "error");
      }
    },
    showNotification(title, message, type) {
      ElNotification({
        title: title,
        message: message,
        type: type
      });
    }
  }
};
</script>
