import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppGlobal {
    // 全局变量
    static coin = "￥";
    //缓存key的配置
    // static cache: any = {
    //     slides: "_dress_slides",
    //     categories: "_dress_categories",
    //     products: "_dress_products"
    // }
    //接口基地址
    static domain = "https://www.icooder.cn"

    //接口地址
    static API: any = {
        // 首页
        getBanner: '/mobile4bannerapi/get',
        getHotImg: '/mobile4bannerapi/get',
        getProductsHot: '/mobile4productapi/hot',

        // 分类
        getCategoryTop: '/mobile4productcategoryapi/getTop',
        getCategory: '/mobile4productcategoryapi/get',

        // 产品列表
        getProducts: '/mobile4productapi/get',
        
        // 产品详情
        getDetails: '/mobile4productapi/detail',
        getComment: '/mobile4productapi/comments',

        // 获取验证码-注册
        getRegistCode: '/mobile4codeapi/send',
        // 提交
        registerSubmit: '/memberapi/mobileRegister',

        // 登录
        loginSubmit: '/memberapi/apiLogin',

        // 获取用户信息
        memberInfo: '/memberapi/profile',
        // 保存用户信息
        memberUpdate: '/memberapi/update',
        // 修改密码
        memberUpdatePass: '/memberapi/resetPass',
        // 修改支付密码
        memberUpdatePaypass: '/memberapi/resetPayPass',
        // 新增收货地址
        memberAddressAdd: '/member4addressapi/saveAddress',
        // 获取收货地址
        memberGetAddress: '/member4addressapi/address',
        // 设置默认收货地址
        setDefaultAddress: '/member4addressapi/setDefaultAddress',
        // 删除收货地址
        memberDelAddress: '/member4addressapi/deleteAddress',
        // 获取单个收货地址
        memberFindAddress: '/member4addressapi/find',
        // 编辑收货地址
        memberUpdateAddress: '/member4addressapi/update',
        // 加入购物车
        addcart: '/shopcartapi/save',
        // 获取购物车产品
        getCartProduct: '/shopcartapi/get',
        // 改变购物车数量
        updateCartAmount: '/shopcartapi/changeAmount',
        // 删除购物车
        deleteCart: '/shopcartapi/delete',
        // 创建订单
        createOrder: '/orderapi/shop',
        // 获取订单
        getOrders: '/orderapi/get',
        // 取消订单
        cancelOrder: '/orderapi/cancel',
        // 确认收货
        receiveConfirm: '/orderapi/confirm',
        // 删除订单
        deleteOrder: '/orderapi/delete',
        // 单个订单信息
        getOrderinfo: '/orderapi/find',
        // 发布评论
        sendComment: '/orderapi/comment',
        // 获取字典值
        getDictVal: '/dict4api/find',
        // 提交转运订单
        submitTransOrder: '/orderapi/trans',
        // 提交线下代购
        submitCustom: '/orderapi/custom',
        // 获取文章
        getArticle: '/articleapi/get',
        // 创建代购订单
        createPurchaseOrder: '/orderapi/purchase',
        // 上传图片
        uploadImg: '/uploadapi/image',
        // 充值
        recharge: '/rechargeapi/apply',
        // 提现
        withdraw: '/withdrawapi/apply',
    };
}

@Injectable()
export class AppService {

    loading: any;

    constructor(public http: Http, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, ) { }

    show(){
        this.loading = this.loadingCtrl.create({
            content: '努力加载中...'
        });
        this.loading.present();
    }
    hide(){
        if(this.loading){
            this.loading.dismiss();
        }
    }
    // 对参数进行编码
    encode(params) {
        var str = '';
        if (params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }
            str = '?' + str.substring(0, str.length - 1);
        }
        return str;
    }

    httpGet(url, params, callback, loader: boolean = false) {
        let loading = this.loadingCtrl.create({});
        if (loader) {
            loading.present();
        }
        this.http.get(AppGlobal.domain + url + this.encode(params))
            .toPromise()
            .then(res => {
                // console.log(res)
                var d = res.json();
                if (loader) {
                    loading.dismiss();
                }
                callback(d == null ? "[]" : d);
            })
            .catch(error => {
                if (loader) {
                    loading.dismiss();
                }
                this.handleError(error);
            });
    }

    httpPost(url, params, callback, loader: boolean = false) {
        let loading = this.loadingCtrl.create();
        if (loader) {
            loading.present();
        }
        // console.log(params);
        this.http.post(AppGlobal.domain + url, params)
            .toPromise()
            .then(res => {
                var d = res.json();
                if (loader) {
                    loading.dismiss();
                }
                callback(d == null ? "[]" : d);
            }).catch(error => {
                if (loader) {
                    loading.dismiss();
                }
                this.handleError(error);
            });
    }

    httpPost2(url, params, callback, loader: boolean = false) {
        let loading = this.loadingCtrl.create();
        if (loader) {
            loading.present();
        }
        // console.log(params);
        this.http.post('https://japanbuy.jp/crawler2api/start', params)
            .toPromise()
            .then(res => {
                var d = res.json();
                if (loader) {
                    loading.dismiss();
                }
                callback(d == null ? "[]" : d);
            }).catch(error => {
                if (loader) {
                    loading.dismiss();
                }
                this.handleError(error);
            });
    }
    
    private handleError(error: Response | any) {
        let msg = '';
        if (error.status == 400) {
            msg = '请求无效(code：404)';
            console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
            msg = '请求资源不存在(code：404)';
            console.error(msg + '，请检查路径是否正确');
        }
        if (error.status == 500) {
            msg = '服务器发生错误(code：500)';
            console.error(msg + '，请检查路径是否正确');
        }
        console.log(error);
        if (msg != '') {
            this.toast(msg);
        }
    }

    alert(message, callback?) {
        if (callback) {
            let alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: [{
                    text: "确定",
                    handler: data => {
                        callback;
                    }
                }]
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: ["确定"]
            });
            alert.present();
        }
    }

    toast(message, callback?) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            dismissOnPageChange: true,
            position: 'top'
            // position: 'middle'
        });
        toast.present();
        if (callback) {
            callback();
        }
    }

    setItem(key: string, obj: any) {
        try {
            var json = JSON.stringify(obj);
            window.localStorage[key] = json;
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    }
    getItem(key: string, callback) {
        try {
            var json = window.localStorage[key];
            var obj = JSON.parse(json);
            callback(obj);
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    }

    // 提取token
    getToken(){
        return window.localStorage.getItem('token');
    }
}
