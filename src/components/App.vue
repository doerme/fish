<template>
    <div class="page-main">
        <div class="bg-content">
            <!-- 海水  -->
            <div class="canvas-wrap">
                <canvas id="canvas"></canvas>
            </div>
            <div class="sea-bg"></div>
    
            <!-- 增加金币  -->
            <transition name="fade">
                <div class="page-plus" v-show="showThisFishFlag"><img :src="plus" alt="">{{currentFishJinbi}}</div>
            </transition>
            <!-- 个人信息  -->
            <div class="my-head" @click="goCenter">
                <img :src="head" alt="">
    
                <p class="nickname"><i>{{nickname}}</i> </p>
            </div>
            <!-- 我的金币  -->
            <div class="my-jinbi" @click="goCenter">
                <span><i id="js-dy-jinbi">{{myJinbi}}</i></span>
                <transition-group tag="div" name="jinbi" class="jinbi-group">
                    <p v-for="(item,index) in moneyGroup" v-bind:key="index">
                    </p>
                </transition-group>
            </div>
            <div class="my-jinbi my-zs" @click="goCenter">
                <span><i id="js-dy-zs">{{myZs}}</i></span>
            </div>
            <!-- 规则  -->
            <router-link tag="div" to="/rule" class="butn-rule-home"></router-link>
            <router-link tag="div" to="/coupon" class="butn-coupon-home"></router-link>
            <!-- 公告  -->
            <transition name="toast-fadein">
                <div class="page-toast" v-show="showNoticeFlag">
                    <div>
                        <div class="msg-content">
                            <span v-for="item in noticeArray" class="msg">{{item}}</span>
    
                        </div>
                    </div>
                </div>
            </transition>
            <!-- 钓鱼后提示  -->
            <transition name="fade">
                <div :class="lotteryTipsClass" v-show="currentGetedFish">
                    <p v-html="currentGetedFish"></p>
                </div>
            </transition>
            <!-- 鱼竿  -->
            <div :class="yuganClass">
                <div class="yugan"></div>
                <div class="yuxian" id="js-yuxian-block">
                    <div class="yuxian-bg">
                        <span :class="yuerClass"></span>
                    </div>
                    <div class="current-betting">
                        <p v-for="(item,index) in currentTimeBettingFish" :type="item.type" :key="index">
                            <img :src="item.imgSrc" alt="">
                        </p>
                    </div>
                </div>
            </div>
            <!-- 假山  -->
            <div class="bg2"></div>
            <!-- 游动鱼的列表  -->
            <div class="fish-list">
                <!-- 游动鱼  -->
                <transition-group tag="div" v-bind:css="false" v-on:enter="enter">
                    <p v-for="(item,index) in fishList" v-bind:key="index" :data-direct="item.direct" :data-type="item.type" :data-index="index">
                        <!--<img :src="item.imgSrc" alt="" :class="item.class">-->
                        <strong :class="item.class"></strong>
                    </p>
                </transition-group>
    
                <!-- 中奖的鱼  -->
                <transition-group tag="div" v-bind:css="false" v-on:enter="lottery" v-on:after-enter="afterLottery">
                    <p v-for="(item,index) in lotteryFishList" v-bind:key="index" :data-type="item.type" :data-direct="item.direct" :data-index="index" :data-money="item.money" :data-name="item.name">
                        <!--<img :src="item.imgSrc" :class="item.class" alt="">-->
                        <strong :class="item.class"></strong>
                    </p>
                </transition-group>
            </div>
        </div>
        <!-- 导航  -->
        <div class="bottom-nav">
            <a href="javascript:;" class="label-jinbi" @click="showBettingTips">
                <span> <i>{{currentBetting}}</i></span>
            </a>
            <a href="javascript:;" class="butn-chugan" @click="chugan"> <span class="icon-bg"><i class="js-chugan-process"></i></span><img :src="chuganTxt"> </a>
            <a href="javascript:;" class="butn-tuoguan" @click="autoDiaoyu"></a>
        </div>
        <!-- 选择抽奖金额  -->
        <div class="tips-mask" @click="hideBettingTips" v-show="bettingTipsShow"></div>
        <div class="bottom-tips" v-show="bettingTipsShow">
            <p v-for="item in bettingJinbi" @click="selectBetting" :betting="item"> <img :src="jinbiSeleted" class="icon-seleted" v-show="item == currentBetting"> <img :src="jinbi" class="icon-jinbi"> {{item}}</p>
        </div>
        <!-- 宝箱  -->
        <div class="baoxiang-1" v-show="ganOver48Flag">
            <div class="bg"></div>
            <div class="box"></div>
        </div>
        <div class="baoxiang-2" v-show="ganOver48Flag">
            <div class="bg"></div>
            <div class="box"></div>
        </div>
        <!-- 托管  -->
        <div class="auto-mask" v-show="autoFlag"></div>
        <div class="auto-block" v-show="autoFlag">
            <a href="javascript:;" class="butn-auto" @click="cancelAuto"></a>
        </div>
        <!-- 钓鱼获得3倍以上 的提示  -->
        <div class="lottery-tips" v-show="lotteryTipsFlag" @click="hideLotteryTips">
            <div class="mask"></div>
            <div class="content">
                <p>
                    <span v-for="item in lotteryNumArray" :class="item"></span>
                </p>
                <span class="icon-star"></span>
                <span class="icon-star-2"></span>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import base from './base.css'
    import head from '../assets/head-img.png';
    import fish1 from '../assets/yu-1.png';
    import fish1B from '../assets/yu-1-2.png';
    import fish1C from '../assets/yu-1-3.png';
    import fish2 from '../assets/yu-2.png';
    import fish2B from '../assets/yu-2-2.png';
    import fish2C from '../assets/yu-2-3.png';
    import fish3 from '../assets/yu-3.png';
    import fish3B from '../assets/yu-3-2.png';
    import fish3C from '../assets/yu-3-3.png';
    import fish4 from '../assets/yu-4.png';
    import fish4B from '../assets/yu-4-2.png';
    import fish4C from '../assets/yu-4-3.png';
    import fish5 from '../assets/yu-5.png';
    import fish5B from '../assets/yu-5-2.png';
    import fish5C from '../assets/yu-5-3.png';
    import fish6 from '../assets/yu-6.png';
    import fish6B from '../assets/yu-6-2.png';
    import fish6C from '../assets/yu-6-3.png';
    import fish7 from '../assets/yu-7.png';
    import fish7B from '../assets/yu-7-2.png';
    import fish7C from '../assets/yu-7-3.png';
    import fish8 from '../assets/yu-8.png';
    import fish8B from '../assets/yu-8-2.png';
    import fish8C from '../assets/yu-8-3.png';
    import jinbi from '../assets/jinbi-3.png';
    import jinbiSeleted from '../assets/jinbi-seleted.png';
    import chuganTxt from '../assets/chugan-txt.png';
    import plus from '../assets/plus.png';
    
    import {
        MessageBox,
        Toast
    } from 'mint-ui';
    
    let yuganClass = "yugan-block";
    var lotteryId = [];
    let ajaxResponseTime = 0; // ajax 返回时间
    // 获取data数据集
    function getDataSet(elem) {
        if (elem.dataset) {
            return elem.dataset;
        }
        var datas = {};
        var attrs = elem.attributes;
        var nodeName, nodeNames;
        for (var i = 0, attr; attr = attrs[i]; i++) {
            nodeName = attr.nodeName;
            if (nodeName.indexOf('data-') !== -1) {
                nodeNames = nodeName.slice(5).split("-");
                nodeName = nodeNames[0];
            } else {
                continue;
            }
            for (var j = 1; j < nodeNames.length; j++) {
                nodeName += nodeNames[j].slice(0, 1).toUpperCase + nodeNames[j].slice(1);
            }
            datas[nodeName] = attr.nodeValue;
            return datas;
        }
    }
    // 创建一个随机的 鱼
    function generateFish(fishType, money, name) {
        var fishObj = {};
        var randomDirect = Math.random() * 10;
        fishObj.class = 'item-' + fishType;
        fishObj.type = fishType;
        if (money) {
            fishObj.money = money;
        }
        if (name) {
            fishObj.name = name;
        }
        // 生成鱼图片
        switch (parseInt(fishType)) {
            case 1:
                fishObj.imgSrc = fish1;
                break;
            case 2:
                fishObj.imgSrc = fish2;
                break;
            case 3:
                fishObj.imgSrc = fish3;
                break;
            case 4:
                fishObj.imgSrc = fish4;
                break;
            case 5:
                fishObj.imgSrc = fish5;
                break;
            case 6:
                fishObj.imgSrc = fish6;
                break;
            case 7:
                fishObj.imgSrc = fish7;
                break;
            default:
    
        }
        // 生成初始方向
        if (randomDirect > 5) { //从右到左
            fishObj.direct = 'right';
        } else { //从左到右
            fishObj.direct = 'left'
        }
    
        return fishObj;
    }
    
    export default {
        data() {
            return {
                head,
                fish1,
                jinbi,
                jinbiSeleted,
                chuganTxt,
                plus,
                yuganClass,
                stop: false,
                show: true,
                lotteryId: [],
                fishList: [],
                lotteryFishList: [],
                getedFishList: [],
                bettingJinbi: [5000, 1000, 500, 100],
                currentBetting: 100,
                bettingTipsShow: false,
                currentTimeBettingFish: [],
                currentGetedFish: '', //当前获取到的鱼
                currentFishJinbi: 0, //当前鱼的分数
                currentGetedFishList: [],
                myJinbi: 0, //我的金币
                myZs:0,
                nickname: '',
                showThisFishFlag: false, //每次增加的金额
                moneyGroup: [], //获得金币的数字 用于做动画
                fishGetedArray: [fish1C, fish2C, fish3C, fish4C, fish5C, fish6C, fish7C], //垂直鱼
                noticeArray: ['欢乐钓鱼劲爆！ 1.25亿惊天大奖《点击查看详情》', '欢乐钓鱼劲爆！ 1.25亿惊天大奖《点击查看详情》'],
                showNoticeFlag: false,
                autoFlag: false,
                autoGoTo: false,
                timeGetedTotal: 0, //钓鱼后的金币
                lotteryTipsFlag: false, //3倍中奖提示
                lotteryTipsTimer: null, //3倍中奖提示定时器
                lotteryNumArray: [], //总金额图片用数组
                ganOver48Flag: false, //超过48杆的数据显示
                ganOver48Flag: null, //48杆宝箱定时器
                currentTotalGeted: 0, //这一次调到鱼后的金额
                currentTotalGetedZs: 0, // 这一次调到鱼后的 钻石
                caishenCanShow: false, //财神 是否出现
                caishenDialog: null, //财神弹窗模块
                isGetedResult: false //是否已经返回了结果了
            }
        },
        computed: {
            lotteryTipsClass() { //钓鱼的样式
                if (this.currentGetedFishList.length > 1) {
                    return 'page-lottery more'
                }
                return 'page-lottery';
            },
            yuerClass() {
                // 计算鱼饵 类名
                var classString = 'yuer';
                switch (parseInt(this.currentBetting)) {
                    case 500:
                        classString += ' qiuyin';
                        break;
                    case 1000:
                        classString += ' wuzei';
                        break;
                    case 5000:
                        classString += ' haixing';
                        break;
                    default:
                }
                return classString;
            }
        },
        created() {
            var self = this;
            setTimeout(function() {
                self.fishList.push(generateFish(1));
                self.fishList.push(generateFish(1));
                self.fishList.push(generateFish(1));
                self.fishList.push(generateFish(1));
                // self.fishList.push(generateFish(1));
                // self.fishList.push(generateFish(1));
    
                self.fishList.push(generateFish(2));
                self.fishList.push(generateFish(2));
                // self.fishList.push(generateFish(2));
    
                self.fishList.push(generateFish(3));
                self.fishList.push(generateFish(3));
                // self.fishList.push(generateFish(3));
    
                self.fishList.push(generateFish(4));
                self.fishList.push(generateFish(4));
                // self.fishList.push(generateFish(4));
    
                self.fishList.push(generateFish(5));
                self.fishList.push(generateFish(5));
    
                self.fishList.push(generateFish(6));
                // self.fishList.push(generateFish(6));
    
                self.fishList.push(generateFish(7));
                // self.fishList.push(generateFish(8));
    
            }, 200)
        },
        mounted() {
            var self = this;
            this.generateWave();
            // 加载进度 假的
            this.allImgLoaded();
            self.ajaxGetUserInfo();
            self.setRate();
            this.caishenDialog = caishenDialog({
                error: function(res) {
                    //接口报错情况
                    Toast({
                        message: res.msg,
                        position: 'top',
                        duration: 2000,
                        className: 'chugan-toast'
                    });
                    self.caishenDialog.close();
                },
                close: function() {
                    // 弹窗关闭时执行代码
                    self.caishenCanShow = false;
                }
            });
            // self.noticeLoop();
        },
        methods: {
            allImgLoaded() {
                // 待加载资源
                var allNeededImgArray = [
                    '/hldy/static/img/baoxiang.png',
                    '/hldy/static/img/chugan.png',
                    '/hldy/static/img/num-6.png',
                    '/hldy/static/img/yu-2-2.png',
                    '/hldy/static/img/yu-6-2.png',
                    '/hldy/static/img/yu-8-3.png',
                    '/hldy/static/img/bg-2.png',
                    '/hldy/static/img/dialog-box.png',
                    '/hldy/static/img/num-8.png',
                    '/hldy/static/img/yu-3.png',
                    '/hldy/static/img/yu-6-3.png',
                    '/hldy/static/img/yu-8.png',
                    '/hldy/static/img/bg.png',
                    '/hldy/static/img/guanxian-1.png',
                    '/hldy/static/img/num-9.png',
                    '/hldy/static/img/yu-4-2.png',
                    '/hldy/static/img/yu-6.png',
                    '/hldy/static/img/bizhikuang.png',
                    '/hldy/static/img/loading-bg.png',
                    '/hldy/static/img/rule-butn.png',
                    '/hldy/static/img/yu-4.png',
                    '/hldy/static/img/yu-7-2.png',
                    '/hldy/static/img/butn-rule-home.png',
                    '/hldy/static/img/muban.png',
                    '/hldy/static/img/rule.jpg',
                    '/hldy/static/img/yu-5-2.png',
                    '/hldy/static/img/yu-7-3.png',
                    '/hldy/static/img/butn-tuoguan.png',
                    '/hldy/static/img/num-0.png',
                    '/hldy/static/img/tuoguan.png',
                    '/hldy/static/img/yu-5-3.png',
                    '/hldy/static/img/yu-7.png',
                    '/hldy/static/img/chugan-bg.png',
                    '/hldy/static/img/num-3.png',
                    '/hldy/static/img/yu-1-2.png',
                    '/hldy/static/img/yu-5.png',
                    '/hldy/static/img/yu-8-2.png'
                ];
                var currentLoadedImg = 0;
                // $('.loading-page').hide();
                for (var i = 0; i < allNeededImgArray.length; i++) {
                    var _img = new Image();
                    _img.src = allNeededImgArray[i];
                    _img.onload = function() {
                        currentLoadedImg += 1;
                        $('.loading-bg p').velocity('stop');
                        $('.loading-bg p').velocity({
                            width: ((currentLoadedImg / allNeededImgArray.length) * 100) + '%'
                        }, {
                            complete() {
                                // $('.loading-page').hide();
                                if (currentLoadedImg >= allNeededImgArray.length) {
                                    $('.loading-page').hide();
                                }
                            },
                            mobileHA: true
                        })
                    }
                }
            },
            noticeLoop() { //通知循环
                var self = this;
                self.showNoticeFlag = true;
                $('.msg-content').velocity({
                    marginLeft: [(-self.noticeArray.length * 95) + '%', 0]
                }, {
                    easing: 'swing',
                    duration: 7000 * self.noticeArray.length,
                    complete() {
                        self.showNoticeFlag = false;
                        setTimeout(function() {
                            self.noticeLoop();
                        }, 10000)
                    },
                    mobileHA: true
                })
            },
            generateWave() {
                // 水波
                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = canvas.parentNode.offsetWidth;
                canvas.height = canvas.parentNode.offsetHeight;
                // console.log(canvas.height);
                //如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout
                window.requestAnimFrame = (function() {
                    return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };
                })();
                // 波浪大小
                var boHeight = canvas.height / 30;
                var posHeight = canvas.height / 1.05;
                //初始角度为0
                var step = 0;
                //定义三条不同波浪的颜色
                var lines = ["rgba(87, 207, 216, 0.7)"];
    
                function loop() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    step++;
                    //画3个不同颜色的矩形
                    for (var j = lines.length - 1; j >= 0; j--) {
                        ctx.fillStyle = lines[j];
                        //每个矩形的角度都不同，每个之间相差45度
                        var angle = (step + j * 50) * Math.PI / 180;
                        var deltaHeight = Math.sin(angle) * boHeight;
                        var deltaHeightRight = Math.cos(angle) * boHeight;
                        ctx.beginPath();
                        ctx.moveTo(0, posHeight + deltaHeight);
                        ctx.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight - boHeight, canvas.width / 2, posHeight + deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight);
                        ctx.lineTo(canvas.width, canvas.height);
                        ctx.lineTo(0, canvas.height);
                        ctx.lineTo(0, posHeight + deltaHeight);
                        ctx.closePath();
                        ctx.fill();
                    }
                    requestAnimFrame(loop);
                }
                loop();
            },
            autoDiaoyu() { //托管
                this.autoFlag = true;
                this.autoGoTo = true; //自动开始钓鱼
                if (!$('.butn-chugan').hasClass('active') && this.yuganClass.indexOf('active') < 0) {
                    this.chugan();
                }
            },
            cancelAuto() { //取消托管
                this.autoFlag = false;
                this.autoGoTo = false; //自动开始钓鱼
            },
            progressChugan() { //出杆后的动画 出杆按钮的动画
                var self = this,
                    $chuganProcess = $('.js-chugan-process');
                $chuganProcess.velocity({
                    height: 0
                }, {
                    easing: 'linear',
                    duration: 6000,
                    mobileHA: true,
                    complete() {
                        var distanceTime = (+new Date()) - ajaxResponseTime;
                        if (self.currentGetedFishList.length == self.lotteryId.length && distanceTime > 3000 && self.isGetedResult) { //全部到鱼竿上的时候
                            var flag = self.lotteryId.length ? false : true;
                            self.receiveYugan(flag);
                            self.isGetedResult = false;
                            // $('.lottery-tips').removeClass('bounceIn');
                        } else { //鱼还没全部上杆 在执行一次
                            $chuganProcess.css('height', '100%');
                            self.progressChugan();
                        }
                    }
                })
            },
            chugan() { //出杆
                var self = this;
                if ($('.yugan-block').hasClass('active') || this.yuganClass.indexOf('active') > -1) {
                    return;
                }
                self.currentGetedFish = '';
                self.currentFishJinbi = 0;
                self.currentGetedFishList = [];
                self.currentTimeBettingFish = [];
    
                if (self.myJinbi < self.currentBetting) { //不够金币钓鱼
                    this.autoFlag = false;
                    this.autoGoTo = false;
                    MessageBox.alert('不够金币了！快去充值吧').then(action => {
                        if (action == 'confirm') {
                            location.href = '/user/usercenter';
                        }
                    });
                    return;
                }
                this.yuganClass = "yugan-block active";
                this.myJinbi -= this.currentBetting;
                $('#js-dy-jinbi').html(this.myJinbi);
    
                self.lotteryId = [];
                self.currentGetedFishList = [];
                $('#js-yuxian-block').find('p').remove();
                $('.yuer').show();
                // 出杆的按钮背景动画
                self.progressChugan();
                self.ajaxLottery(function(res) {
                    // var res = {
                    //     balance:100,
                    //     data:{
                    //         fish:[
                    //             {id:2,name:'test',gold:5},
                    //             {id:2,name:'test',gold:.3},
                    //         ]
                    //     },
                    //     code:0,
                    //     totalGold: 5.3
                    // }
                    // setTimeout(function(){ //定时器 防止鱼竿还没下来 鱼就跑来了
                    console.log(res);
                    ajaxResponseTime = +new Date();
                    self.timeGetedTotal = Math.ceil(Number(res.JB) * 100);
                    self.currentTotalGetedZs = Math.ceil(Number(res.ZS) * 100);
                    self.currentTotalGeted = Math.ceil(Number(res.totalGold) * 100);
                    if (res.code == 0) {
                        self.lotteryId = res.data.fish;
                        self.caishenCanShow = res.isCaiShen;
                    } else {
                        self.lotteryId = [];
                        Toast({
                            message: res.msg,
                            position: 'top',
                            duration: 2000,
                            className: 'chugan-toast'
                        });
                    }
                    if (self.lotteryId.length) {
                        for (var i = 0, len = self.lotteryId.length; i < len; i++) {
                            self.lotteryFishList.push(generateFish(self.lotteryId[i].id, Number(self.lotteryId[i].gold) * 100, self.lotteryId[i].name));
                        }
                    }
                    // },2000)
    
                })
    
            },
            enter(el, done) { //鱼类动画
                var self = this,
                    $el = $(el);
                var _direct = $el.attr('data-direct'),
                    _type = $el.attr('data-type');
    
                var _windowWidth = $(window).width(),
                    _elWidth = -$el.width();
                // 大鲸鱼
                // if(_type == 8 && Math.random()*100<=90){
                //     setTimeout(function () {
                //         self.enter(el, done);
                //     },10000);
                //     return;
                // }
                Move(_direct);
                // 游动
                function Move(type) {
                    var initLeft = _elWidth,
                        initRotateY = '0deg',
                        lastLeft = _windowWidth,
                        lastRotateY = '180deg';
                    if (type == 'right') {
                        initLeft = _windowWidth;
                        initRotateY = '180deg';
                        lastLeft = _elWidth;
                        lastRotateY = '0deg';
                    }
                    $el.css({
                        'top': parseInt(400 + 500 * Math.random()) + 'px',
                        'opacity': 1,
                        'left': initLeft
                    })
                    $el.velocity({
                        rotateY: initRotateY
                    }, {
                        mobileHA: true
                    })
                    $el.velocity({
                        left: parseInt(Math.random() * _windowWidth * .8) + 'px'
                    }, {
                        duration: 3000 + parseInt(Math.random() * 5000),
                        delay: parseInt(Math.random() * 10000),
                        mobileHA: true,
                        progress(elements, complete, remaining, start, tweenValue) {
                            // processMove(elements, complete);
                        },
                        complete(el) {
                            if ($('.yugan-block').hasClass('active') && Math.random() * 10 > 7) { //如果在钓鱼中 则出现 非爱心的提示
                                $(el).append('<span class="icon-miss"></span>');
                            }
                        }
                    })
                    var randomDirect = Math.random() * 10,
                        _x = lastLeft;
                    if (randomDirect > 5) { //转身
                        $el.velocity({
                            rotateY: lastRotateY
                        }, {
                            begin(el) {
                                $(el).find('span').remove();
                            },
                            mobileHA: true
                        })
                        _x = initLeft;
                    }
    
                    $el.velocity({
                        left: _x
                    }, {
                        duration: 2000 + parseInt(Math.random() * 2000),
                        delay: 600,
                        mobileHA: true,
                        begin(el) {
                            $(el).find('span').remove();
                        },
                        complete(elements) {
                            var elem = $(elements),
                                _type = elem.attr('data-type'),
                                fishObj = generateFish(_type);
    
                            elem.attr({
                                'data-direct': fishObj.direct,
                                'data-top': fishObj.top
                            });
                            self.enter(elements);
                        },
                        progress(elements, complete, remaining, start, tweenValue) {
                            // processMove(elements, complete);
                        }
                    })
                }
                // 过程中动画
                function processMove(el, complete) {
                    var _type = $(el).attr('data-type'),
                        _index = $(el).attr('data-index'),
                        _complete = parseInt(complete * 100);
                    switch (parseInt(_type)) {
                        case 1:
                            if (_complete % 20 < 10) {
                                self.fishList[_index].imgSrc = fish1;
                            } else {
                                self.fishList[_index].imgSrc = fish1B;
                            }
                            break;
                        case 2:
                            if (_complete % 20 < 10) {
                                self.fishList[_index].imgSrc = fish2;
                            } else {
                                self.fishList[_index].imgSrc = fish2B;
                            }
                            break;
                        case 3:
                            if (_complete % 20 < 10) {
                                self.fishList[_index].imgSrc = fish3;
                            } else {
                                self.fishList[_index].imgSrc = fish3B;
                            }
                            break;
                        case 4:
                            if (_complete % 20 < 10) {
                                self.fishList[_index].imgSrc = fish4;
                            } else {
                                self.fishList[_index].imgSrc = fish4B;
                            }
                            break;
                        case 5:
                            if (_complete % 20 < 10) {
                                self.fishList[_index].imgSrc = fish5;
                            } else {
                                self.fishList[_index].imgSrc = fish5B;
                            }
                            break;
                        case 6:
                            if (_complete % 20 < 10) {
                                self.fishList[_index].imgSrc = fish6;
                            } else {
                                self.fishList[_index].imgSrc = fish6B;
                            }
                            break;
                        case 7:
                            if (_complete % 20 < 10) {
                                self.fishList[_index].imgSrc = fish7;
                            } else {
                                self.fishList[_index].imgSrc = fish7B;
                            }
                            break;
                        case 8:
                            if (_complete % 20 < 10) {
                                self.fishList[_index].imgSrc = fish8;
                            } else {
                                self.fishList[_index].imgSrc = fish8B;
                            }
                            break;
                        default:
    
                    }
                }
            },
            lottery(el, done) { //钓鱼逻辑
                var self = this,
                    $el = $(el);
    
                var _direct = $el.attr('data-direct'),
                    _windowWidth = $(window).width(),
                    _elWidth = -$el.width();
    
                var firstLeft = _elWidth + 'px',
                    middleRotateY = '0deg',
                    middleLeft = _windowWidth / 2 + _elWidth,
                    middleDelay = 300 * $(el).index();
    
                if (_direct != 'left') {
                    firstLeft = _windowWidth + 'px';
                    middleRotateY = '180deg';
                    middleLeft = _windowWidth / 2;
                }
    
                $el.css({
                    top: parseInt(400 + 500 * Math.random()) + 'px',
                    opacity: 1,
                    left: firstLeft
                })
                $el.velocity({
                    rotateY: middleRotateY
                }, {
                    mobileHA: true
                });
                $el.velocity({
                    left: middleLeft
                }, {
                    duration: 1000 + parseInt(Math.random() * 2000),
                    delay: middleDelay,
                    mobileHA: true,
                    progress(elements, complete, remaining, start, tweenValue) {
                        // self.processMove(elements, complete);
                    },
                    complete() {
                        $el.append('<span class="icon-heart"></span>');
                        done();
                    }
                })
    
    
            },
            afterLottery(elem, done) {
                var self = this,
                    $el = $(elem);
                var _money = $el.attr('data-money'),
                    _type = parseInt($el.attr('data-type'));
                // console.log(_money);
                var _elWidth = -$el.width(),
                    _elHeight = $el.offset().height;
    
                var _offset = $('.yuer').offset(),
                    $currentBetting = $('.current-betting');
    
                var initLeft = _offset.left + _elWidth / 2 + _offset.width / 2,
                    initTop = $currentBetting.offset().top + $currentBetting.height() - $('.fish-list').offset().top + 50;
    
                if (_type == 1) {
                    initLeft = _offset.left + _elWidth / 2 + _offset.width * 2 / 5
                }
                $el.velocity({
                    rotateZ: '-90deg',
                    left: initLeft,
                    top: initTop
                }, {
                    duration: 200,
                    delay: 600,
                    mobileHA: true,
                    begin() {
                        $el.find('span').remove();
                    },
                    complete(el) {
                        var _el = $(el);
                        self.currentTimeBettingFish.push({
                            type: _type,
                            imgSrc: self.fishGetedArray[_type - 1]
                        });
    
                        if (_el.index() > 1) {
                            if (_el.prev().attr('data-type') == '1') {
                                var _marginTop = -_el.prev().find('img').height() / 2 + _elHeight * 2 / 3;
                                _el.css('marginTop', _marginTop);
    
                            } else {
                                var _marginTop = -_el.prev().find('img').height() / 2 + _elHeight / 4;
                                _el.css('marginTop', );
    
                            }
                        } else {
                            if (_type == 1) {
                                _el.css('marginTop', -_elHeight / 3);
                            } else {
                                _el.css('marginTop', 0);
                            }
                        }
                        _el.remove();
                        self.showThisFishFlag = true;
                        self.currentFishJinbi = _money;
                        self.currentGetedFishList.push(_type);
                        if (self.currentGetedFishList.length == 1) {
                            self.currentGetedFish = $(el).attr('data-name');
                        } else {
                            self.currentGetedFish = '一杆<strong>' + self.currentGetedFishList.length + '</strong>鱼';
                            if (self.currentGetedFishList.length >= 48) {
                                self.ganOver48Flag = true;
                                clearTimeout(self.ganOver48Timer);
                                self.ganOver48Timer = setTimeout(function() {
                                    self.ganOver48Flag = false;
                                }, 3000);
                            }
                            // $('.lottery-tips').addClass('bounceIn');
                        }
    
    
                        // $('.yuer').hide();
    
                    }
                })
    
            },
            receiveYugan(type) { //收起鱼竿
                var self = this;
                var $chuganProcess = $('.js-chugan-process');
                if (!type) { //钓到鱼
                    self.jinbiShine();
                }
                // 如果是0条鱼
                if (self.currentGetedFishList.length == 0) {
                    $('.yuer').hide();
                }
                setTimeout(function() {
                    self.yuganClass = "yugan-block  geted";
                    $chuganProcess.css('height', '100%');
                    self.lotteryNumArray = [];
                    // self.caishenVisible = true; //判断 是否出才是
                    if (self.currentTotalGeted / parseInt(self.currentBetting) >= 3) {
    
                        var tmpArray = String(self.currentTotalGeted).split('');
                        tmpArray.forEach(function(v) {
                            self.lotteryNumArray.push('num-' + v);
                        })
                        // console.log(self.lotteryNumArray);
                        self.lotteryTipsFlag = true;
                        clearTimeout(self.lotteryTipsTimer);
    
                        self.lotteryTipsTimer = setTimeout(function() {
                            self.lotteryTipsFlag = false;
                            if (self.caishenCanShow) {
                                // 出现财神
                                self.caishenDialog.open();
                            }
    
                        }, 3000);
                    } else if (self.caishenCanShow) {
                        // 出现财神
                        self.caishenDialog.open();
                        //关闭自动钓鱼
                        self.autoFlag = false;
                        self.autoGoTo = false;
                    }
                    self.myJinbi = self.timeGetedTotal;
                    self.myZs =self.currentTotalGetedZs;
                    $('#js-dy-jinbi').html(self.myJinbi);
                    $('#js-dy-zs').html(self.myZs);
    
                    self.showThisFishFlag = false;
                }, 300)
    
                setTimeout(function() {
                    self.currentGetedFish = '';
                    self.currentFishJinbi = 0;
                    self.currentGetedFishList = [];
                    self.currentTimeBettingFish = [];
                    if (self.autoGoTo && !self.caishenCanShow) { //自动 且不是财神出现的话
                        self.chugan();
                    }
                }, 600)
            },
            processMove(el, complete) { //过程中 切换鱼 做运动动画
                var self = this,
                    _type = $(el).attr('data-type'),
                    _index = $(el).attr('data-index'),
                    _complete = parseInt(complete * 100),
                    _imgSrc = '';
                switch (parseInt(_type)) {
                    case 1:
                        if (_complete % 10 < 6) {
                            self.lotteryFishList[_index].imgSrc = fish1;
                        } else {
                            self.lotteryFishList[_index].imgSrc = fish1B;
                        }
                        break;
                    case 2:
                        if (_complete % 10 < 6) {
                            self.lotteryFishList[_index].imgSrc = fish2;
                        } else {
                            self.lotteryFishList[_index].imgSrc = fish2B;
                        }
                        break;
                    case 3:
                        if (_complete % 10 < 6) {
                            self.lotteryFishList[_index].imgSrc = fish3;
                        } else {
                            self.lotteryFishList[_index].imgSrc = fish3B;
                        }
                        break;
                    case 4:
                        if (_complete % 10 < 6) {
                            self.lotteryFishList[_index].imgSrc = fish4;
                        } else {
                            self.lotteryFishList[_index].imgSrc = fish4B;
                        }
                        break;
                    case 5:
                        if (_complete % 10 < 6) {
                            self.lotteryFishList[_index].imgSrc = fish5;
                        } else {
                            self.lotteryFishList[_index].imgSrc = fish5B;
                        }
                        break;
                    case 6:
                        if (_complete % 10 < 6) {
                            self.lotteryFishList[_index].imgSrc = fish6;
                        } else {
                            self.lotteryFishList[_index].imgSrc = fish6B;
                        }
                        break;
                    case 7:
                        if (_complete % 10 < 6) {
                            self.lotteryFishList[_index].imgSrc = fish7;
                        } else {
                            self.lotteryFishList[_index].imgSrc = fish7B;
                        }
                        break;
                    case 8:
                        if (_complete % 10 < 6) {
                            self.lotteryFishList[_index].imgSrc = fish8;
                        } else {
                            self.lotteryFishList[_index].imgSrc = fish8B;
                        }
                        break;
                    default:
    
                }
    
            },
            jinbiShine() { //获取到金币的 动画 同时响金币
                var self = this;
                self.moneyGroup = [];
                var timer = setInterval(function() {
                    self.moneyGroup.push(1);
                    if (self.moneyGroup.length > 5) {
                        clearInterval(timer);
                        self.moneyGroup = [];
                    }
                }, 80)
                
                createjs.Sound.play(soundID);
    
            },
            selectBetting(e) {
                if ($(e.target).attr('betting')) {
                    this.currentBetting = $(e.target).attr('betting');
                } else {
    
                    this.currentBetting = $(e.target).parents('p').attr('betting');
                }
    
                this.bettingTipsShow = false;
            },
            showBettingTips() {
                this.bettingTipsShow = true;
            },
            hideBettingTips() {
                this.bettingTipsShow = false;
            },
            hideLotteryTips() {
                var self = this;
                self.lotteryTipsFlag = false;
                clearTimeout(self.lotteryTipsTimer);
            },
            goCenter() {
                location.href = '/user/usercenter';
            },
            ajaxGetUserInfo() { //用户信息接口
                var self = this;
                $.ajax({
                    url: "/api/hldy/dy/index",
                    dataType: "json",
                    type: 'GET',
                    success: function(res) {
                        // console.log(res);
                        if (res.code == 0) {
                            self.myJinbi = Math.ceil(Number(res.data.JB) * 100);
                            self.myZs = Math.ceil(Number(res.data.ZS) * 100);
                            self.nickname = res.data.nickname;
                            self.head = res.data.pic;
                        
                        } else {
                            Toast({
                                message: res.msg,
                                position: 'top',
                                duration: 2000,
                                className: 'chugan-toast'
                            });
                        }
                    }
                });
    
            },
            setRate(callback) { //提升概率用 测试使用
                //    var data = [
                //         {id:0, rate:30},
                //         {id:1, rate:54},
                //         {id:2, rate:6},
                //         {id:3, rate:4},
                //         {id:4, rate:3},
                //         {id:5, rate:1.5},
                //         {id:6, rate:0.5},
                //         {id:7, rate:0.4},
                //         {id:8, rate:0.3},
                //         {id:9, rate:0.2},
                //         {id:10, rate:0.1}
                //         ];
                //     $.ajax({
                //         url: 'http://g.cloudxt.cn/api/hldy/dy/configHitNumRate',
                //         type: 'get',
                //         data: {rate: JSON.stringify(data)},
                //         success: function(res){
                //             //
                //         }
                //     })
            },
            ajaxLottery(callback) { //钓鱼接口
                var self = this;
                $.ajax({
                    url: "/api/hldy/dy/doFish ", ///api/hldy/dy/configHitNumRate
                    dataType: "json",
                    type: 'POST',
                    data: {
                        goldnum: self.currentBetting / 100,
                        _token: token
                    },
                    success: function(res) {
                        self.isGetedResult = true;
                        callback && callback(res);
                    },
                    error: function() {
                        Toast({
                            message: '您的网速不给力哦~',
                            position: 'top',
                            duration: 2000,
                            className: 'chugan-toast'
                        });
                    }
                });
    
            }
        }
    
    }
