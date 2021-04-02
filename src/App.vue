<template>
  <div>
    <Header />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: { Header },
};
</script>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "~primevue/resources/themes/saga-orange/theme.css";
@import "~primevue/resources/primevue.min.css";
@import "~primeicons/primeicons.css";

html {
  scroll-behavior: smooth;
}

.p-component {
  .p-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .p-card-content {
      padding: 0;
    }
  }
}

.line-clamp {
  height: 3.2em;
  line-height: 1.6em;
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
}

.sec-layout {
  @apply my-4 sm:my-5 p-4 sm:p-10;
}
</style>
