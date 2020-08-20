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
    // generate: {
    //     autoBuildNpm: 'yarn',
    //     tabBar: {
    //       color: '#000000',
    //       selectedColor: '#07c160',
    //       backgroundColor: '#ffffff',
    //       list: [{
    //           pageName: 'home',
    //           text: '主页',
    //           iconPath: path.resolve(__dirname, '../src/img/home.png'),
    //           selectedIconPath: path.resolve(__dirname, '../src/img/home-sel.png'),
    //       }, {
    //           pageName: 'me',
    //           text: '个人页',
    //           iconPath: path.resolve(__dirname, '../src/img/profile.png'),
    //           selectedIconPath: path.resolve(__dirname, '../src/img/profile-sel.png'),
    //       }],
    //       // 使用自定义 tabBar
    //       // custom: path.join(__dirname, '../src/common/Footer.vue'),
    //    },
    // },
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
