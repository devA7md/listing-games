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
import { GET_CATEGORIES, SET_SELECTED_GAME } from "@/constants/store";
import { fetchAndCategorizeGames } from "@/services/games.services";
import { mapGetters } from "vuex";
import { IGame } from "@/types/games.types";
import CardsGrid from "@/components/CardsGrid.vue";

export default Vue.extend({
  components: { CardsGrid },
  data() {
    return {
      games: [] as IGame[],
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
      this.loading = true;
      this.games = (await fetchAndCategorizeGames())[this.$route.params.id];
      this.loading = false;
    }
  },
  methods: {
    previewDetails(game: IGame): void {
      this.$store.dispatch(SET_SELECTED_GAME, game);
      this.$router.push({ name: "GameDetails", params: { id: game.id } });
    },
  },
});
</script>
