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
      <div>
        <p>Random</p>
        <p>Random</p>
        <p>Random</p>
      </div>
    </Sidebar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Sidebar from "primevue/sidebar";

export default Vue.extend({
  components: { Sidebar },
  data() {
    return {
      visibleLeft: false,
    };
  },
});
</script>
