<template>
  <div class="p-4 sm:p-10">
    <CardsGrid
      :error="error"
      :loading="loading"
      :title="`Games for category ${$route.params.id}`"
      :games="games"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { GET_CATEGORIES } from "@/constants/store";
import {
  fetchAndCategorizeGames,
  handleAxiosError,
} from "@/services/games.services";
import { mapGetters } from "vuex";
import CardsGrid from "@/components/CardsGrid.vue";
import { ICategoryPreviewData } from "@/types/general.types";

export default Vue.extend({
  components: { CardsGrid },
  // title(): string {
  //   return "Category preview";
  // },
  data(): ICategoryPreviewData {
    return {
      games: [],
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters({ categories: GET_CATEGORIES }),
  },
  async mounted() {
    const categories = this.categories[this.$route.params.id];
    if (categories) {
      this.games = categories;
    } else {
      try {
        this.loading = true;
        this.games = (await fetchAndCategorizeGames())[this.$route.params.id];
        this.error = null;
      } catch (error) {
        this.error = handleAxiosError(error, "Couldn't fetch categories");
      } finally {
        this.loading = false;
      }
    }
  },
});
</script>
