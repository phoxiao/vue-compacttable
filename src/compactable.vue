<template>
  <div>
    <template v-if="fixHead === true">
      <div class="easytable">
        <div class="table-wrapper fixedColumn" :style="{width: fixedColumnWidth + 'px'}" v-if="fixColumn === true">
          <div class="head-wrapper">
            <table class="table fixedTable" v-if="data && Array.isArray(data) && data.length > 0" cellspacing="0" cellpadding="0">
              <colgroup>
                <col v-for="(col, hIndex) in columnStyleData" :key="hIndex" :width="col.width" v-if="col.fixed === true">
                </col>
              </colgroup>
              <thead v-if="column">
                <tr v-for="(head, hIndex) in column" :key="hIndex">
                  <th v-for="(col, index) in head" :key="index" :colspan="col.colspan" :rowspan="col.rowspan" v-if="col.show !== 'false' && col.fixed === true">
                    <div :style="{lineHeight: col.height + 'px', height: col.height + 'px'}">
                      <span>{{ col.title }}</span>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="body-wrapper fixedColumnBody" @scroll="fixColumnScroll">
            <table class="table fixedTable" cellspacing="0" cellpadding="0">
              <colgroup>
                <col v-for="(col, hIndex) in columnStyleData" :key="hIndex" :width="col.width" v-if="col.fixed === true">
                </col>
              </colgroup>
              <tbody>
                <tr v-for="(item, index) in tbodyData" :key="index" class="dataRow">
                  <td v-for="(col, colIndex) in column[column.length - 1]" :key="colIndex" v-if="(colIndex + 1) <=  item.length && item[col.key].show !== 'false' && col.fixed === true " :colspan="item[col.key].colspan" :rowspan="item[col.key].rowspan">
                    <Cell :column="col" :row="item"></Cell>
                  </td>
                </tr>
                <tr v-if="blankRowNum > 0" class="blankRow" v-for="item in blankRowNum" :key="item + 'row'">
                  <td v-for="colindex in defaultColumnNum" :key="colindex + 'col'"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-wrapper">
          <div class="head-wrapper columnHead" @scroll="tableHeadScroll">
            <table class="table fixedTable" v-if="data && Array.isArray(data) && data.length > 0" cellspacing="0" cellpadding="0">
              <colgroup>
                <col v-for="(col, hIndex) in columnStyleData" :key="hIndex" :width="col.width">
                </col>
              </colgroup>
              <thead>
                <tr v-for="(head, hIndex) in column" :key="hIndex">
                  <th v-for="(col, index) in head" :key="index" :colspan="col.colspan" :rowspan="col.rowspan" v-if="col.show !== 'false'">
                    <div :style="{lineHeight: col.height + 'px', height: col.height + 'px'}">
                      <span>{{ col.title }}</span>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="body-wrapper columnBody" @scroll="tableBodyScroll">
            <table class="table fixedTable" cellspacing="0" cellpadding="0">
              <colgroup>
                <col v-for="(col, hIndex) in columnStyleData" :key="hIndex" :width="col.width">
                </col>
              </colgroup>
              <tbody>
                <tr v-for="(item, index) in tbodyData" :key="index" class="dataRow">
                  <td v-for="(col, colIndex) in column[column.length - 1]" :key="colIndex" v-if="(colIndex + 1) <=  item.length && item[col.key].show !== 'false'" :colspan="item[col.key].colspan" :rowspan="item[col.key].rowspan">
                    <Cell :column="col" :row="item"></Cell>
                  </td>
                </tr>
                <tr v-if="blankRowNum > 0" class="blankRow" v-for="item in blankRowNum" :key="item + 'row'">
                  <td v-for="colindex in defaultColumnNum" :key="colindex + 'col'"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <table class="table" v-if="data && Array.isArray(data) && data.length > 0" cellspacing="0" cellpadding="0">
        <thead v-if="column">
          <tr v-for="(head, hIndex) in column" :key="hIndex">
            <th v-for="(col, index) in head" :key="index" :colspan="col.colspan" :rowspan="col.rowspan" v-if="col.show !== 'false'">
              <div>
                <span>{{ col.title }}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tbodyData" :key="index" class="dataRow">
            <td v-for="(col, colIndex) in column[column.length - 1]" :key="colIndex" v-if="(colIndex + 1) <=  item.length && item[col.key].show !== 'false'" :colspan="item[col.key].colspan" :rowspan="item[col.key].rowspan">
              <Cell :column="col" :row="item"></Cell>
            </td>
          </tr>
          <tr v-if="blankRowNum > 0" class="blankRow" v-for="item in blankRowNum" :key="item + 'row'">
            <td v-for="colindex in defaultColumnNum" :key="colindex + 'col'"></td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <p>没有数据</p>
      </div>
    </template>
  </div>