</script>

<style lang="css">
    .loading-page {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 100;
        background: #36d2de url('../assets/loading-bg.png') no-repeat top center;
        background-size: 750px;
    }
    
    .loading-page .loading-bg {
        position: absolute;
        top: 746px;
        left: 205px;
        width: 340px;
        height: 40px;
        background: url('../assets/loading_progress_bg.png') no-repeat top center;
        background-size: 340px;
    }
    
    .loading-page .loading-bg p {
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        padding-right: 10px;
        box-sizing: border-box;
        background: url('../assets/loading-process.png') no-repeat top left;
        background-size: 340px;
    }
    
    .loading-page .loading-bg:after {
        content: '';
        display: block;
        position: absolute;
        top: 5px;
        left: 6px;
        width: 328px;
        height: 14px;
        background: url('../assets/loading_progress_front.png') no-repeat top center;
        background-size: 328px;
    }
    
    .canvas-wrap {
        position: absolute;
        bottom: 610px;
        left: 0;
        width: 100%;
        height: 680px;
    }
    
    #canvas {
        width: 100%;
        height: 100%;
    }
    
    .sea-bg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 610px;
        background: rgba(87, 207, 216, 0.7);
    }
    
    .page-main {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
    }
    
    .page-main .bg-content {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 100px;
        width: 750px;
        background: #43d8dc url('../assets/bg.png') no-repeat bottom center;
        background-size: 750px;
    }
    
    .page-main .bg-content .bg2 {
        position: absolute;
        right: 0;
        bottom: 675px;
        width: 265px;
        height: 283px;
        background: url('../assets/bg-2.png') no-repeat top center;
        background-size: 265px;
    }
    
    .bg-content .my-head {
        position: absolute;
        top: 21px;
        left: 28px;
        width: 408px;
        height: 108px;
        border-radius: 54px;
    }
    
    .bg-content .my-head:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 364px;
        height: 142px;
        background-image:url(../assets/my-head-bg.png);
        background-size:364px;
        background-repeat: no-repeat;
        background-position: top center;
    }
    
    .bg-content .my-head img {
        position: absolute;
        left: 15px;
        top: 15px;
        width: 110px;
        height: 110px;
        border-radius: 55px;
    }
    
    .bg-content .my-head .process {
        display: none;
        position: absolute;
        left: 105px;
        top: 78px;
        width: 128px;
        height: 17px;
        background: #000;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .bg-content .my-head .process-bg {
        width: 100%;
        height: 100%;
        background: url('../assets/process.png') no-repeat 0 0;
        background-size: 130px;
    }
    
    .bg-content .my-head .nickname {
        position: absolute;
        bottom: -83px;
        left: 30px;
        font-size: 20px;
        line-height: 33px;
        padding: 0 5px;
        color: #fff;
    }
    
    .bg-content .my-head .nickname:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .7;
        border-radius: 8px;
    }
    
    .bg-content .nickname i {
        position: relative;
        z-index: 2;
    }
    
    .bg-content .my-jinbi {
        position: absolute;
        top: 50px;
        left: 193px;
        /*padding: 13px 0 13px 58px;*/
    }
    .bg-content .my-jinbi span {
        position: relative;
        display: inline-block;
        font-size: 26px;
        line-height: 40px;
        color: #fff;
        min-width: 118px;
        text-align: right;
        padding-right: 20px;
    }
    
    .bg-content .my-jinbi i {
        position: relative;
        z-index: 2;
        font-size: 30px;
        font-style: italic;
    }

    .bg-content .my-zs{
        position: absolute;
        top: 100px;
        left: 193px;
    }
    
    /*.bg-content .my-jinbi span:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 43px;
        background: #000;
        opacity: .47;
        border-top-right-radius: 22px;
        border-bottom-right-radius: 22px;
        box-shadow: 0 6px 3px rgb(19, 143, 165) inset;
    }*/
    
    .current-betting {
        position: relative;
        top: -36px;
    }
    
    .current-betting p[type="1"] {
        height: 20px;
    }
    
    .current-betting p[type="1"] img {
        width: 26px;
        height: 52px;
    }
    
    .current-betting p[type="2"] {
        position: relative;
        left: -7px;
        height: 36px;
    }
    
    .current-betting p[type="2"] img {
        width: 43px;
        height: 71px;
    }
    
    .current-betting p[type="3"] {
        position: relative;
        left: -15px;
        height: 37px;
    }
    
    .current-betting p[type="3"] img {
        width: 59px;
        height: 74px;
    }
    
    .current-betting p[type="4"] {
        position: relative;
        left: -20px;
        height: 57px;
    }
    
    .current-betting p[type="4"] img {
        width: 63px;
        height: 114px;
    }
    
    .current-betting p[type="5"] {
        position: relative;
        left: -35px;
        height: 80px;
    }
    
    .current-betting p[type="5"] img {
        width: 111px;
        height: 165px;
    }
    
    .current-betting p[type="6"] {
        position: relative;
        left: -40px;
        height: 80px;
    }
    
    .current-betting p[type="6"] img {
        width: 98px;
        height: 189px;
    }
    
    .current-betting p[type="7"] {
        position: relative;
        left: -50px;
        height: 145px;
    }
    
    .current-betting p[type="7"] img {
        width: 125px;
        height: 291px;
    }
    
    .jinbi-group {
        position: absolute;
        top: 0px;
        left: 120px;
        width: 72px;
        height: 70px;
    }
    
    .jinbi-group p {
        position: absolute;
        top: 0px;
        width: 72px;
        height: 70px;
        background: url('../assets/jinbi-1.png') no-repeat top center;
    }
    
    .jinbi-enter-active {
        animation: bounce-in .9s forwards;
    }
    
    @-webkit-keyframes bounce-in {
        0% {
            /*display: block;*/
            opacity: 1;
            -webkit-transform: translateY(150px) scale(0.5);
            transform: translateY(150px) scale(0.5);
        }
        100% {
            -webkit-transform: translateY(0) scale(1);
            transform: translateY(0) scale(1);
            /*display: none;*/
            opacity: 0;
        }
    }
    
    @keyframes bounce-in {
        0% {
            opacity: 1;
            -webkit-transform: translateY(150px) scale(0.5);
            transform: translateY(150px) scale(0.5);
        }
        100% {
            -webkit-transform: translateY(0) scale(1);
            transform: translateY(0) scale(1);
            opacity: 0;
        }
    }
    
    .bg-content .page-plus {
        position: absolute;
        top: 80px;
        left: 375px;
        color: #fff;
        font-size: 48px;
        line-height: 48px;
        color: #fff;
        font-style: italic;
        text-shadow: 5px 0 3px #27a6c2;
    }
    
    .bg-content .page-plus img {
        position: relative;
        top: -5px;
        width: 28px;
        height: 28px;
    }
    
    .bg-content .page-toast {
        position: absolute;
        top: 215px;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 80px;
        overflow: hidden;
    }
    
    .bg-content .page-toast>div {
        position: relative;
        width: 664px;
        height: 80px;
        overflow: hidden;
        line-height: 80px;
        color: #fff;
        margin: 0 auto;
    }
    
    .bg-content .page-toast .msg {
        position: relative;
        z-index: 2;
        display: inline-block;
        width: 660px;
        text-align: center;
        text-align: center;
        font-size: 24px;
    }
    
    .bg-content .msg-content {
        position: relative;
        z-index: 2;
        width: 10000px;
    }
    
    .bg-content .page-toast>div:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        border-radius: 40px;
        opacity: 0.6;
    }
    
    .toast-fadein-enter-active {
        animation: toast-in .5s;
    }
    
    .toast-fadein-leave-active {
        animation: toast-out .5s;
    }
    
    @-webkit-keyframes toast-in {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        50% {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
    
    @keyframes toast-in {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        50% {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
    
    @-webkit-keyframes toast-out {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        50% {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
    }
    
    @keyframes toast-out {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        50% {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
    }
    
    .bg-content .page-lottery {
        position: fixed;
        bottom: 933px;
        left: 0;
        z-index: 3;
        width: 302px;
        height: 65px;
        background: url('../assets/lottery_bg.png') no-repeat bottom center;
        background-size: 302px;
        font-size: 60px;
        color: #fff;
    }
    
    .bg-content .page-lottery.more {
        background: url('../assets/lottery_bg2.png') no-repeat bottom center;
        background-size: 302px;
    }
    
    .bg-content .page-lottery p {
        padding-left: 10px;
        padding-top: 20px;
        font-style: italic;
        font-weight: bold;
        text-shadow: 0 0 20px #3f7119;
        -webkit-text-stroke: 1px #3f7119;
    }
    
    .bg-content .page-lottery.more p {
        padding-top: 10px;
        text-shadow: 0 0 20px #af772a;
        -webkit-text-stroke: 1px #af772a;
    }
    
    .bg-content .page-lottery.more strong {
        font-weight: bold;
        font-size: 70px;
    }
    
    .yugan-block {
        position: absolute;
        right: 0;
        bottom: 781px;
        opacity: 0;
    }
    
    .yugan-block.active {
        -webkit-animation: rotateInDownRight .3s forwards linear;
        animation: rotateInDownRight .3s forwards linear;
    }
    
    .yugan-block.active .yuxian-bg {
        -webkit-animation: slideInDown .2s .3s forwards linear;
        animation: slideInDown .2s .3s forwards linear;
    }
    
    .yugan-block.active .yuer {
        -webkit-animation: fadeIn .1s .3s forwards linear;
        animation: fadeIn .1s .3s forwards linear;
    }
    
    .yugan-block.geted {
        -webkit-transform-origin: right bottom;
        transform-origin: right bottom;
        -webkit-transform: none;
        transform: none;
        opacity: 1;
        -webkit-animation: rotateOutUpRight .3s .3s forwards linear;
        animation: rotateOutUpRight .3s .3s forwards linear;
    }
    
    .yugan-block.geted .yuxian-bg {
        height: 100%;
        -webkit-animation: slideOutUp .2s forwards linear;
        animation: slideOutUp .2s forwards linear;
    }
    
    .yugan-block.geted .yuer,
    .yugan-block.geted img {
        opacity: 1;
        -webkit-animation: fadeOut .1s .3s forwards linear;
        animation: fadeOut .1s .3s forwards linear;
    }
    
    .yugan-block .yugan {
        width: 418px;
        height: 66px;
        background: url('../assets/yugan.png') no-repeat top center;
        background-size: 418px;
    }
    
    .yugan-block .yuxian {
        position: absolute;
        top: 55px;
        left: -5px;
        width: 17px;
        height: 303px;
    }
    
    .yugan-block .yuxian-bg {
        position: relative;
        min-height: 35px;
        background: url('../assets/yuxian.png') no-repeat bottom center;
        background-size: 17px;
    }
    
    .yugan-block .yuer {
        position: absolute;
        bottom: 0;
        left: -26px;
        display: block;
        width: 92px;
        height: 72px;
        background: url('../assets/yuer.png') no-repeat bottom center;
        background-size: 92px;
        opacity: 0;
    }
    
    .yugan-block .yuer.qiuyin {
        left: -26px;
        display: block;
        width: 76px;
        height: 60px;
        background: url('../assets/yuer-2.png') no-repeat bottom center;
        background-size: 76px;
    }
    
    .yugan-block .yuer.wuzei {
        left: -16px;
        bottom: -15px;
        display: block;
        width: 53px;
        height: 67px;
        background: url('../assets/yuer-3.png') no-repeat bottom center;
        background-size: 53px;
    }
    
    .yugan-block .yuer.haixing {
        left: -26px;
        bottom: -15px;
        display: block;
        width: 65px;
        height: 66px;
        background: url('../assets/yuer-4.png') no-repeat bottom center;
        background-size: 65px;
    }
    
    .yugan-block .yuer.star {
        position: absolute;
        bottom: -5px;
        left: -26px;
        display: block;
        width: 71px;
        height: 67px;
        background: url('../assets/star.png') no-repeat bottom center;
        background-size: 71px;
        opacity: 0;
    }
    
    .yugan-block .yuxian>img {
        transform: rotateZ(-90deg);
    }
    
    .fish-list {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 720px;
        overflow: hidden;
    }
    
    .fish-list p {
        position: absolute;
        left: 0;
        opacity: 0
    }
    
    .fish-list p span.icon-heart {
        position: absolute;
        top: -36px;
        right: -44px;
        display: block;
        width: 44px;
        height: 36px;
        background: url('../assets/heart.png') no-repeat left top;
        background-size: 44px;
    }
    
    .fish-list p span.icon-miss {
        position: absolute;
        top: -36px;
        right: -44px;
        display: block;
        width: 44px;
        height: 36px;
        background: url('../assets/no-heart.png') no-repeat left top;
        background-size: 44px;
    }
    .fish-list strong{
        display: block;
        /*background: #fff;*/
    }
    strong.item-1 {
        width: 51px;
        height: 24px;
        background-image:url(../assets/yu-1.png);
        background-size:51px;
        animation: item1 0.6s ease infinite;
    }
    @keyframes item1{
        from {
            background-image:url(../assets/yu-1.png);
        }
        to {
            background-image:url(../assets/yu-1-2.png);
        }
    }
    strong.item-2 {
        width: 71px;
        height: 43px;
        background-image:url(../assets/yu-2.png);
        background-size:71px;
        animation: item2 0.6s ease infinite;
        
    }
    @keyframes item2{
        from {
            background-image:url(../assets/yu-2.png);
        }
        to {
            background-image:url(../assets/yu-2-2.png);
        }
    }
    strong.item-3 {
        width: 74px;
        height: 60px;
        background-image:url(../assets/yu-3.png);
        background-size:74px;
        animation: item3 0.6s ease infinite;
        
    }
    @keyframes item3{
        from {
            background-image:url(../assets/yu-3.png);
        }
        to {
            background-image:url(../assets/yu-3-2.png);
        }
    }
    
    strong.item-4 {
        width: 114px;
        height: 63px;
        background-image:url(../assets/yu-4.png);
        background-size:114px;
        animation: item4 0.6s ease infinite;
        
    }
    @keyframes item4{
        from {
            background-image:url(../assets/yu-4.png);
        }
        to {
            background-image:url(../assets/yu-4-2.png);
        }
    }
    strong.item-5 {
        width: 165px;
        height: 111px;
        background-image:url(../assets/yu-5.png);
        background-size:165px;
        animation: item5 0.6s ease infinite;
        
    }
    @keyframes item5{
        from {
            background-image:url(../assets/yu-5.png);
        }
        to {
            background-image:url(../assets/yu-5-2.png);
        }
    }
    strong.item-6 {
        width: 189px;
        height: 99px;
        background-image:url(../assets/yu-6.png);
        background-size:189px;
        animation: item6 0.6s ease infinite;
        
    }
    @keyframes item6{
        from {
            background-image:url(../assets/yu-6.png);
        }
        to {
            background-image:url(../assets/yu-6-2.png);
        }
    }
    strong.item-7 {
        width: 291px;
        height: 125px;
        background-image:url(../assets/yu-7.png);
        background-size:291px;
        animation: item7 0.6s ease infinite;
        
    }
    @keyframes item7{
        from {
            background-image:url(../assets/yu-7.png);
        }
        to {
            background-image:url(../assets/yu-7-2.png);
        }
    }
    
    .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 108px;
        background: url('../assets/muban.png');
        background-size: 750px;
    }
    
    .bottom-nav .butn-chugan {
        position: absolute;
        left: 326px;
        bottom: 0;
        width: 168px;
        height: 141px;
        background: url('../assets/chugan.png') no-repeat top center;
        background-size: 168px;
        text-align: center;
    }
    
    .bottom-nav .butn-chugan .icon-bg {
        display: block;
        position: absolute;
        bottom: 22px;
        left: 27px;
        width: 114px;
        height: 112px;
        overflow: hidden;
    }
    
    .bottom-nav .butn-chugan i {
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        background: url('../assets/chugan-bg.png') no-repeat bottom center;
        background-size: 114px;
    }
    
    .bottom-nav .butn-chugan img {
        position: relative;
        width: 77px;
        height: 40px;
        margin-top: 40px;
    }
    
    .bottom-nav .butn-tuoguan {
        position: absolute;
        right: 53px;
        bottom: 5px;
        margin-left: -84px;
        width: 100px;
        height: 86px;
        background: url('../assets/tuoguan.png') no-repeat top center;
        background-size: 100px;
    }
    
    .bottom-nav .label-jinbi {
        position: absolute;
        left: 48px;
        bottom: 18px;
        min-width: 250px;
        height: 70px;
    }
    
    .bottom-nav .label-jinbi:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 73px;
        height: 70px;
        background: url('../assets/jinbi-2.png') no-repeat top left;
        background-size: 73px;
    }
    
    .bottom-nav .label-jinbi span {
        position: relative;
        top: 8px;
        display: inline-block;
        min-width: 140px;
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 73px;
        line-height: 55px;
        color: #fff;
        text-align: center;
        font-size: 60px;
    }
    
    .bottom-nav .label-jinbi span:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #5f3015;
        opacity: .6;
        border-radius: 30px;
        box-shadow: 0 10px 5px rgb(51, 39, 6) inset;
    }
    
    .bottom-nav .label-jinbi i {
        position: relative;
        z-index: 2;
        padding-right: 15px;
        font-size: 46px;
        font-style: italic;
    }
    
    .bottom-nav .label-jinbi i:after {
        content: '';
        display: inline-block;
        position: relative;
        top: -8px;
        left: 10px;
        width: 28px;
        height: 21px;
        background: url('../assets/up.png') no-repeat center center;
        background-size: 28px;
    }
    
    .tips-mask {
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        width: 100%;
        background: #000;
        z-index: 2;
        opacity: 0;
    }
    
    .bottom-tips {
        position: fixed;
        bottom: 115px;
        left: 20px;
        z-index: 3;
        width: 296px;
        height: 279px;
        padding-top: 22px;
        background: url('../assets/bizhikuang.png') no-repeat left top;
        background-size: 296px;
    }
    
    .bottom-tips p {
        text-align: right;
        line-height: 56px;
        color: #fff;
        font-size: 36px;
        padding-right: 50px;
        font-style: italic;
        text-shadow: 5px 0 3px #6c3c19;
    }
    
    .bottom-tips p .icon-jinbi {
        width: 36px;
        height: 32px;
    }
    
    .bottom-tips p .icon-seleted {
        width: 44px;
        height: 36px;
        margin-right: 15px;
    }
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s
    }
    
    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active in <2.1.8 */
    
    {
        opacity: 0
    }
    
    .auto-mask {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        opacity: 0;
        z-index: 10;
    }
    
    .auto-block {
        z-index: 11;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 149px;
    }
    
    .auto-block:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: #000;
        opacity: .6;
    }
    
    .auto-block .butn-auto {
        position: relative;
        display: block;
        margin: 24px auto 0;
        width: 195px;
        height: 113px;
        background: url('../assets/butn-tuoguan.png') no-repeat top center;
        background-size: 195px;
    }
    
    @-webkit-keyframes rotateInDownRight {
        from {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, 45deg);
            transform: rotate3d(0, 0, 1, 45deg);
            opacity: 0;
        }
        to {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    }
    
    @keyframes rotateInDownRight {
        from {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, 45deg);
            transform: rotate3d(0, 0, 1, 45deg);
            opacity: 0;
        }
        to {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    }
    
    @-webkit-keyframes rotateOutUpRight {
        from {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            opacity: 1;
        }
        to {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, 90deg);
            transform: rotate3d(0, 0, 1, 90deg);
            opacity: 0;
        }
    }
    
    @keyframes rotateOutUpRight {
        from {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            opacity: 1;
        }
        to {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, 90deg);
            transform: rotate3d(0, 0, 1, 90deg);
            opacity: 0;
        }
    }
    
    @-webkit-keyframes slideInDown {
        from {
            height: 0;
        }
        to {
            height: 100%;
        }
    }
    
    @keyframes slideInDown {
        from {
            height: 0;
        }
        to {
            height: 100%;
        }
    }
    
    @-webkit-keyframes slideOutUp {
        from {
            height: 100%;
        }
        to {
            height: 0;
        }
    }
    
    @keyframes slideOutUp {
        from {
            height: 100%;
        }
        to {
            height: 0;
        }
    }
    
    @-webkit-keyframes process-loading {
        from {
            width: 0;
        }
        to {
            width: 90%;
        }
    }
    
    @keyframes process-loading {
        from {
            width: 0;
        }
        to {
            width: 90%;
        }
    }
    
    @-webkit-keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @-webkit-keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .mint-msgbox-wrapper .mint-msgbox {
        border-radius: 15px;
    }
    
    .mint-msgbox .mint-msgbox-title {
        font-size: 32px;
        line-height: 60px;
    }
    
    .mint-msgbox .mint-msgbox-message {
        font-size: 32px;
        line-height: 60px;
    }
    
    .mint-msgbox .mint-msgbox-btn {
        font-size: 32px;
        line-height: 60px;
    }
    
    .mint-msgbox .mint-msgbox-btns {
        height: 60px;
    }
    
    .chugan-toast.mint-toast.is-placetop {
        top: 50px;
        border-radius: 15px;
    }
    
    .chugan-toast.mint-toast .mint-toast-text {
        font-size: 32px;
        line-height: 46px;
        padding: 0 20px;
    }
    
    .butn-rule-home {
        position: absolute;
        top: 36px;
        right: 28px;
        width: 89px;
        height: 86px;
        background: url('../assets/butn-rule-home.png') no-repeat top center;
        background-size: 89px;
    }
    
    .butn-coupon-home {
        position: absolute;
        top: 36px;
        right: 165px;
        width: 91px;
        height: 86px;
        background-image: url('../assets/caishen/icon-router.png');
        background-size: 91px;
        background-repeat: no-repeat;
        background-position: top center;
    }
    
    .lottery-tips {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
    }
    
    .lottery-tips .mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .6);
    }
    
    .lottery-tips .content {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -336px;
        margin-top: -393px;
        width: 672px;
        height: 786px;
        background: url('../assets/dialog-box.png') no-repeat 0 0;
        background-size: 672px;
        text-align: center;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    
    .lottery-tips .content .icon-star {
        display: block;
        position: absolute;
        bottom: 0;
        left: 55px;
        width: 184px;
        height: 183px;
        background: url('../assets/icon-star.png') no-repeat 0 0;
        background-size: 184px;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-duration: .75s;
        animation-duration: .75s;
        -webkit-animation-name: bounceIn;
        animation-name: bounceIn;
    }
    
    .lottery-tips .content .icon-star-2 {
        display: block;
        position: absolute;
        bottom: 0;
        right: 55px;
        width: 184px;
        height: 183px;
        background: url('../assets/icon-star.png') no-repeat 0 0;
        background-size: 184px;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-duration: .75s;
        animation-duration: .75s;
        -webkit-animation-name: bounceIn;
        animation-name: bounceIn;
    }
    
    .lottery-tips .content .num-0,
    .lottery-tips .content .num-1,
    .lottery-tips .content .num-2,
    .lottery-tips .content .num-3,
    .lottery-tips .content .num-4,
    .lottery-tips .content .num-5,
    .lottery-tips .content .num-6,
    .lottery-tips .content .num-7,
    .lottery-tips .content .num-8,
    .lottery-tips .content .num-9 {
        display: inline-block;
        margin-top: 60px;
        width: 100px;
        height: 172px;
        background-size: 100px;
        background-repeat: no-repeat;
        background-position: 0 0;
    }
    
    .lottery-tips .content .num-0 {
        background-image: url('../assets/num-0.png');
        background-size: 127px;
        width: 127px;
    }
    
    .lottery-tips .content .num-1 {
        background-image: url('../assets/num-1.png');
        background-size: 81px;
        width: 81px;
    }
    
    .lottery-tips .content .num-2 {
        background-image: url('../assets/num-2.png');
        background-size: 118px;
        width: 118px;
    }
    
    .lottery-tips .content .num-3 {
        background-image: url('../assets/num-3.png');
        background-size: 121px;
        width: 121px;
    }
    
    .lottery-tips .content .num-4 {
        background-image: url('../assets/num-4.png');
        background-size: 123px;
        width: 123px;
    }
    
    .lottery-tips .content .num-5 {
        background-image: url('../assets/num-5.png');
        background-size: 121px;
        width: 121px;
    }
    
    .lottery-tips .content .num-6 {
        background-image: url('../assets/num-6.png');
        background-size: 120px;
        width: 120px;
    }
    
    .lottery-tips .content .num-7 {
        background-image: url('../assets/num-7.png');
        background-size: 117px;
        width: 117px;
    }
    
    .lottery-tips .content .num-8 {
        background-image: url('../assets/num-8.png');
        background-size: 121px;
        width: 121px;
    }
    
    .lottery-tips .content .num-9 {
        background-image: url('../assets/num-9.png');
        background-size: 120px;
        width: 120px;
    }
    
    .lottery-tips.bounceIn .content {
        -webkit-animation-duration: .75s;
        animation-duration: .75s;
        -webkit-animation-name: bounceIn;
        animation-name: bounceIn;
    }
    
    @-webkit-keyframes bounceIn {
        from,
        20%,
        40%,
        60%,
        80%,
        to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        0% {
            opacity: 0;
            -webkit-transform: scale3d(.3, .3, .3);
            transform: scale3d(.3, .3, .3);
        }
        20% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1);
            transform: scale3d(1.1, 1.1, 1.1);
        }
        40% {
            -webkit-transform: scale3d(.9, .9, .9);
            transform: scale3d(.9, .9, .9);
        }
        60% {
            opacity: 1;
            -webkit-transform: scale3d(1.03, 1.03, 1.03);
            transform: scale3d(1.03, 1.03, 1.03);
        }
        80% {
            -webkit-transform: scale3d(.97, .97, .97);
            transform: scale3d(.97, .97, .97);
        }
        to {
            opacity: 1;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    
    @keyframes bounceIn {
        from,
        20%,
        40%,
        60%,
        80%,
        to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        0% {
            opacity: 0;
            -webkit-transform: scale3d(.3, .3, .3);
            transform: scale3d(.3, .3, .3);
        }
        20% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1);
            transform: scale3d(1.1, 1.1, 1.1);
        }
        40% {
            -webkit-transform: scale3d(.9, .9, .9);
            transform: scale3d(.9, .9, .9);
        }
        60% {
            opacity: 1;
            -webkit-transform: scale3d(1.03, 1.03, 1.03);
            transform: scale3d(1.03, 1.03, 1.03);
        }
        80% {
            -webkit-transform: scale3d(.97, .97, .97);
            transform: scale3d(.97, .97, .97);
        }
        to {
            opacity: 1;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    
    .baoxiang-1 {
        position: absolute;
        top: 265px;
        left: 12px;
        width: 276px;
        height: 261px;
    }
    
    .baoxiang-1 .bg {
        width: 276px;
        height: 261px;
        background: url('../assets/guanxian-1.png') no-repeat 0 0;
        background-size: 276px;
        animation: rotateIn 5s infinite;
        -webkit-animation: rotateIn 5s infinite;
    }
    
    .baoxiang-1 .box {
        position: absolute;
        top: 80px;
        left: 45px;
        width: 144px;
        height: 110px;
        background: url('../assets/baoxiang.png') no-repeat 0 0;
        background-size: 144px;
    }
    
    .baoxiang-2 {
        position: absolute;
        top: 500px;
        left: 0;
        width: 449px;
        height: 358px;
    }
    
    .baoxiang-2 .bg {
        width: 449px;
        height: 358px;
        background: url('../assets/guanxian-1.png') no-repeat 0 0;
        background-size: 449px;
        animation: rotateIn 5s infinite;
        -webkit-animation: rotateIn 5s infinite;
    }
    
    .baoxiang-2 .box {
        position: absolute;
        top: 140px;
        left: 125px;
        width: 197px;
        height: 150px;
        background: url('../assets/baoxiang.png') no-repeat 0 0;
        background-size: 197px;
    }
    
    @-webkit-keyframes rotateIn {
        from {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform: rotate3d(0, 0, 1, -200deg);
            transform: rotate3d(0, 0, 1, -200deg);
            opacity: 0;
        }
        to {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    }
    
    @keyframes rotateIn {
        from {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform: rotate3d(0, 0, 1, -200deg);
            transform: rotate3d(0, 0, 1, -200deg);
            opacity: 0;
        }
        to {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    }
</style>