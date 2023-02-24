// vue插件一定暴露一个对象
let myPlugins = {}

myPlugins.install = function(){
    console.log("调用自定义插件");
}

export default myPlugins;