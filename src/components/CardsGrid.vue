<template>
  <div>
    <h2 class="text-3xl sm:text-4xl text-gray-600 my-6 uppercase">
      {{ title }}
    </h2>

    <div
      v-if="games.length > 0 && !loading && !error"
      class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
    >
      <Card
        data-testid="card"
        class="cursor-pointer hover:shadow-2xl"
        :key="game.id"
        v-for="game in games"
        @click.native="previewDetails(game)"
      >
        <template #title>
          <h2 data-testid="card-title" class="text-xl text-gray-500 line-clamp">
            {{ game.title }}
          </h2>
        </template>
        <template #content>
          <p data-testid="card-body" class="text-justify text-gray-500">
            {{ game.body }}
          </p></template
        >
        <template #footer>
          <div class="flex justify-end">
            <i class="pi pi-angle-right text-lg text-gray-500"></i>
          </div>
        </template>
      </Card>
    </div>

    <Message
      data-testid="error"
      severity="error"
      :closable="false"
      v-if="error && !loading"
      >{{ error }}
    </Message>

    <div
      data-testid="loading"
      class="flex justify-center"
      v-if="loading && !error"
    >
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "primevue/card";
import ProgressSpinner from "primevue/progressspinner";
import Message from "primevue/message";
import { IGame } from "@/types/games.types";
import { SET_SELECTED_GAME } from "@/constants/store";

export default Vue.extend({
  name: "CardsGrid",
  components: { Card, ProgressSpinner, Message },
  props: {
    title: String,
    games: Array,
    loading: Boolean,
    error: String,
  },
  methods: {
    previewDetails(game: IGame): void {
      this.$store.dispatch(SET_SELECTED_GAME, game);
      this.$router.push({ name: "GameDetails", params: { id: game.id } });
    },
  },
});
</script>
