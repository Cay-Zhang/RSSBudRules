({
    "twitter.com": {
        _name: "Twitter",
        ".": [{
            title: "Tweets",
            docs: "https://github.com/zedeus/nitter",
            source: "/:id",
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
            target: (params) => {
                if (params.id !== 'home' && params.id !== 'explore' && params.id !== 'notifications' && params.id !== 'messages' && params.id !== 'explore' && params.id !== 'search') {
                    return 'https://twiiit.com/:id/media/rss';
                }
            }
        }
    ]
    },
})