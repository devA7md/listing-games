<template>
  <header class="p-4 bg-gray-800 rounded-b-md">
    <div class="flex items-center justify-between">
      <router-link to="/">
        <h2 class="text-gray-100 cursor-pointer text-lg">GAMES</h2>
      </router-link>
      <input
        type="text"
        placeholder="Find a Game..."
        class="rounded bg-gray-50 px-4 py-0.5 hidden sm:block"
      />

      <DropDownMenu />

      <div class="sm:hidden flex items-center space-x-4">
        <SearchDialog />
        <Sidebar />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import DropDownMenu from "@/components/Drop-down-menu.vue";
import Sidebar from "@/components/Sidebar.vue";
import SearchDialog from "@/components/Search-dialog.vue";

export default Vue.extend({
  name: "Header",
  components: { SearchDialog, Sidebar, DropDownMenu },
});
</script>
