<template>
    <div class="dialog-caishen" v-show="visible" >
        <div class="content">
            <div class="shine-bg js-shine-bg"></div>
            <div class="caishen-bg js-caishen-bg">
                <a href="javascript:;" class="caishen-box-left" @click="openBox"></a> 
                <a href="javascript:;" class="caishen-box-right" @click="openBox"></a> 
            </div>
            <div :class="boxClass" >
                <span :class="stepClass"></span>
            </div>
            <div class="box-lotteryed">
                <div class="quan-lotteryed">
                    <span class="label-type">购物券</span>
                    <span class="label-zimu">A</span>
                    <span class="label-text">券</span>
                    <strong class="label-money">19999</strong>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            visible: Boolean
        },
        data(){
            return {
                isMoving: false,
                step:0
            }
        },
        computed: {
            boxClass(){
                return this.isMoving ? 'box-move opening' : 'box-move';
            },
            stepClass(){
                
                return this.step == 0 ? ' ' : 'step'+ this.step;
            }
        },
        methods:{
            openBox(e){
                var self = this;
                var elem = $(e.target);
                var timer = null;
                // elem.addClass('active');
                this.isMoving = true;
                $('.js-caishen-bg').velocity({
                    opacity:0
                });
                $('.js-shine-bg').hide();
                setTimeout( function () {
                    // $('.js-box').addClass('step1');
                    timer = setInterval( function () {  
                        self.step += 1;   
                        if (self.step > 3) {
                            self.step = 3;
                            clearInterval(timer);
                            return;
                        }                     
                    },150);
                }, 400)
            }
        }
    }
</script>
<style>
    .dialog-caishen{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        width:100%;
        z-index:100;
        background: rgba(0, 0, 0, 0.6);
    }
    .dialog-caishen .shine-bg{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:1050px;
        background-image:url('../../assets/caishen/caishen-shine.png');
        background-size:750px;
        background-repeat:no-repeat;
        background-position:top center;
        animation: shine .9s infinite;
        -webkit-animation: shine .9s infinite;
    }
    .dialog-caishen .content{
        position:absolute;
        top:0;
        left:0;
        width:100%;
    }
    .dialog-caishen .caishen-bg{
        position:relative;
        margin-top:90px;
        width:750px;
        height:950px;
        background-image:url('../../assets/caishen/caishen.png');
        background-size:750px;
        background-repeat:no-repeat;
        background-position:top center;
    }
    .dialog-caishen .caishen-box-left{
        position:absolute;
        top:437px;
        left:120px;
        display:block;
        width:218px;
        height:190px;
        transition:all .5s ease;
        -webkit-transition:all .5s ease;
    }
    .dialog-caishen .caishen-box-right{
        position:absolute;
        top:437px;
        left:392px;
        display:block;
        width:218px;
        height:190px;
    }
    .dialog-caishen .box-move{
        position:absolute;
        top:530px;
        left:120px;
        width:225px;
        height:187px;
        opacity:0;
        display:none;
    }
    .dialog-caishen .box-move span{
        display:block;
        margin-left:-15px;
        width:225px;
        height:187px;
        background-image:url('../../assets/caishen/caishen-box.png');
        background-size:225px;
        background-repeat:none;
        background-position: bottom center;
    }   
    .dialog-caishen .box-move.opening{
        display:block;
        animation: openBox 0.3s forwards;
        -webkit-animation: openBox 0.3s forwards;
    }
    .dialog-caishen .box-move span.step1{
        width:510px;
        height:276px;
        margin-top:-89px;
        margin-left:-155px;
        background-image:url('../../assets/caishen/box-open-1.png');
        background-size:510px;
    }
    .dialog-caishen .box-move span.step2{
        width:510px;
        height:276px;
        margin-top:-89px;
        margin-left:-155px;
        background-image:url('../../assets/caishen/box-open-2.png');
        background-size:510px;
    }
    .dialog-caishen .box-move span.step3{
        width:510px;
        height:276px;
        margin-top:-89px;
        margin-left:-155px;
        background-image:url('../../assets/caishen/box-open-3.png');
        background-size:510px;
    }
    .dialog-caishen .box-lotteryed{
        display:none;
        position: absolute;
        top:178px;
        width:750px;
        height:599px;
        background-image:url('../../assets/caishen/box-quan.png');
        background-size:750px;
        background-repeat:none;
        background-position: bottom center;
    }
    .dialog-caishen .quan-lotteryed{
        position:relative;
        width:563px;
        height:190px;
        margin:210px auto 0;
        background-image: url('../../assets/caishen/quan-bg.png');
        background-size:563px;
        background-repeat:none;
        background-position: bottom center;
    }
    .dialog-caishen .quan-lotteryed .label-type{
        position:absolute;
        top:39px;
        left:47px;
        display:block;
        font-size: 24px;
        color: rgb(255, 246, 182);
        line-height:28px;
        border-radius: 2px;
        padding:5px 0;
        background-color: #eedc87;
        width: 44px;
        text-align:center;
    }
    .dialog-caishen .quan-lotteryed .label-money{
        display:block;
        position:absolute;
        top:38px;
        right:59px;
        width:255px;
        text-align:left;
        font-size: 96px;
        line-height:96px;
        color: rgb(154, 76, 6);
        font-weight: bold;
    }
    .dialog-caishen .quan-lotteryed .label-zimu{
        position:absolute;
        top:38px;
        left:115px;
        line-height:70px;
        color: rgb(183, 163, 37);
        font-size: 70px;
    }
    .dialog-caishen .quan-lotteryed .label-text{
        position:absolute;
        top:45px;
        left:165px;
        line-height:32px;
        font-size: 32px;
        color: rgb(183, 163, 37);

    }
    @-webkit-keyframes shine {
    0% {
       opacity:1;
    }
    25% {
       opacity:0.3;
    }
    50% {
       opacity:1;

    }
    100% {
         opacity:.6;
    }
    }
     @keyframes shine{
    0% {
       opacity:1;
    }
    25% {
       opacity:0.3;
    }
    50% {
       opacity:1;
    }
    100% {
         opacity:.6;
    }
    }
    @-webkit-keyframes openBox {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;    
            left:50%;
            margin-left:-113px;                          
        }
    }
    @keyframes openBox {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;   
            left:50%;
            margin-left:-113px;                           
        }
    }
</style>