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
            },
            {
                title: "仓库讨论",
                source: "/:user/:repo/discussions",
                targetType: "pathForOriginal",
                target: "/:user/:repo/discussions.atom"
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
    },
    "csdn.net": {
        _name: "CSDN",
        "blog": [
            {
                title: "博客",
                source: "/:user",
                targetType: "pathForOriginal",
                target: "/:user/rss/list"
            }
        ]
    },
    "douban.com": {
        _name: "豆瓣",
        ".": [
            {
                title: "用户的日记",
                source: "/people/:user",
                targetType: "pathForOriginal",
                target: "/feed/people/:user/notes"
            }
        ],
        "music": [
            {
                title: "乐评",
                source: "/subject/:id",
                targetType: "url",
                target: (params, url) => {
                    url = new URL(url);
                    url.host = "www.douban.com";
                    url.pathname = "/feed/subject/" + params.id + "/reviews";
                    return url;
                }
            }
        ],
        "movie": [
            {
                title: "影评",
                source: "/subject/:id",
                targetType: "url",
                target: (params, url) => {
                    url = new URL(url);
                    url.host = "www.douban.com";
                    url.pathname = "/feed/subject/" + params.id + "/reviews";
                    return url;
                }
            }
        ]
    },
    "readhub.cn": {
        _name: "Readhub",
        ".": [
            {
                title: "fengchang/readhub-rss",
                docs: "https://github.com/fengchang/readhub-rss",
                targetType: "url",
                target: "http://readhub.bayes.cafe/rss?channel=all"
            }
        ]
    },
    "v2ex.com": {
        _name: "V2EX",
        ".": [
            {
                title: "节点",
                source: "/go/:name",
                targetType: "pathForOriginal",
                target: (params) => `/feed/${params.name}.xml`
            }
        ]
    },
    "ximalaya.com": {
        _name: "喜马拉雅",
        ".": [
            {
                title: "专辑",
                source: "/album/:id",
                targetType: "url",
                target: (params, url) => url + ".xml"
            }
        ]
    },
    "twitter.com": {
        _name: "Twitter",
        ".": [{
            title: "用户时间线 (Nitter)",
            docs: "https://github.com/zedeus/nitter",
            source: "/:id",
            targetType: "url",
            target: (params) => {
                if (params.id !== 'home' && params.id !== 'explore' && params.id !== 'notifications' && params.id !== 'messages' && params.id !== 'explore' && params.id !== 'search') {
                    return 'https://twiiit.com/:id/rss';
                }
            }
        },
        {
            title: "用户时间线 & 回复 (Nitter)",
            docs: "https://github.com/zedeus/nitter",
            source: "/:id",
            targetType: "url",
            target: (params) => {
                if (!['home', 'explore', 'notifications', 'messages', 'explore', 'search'].includes(params.id)) {
                    return 'https://twiiit.com/:id/with_replies/rss';
                }
            }
        },
        {
            title: "媒体 (Nitter)",
            docs: "https://github.com/zedeus/nitter",
            source: "/:id",
            targetType: "url",
            target: (params) => {
                if (params.id !== 'home' && params.id !== 'explore' && params.id !== 'notifications' && params.id !== 'messages' && params.id !== 'explore' && params.id !== 'search') {
                    return 'https://twiiit.com/:id/media/rss';
                }
            }
        }]
    },
})
