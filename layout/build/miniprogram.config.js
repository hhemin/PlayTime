/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */

module.exports = {
    origin: 'https://test.miniprogram.com',
    entry: '/',
    router: {
        home: [
          '/home',
        ],
        // day : [
        //   '/day',
        // ],
        me : [
          '/me',
        ],
        add : [
          '/add',
        ],
    },
    redirect: {
        notFound: 'home',
        accessDenied: 'home',
    },
    app: {
        backgroundTextStyle: 'dark',
        navigationBarTextStyle: 'white',
        // navigationBarTitleText: 'kbone',
        // navigationStyle: "custom"
    },
    appExtraConfig: {
      sitemapLocation: 'sitemap.json',
    },
    global: {
      share: true,
      windowScroll: false,
      backgroundColor: '#F7F7F7',
    },
    optimization: {
		domSubTreeLevel: 10,

		elementMultiplexing: true,
		textMultiplexing: true,
		commentMultiplexing: true,
		domExtendMultiplexing: true,

		styleValueReduce: 5000,
		attrValueReduce: 5000,
	},
    projectConfig: {
        projectname: 'kbone-template-vue',
        appid: '',
    },
}
