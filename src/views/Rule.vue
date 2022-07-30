<template>
    <div class="page-rule">
        <div class="page-rule-content">
        
        </div>
        <router-link tag="div" to="/" class="butn-rule" ></router-link>  

    </div>
</template>

<style lang="css">
    .page-rule{
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        width:100%;
        z-index:100;
        background:#1fd2db;
        color:#fff;
        overflow:auto;
         transition: all ease-out .2s;
         -webkit-overflow-scrolling: touch;
    }
     .page-rule .page-rule-content{
         width:750px;
         height:2370px;
         background:url('../assets/rule.jpg') no-repeat top center;
         background-size:750px;
     }
     .page-rule  .butn-rule{
         width:214px;
         height:124px;
         margin:25px auto;
         background:url('../assets/rule-butn.png') no-repeat top center;
         background-size:214px;
     }
</style>