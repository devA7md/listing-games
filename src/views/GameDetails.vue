<template>
  <div class="p-4">
    <h1 class="text-4xl text-gray-700 pb-4">Game Details</h1>
    <template v-if="game && !loading">
      <div class="flex items-center justify-center">
        <div class="bg-white rounded shadow-lg p-4">
          <h2 class="text-3xl text-gray-700">{{ game.title }}</h2>
          <h4 class="text-md text-gray-600">{{ game.body }}</h4>
        </div>
      </div>
    </template>
    <template v-else-if="loading">
      <div class="flex justify-center">
        <ProgressSpinner style="width: 50px; height: 50px" />
      </div>
    </template>
    <template v-else-if="error && !loading"
      ><p
        class="bg-red-100 rounded border-red-400 text-gray-500 p-5 text-center"
      >
        {{ error }}
      </p></template
    >
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

export default Vue.extend({
  name: "GameDetails",
  components: { ProgressSpinner },
  data() {
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
      } catch (error) {
        this.error = handleAxiosError(error);
      } finally {
        this.loading = false;
      }
    }
  },
});
</script>
