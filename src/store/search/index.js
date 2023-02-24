//search模块的小仓库
import { reqSearchList } from '@/api'
let state = {
     //搜索模块返回的数据
     searchList: {}
};
let mutations = {
     GETSEARCHLIST(state, searchList) {
          state.searchList = searchList;
     }
};
let actions = {
     async getSearchList({ state, dispatch, commit }, searchParams) {
          // 当前这个getSearchList这个函数在调用服务器数据的时候，至少传递一个参数
          // params形参，是当用户派发action的时候，第二个参数传递过来的时候，至少是一个空对象
          let result = await reqSearchList(searchParams);
          if (result.code == 200) {
               commit('GETSEARCHLIST', result.data);
          }
     }
};

//getters:仓库的计算属性
//项目中:vuex的getters,为了简化数据而生。
// 可以把将来在组件中需要的数据简化一下
let getters = {
     //计算新的属性:state,当前小仓库的数据
     goodsList(state) {
          return state.searchList.goodsList;
     },
     //品牌的数据
     trademarkList(state) {
          return state.searchList.trademarkList;
     },
     //商品属性
     attrsList(state) {
          return state.searchList.attrsList;
     }
};

//对外暴露
export default {
     state,
     mutations,
     actions,
     getters
}