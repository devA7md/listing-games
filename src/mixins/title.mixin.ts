function getTitle(vm: any) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === "function" ? title.call(vm) : title;
  }
}

const titleMixin = {
  created(): void {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  },
};

export default titleMixin;
