<template>
    <div class="page-myhoner">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">战绩</mt-tab-item>
            <mt-tab-item id="2">成就</mt-tab-item>
            <mt-tab-item id="3">消息</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <mt-cell title="标题文字" class="head-cell">
                    <span>妖币余额</span>
                    <span>1000</span>
                    <img slot="icon" :src="head">
                </mt-cell>
                <div class="honer-list">
                    <mt-cell  >
                        <span>累计收获</span>
                        <span>1000</span>
                        <img slot="icon" :src="head">
                    </mt-cell>
                    <mt-cell  >
                        <span>总杆数</span>
                        <span>1000</span>
                        <img slot="icon" :src="head">
                    </mt-cell>
                    <mt-cell  >
                        <span>成功率</span>
                        <span>1000</span>
                        <img slot="icon" :src="head">
                    </mt-cell>
                    <mt-cell  >
                        <span>稀有鱼数</span>
                        <span>1000</span>
                        <img slot="icon" :src="head">
                    </mt-cell>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="achievement-list">
                    <mt-cell  >
                        <p>个人成就 <span class="blue">专属于你的荣誉王座</span> </p>
                        <div class="process-list">
                            <div class="process"><p></p></div>
                            <span>0/5</span>
                        </div>
                        <img slot="icon" :src="head">
                    </mt-cell>
                    <mt-cell  >
                        <p>个人成就 <span class="blue">专属于你的荣誉王座</span> </p>
                        <div class="process-list">
                            <div class="process"><p></p></div>
                            <span>0/5</span>
                        </div>
                        <img slot="icon" :src="head">
                    </mt-cell>
                    <mt-cell  >
                        <p>个人成就 <span class="blue">专属于你的荣誉王座</span> </p>
                        <div class="process-list">
                            <div class="process"><p></p></div>
                            <span>0/5</span>
                        </div>
                        <img slot="icon" :src="head">
                    </mt-cell>
                    <mt-cell  >
                        <p>个人成就 <span class="blue">专属于你的荣誉王座</span> </p>
                        <div class="process-list">
                            <div class="process"><p></p></div>
                            <span>0/5</span>
                        </div>
                        <img slot="icon" :src="head">
                    </mt-cell>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div class="msg-list">
                    <mt-cell title="钓鱼惊爆1.25亿妖币巨奖！(10万...钓鱼惊爆1.25亿妖币巨奖！(10万...钓鱼惊爆1.25亿妖币巨奖！(10万..." value="2016-09-16"></mt-cell>
                    <mt-cell title="钓鱼惊爆1.25亿妖币巨奖！(10万..." value="2016-09-16"></mt-cell>
                    <mt-cell title="钓鱼惊爆1.25亿妖币巨奖！(10万..." value="2016-09-16"></mt-cell>
                    <mt-cell title="钓鱼惊爆1.25亿妖币巨奖！(10万..." value="2016-09-16"></mt-cell>
                    <mt-cell title="钓鱼惊爆1.25亿妖币巨奖！(10万..." value="2016-09-16"></mt-cell>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
   
