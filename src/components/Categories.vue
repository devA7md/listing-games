<template>
  <div>
    <h2 class="text-3xl sm:text-4xl text-gray-600 my-6 uppercase">
      Categories
    </h2>
    <Carousel
      :value="Object.keys(games)"
      :numVisible="4"
      :numScroll="3"
      :responsiveOptions="responsiveOptions"
      :circular="true"
      :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <router-link :to="{ name: 'Category', params: { id: slotProps.data } }">
          <div
            class="bg-gray-200 text-gray-400 text-right p-6 m-0.5 sm:m-1 cursor-pointer h-56"
          >
            <p class="text-9xl">{{ slotProps.data }}</p>
            <p class="text-xl">Category</p>
          </div>
        </router-link>
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Carousel from "primevue/carousel";
import { SET_CATEGORIES } from "@/constants/store";
import { fetchAndCategorizeGames } from "@/services/games.services";

export default Vue.extend({
  name: "Categories",
  components: { Carousel },
  data() {
    return {
      games: {},
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 2,
        },
        {
          breakpoint: "640px",
          numVisible: 2,
          numScroll: 1,
        },
      ],
    };
  },
  async mounted() {
    const categorizedGames = await fetchAndCategorizeGames();
    this.games = categorizedGames;
    await this.$store.dispatch(SET_CATEGORIES, categorizedGames);
  },
});
</script>
