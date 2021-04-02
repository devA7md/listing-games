<template>
  <div class="p-4 sm:my-5 p-4 sm:p-10">
    <h1 class="text-4xl text-gray-500 uppercase pb-4">Game Details</h1>

    <div v-if="game && !loading" class="bg-white rounded shadow-lg p-4">
      <h2 class="text-3xl text-gray-700">{{ game.title }}</h2>
      <h4 class="text-md text-gray-600">{{ game.body }}</h4>
    </div>

    <div v-else-if="loading" class="flex justify-center">
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>

    <p
      v-else-if="error && !loading"
      class="bg-red-100 rounded border-red-400 text-gray-500 p-5 text-center"
    >
      {{ error }}
    </p>

    <div class="my-20">
      <Recommended />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import axios from "axios";
import ProgressSpinner from "primevue/progressspinner";
import { GET_SELECTED_GAME } from "@/constants/store";
import { URL } from "@/constants/general";
import { handleAxiosError } from "@/services/games.services";
import Recommended from "@/components/Recommended.vue";
import { IGameData } from "@/types/general.types";

export default Vue.extend({
  name: "GameDetails",
  components: { Recommended, ProgressSpinner },
  title: "Game details",
  data(): IGameData {
    return {
      game: null,
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      selectedGame: GET_SELECTED_GAME,
    }),
  },
  async created() {
    if (this.selectedGame) {
      this.game = this.selectedGame;
    } else {
      this.loading = true;
      try {
        const res = await axios.get(URL + "/posts/" + this.$route.params.id);
        this.game = res.data;
        this.error = null;
      } catch (error) {
        this.error = handleAxiosError(
          error,
          "Couldn't fetch recommended games"
        );
      } finally {
        this.loading = false;
      }
    }
  },
});
</script>
