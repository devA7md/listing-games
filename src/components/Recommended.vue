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
import { IModifiedGame } from "@/types/games.types";
import { MUTATE_RECOMMENDED } from "@/constants/store";
import {
  fetchAndTransformGames,
  handleAxiosError,
  injectSomeData,
  mostRecommendedFilter,
} from "@/services/games.services";
import CardsGrid from "@/components/CardsGrid.vue";
import { IRecommendedData } from "@/types/general.types";

export default Vue.extend({
  name: "Recommended",
  components: { CardsGrid },
  data(): IRecommendedData {
    return {
      games$: null,
      games: [],
      loading: false,
      error: null,
    };
  },
  async mounted(): Promise<void> {
    const recommended = this.$store.state.games.recommended;
    if (recommended.length > 0) {
      return (this.games = recommended);
    }

    this.loading = true;
    this.games$ = fetchAndTransformGames(
      injectSomeData,
      mostRecommendedFilter,
      6
    ).subscribe(
      (games: IModifiedGame[]) => {
        this.games = games;
        this.$store.commit(MUTATE_RECOMMENDED, games);
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
  destroyed(): void {
    if (this.games$) this.games$.unsubscribe();
  },
});
</script>
