<template>
  <div class="hidden sm:block">
    <div
      class="flex items-center justify-between text-gray-50 space-x-1 cursor-pointer"
      @click="toggle"
    >
      <p>MENU</p>
      <i class="pi pi-angle-down"></i>
    </div>
    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Menu from "primevue/menu";

export default Vue.extend({
  components: { Menu },
  data() {
    return {
      items: [
        {
          label: "Update",
          icon: "pi pi-refresh",
        },
        {
          label: "Delete",
          icon: "pi pi-times",
        },
      ],
    };
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  },
});
</script>
