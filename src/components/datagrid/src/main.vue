<!--
作者：葛以伟
时间：14:37 2021-02-02
-->
<template>
  <div class="datagrid">
    <el-table
        :data="tableData"
        :size="tablesize"
        ref="datagrid"
        v-loading="loading"
        :row-key="rowKey"
        :default-expand-all="isExpandAll"
        :highlight-current-row="true"
        :tree-props="treeProps"
        :max-height="theight"

        @selection-change="selectionChange"
        @current-change="currentRowChange"
        @select="selectEvent"
        @select-all="selectAllEvent"
    >
      <!-- 空值 S -->
      <slot slot="empty" name="empty">
        <div class="empty">
          <img v-if="!loading" :src="emptyImg" alt="暂无数据" class="empty-image" />
          <p class="empty-description">暂无数据</p>
        </div>
      </slot>
      <!-- 空值 E -->

      <!-- 单选 S -->
      <el-table-column label="#" width="32" align="center" v-if="singleSelect">
        <template slot-scope="scope">
          <el-radio
              v-model="singleSelectionModel"
              :label="scope.row[rowKey]"
              :disabled="!selectable(scope.row, scope.$index)"
              class="table-column-item--radio"
          ></el-radio>
        </template>
      </el-table-column>
      <!-- 单选 E -->

      <!-- 多选 S -->
      <el-table-column
          type="selection"
          align="center"
          v-if="multiSelect"
          :selectable="selectable"
          reserve-selection
      ></el-table-column>
      <!-- 多选 E -->

      <!-- 序号 S -->
      <el-table-column
          type="index"
          label="序号"
          width="68"
          align="left"
          :index="formatterIndex"
          v-if="rownumbers"
          :fixed="indexFiexd"
      ></el-table-column>
      <!-- 序号 E -->
      <slot></slot>
    </el-table>

    <el-pagination
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
        v-if=" total > 0 && pagination "
    ></el-pagination>
  </div>
</template>

<script>
/* 列格式化组件 */
const columnRender = {
  name: "ColumnRender",
  props: {
    renderColumn: Function,
    row: Object
  },
  render(h) {
    return this.renderColumn(h, this.row);
  }
};
import axios from "axios";
axios.defaults.withCredentials = true;

