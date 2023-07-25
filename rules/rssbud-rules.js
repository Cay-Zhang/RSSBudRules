({
    "github.com": {
        _name: "GitHub",
        ".": [
            {
                title: "仓库 Releases",
                source: ["/:user/:repo/releases", "/:user/:repo/releases/*", "/:user/:repo"],
                targetType: "pathForOriginal",
                target: "/:user/:repo/releases.atom"
            },
            {
                title: "仓库 Commits",
                source: ["/:user/:repo/commits", "/:user/:repo/commits/:branch", "/:user/:repo"],
                targetType: "pathForOriginal",
                target: ({ user, repo, branch }, url) => `/${user}/${repo}/commits${branch ? "/" + branch : ""}.atom`
            },
            {
                title: "用户动态",
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
                title: "当前页面",
                targetType: "url",
                target: (params, url) => {
                    url = new URL(url);
                    url.pathname += ".rss";
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
        _name: "什么值得买",
        ".": [
            {
                title: "优惠精选",
                docs: "https://www.smzdm.com/dingyue",
                targetType: "url",
                target: "http://feed.smzdm.com/"
            },
            {
                title: "海淘专区",
                docs: "https://www.smzdm.com/dingyue",
                targetType: "url",
                target: "http://haitao.smzdm.com/feed"
            },
            {
                title: "社区文章",
                docs: "https://www.smzdm.com/dingyue",
                targetType: "url",
                target: "http://post.smzdm.com/feed"
            },
            {
                title: "发现频道",
                docs: "https://www.smzdm.com/dingyue",
                targetType: "url",
                target: "http://faxian.smzdm.com/feed"
            },
            {
                title: "资讯专区",
                docs: "https://www.smzdm.com/dingyue",
                targetType: "url",
                target: "http://news.smzdm.com/feed"
            }
        ]
    },
    "deviantart.com": {
        _name: "DeviantArt",
        ".": [
            {
                title: "当前搜索",
                docs: "https://www.deviantart.com/developers/rss",
                source: "/search",
                targetType: "url",
                target: (params, url) => {
                    url = new URL(url);
                    url.host = "backend.deviantart.com";
                    url.pathname = "/rss.xml";
                    const searchParams = new URLSearchParams();
                    searchParams.set("type", "deviation");
                    searchParams.set("q", url.searchParams.get("q"));
                    url.search = searchParams.toString();
                    return url;
                }
            }
        ]
    }
})
