<template>
  <div>
    <h2 class="text-3xl sm:text-4xl text-gray-600 my-6 uppercase">
      Categories
    </h2>
    <Carousel
      v-if="!error && !loading"
      :value="Object.keys(categories)"
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

    <div v-else-if="loading && !error" class="flex justify-center">
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>

    <Message severity="error" :closable="false" v-else-if="error && !loading"
      >{{ error }}
    </Message>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Carousel from "primevue/carousel";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";
import { GET_CATEGORIES, SET_CATEGORIES } from "@/constants/store";
import {
  fetchAndCategorizeGames,
  handleAxiosError,
} from "@/services/games.services";
import { mapGetters } from "vuex";
import { ICategoriesData } from "@/types/general.types";

export default Vue.extend({
  name: "Categories",
  components: { Carousel, Message, ProgressSpinner },
  data(): ICategoriesData {
    return {
      categories: {},
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
      error: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      cat: GET_CATEGORIES,
    }),
  },
  async created(): Promise<void> {
    if (Object.keys(this.cat).length > 0) {
      return (this.categories = this.cat);
    }
    try {
      this.loading = true;
      const categorizedGames = await fetchAndCategorizeGames();
      this.categories = categorizedGames;
      await this.$store.dispatch(SET_CATEGORIES, categorizedGames);
      this.error = null;
    } catch (error) {
      this.error = handleAxiosError(error, "Couldn't fetch categories");
    } finally {
      this.loading = false;
    }
  },
});
</script>
