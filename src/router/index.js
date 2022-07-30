import Vue from 'vue'
import Router from 'vue-router'
import Rule from '../views/Rule.vue';
import Coupon from '../views/Coupon.vue';

//异步加载
const MyHoner = resolve => require(['../views/MyHoner.vue'],resolve);

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [{
        path: '/myhoner',
        component: MyHoner
    },{
        path: '/rule',
        component: Rule
    },{
        path: '/coupon',
        component: Coupon
    }]
})