# generator-vue-stack


## vue技术栈脚手架
*   webpack1+vue1                                   -- vue1 脚手架
*   webpack1+vue2                                   -- vue2 脚手架
*   webpack2+vue2                                   -- vue2 脚手架
*   webpack2+vue2+vuex2                             -- vue2+vuex2 脚手架
*   webpack2+vue2+vuex2+vue-router2                 -- vue2+vuex2+vue-router2 脚手架
*   webpack2+happypack+vue2                         -- vue2 脚手架<font color=#f00>(推荐)</font>
*   webpack2+happypack+vue2+vuex2                   -- vue2+vuex2 脚手架<font color=#f00>(推荐)</font>
*   webpack2+happypack+vue2+vuex2+vue-router2       -- vue2+vuex2+vue-router2 脚手架<font color=#f00>(推荐)</font>

## 使用脚手架生成项目
*   npm install -g yo
*   npm install -g @gfe/generator-vue-stack
*   cd /path/of/your/project  //切到你的项目目录
*   yo @gfe/vue-stack  //在你的项目目录下执行

* <font color=#0f0>友情提醒：新建项目前，请使用npm install -g @gfe/generator-vue-stack安装最新版本的脚手架，在最新版本的脚手架中会新增功能并修复已知bug。</font>

## vue2 项目目录结构
```
├── LICENSE
├── README.md
├── dist
│   ├── static          -- webpack打包生成的静态文件，包括js/css等
│   └── index.html
├── devserver.js
├── f2eci.json
├── html
│   └── index.html      -- 入口html
├── package.json
├── src
│   ├── app.vue
│   ├── assets          -- 资源目录(图片、音频、字体、视频等)
│   ├── components      -- vue模块
│   ├── index.js        -- 入口js
│   └── index.less      -- 入口less
└── webpack.config.js   -- webpack配置文件
```

## vue2+vuex2 项目目录结构
```
├── LICENSE
├── README.md
├── dist
│   ├── static                -- webpack打包生成的静态文件，包括js/css等
│   └── yourpagename.html
├── devserver.js
├── f2eci.json
├── html
│   └── yourpagename.html     -- 入口html
├── node_modules
├── package.json
├── src
│   └── yourpagename          -- 每一个页面对应一个文件夹，建议使用页面名称作为文件夹的名称
│       ├── api               
│       │   └── fetch.js      -- 获取网络数据文件
│       ├── app.vue
│       ├── assets            -- 资源目录(图片、音频、字体、视频等)
│       │   └── xx.png
│       ├── components        -- vue模块
│       │   ├── xx1.vue
│       │   └── xx2.vue
│       ├── index.js          -- 入口js
│       ├── index.less        -- 入口less
│       └── store             
│           └── store.js      -- 状态管理对象
└── webpack.config.js         -- webpack配置文件
```

## vue2+vuex2+vue-router2 项目目录结构
```
├── LICENSE
├── README.md
├── dist
│   ├── static                -- webpack打包生成的静态文件，包括js/css等
│   └── yourpagename.html
├── devserver.js
├── f2eci.json
├── html
│   └── yourpagename.html     -- 入口html
├── node_modules
├── package.json
├── src
│   └── yourpagename          -- 每一个页面对应一个文件夹，建议使用页面名称作为文件夹的名称
│       ├── api               
│       │   └── fetch.js      -- 获取网络数据文件
│       ├── app.vue
│       ├── assets            -- 资源目录(图片、音频、字体、视频等)
│       │   └── xx.png
│       ├── components        -- vue模块
│       │   ├── xx1.vue
│       │   └── xx2.vue
│       ├── container         -- 路由页面
│       │   ├── xx_page1.vue      
│       │   ├── xx_page2.vue
│       ├── index.js          -- 入口js
│       ├── index.less        -- 入口less
│       ├── router
│       │   └── router.js     -- 路由映射对象
│       └── store             
│           └── store.js      -- 状态管理对象
└── webpack.config.js         -- webpack配置文件
```

## 本地开发
*   执行npm run start命令，会开启一个本地服务器，支持HMR。

## 构建
*   执行npm run build命令，会在dist/static目录下，生成webpack打包后的.js和.css文件。

## 注意事项
*	暂时不支持windows