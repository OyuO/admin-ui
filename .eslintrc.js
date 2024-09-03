module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
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
