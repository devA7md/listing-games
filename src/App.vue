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
</style>
