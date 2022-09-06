({
    "github.com": {
        _name: "GitHub",
        ".": [
            {
                title: "倉庫リリース",
                source: ["/:user/:repo/releases", "/:user/:repo/releases/*", "/:user/:repo"],
                targetType: "pathForOriginal",
                target: "/:user/:repo/releases.atom"
            },
            {
                title: "ウェアハウスコミット",
                source: ["/:user/:repo/commits", "/:user/:repo/commits/:branch", "/:user/:repo"],
                targetType: "pathForOriginal",
                target: ({ user, repo, branch }, url) => `/${user}/${repo}/commits${branch ? "/" + branch : ""}.atom`
            },
            {
                title: "ユーザーダイナミクス",
                source: "/:user",
                targetType: "pathForOriginal",
                target: "/:user.atom"
            }
        ]
    },
    "reddit.com": {
        _name: "レディット",
        ".": [
            {
                title: "現在のページ",
                targetType: "url",
                target: (params, url) => {
                    url = new URL(url);
                    url.pathname += ".rss";
                    return url;
                }
            },
            {
                title: "現在のページ (trashhalo/reddit-rss)",
                docs: "https://github.com/trashhalo/reddit-rss",
                targetType: "url",
                target: (params, url) => {
                    url = new URL(url);
                    url.pathname += ".json";
                    url.domain = "reddit.0qz.fun";
                    return url;
                }
            }
        ]
    },
    "cnn.com": {
        _name: "CNN",
        ".": [
            {
                title: "トップニュース",
                docs: "https://www.cnn.com/services/rss/",
                targetType: "url",
                target: "http://rss.cnn.com/rss/cnn_topstories.rss"
            }
        ]
    }
})
