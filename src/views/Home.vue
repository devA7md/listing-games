<template>
  <div>
    <div class="my-4 sm:my-5 p-4 sm:p-10">
      <Categories />
    </div>
    <div class="my-4 sm:my-5 p-4 sm:p-10">
      <FeaturedGame />
    </div>
    <div class="my-4 sm:my-5 p-4 sm:p-10">
      <PopularGames />
    </div>
    <div class="my-4 sm:my-5 p-4 sm:p-10">
      <Recommended />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Categories from "@/components/Categories.vue";
import Recommended from "@/components/Recommended.vue";
import PopularGames from "@/components/PopularGames.vue";
import FeaturedGame from "@/components/FeaturedGame.vue";

export default Vue.extend({
  name: "Home",
  components: { FeaturedGame, PopularGames, Recommended, Categories },
});
</script>
