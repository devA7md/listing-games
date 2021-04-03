<template>
  <header class="p-4 bg-gray-800 rounded-b-md">
    <div class="flex items-center justify-between">
      <router-link to="/">
        <h2 class="text-gray-100 cursor-pointer text-lg">GAMES</h2>
      </router-link>

      <div class="hidden sm:block w-64 sm:w-96">
        <SearchGame />
      </div>
      <DropDownMenu />

      <div class="sm:hidden flex items-center space-x-4">
        <SearchModal />
        <Sidebar />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import DropDownMenu from "@/components/DropDownMenu.vue";
import Sidebar from "@/components/Sidebar.vue";
import SearchGame from "@/components/SearchGame.vue";
import SearchModal from "@/components/SearchModal.vue";

export default Vue.extend({
  name: "Header",
  components: { SearchModal, SearchGame, Sidebar, DropDownMenu },
});
</script>