<script>
import head from '../assets/head-img.png';
 export default {
    name: 'page-tes',
    data() {
        return {
            head,
            selected: '3'
        };
    }
};
</script>
<style lang="css">
    .page-myhoner{
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        width:100%;
        z-index:100;
        background:#1fd2db;
        color:#fff;
    }
    .mint-navbar .mint-tab-item{
        background:#5be1ea;
        padding:0;
    }
    .mint-navbar .mint-tab-item.is-selected{
        background:#0fc4d6;
        border-width:0;
        margin:0;
    }
    .mint-navbar .is-selected .mint-tab-item-label{
        color:#fff;
    }
    .mint-navbar .mint-tab-item-label{
        font-size:36px;
        line-height:94px;
        color:#22c2c6;
        border-top: 2px solid #94fffa;
        border-bottom: 2px solid #45dbe1;
    }
    .head-cell.mint-cell,.head-cell.mint-cell .mint-cell-wrapper{
        background:none;
        height:196px;
    }
    .head-cell img{
        width:120px;
        height:120px;
        border-radius:60px;
    }
    .head-cell .mint-cell-wrapper{
        padding-left:35px;
    }
    .head-cell .mint-cell-text{
        font-size:36px;
        color:#fff;
        margin-left:30px;
    }
    .head-cell .mint-cell-value{
        display:inline-block;

    }
    .head-cell .mint-cell-value span{
        display:block;
        margin-right:30px;
        text-align:right;
    }
    .head-cell .mint-cell-value span:nth-child(1){
        color:#007e9b;
        font-size:26px;
    }    
    .head-cell .mint-cell-value span:nth-child(2){
        color:#fff;
        font-size:36px;
        line-height:60px;
    }   
    .honer-list{
        padding:0 16px;
    }
    .honer-list:after{
        content:'';
        display:table;
        clear:both;
    } 
    .honer-list .mint-cell{
        float:left;
        width:355px;
        height:150px;
        background:#5be1ea;
        border-radius:15px;
        margin: 0 8px 15px 0;
        box-shadow: 0 5px 5px #18c0c4;
    }
    .honer-list .mint-cell-title{
        margin-left:30px;
        padding-top:25px;
    }
    .honer-list .mint-cell-title img{
        width:100px;
        height:100px;
        border-radius:50px;
    }
    .honer-list .mint-cell:nth-child(even){
        margin-right:0;
    }
    .honer-list .mint-cell-value{
        display:inline-block;
    }
    .honer-list .mint-cell-value span{
        display:block;
        margin-right:30px;
        text-align:right;
    }
    .honer-list .mint-cell-value span:nth-child(1){
        color:#007e9b;
        font-size:28px;
        padding-top:32px;
    }    
    .honer-list .mint-cell-value span:nth-child(2){
        color:#fff;
        font-size:32px;
        line-height:50px;
    }  
    .achievement-list{
        padding: 16px;   
    }
    .achievement-list .mint-cell{
        background:#5be1ea;
        height:149px;
        border-radius:15px;
        margin-bottom:20px;
        box-shadow:0 5px 5px #18c0c4;
    }
    .achievement-list .mint-cell-title{
        padding-top:28px;
        padding-left:35px;
    }
    .achievement-list .mint-cell-title > img{
        width:100px;
        height:100px;
        border-radius:50px;
    }
    .achievement-list .mint-cell-value{
        position:relative;
        top:-15px;
        width:560px;
        font-size:28px;
        color:#fff;
    }
    .achievement-list .mint-cell-value >p{
        display:block;
        width:100%;
    }
    .achievement-list .process-list{
        position:absolute;
        top:50px;
        left:0;
        width:410px;
        height:30px;
        padding:5px 4px ;
        background:url('../assets/achievement-process.png') no-repeat top center;
        background-size:418px;
    }
    .achievement-list .process-list .process{
        position:absolute;
        left:4px;
        top:5px;
        width:410px;
        height:28px;
        border-radius:14px;
    }
    .achievement-list  .process p{
        width:50%;
        height:28px;
        background:#5be1ea;
        border-radius:14px;
        background: -webkit-linear-gradient(#fff, #99cbd7, #5be1ea);
    }
    .achievement-list  .process-list span{
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .achievement-list .mint-cell-value .blue{
        color:#007e9b;
        display:inline-block;
        margin-left:15px;
    }
    .msg-list {
        padding: 0 25px;
    }
    .msg-list .mint-cell,.msg-list .mint-cell-wrapper{
        background:transparent;
        min-height:111px;
        line-height:32px;
    }
    .msg-list .mint-cell{
        border-bottom:2px solid #08c1c1;
        border-top:2px solid #5be1ea;
        font-size:;
    }
    .msg-list .mint-cell:nth-child(1){
        border-top:none;
    }
    .msg-list .mint-cell-wrapper{
        font-size:28px;
    }
    .msg-list .mint-cell-value{
        color:#52ffff;
    }
</style>