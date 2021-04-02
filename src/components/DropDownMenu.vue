<template>
  <div class="hidden sm:block">
    <div
      data-testid="menu-btn"
      class="flex items-center justify-between text-gray-50 space-x-1 cursor-pointer"
      @click="toggle"
    >
      <p data-testid="menu-text">MENU</p>
      <i data-testid="menu-icon" class="pi pi-angle-down"></i>
    </div>
    <Menu data-testid="menu" ref="menu" :model="items" :popup="true" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Menu from "primevue/menu";

export default Vue.extend({
  name: "DropDownMenu",
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
    toggle(event: any) {
      (this.$refs.menu as any).toggle(event);
    },
  },
});
</script>
