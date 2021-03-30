<template>
  <div>
    <i
      class="pi pi-search text-gray-50 text-xl cursor-pointer"
      @click="showModal"
    ></i>
    <Dialog
      header="Find a Game..."
      :modal="true"
      :visible.sync="display"
      :closeOnEscape="true"
      :dismissableMask="true"
    >
      <input
        type="text"
        class="rounded bg-gray-50 px-4 py-0.5 border-gray-400 border-2"
        ref="search"
    /></Dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Dialog from "primevue/dialog";

export default Vue.extend({
  components: { Dialog },
  data() {
    return {
      display: false,
    };
  },
  methods: {
    showModal() {
      this.display = true;
      setTimeout(this.focus);
    },
    focus() {
      if (this.display) this.$refs.search.focus();
    },
  },
});
</script>
