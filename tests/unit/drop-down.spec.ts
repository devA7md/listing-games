import { mount } from "@vue/test-utils";

import DropDownMenu from "@/components/DropDownMenu.vue";

describe("DropDownMenu.vue.vue", () => {
  it("checks the component existence", () => {
    const wrapper = mount(DropDownMenu);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("checks for the classes to be injected to element", () => {
    const wrapper = mount(DropDownMenu);
    expect(wrapper.classes()).toContain("hidden");
    expect(wrapper.classes()).toContain("sm:block");
  });

  it("checks menu button text and icon", () => {
    const wrapper = mount(DropDownMenu);
    const menuText = wrapper.find("[data-testid=menu-text]");
    const menuIcon = wrapper.find("[data-testid=menu-icon]");
    expect(menuText.element.textContent).toBe("MENU");
    expect(menuIcon.element.classList).toContain("pi");
    expect(menuIcon.element.classList).toContain("pi-angle-down");
  });
});
