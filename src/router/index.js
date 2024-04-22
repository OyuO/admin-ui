import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Index from "@/views/Index.vue";

Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {path: "/index", component: Index}
]


export default new VueRouter({
    routes
})
