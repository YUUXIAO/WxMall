## ABOUT
此项目是仿造网易严选UI写的一个微信小程序商城练手项目,接口数据部分来自网易真实数据，部分是来自mock,由于数据问题可能很多功能在页面上没有体现，但是在代码上有所体现，可以看看相应代码部分
  现在还不够完善依然有很多问题不足，欢迎大家提出建议和意见  

## 功能列表

- [x] 首页 -- 完成
- [x] 搜索 -- 完成
- [x] 商品分类 -- 完成
- [x] 购物车 -- 完成
- [x] 个人中心 -- 完成
- [x] 用户评价 -- 完成
- [x] 商品下单 -- 完成 
- [x] 地址管理 -- 完成
- [x] 订单管理 -- 完成
- [x] 用户登陆 -- 完成

## 目录结构
<pre>

│  app.js                       
│  app.json                     
│  app.wxss                       
│  project.config.json                   # 项目配置  
│  
├─ components                            # 公用组件  
│  
├─ dist                                  # 静态资源文件  
│  
├─ filter                                # 自定义过滤器  
│  
├─ images                                # 图片资源  
│  
└─ pages                                 # 页面  
    │  
    ├─ address                           # 地址管理  
    │  
    ├─ autheorize                        # 用户授权登陆  
    │  
    ├─ category                          # 商品分类列表  
    │  
    ├─ checkOrder                        # 订单确认页  
    │  
    ├─ commentsList                      # 用户评价列表  
    │  
    ├─ detail                            # 商品详情  
    │  
    ├─ goodsList                         # 商品搜索列表  
    │  
    ├─ index                             # 首页  
    │  
    ├─ login                             # 登陆页面  
    │  
    ├─ orders                            # 订单管理  
    │  
    ├─ pay                               # 商品结算  
    │  
    ├─ search                            # 商品搜索  
    │  
    ├─ shoppingCart                      # 购物车  
    │  
    └─ user                              # 用户中心  
  
├─ router                                # 路由配置  
│  
├─ templates                             # 通用模板  
│  
├─ utils                                 # 一些工具函数  
│  
└─ wxapi                                 # api接口管理  
</pre>