</template>

<script>
import Cell from "./cell.vue";

export default {
  components: { Cell },
  props: {
    fixHead: {
      type: Boolean,
      default: false
    },
    fixColumn: {
      type: Boolean,
      default: false
    },
    fixedColumnWidth: {
      type: Number,
      default: 200
    },
    column: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    defaultRowNum: {
      type: Number,
      default: 0
    },
    defaultColumnNum: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // set default blank row number
    blankRowNum() {
      const number = this.defaultRowNum - this.tbodyData.length;
      if (number < 0) {
        return 0;
      } else {
        return number;
      }
    },
    columnStyleData() {
      const styleData = [];
      // if there have mutil level column, use last level.
      const columnLevel = this.column.length;
      if (this.column[columnLevel - 1]) {
        this.column[columnLevel - 1].forEach(col => {
          if (col.width) {
            styleData.push({
              width: col.width,
              fixed: col.fixed
            });
          } else {
            styleData.push({
              width: 100,
              fixed: col.fixed
            });
          }
        });
      }
      return styleData;
    },
    tbodyData() {
      const tbodyData = [];
      const tbodyRowspanCell = [];
      this.data.forEach(row => {
        const keys = Object.keys(row);
        const newRow = {};
        let cellInfo = row.cellInfo;
        if (cellInfo) {
          cellInfo = JSON.parse(JSON.stringify(cellInfo));
          keys.splice(keys.indexOf("cellInfo"), 1);
        }
        keys.forEach(cellKey => {
          newRow[cellKey] = {};
          newRow[cellKey].value = row[cellKey];
          if (cellInfo) {
            if (cellInfo.colspan && cellInfo.colspan.key === cellKey) {
              newRow[cellKey].colspan = cellInfo.colspan.spanCount;
            }
            if (cellInfo.rowspan) {
              cellInfo.rowspan.forEach(cell => {
                if (cell.key === cellKey) {
                  newRow[cellKey].rowspan = cell.spanCount;
                }
              });
            }
          }
          // 设置rowspan所占几行的td不生成
          tbodyRowspanCell.forEach((cell, cellIndex) => {
            if (
              cell.key === cellKey &&
              tbodyRowspanCell[cellIndex].spanCount > 0
            ) {
              tbodyRowspanCell[cellIndex].spanCount -= 1;
              newRow[cellKey].show = "false";

              if (tbodyRowspanCell[cellIndex].spanCount === 0) {
                tbodyRowspanCell.slice(cellIndex, 1);
              }
            }
          });
        });
        if (cellInfo && cellInfo.rowspan) {
          cellInfo.rowspan.forEach((cell, index) => {
            cellInfo.rowspan[index].spanCount -= 1;
            tbodyRowspanCell.push(cellInfo.rowspan[index]);
          });
        }
        newRow.length = keys.length;
        tbodyData.push(newRow);
      });
      return tbodyData;
    }
  },
  mounted() {
    this.fixColumnTable = this.$el.querySelector(".fixedColumnBody");
    this.tableBody = this.$el.querySelector(".columnBody");
    this.tableHead = this.$el.querySelector(".columnHead");
  },
  methods: {
    fixColumnScroll(event) {
      this.tableBody.scrollTop = this.fixColumnTable.scrollTop;
    },
    tableHeadScroll(event) {
      this.tableBody.scrollLeft = this.tableHead.scrollLeft;
    },
    tableBodyScroll(event) {
      this.fixColumnTable.scrollTop = this.tableBody.scrollTop;
      this.tableHead.scrollLeft = this.tableBody.scrollLeft;
    }
  }
};
</script>

<style scoped>
.easytable {
  width: 100%;
  position: relative;
}
.table {
  width: 100%;
}
.fixedTable {
  table-layout: fixed;
}

.fixedColumn {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.1);
}
.fixedColumnBody {
  overflow-y: hidden;
}

.table-wrapper {
  width: 100%;
  overflow: auto;
}

.head-wrapper {
  overflow: auto;
}

.body-wrapper {
  overflow: auto;
  height: 500px;
}

.head-wrapper.columnHead::-webkit-scrollbar {
  display: none;
}

.body-wrapper.fixedColumnBody::-webkit-scrollbar {
  display: none;
}

p {
  font-size: 24px;
  text-align: center;
}
</style>
