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
            },
            {
                title: "Repo Discussions",
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
                title: "Current page",
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
    },
    "deviantart.com": {
        _name: "DeviantArt",
        ".": [
            {
                title: "Current Search",
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
                title: "Blog",
                source: "/:user",
                targetType: "pathForOriginal",
                target: "/:user/rss/list"
            }
        ]
    },
    "douban.com": {
        _name: "Douban",
        ".": [
            {
                title: "User\'s diary",
                source: "/people/:user",
                targetType: "pathForOriginal",
                target: "/feed/people/:user/notes"
            }
        ],
        "music": [
            {
                title: "Music Reviews",
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
                title: "Movie Reviews",
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
                title: "Node",
                source: "/go/:name",
                targetType: "pathForOriginal",
                target: (params) => `/feed/${params.name}.xml`
            }
        ]
    },
    "ximalaya.com": {
        _name: "Himalaya",
        ".": [
            {
                title: "Album",
                source: "/album/:id",
                targetType: "url",
                target: (params, url) => url + ".xml"
            }
        ]
    },
    "twitter.com": {
        _name: "Twitter",
        ".": [{
            title: "Tweets",
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
            title: "Tweets & Replies",
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
            title: "Media",
            docs: "https://github.com/zedeus/nitter",
            source: "/:id",
            targetType: "url",
            target: (params) => {
                if (params.id !== 'home' && params.id !== 'explore' && params.id !== 'notifications' && params.id !== 'messages' && params.id !== 'explore' && params.id !== 'search') {
                    return 'https://twiiit.com/:id/media/rss';
                }
            }
        }
        ]
    },
})
