<template>
  <div class="m-4">
    <Carousel :value="Object.keys(games)" :numVisible="3" :numScroll="3">
      <template #item="slotProps">
        <router-link :to="{ name: 'Category', params: { id: slotProps.data } }">
          <div
            class="bg-gray-200 p-6 m-0.5 sm:m-1 flex items-center justify-center cursor-pointer"
          >
            <p class="text-xl">Category {{ slotProps.data }}</p>
          </div>
        </router-link>
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Carousel from "primevue/carousel";
import { CATEGORIES_ACTION_SET } from "@/constants/store";
import { fetchAndCategorizeGames } from "@/services/categories.services";

export default Vue.extend({
  components: { Carousel },
  data() {
    return {
      games: {},
    };
  },
  async mounted() {
    const categorizedGames = await fetchAndCategorizeGames();
    this.games = categorizedGames;
    await this.$store.dispatch(CATEGORIES_ACTION_SET, categorizedGames);
  },
});
</script>
