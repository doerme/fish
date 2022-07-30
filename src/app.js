import Vue from 'vue'
import App from './components/App'
// import App from './components/test'
import router from './router'

import 'mint-ui/lib/style.css'
// import store from './store'

import common from './components/' //加载公共组件
import util from './util/' //公共方法

import { Navbar, TabItem ,TabContainer, TabContainerItem ,Cell} from 'mint-ui';
Vue.use(util) //客户端方法

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)


Object.keys(common).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`common${name}`, common[key])
})

const app = new Vue({
    router,
    // store,
    ...App
})

export { app }