const emptyImg =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K";
export default {
  name: "DataGrid",

  props: {
    /** 从远程站点请求数据的 URL */
    dataDef: {
      type: String,
      default: "content"
    },
    indexFiexd: { type: Boolean, default: false },
    url: String,
    selectId: String,
    tablesize: { type: String, default: "medium" },
    /** 请求参数 */
    params: Object,

    /** 静态数据 */
    data: Array,

    /** 分页页码 */
    cpage: Number,

    /** 多选 */
    multiSelect: { type: Boolean, default: false },

    /** 单选 */
    singleSelect: { type: Boolean, default: false },

    /** 是否显示序号 */
    rownumbers: { type: Boolean, default: true },

    /** 允许分页 */
    pagination: { type: Boolean, default: true },

    /** 是否展开全部 */
    isExpandAll: { type: Boolean, default: true },

    /** 某一行的checkbox、radio是否可勾选 */
    selectable: {
      type: Function,
      default: () => {
        return true;
      }
    },

    /** 选择某一行时，自动勾选checkbox、radio */
    checkOnSelect: { type: Boolean, default: true },

    /** 唯一标识字段 */
    rowKey: { type: String, default: "id" },
    theight: { type: Number},
    /** 渲染嵌套数据的配置选项 */
    treeProps: {
      type: Object,
      default: () => {
        return { hasChildren: "hasChildren", children: "children" };
      }
    },

    /** 请求方式 */
    methods: {
      type: String,
      default: "get"
    }
  },

  data() {
    return {
      /** 表格数据 */
      tableData: [],

      /** 加载状态 */
      loading: false,

      /** 页码 */
      page: 1,

      /** 页数 */
      size: 10,

      /** 总数 */
      total: 0,

      /** 暂无图片 */
      emptyImg: emptyImg,

      /** 单选项 */
      singleSelectionModel: ""
    };
  },

  methods: {
    /** 改变页数 */
    sizeChange(size) {
      if (this.size != size) {
        this.size = size;
        let temps =
            JSON.parse(window.localStorage.getItem("conditions")) || {};
        temps.size = this.size;
        window.localStorage.setItem(
            "conditions",
            JSON.stringify(temps)
        );
        this.loadingData();
      }
    },
    /** 改变页码 */
    currentChange(page) {
      this.page = page;
      this.params.page = page - 1;
      let temp =
          JSON.parse(window.localStorage.getItem("conditions")) || {};
      temp.page = this.page - 1;
      window.localStorage.setItem("conditions", JSON.stringify(temp));
      this.loadingData();
    },
    /** 加载数据 */
    loadingData() {
      console.log("loadingData");
      this.loading = true;

      if (this.url) {
        this.dynamicRequestData();
      } else {
        this.loadingStaticData();
      }
    },
    /** 加载静态数据 */
    loadingStaticData() {
      if (this.pagination) {
        this.total = this.data.length;
        this.tableData = this.data.slice(
            (this.page - 1) * this.size,
            this.page * this.size
        );
      } else {
        this.tableData = this.data;
      }
      this.loading = false;
    },
    /** 动态请求数据 */
    dynamicRequestData() {
      this.tableData = [];
      if (window.localStorage.conditions == undefined){
        this.params.page = 0
        this.page = 1
      }
      const params = Object.assign({ size: this.size }, this.params);
      //当页面再次选择页码，重新加载上次页数
      if (this.params.page != undefined || this.params.page != null) {
        this.page = Number(this.params.page + 1);
      }
      const asyncQuery = res => {
        const data = res.data;

        if (data.code === "0" && data.success) {
          this.tableData = data.data.content;
          this.total = +data.data.totalElements;
          this.$emit("onLoadSuccess", res);
        }
        if (this.selectId != "" || this.selectId != null) {
          for (var i1 = 0; i1 < this.tableData.length; i1++) {
            if (this.tableData[i1].id == this.selectId) {
              this.singleSelectionModel = this.selectId;
            }
          }
        }
        this.loading = false;
      };

      if (this.methods === "get") {
        if(params.isCID !== undefined){
          if(params.companyIds != undefined){
            if(Object.prototype.toString.call(params.companyIds) == '[object Array]'){
              var myP = (params.companyIds).join(',');
              params.companyIds = myP;
              delete params.isCID;
            }
          }
        }

        axios
            .get(this.url, {
              params
            })
            .then(res => {
              asyncQuery(res);
            })
            .catch(err => {
              this.loading = false;
            });
      } else if (this.methods === "post") {
        axios
            .post(this.url, params)
            .then(res => {
              asyncQuery(res);
            })
            .catch(err => {
              this.loading = false;
            });
      }
    },
    /** 格式化序号 */
    formatterIndex(index) {
      const ret = (this.page - 1) * this.size + index + 1;
      return ret < 10 ? "0" + ret : ret;
    },

    selectEvent(selection, row) {
      this.$emit("get-select", selection, row);
    },
    selectAllEvent(selection) {
      this.$emit("get-selectAll", selection);
    },
    /** 返回所有选中的行 */
    selectionChange(selection) {
      this.$emit("get-selections", selection);
    },

    /** 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 */
    currentRowChange(currentRow, oldCurrentRow) {
      if (this.multiSelect) {
        return;
      }
      this.singleSelectionModel = currentRow[this.rowKey];
      this.$emit("onCurrentRowChange", currentRow);
    },

    /** 点击某一行 */
    rowClick(row, column, event) {
      // alert(2222)
      if (!this.checkOnSelect) return;
      const index = this.tableData.indexOf(row);

      if (!this.selectable(row, index)) return;
      if (this.singleSelect) {
        this.singleSelectionModel = row[this.rowKey];
      }
      if (this.multiSelect) {
        this.$refs.datagrid.toggleRowSelection(row);
      }
    }
  },

  watch: {
    /** 请求参数发生改变时自动刷新 */
    params(value) {
      // 保留当前页数页码
      this.page = 1;
      // 重新加载数据
      this.loadingData();
    },
    /** 表格数据发生变化 */
    data() {
      this.loadingData();
    },
    /** 单选按钮的值 */
    singleSelectionModel(value) {
      if (value) {
        this.selectionChange([
          this.tableData.find(item => item[this.rowKey] === value)
        ]);
      } else {
        this.selectionChange([]);
      }
    }
  },
  created() {
    console.log("this.params",this.params);
    if (window.localStorage.conditions == undefined) {
      if (this.params == undefined) {
        this.page = 1;
      } else {
        this.params.page = 0;
        this.page = 1;
      }
    } else {
      if (JSON.parse(window.localStorage.conditions).page == undefined) {
        this.params.page = 0;
        this.page = 1;
      } else {
        this.params.page = JSON.parse(
            window.localStorage.conditions
        ).page;
        this.page = JSON.parse(window.localStorage.conditions).page + 1;
      }
    }
    this.loadingData();
  }
};
</script>

<style lang="scss">
.datagrid {
  overflow: hidden;
  height: 100%;

  .empty {
    margin: 32px 0;
    color: rgba(0, 0, 0, 0.25);
    line-height: 1;

    &-image {
      height: 40px;
      margin-bottom: 8px;
      img {
        height: 100%;
      }
    }

    &-description {
      margin: 0;
    }
  }

  .table-column-item--radio {
    .el-radio__label {
      display: none;
    }
  }

  .el-pagination {
    margin: 20px 0 0;
    float: right;

    &__sizes {
      margin: 0 5px 0 0;
    }

    &__jump {
      margin-left: 0;
    }
  }

  .el-table {
    th {
      font-weight: 700;
      font-family: "微软雅黑";
    }

    .cell {
      padding: 0 16px;
    }
  }
}
</style>


