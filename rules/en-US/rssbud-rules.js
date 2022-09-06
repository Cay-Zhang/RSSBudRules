({
    "github.com": {
        _name: "GitHub",
        ".": [
            {
                title: "Warehouse Releases",
                source: ["/:user/:repo/releases", "/:user/:repo/releases/*", "/:user/:repo"],
                targetType: "pathForOriginal",
                target: "/:user/:repo/releases.atom"
            },
            {
                title: "Repository Commits",
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
    }
})
