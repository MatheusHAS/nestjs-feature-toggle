export default () => ({
    PORT: parseInt(process.env.PORT) || 3000,
    UNLEASH: {
        endpoint: process.env.UNLEASH_ENDPOINT,
        appName: process.env.UNLEASH_APPNAME,
    },
})