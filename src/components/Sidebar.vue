<template>
  <div class="sm:hidden">
    <i
      class="pi pi-bars text-gray-50 text-xl cursor-pointer"
      @click="visibleLeft = true"
    ></i>

    <Sidebar
      :visible.sync="visibleLeft"
      position="right"
      :style="{ width: '15rem' }"
    >
      <div class="pt-14">
        <p class="px-2 py-1 cursor-pointer hover:bg-gray-50">Link #1</p>
        <p class="px-2 py-1 cursor-pointer hover:bg-gray-50">Link #2</p>
        <p class="px-2 py-1 cursor-pointer hover:bg-gray-50">Link #3</p>
      </div>
    </Sidebar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Sidebar from "primevue/sidebar";

export default Vue.extend({
  name: "Slider",
  components: { Sidebar },
  data() {
    return {
      visibleLeft: false,
    };
  },
});
</script>
