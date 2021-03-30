<template>
  <div>
    <Categories />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Categories from "@/components/Categories.vue";

export default Vue.extend({
  name: "Home",
  components: { Categories },
});
</script>
