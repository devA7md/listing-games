<template>
  <div class="relative">
    <InputText
      v-model="value"
      type="text"
      placeholder="Search a game..."
      :style="{ width: '100%' }"
      @keyup="search"
    />
    <div
      v-if="filtered.length > 0"
      class="absolute top-15 bg-white shadow-lg border-2 border-gray-200 rounded z-50"
    >
      <p
        v-for="game in filtered"
        :key="game.id"
        class="px-1 py-2 hover:bg-gray-50 cursor-pointer"
        @click="previewDetails(game)"
      >
        {{ game.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { from } from "rxjs";
import { bufferCount, defaultIfEmpty, filter, take } from "rxjs/operators";
import InputText from "primevue/inputtext/InputText";
import { URL } from "@/constants/general";
import { IGame } from "@/types/games.types";
import { handleAxiosError } from "@/services/games.services";
import { ISearchGameData } from "@/types/general.types";
import { MUTATE_SEARCHED_GAMES, MUTATE_SELECTED_GAME } from "@/constants/store";

export default Vue.extend({
  components: { InputText },
  data(): ISearchGameData {
    return {
      value: null,
      filtered: [],
      games: [],
      error: null,
    };
  },
  async created(): Promise<void> {
    const searchedGames = this.$store.state.games.searchedGames;
    if (searchedGames.length > 0) {
      this.games = searchedGames;
      return;
    }
    try {
      const response = await axios.get(URL + "/posts");
      this.games = response.data;
      this.$store.commit(MUTATE_SEARCHED_GAMES, response.data);
    } catch (error) {
      this.error = handleAxiosError(
        error,
        "Something went wrong with searching"
      );
    }
    ``;
  },
  methods: {
    search(event: any): void {
      const text = event.target.value;
      if (text.length === 0) {
        this.filtered = [];
        return;
      }
      from(this.games)
        .pipe(
          filter((game: any) =>
            game.title.toLowerCase().startsWith(text.toLowerCase())
          ),
          defaultIfEmpty([]),
          bufferCount(7),
          take(1)
        )
        .subscribe((games: any) => {
          this.filtered = games;
        });
    },
    previewDetails(game: IGame): void {
      this.filtered = [];
      this.value = null;
      this.$store.commit(MUTATE_SELECTED_GAME, game);
      this.$emit("searched");
      this.$router.push({ name: "GameDetails", params: { id: game.id } });
      if (Object.keys(this.$route.params).length > 0) window.scrollTo(0, 0);
    },
  },
});
</script>
