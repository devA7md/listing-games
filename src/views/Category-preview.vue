<template>
  <div class="p-4">
    <h2 class="text-2xl pb-4">Games for category {{ $route.params.id }}</h2>
    <template v-if="games.length > 0 && !loading">
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Card :key="game.id" v-for="game in games">
          <template #title>{{ game.title }}</template>
          <template #content>{{ game.body }}</template>
          <template #footer>
            <Button label="Show Details"></Button>
          </template>
        </Card>
      </div>
    </template>
    <template v-else-if="loading">
      <div class="flex justify-center">
        <ProgressSpinner style="width: 50px; height: 50px" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import { CATEGORIES_GET } from "@/constants/store";
import ProgressSpinner from "primevue/progressspinner";
import { fetchAndCategorizeGames } from "@/services/categories.services";
import { mapGetters } from "vuex";

export default Vue.extend({
  components: { Card, Button, ProgressSpinner },
  data() {
    return {
      games: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters({ categories: CATEGORIES_GET }),
  },
  async mounted() {
    const categories = this.categories[this.$route.params.id];
    if (categories) {
      this.games = categories;
    } else {
      this.loading = true;
      this.games = (await fetchAndCategorizeGames())[this.$route.params.id];
      this.loading = false;
    }
  },
});
</script>

<style lang="scss">
.p-component {
  .p-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
}
</style>
