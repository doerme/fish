<template>
    <div class="page-coupon">
        <p class="no-more" v-show="list.length == 0">还没获取到优惠券哦~</p> 
        <ul v-show="list.length">
            <li v-for="item in list" :class="[item.status == 2 ? 'gray':'']">
                <span class="label-money">{{item.max_value}}</span>
                <span class="label-type">{{item.name}}</span>
                <span class="label-text">券</span>
                <span class="label-info">{{item.remark}}</span>
                 <span class="icon-used"></span>
            </li>
        </ul> 
    </div>
</template>
 
<script>
import { MessageBox,Toast } from 'mint-ui';
export default {
    name: 'page-coupon',
    data() {
        return {
            list:[]
        };
    },
    created(){
        this.ajaxList();
    },
    methods:{
        ajaxList(){
            var self =this;
            // self.list =[
            //     {
            //         code:'xxx',
            //         name:'A',
            //         remark:'说明',
            //         max_value:129,
            //         status:1
            //     },
            //     {
            //         code:'xxx',
            //         name:'A',
            //         remark:'说明',
            //         max_value:129,
            //         status:2
            //     }
            // ];
            $.ajax({
                url: "/api/coupon/userCoupon",
                dataType: "json",
                type:'GET',                   
                success: function (res) {
                    // console.log(res);
                    if(res.code == 0){
                        self.list = res.data;
                    }else{
                        Toast({
                            message: res.msg,
                            position: 'top',
                            duration: 2000,
                            className:'chugan-toast'
                        });
                    }
                }
            });
        }
    }
};
</script>

<style>
    .page-coupon{
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        width:100%;
        z-index:100;
        background:#f8f8f8;
        overflow:auto;
    }
    .page-coupon .no-more{
        position:absolute;
        top:50%;
        left:0;
        width:100%;
        margin-top:-14px;
        font-size:28px;
        line-height:28px;
        text-align:center;
    }
    .page-coupon ul{
        padding: 57px 0;
    }
    .page-coupon ul li{
        position:relative;
        height:260px;
        width:673px;
        margin:0 auto 48px;
        background-image:url('../assets/caishen/coupon-active.png');
        background-size:673px;
    }
    .page-coupon ul li.gray{
        background-image:url('../assets/caishen/coupon-gray.png');
    }
    .page-coupon li .label-money{
        font-size: 110px;
        color: rgb(154, 76, 6);
        font-weight: bold;
        line-height: 1.2;
        position: absolute;
        left: 266px;
        top: 30px;
    }
    .page-coupon li.gray .label-money{
        color:#9a4c06;
    }
    .page-coupon li .label-type{
        font-size: 80px;
        color: rgb(183, 163, 37);
        line-height: 80px;
        position: absolute;
        font-weight:bold;
        left: 70px;
        top: 45px;
    }
    .page-coupon li.gray .label-type{
        color:#a4a4a4;
    }
    .page-coupon li .label-text{
        font-size: 44px;
        color: rgb(183, 163, 37);
        line-height: 44px;
        position: absolute;
        left: 132px;
        top: 55px;
    }
    .page-coupon li.gray .label-text{
        color:#a4a4a4;
    }
    .page-coupon li .label-info{
        display:block;
        padding-top:181px;
        line-height:56px;
        font-size:28px;
        color:#797979;
        text-align:center;
    }
    .page-coupon li.gray .label-info{
        color:#a4a4a4;
    }
    .page-coupon li.gray .icon-used{
        position:absolute;
        top:28px;
        left:455px;
        width:175px;
        height:174px;
        background-image:url('../assets/caishen/is-used.png');
        background-size:175px;
        background-repeat:no-repeat;
        background-position:top center;
    }
</style>