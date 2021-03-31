<template>
  <div class="p-4">
    <CardsGrid
      :error="error"
      :loading="loading"
      title="Popular Games"
      :games="games"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IRecommendedGame } from "@/types";
import {
  GET_RECOMMENDED,
  SET_RECOMMENDED,
  SET_SELECTED_GAME,
} from "@/constants/store";
import { mapGetters } from "vuex";
import CardsGrid from "@/components/CardsGrid.vue";
import {
  fetchAndTransformGames,
  injectSomeData,
  mostPopularFilter,
} from "@/services/categories.services";

export default Vue.extend({
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
        if (error.isAxiosError && error.response) {
          const {
            response: { data },
          } = error;
          this.error =
            Object.keys(data).length > 0
              ? data
              : "Couldn't fetch recommended games.";
        } else {
          this.error = error.message;
        }
        this.loading = false;
      }
    );
  },
  methods: {
    previewDetails(game: IRecommendedGame) {
      this.$store.dispatch(SET_SELECTED_GAME, game);
      this.$router.push({ name: "Game-details", params: { id: game.id } });
    },
  },
  destroyed(): void {
    if (this.games$) this.games$.unsubscribe();
  },
});
</script>
