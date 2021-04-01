<template>
  <CardsGrid
    :error="error"
    :loading="loading"
    title="Most Recommended"
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
import {
  mostRecommendedFilter,
  fetchAndTransformGames,
  injectSomeData,
  handleAxiosError,
} from "@/services/games.services";
import CardsGrid from "@/components/CardsGrid.vue";

export default Vue.extend({
  name: "Recommended",
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
      mostRecommendedFilter,
      6
    ).subscribe(
      (games: IRecommendedGame[]) => {
        this.games = games;
        this.$store.dispatch(SET_RECOMMENDED, games);
        this.loading = false;
        this.error = null;
      },
      (error) => {
        this.error = handleAxiosError(
          error,
          "Couldn't fetch recommended games"
        );
        this.loading = false;
      }
    );
  },
  methods: {
    previewDetails(game: IRecommendedGame) {
      this.$store.dispatch(SET_SELECTED_GAME, game);
      this.$router.push({ name: "GameDetails", params: { id: game.id } });
    },
  },
  destroyed(): void {
    if (this.games$) this.games$.unsubscribe();
  },
});
</script>
