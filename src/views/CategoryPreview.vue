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
import {
  fetchAndCategorizeGames,
  handleAxiosError,
} from "@/services/games.services";
import CardsGrid from "@/components/CardsGrid.vue";
import { ICategoryPreviewData } from "@/types/general.types";

export default Vue.extend({
  components: { CardsGrid },
  data(): ICategoryPreviewData {
    return {
      games: [],
      loading: false,
      error: null,
    };
  },
  async mounted() {
    const categories = this.$store.state.games.categories[this.$route.params.id];
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
