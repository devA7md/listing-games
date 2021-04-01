<template>
  <CardsGrid
    :error="error"
    :loading="loading"
    title="Most Popular"
    :games="games"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { IRecommendedGame } from "@/types/games.types";
import {
  GET_RECOMMENDED,
  SET_RECOMMENDED,
  SET_SELECTED_GAME,
} from "@/constants/store";
import { mapGetters } from "vuex";
import CardsGrid from "@/components/CardsGrid.vue";
import {
  fetchAndTransformGames,
  handleAxiosError,
  injectSomeData,
  mostPopularFilter,
} from "@/services/games.services";

export default Vue.extend({
  name: "PopularGames",
  components: { CardsGrid },
  data() {
    return {
      games$: null,
      games: [],
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters({ recommended: GET_RECOMMENDED }),
  },
  async mounted(): void {
    if (this.recommended.length > 0) {
      return (this.games = this.recommended);
    }

    this.loading = true;
    this.games$ = fetchAndTransformGames(
      injectSomeData,
      mostPopularFilter,
      4
    ).subscribe(
      (games: IRecommendedGame[]) => {
        this.games = games;
        this.$store.dispatch(SET_RECOMMENDED, games);
        this.loading = false;
        this.error = null;
      },
      (error) => {
        this.error = handleAxiosError(error, "Couldn't fetch popular games");
        this.loading = false;
      }
    );
  },
  destroyed(): void {
    if (this.games$) this.games$.unsubscribe();
  },
});
</script>
