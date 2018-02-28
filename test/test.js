import { mount } from "@vue/test-utils";
import compactable from "../src/compactable.vue";

describe("compatable.vue", () => {
  const wrapper = mount(compactable, {
    propsData: {
      column: [],
      data: []
    }
  });
  it("no data to show", () => {
    expect(wrapper.html()).toContain("没有数据");
  });
  it("show table with required props", () => {
    const column = [
      [
        {
          title: "titleA",
          key: "name",
          align: "center"
        },
        {
          title: "titleB",
          key: "value",
          align: "center"
        }
      ]
    ];
    const data = [
      {
        name: "a",
        value: "b"
      },
      {
        name: "a",
        value: "b"
      },
      {
        name: "a",
        value: "b"
      }
    ];
    wrapper.setProps({ column, data });
    expect(wrapper.findAll(".dataRow")).toHaveLength(3);
  });
  it("generate custom cell", () => {
    const column = [
      [
        {
          title: "titleA",
          key: "name",
          align: "center"
        },
        {
          title: "titleB",
          key: "value",
          align: "center",
          render: (h, params) => {
            return h("button", {
              style: {
                color: "red"
              }
            });
          }
        }
      ]
    ];
    const data = [
      {
        name: "a",
        value: "b"
      },
      {
        name: "a",
        value: "b"
      },
      {
        name: "a",
        value: "b"
      }
    ];
    wrapper.setProps({ column, data });
    console.log(wrapper.html());
    expect(wrapper.html()).toContain("button");
  });
});
