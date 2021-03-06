<template>
  <div>
    <h2 class="text-3xl sm:text-4xl text-gray-600 my-6 uppercase">
      Featured Game
    </h2>
    <div
      v-if="game && !loading && !error"
      class="flex flex-col sm:flex-row sm:space-x-6"
    >
      <div
        class="flex-1 bg-gray-100 text-gray-300 flex justify-center items-center"
        style="min-height: 250px"
      >
        Image
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <h2 class="text-2xl text-gray-600">{{ game.title }}</h2>
        <div class="flex-1 py-2">
          <p class="text-md text-gray-400">{{ game.title }}</p>
        </div>
        <Button
          @click="previewDetails(game)"
          class="self-start mb-1"
          label="View Details"
        ></Button>
      </div>
    </div>

    <div v-else-if="loading && !error" class="flex justify-center">
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>

    <Message severity="error" :closable="false" v-if="error && !loading"
      >{{ error }}
    </Message>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import ProgressSpinner from "primevue/progressspinner";
import Message from "primevue/message";
import Button from "primevue/button";
import { URL } from "@/constants/general";
import { MUTATE_FEATURED_GAME, MUTATE_SELECTED_GAME } from "@/constants/store";
import { IGame } from "@/types/games.types";
import { handleAxiosError } from "@/services/games.services";
import { IGameData } from "@/types/general.types";

export default Vue.extend({
  name: "FeaturedGame",
  components: { ProgressSpinner, Message, Button },
  data(): IGameData {
    return {
      game: null,
      error: null,
      loading: false,
    };
  },
  async mounted(): Promise<void> {
    const featuredGame = this.$store.state.games.featured;
    if (featuredGame) {
      return (this.game = featuredGame);
    }

    this.loading = true;
    try {
      const randomPostId = Math.max(1, Math.floor(Math.random() * 99));
      const res = await axios.get(`${URL}/posts/${randomPostId}`);
      this.game = res.data;
      await this.$store.commit(MUTATE_FEATURED_GAME, res.data);
      this.error = null;
    } catch (error) {
      this.error = handleAxiosError(error, "Couldn't fetch any featured game");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    previewDetails(game: IGame): void {
      this.$store.commit(MUTATE_SELECTED_GAME, game);
      this.$router.push({ name: "GameDetails", params: { id: game.id } });
    },
  },
});
</script>
