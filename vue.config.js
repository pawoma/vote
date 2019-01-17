module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'pages': '@/pages',
            }
        }
    },
    devServer: {
        proxy: {
            '/ShuiLi.S.190115': {
                target: 'http://web.v-ishare.com',
                // ws: true,
                changeOrigin: true
            }
            // proxy: 'http://wx.rongo.net.cn/'
        }
    },
    publicPath: process.env.NODE_ENV === 'production'? '/ShuiLi.S.190115/': '/'
}