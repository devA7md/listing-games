<template>
  <div>
    <Categories />
    <div class="my=7">
      <Recommended />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Categories from "@/components/Categories.vue";
import Recommended from "@/components/Recommended.vue";

export default Vue.extend({
  name: "Home",
  components: { Recommended, Categories },
});
</script>
