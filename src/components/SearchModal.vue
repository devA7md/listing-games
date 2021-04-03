<template>
  <div>
    <i class="pi pi-search icon-style" @click="display = true"></i>

    <Dialog
      :closeOnEscape="true"
      :modal="true"
      :dismissableMask="true"
      :visible.sync="display"
      :style="{ width: '65vw', height: '70vh' }"
    >
      <SearchGame v-on:searched="display = false" />
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Dialog from "primevue/dialog/Dialog";
import SearchGame from "@/components/SearchGame.vue";

export default Vue.extend({
  components: { SearchGame, Dialog },
  data() {
    return {
      display: false,
    };
  },
});
</script>
