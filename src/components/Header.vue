<template>
  <header class="p-4 bg-gray-800 rounded-b-md">
    <div class="flex items-center justify-between">
      <router-link to="/">
        <h2 class="text-gray-100 cursor-pointer text-lg">GAMES</h2>
      </router-link>

      <DropDownMenu />

      <div class="sm:hidden flex items-center">
        <Sidebar />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import DropDownMenu from "@/components/DropDownMenu.vue";
import Sidebar from "@/components/Sidebar.vue";

export default Vue.extend({
  name: "Header",
  components: { Sidebar, DropDownMenu },
});
</script>
