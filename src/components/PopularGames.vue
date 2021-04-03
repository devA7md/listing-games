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
import { IModifiedGame } from "@/types/games.types";
import { MUTATE_POPULAR } from "@/constants/store";
import CardsGrid from "@/components/CardsGrid.vue";
import {
  fetchAndTransformGames,
  handleAxiosError,
  injectSomeData,
  mostPopularFilter,
} from "@/services/games.services";
import { IPopularData } from "@/types/general.types";

export default Vue.extend({
  name: "PopularGames",
  components: { CardsGrid },
  data(): IPopularData {
    return {
      games$: null,
      games: [],
      loading: false,
      error: null,
    };
  },
  async mounted(): Promise<void> {
    const popular = this.$store.state.games.popular;
    if (popular.length > 0) {
      return (this.games = popular);
    }

    this.loading = true;
    this.games$ = fetchAndTransformGames(
      injectSomeData,
      mostPopularFilter,
      4
    ).subscribe(
      (games: IModifiedGame[]) => {
        this.games = games;
        this.$store.commit(MUTATE_POPULAR, games);
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
