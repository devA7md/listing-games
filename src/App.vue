<template>
  <div>
    <Header />
    <router-view />
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
</style>
