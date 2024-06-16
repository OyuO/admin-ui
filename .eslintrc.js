module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended" // 使用 Vue.js 推荐的规则（需要安装 eslint-plugin-vue）
    ],
    parserOptions: {
        parser: "babel-eslint", // 使用 Babel 解析器
        ecmaVersion: 2020
    },
    rules: {
        // 在这里定义你的规则
        "no-console": "warn",
        "no-unused-vars": "warn",
        "quotes": ["warn", "double"]
    }
}
