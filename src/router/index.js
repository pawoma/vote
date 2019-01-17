import Vue from 'vue'
import Router from 'vue-router'
import VoteList from '@/pages/voteList'
import RankList from '@/pages/rankList'
import Guide from '@/pages/guide'
import Lottery from '@/pages/lottery'

Vue.use(Router)

export default new Router({
    mode: 'hash', // history
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            redirect: '/vote',
            name: 'index'
        },
        {
            path: '/vote',
            name: 'voteList',
            component: VoteList,
        },
        {
            path: '/rank',
            name: 'rankList',
            component: RankList,
        },
        {
            path: '/guide',
            name: 'guide',
            component: Guide
        },
        {
            path: '/lottery',
            name: 'lottery',
            component: Lottery
        }
    ]
})