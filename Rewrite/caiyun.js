/*************************************

项目名称：彩云天气/彩云天气Pro
下载地址：https://t.cn/A66d95hV
版本支持：7.11.0
更新日期：2024-02-07
脚本作者：lck7
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
# VIP信息
^https?:\/\/(biz|wrapper|starplucker)\.(cyapi|caiyunapp)\.(cn|com)\/(.+\/(user\?app_name|activity\?app_name|visitors|operation\/banners|ai\/weather|operation\/homefeatures)|p\/v\d\/(vip_info|user_info|entries|privileges)) url script-response-body https://raw.githubusercontent.com/lck7/Rewrite/main/caiyun.js
# SVIP地图-48小时预报
^https?:\/\/(api|wrapper)\.(cyapi|caiyunapp)\.(cn|com)\/v\d\/(satellite|nafp\/origin_images) url script-request-header https://raw.githubusercontent.com/lck7/Rewrite/main/caiyun.js

[mitm]
hostname = *.cyapi.cn, *.caiyunapp.com

*************************************/


const lck77 = {};
const lck7 = JSON.parse(typeof $response != "undefined" && $response.body || null);
const url = $request.url;
const adUrl = /(activity\?app_name|operation\/banners)/;
const vipUrl = /https:\/\/biz\.(cyapi\.cn|caiyunapp\.com)\/p\/v\d\/vip_info/;
const userUrl = /https:\/\/biz\.(cyapi\.cn|caiyunapp\.com)\/v\d\/user\?app_name/;
const infoUrl = /https:\/\/biz\.(cyapi\.cn|caiyunapp\.com)\/p\/v\d\/user_info/;
const aiUrl = /ai\/weather\/quotas/;
const qyUrl = /entries/;
const peUrl = /privileges/;
const topUrl = /operation\/homefeatures/;

if (typeof $response == "undefined") {
  lck77.headers = $request.headers;
  lck77.headers['device-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNjViYzc1NzAwYTBkNTYwMDFiZmJkODhjIiwidXNlcl9pZCI6IjVmODNhMDY3MTk5NzZmMDAxNWEyNTRiNiIsInZlcnNpb24iOjIsImV4cCI6MTcwOTQ4MjAwMCwidmlwX2V4cGlyZWRfYXQiOjAsImlzcyI6IndlYXRoZXIiLCJpYXQiOjE3MDY4OTAwMDAsInN2aXBfZXhwaXJlZF9hdCI6MTcxNDMyMTgxMiwicHJpbWFyeSI6dHJ1ZX0.v41eOWgj4FmMMYLygupRLeE2hC8KW_HltSsdFk03oP4';
} else {
  switch (true) {
    case adUrl.test(url):
      lck7.status = "ok";
      lck7.activities = [{"items":[{}]}];
      lck7.data = [];
      break;
    case vipUrl.test(url):
      lck7.vip = {  ...lck7.vip,
  "expires_time" : "4092599349",  "is_auto_renewal" : true  };
      lck7.svip =  {  ...lck7.svip,  "expires_time" : "4092599349",  "is_auto_renewal" : true  };
      lck7.show_upcoming_renewal = false;
      break;
    case userUrl.test(url):
      lck7.result = { ...lck7.result,  is_vip: true,  vip_expired_at: 4092599349,  svip_given: 1,  is_xy_vip: true,  xy_svip_expire: 4092599349,  wt: {  ...lck7.result.wt,  vip: {  ...lck7.result.wt.vip,  "expired_at" : 0,  "enabled" : true,  "svip_apple_expired_at" : 4092599349,  "is_auto_renewal" : true,  "svip_expired_at" : 4092599349    },    svip_given: 1,  },  is_phone_verified: true,  vip_take_effect: 1,  is_primary: true,  xy_vip_expire: 4092599349,  svip_expired_at: 4092599349,  svip_take_effect: 1,  vip_type: "s",  };
      break;
    case infoUrl.test(url):
      lck7["reg_days"] = 99999;
      break;
    case aiUrl.test(url):
      lck7.remain = 999;
      lck7.subscription_remain = 999;
      lck7.subscription_quota = 999;
      lck7.addition_remain = 999;
      lck7.subscription_quota_end_time = 4092599349;
      lck7.free_remain = 999;
      lck7.free_quota = 999;
      break;
    case qyUrl.test(url):
      lck7["entries"] = [{  "url" : "https://t.me/lck56",  "id" : 1,  "name" : "Chuseok",  "type" : 1,  "pos" : 2  }];
      break;
    case peUrl.test(url):
      lck7["privileges"] = [{  "vip_type" : "svip",  "subscription_chat_quota" : 999  }];
      break;
    case topUrl.test(url):
     
    }
  lck77.body = JSON.stringify(lck7);
}

$done(lck77);
