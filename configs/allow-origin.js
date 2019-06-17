
module.exports = {
    dev: {
        "http://localhost:4002": {
            consumer: "bilagsky",
            allow: true
        },
        "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop": {
            consumer: "bilagsky",
            allow: true
        },
        "http://localhost:3000": {
            consumer: "accounts",
            allow: true
        },
        "https://bilagsky.oryton.com": {
            consumer: "bilagsky",
            allow: true
        },
        "http://172.104.48.209:4002": {
            consumer: "bilagsky",
            allow: true
        },
        "https://bilagsky.oryton.no": {
            consumer: "bilagsky",
            allow: true
        },
    },
    production: {
        "https://bilagsky.oryton.com": {
            consumer: "bilagsky",
            allow: true
        },
        "https://bilagsky.oryton.no": {
            consumer: "bilagsky",
            allow: true
        },
    }
}