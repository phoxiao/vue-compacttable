export default {
  name: "customCell",
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: String,
    column: Object
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index
    };
    return ctx.props.render(h, params);
  }
};
