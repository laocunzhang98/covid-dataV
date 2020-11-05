import Vue from "vue";
import VueRouter from "vue-router";
import GlobalStatis from '../components/GlobalStatis'
import CountryStatis from '../components/CountryStatis'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        redirect: '/GlobalStatis',
    },
    {
        path: "/GlobalStatis",
        name: "GlobalStatis",
        component: GlobalStatis,
    },
    {
        path: "/CountryStatis",
        name: "CountryStatis",
        component: CountryStatis,
        props: (route) => ({
            country: route.query.country,
        })
    },
    {
        path: "/ChinaStatis",
        name: "ChinaStatis",
        component:()=> import('../components/ChinaStatis.vue')
    }

];

const router = new VueRouter({
    routes
});

export default router;
