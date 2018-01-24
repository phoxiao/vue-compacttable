<template>
  <div>
    <table class="easyTable" v-if="data && Array.isArray(data) && data.length > 0" cellspacing="0" cellpadding="0">
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
           <td v-for="(col, colIndex) in column[column.length - 1]" :key="colIndex"
            v-if="(colIndex + 1) <=  item.length && item[col.key].show !== 'false'"
            :colspan="item[col.key].colspan" :rowspan="item[col.key].rowspan">
            <div :style="{ textAlign: col.align, width: col.width }">
              <span>{{ item[col.key].value }}</span>
            </div>
           </td>
        </tr>
        <tr v-if="blankRowNum > 0" class="blankRow"
        v-for="item in blankRowNum" :key="item + 'row'">
          <td v-for="colindex in defaultColumnNum" :key="colindex + 'col'"></td>
        </tr>
      </tbody>
      </table>
      <div v-else>
        <p>没有数据</p>
      </div>
  </div>
</template>

<script>
export default {
  props: {
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
  data() {
    return {};
  },
  computed: {
    blankRowNum() {
      const number = this.defaultRowNum - this.tbodyData.length;
      if (number < 0) {
        return 0;
      } else {
        return number;
      }
    },
    tbodyData() {
      const tbodyData = [];
      const tbodyRowspanCell = [];
      this.data.forEach(row => {
        const keys = Object.keys(row);
        const newRow = {};
        const cellInfo = row.cellInfo;
        if (cellInfo) {
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
  }
};
</script>

<style scoped>
.easyTable {
  width: 100%;
}

p {
  font-size: 24px;
  text-align: center;
}
</style>
