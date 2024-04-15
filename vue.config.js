const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        proxy: {
            '/prod-api': {
                target: 'https://vue.ruoyi.vip',
                changeOrigin: true
            }
        }
    }
})
