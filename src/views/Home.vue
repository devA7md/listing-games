<template>
  <div>
    <Categories />
    <div class="my=7">
      <PopularGames />
    </div>
    <div class="my=7">
      <Recommended />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Categories from "@/components/Categories.vue";
import Recommended from "@/components/Recommended.vue";
import PopularGames from "@/components/PopularGames.vue";

export default Vue.extend({
  name: "Home",
  components: { PopularGames, Recommended, Categories },
});
</script>
