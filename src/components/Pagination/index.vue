<template>
  <div class="pagination">
    <!-- 上一页按钮,点击触发currentPage事件,将当前页码数减1后的数据传给父组件,然后父组件再发请求并渲染 -->
    <button @click="$emit('currentPage', pageNo - 1)" :disabled="pageNo == 1">上一页</button>
    <!-- 连续5个数的开始大于1  点击触发currentPage事件,将页码为1数据传给父组件 -->
    <button v-if="startAndEnd.start > 1" @click="$emit('currentPage', 1)">1</button>
    <!-- 连续5个数的开始大于2 则只显示.....-->
    <button v-if="startAndEnd.start > 2">.....</button>

    <!-- 中间连续页码的地方:v-for、数组、对象、数字、字符串 -->
    <!-- v-for遍历连续页码结束的数字,如果为10,则遍历10次,因此会显示1到10,但现在只要显示5个连续页码
      因此需要v-if判断,只显示大于等于连续页码数开始的数字 -->
    <!-- :class="{ active: pageNo == page }"  表示如果点击页码会显示 -->
    <button v-for="page in startAndEnd.end" :key="page" v-if="page >= startAndEnd.start"
      @click="$emit('currentPage', page)" :class="{ active: pageNo == page }">{{ page }}</button>

    <button v-if="startAndEnd.end < totalPage - 1">......</button>
    <button v-if="startAndEnd.end < totalPage" @click="$emit('currentPage', totalPage)">{{ totalPage }}</button>

    <button @click="$emit('currentPage', pageNo + 1)" :disabled="pageNo == totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageSize", "pageNo", "pagerCount"],
  computed: {
    //分页器一共多少页【总条数/每页展示条数】
    totalPage() {
      //向上取整数
      return Math.ceil(this.total / this.pageSize);
    },
    //底下的代码是整个分页器最重要的地方[算出连续五个数字、开头、结尾]
    startAndEnd() {
      //算出连续页码:开始与结束这两个数字
      let start = 0,
        end = 0;
      const { totalPage, pagerCount, pageNo } = this;
      //特殊情况:总共页数小于连续页码数
      if (totalPage < pagerCount) {
        start = 1;
        end = totalPage;
      } else {
        //正常情况：分页器总页数大于连续页码数 
        // 这里不能写死,所以使用pagerCount/2然后取整,也就是连续显示5个,前面两个,后面两个
        start = pageNo - parseInt(pagerCount / 2);
        end = pageNo + parseInt(pagerCount / 2);
        //约束start|end在合理范围之内
        //约束头部
        // 如当前页码为2,要显示1,2,3,4,5,而不是0,1,2,3,4,因此需要约束头部,使其开头为1,结束为连续页码数
        if (start < 1) {
          start = 1;
          end = pagerCount;
        }
        //约束尾部
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - pagerCount + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>