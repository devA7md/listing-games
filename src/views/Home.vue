<template>
  <div>
    <div class="sec-layout">
      <Categories />
    </div>
    <div class="sec-layout">
      <FeaturedGame />
    </div>
    <div class="sec-layout">
      <PopularGames />
    </div>
    <div class="sec-layout">
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
  // title: "Home",
});
</script>
