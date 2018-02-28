<template>
  <div>
    <template v-if="renderType === 'default'">
      <div :style="{ textAlign: column.align, width: column.width }">
              <span>{{ row[column.key].value }}</span>
            </div>
    </template>
    <template v-else-if="renderType === 'render'">
      <customCell :column="column" :row="row" :index="column.key" :render="column.render"/>
    </template>
  </div>
</template>

<script>
import customCell from "./customCell";

export default {
  components: { customCell },
  props: {
    column: Object,
    row: Object
  },
  computed: {
    renderType() {
      if (this.column && this.column.render) {
        return "render";
      }
      return "default";
    }
  }
};
</script>

<style scoped>

</style>
