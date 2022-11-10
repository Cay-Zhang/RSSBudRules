({
    "github.com": {
        _name: "GitHub",
        ".": [
            {
                title: "Repo Releases",
                source: ["/:user/:repo/releases", "/:user/:repo/releases/*", "/:user/:repo"],
                targetType: "pathForOriginal",
                target: "/:user/:repo/releases.atom"
            },
            {
                title: "Repo Commits",
                source: ["/:user/:repo/commits", "/:user/:repo/commits/:branch", "/:user/:repo"],
                targetType: "pathForOriginal",
                target: ({ user, repo, branch }, url) => `/${user}/${repo}/commits${branch ? "/" + branch : ""}.atom`
            },
            {
                title: "User dynamics",
                source: "/:user",
                targetType: "pathForOriginal",
                target: "/:user.atom"
            }
        ]
    },
    "reddit.com": {
        _name: "Reddit",
        ".": [
            {
                title: "Current page",
                targetType: "url",
                target: (params, url) => {
                    url = new URL(url);
                    url.pathname += ".rss";
                    return url;
                }
            },
            {
                title: "Current page (trashhalo/reddit-rss)",
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
                title: "Top Stories",
                docs: "https://www.cnn.com/services/rss/",
                targetType: "url",
                target: "http://rss.cnn.com/rss/cnn_topstories.rss"
            }
        ]
    },
    "smzdm.com": {
        _name: "SMZDM",
        ".": [
            {
                title: "Special Offers",
                docs: "https://www.smzdm.com/dingyue",
                targetType: "url",
                target: "http://feed.smzdm.com/"
            },
            {
                title: "Amoy Zone",
                docs: "https://www.smzdm.com/dingyue",
                targetType: "url",
                target: "http://haitao.smzdm.com/feed"
            },
            {
                title: "Community Articles",
                docs: "https://www.smzdm.com/dingyue",
                targetType: "url",
                target: "http://post.smzdm.com/feed"
            },
            {
                title: "Discovery Channel",
                docs: "https://www.smzdm.com/dingyue",
                targetType: "url",
                target: "http://faxian.smzdm.com/feed"
            },
            {
                title: "Information Zone",
                docs: "https://www.smzdm.com/dingyue",
                targetType: "url",
                target: "http://news.smzdm.com/feed"
            }
        ]
    }
})
