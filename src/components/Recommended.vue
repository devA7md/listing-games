<template>
  <div class="p-4">
    <h2 class="text-2xl sm:text-4xl text-gray-600 text-center my-6 uppercase">
      Recommended Games
    </h2>

    <div
      v-if="games.length > 0 && !loading && !error"
      class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
    >
      <Card
        class="cursor-pointer hover:shadow-2xl"
        :key="game.id"
        v-for="game in games"
        @click.native="previewDetails(game)"
      >
        <template #title>
          <h2 class="text-xl text-gray-500 line-clamp">
            {{ game.title }}
          </h2>
        </template>
        <template #content>
          <p class="text-justify text-gray-500">{{ game.body }}</p></template
        >
        <template #footer>
          <div class="flex justify-end">
            <i class="pi pi-angle-right text-lg text-gray-500"></i>
          </div>
        </template>
      </Card>
    </div>

    <Message severity="error" :closable="false" v-if="error && !loading"
      >{{ error }}
    </Message>

    <div class="flex justify-center" v-if="loading && !error">
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import { from, Observable } from "rxjs";
import { bufferCount, filter, map, switchMap, take } from "rxjs/operators";
import Card from "primevue/card";
import ProgressSpinner from "primevue/progressspinner";
import Message from "primevue/message";
import { URL } from "@/constants/general";
import { IGame, IRecommendedGame } from "@/types";
import {
  GET_RECOMMENDED,
  SET_RECOMMENDED,
  SET_SELECTED_GAME,
} from "@/constants/store";
import { mapGetters } from "vuex";

export default Vue.extend({
  components: { Card, ProgressSpinner, Message },
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
    this.games$ = from(axios.get(`${URL}/posts`))
      .pipe(
        switchMap((response: AxiosResponse) => from(response.data)),
        map(
          (game: IGame): Observable<IRecommendedGame> => {
            return {
              ...game,
              rate: Math.floor(Math.random() * 100),
            };
          }
        ),
        filter(
          (game: IRecommendedGame): Observable<IRecommendedGame> =>
            game.rate > 80
        ),
        bufferCount(6),
        take(1)
      )
      .subscribe(
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

<style lang="scss">
.line-clamp {
  height: 3.2em;
  line-height: 1.6em;
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
}
</style>
