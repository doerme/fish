var MyPlugin = {};
MyPlugin.install = function(Vue, options) {
    /**
     * [$checkGameList 打开游戏]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    Vue.prototype.$playGame = (obj) =>{
          var params = '{\"name\":\"' + obj.code + '\",\"monitor\":\"' + (obj.monitor || 0 ) + '\",\"type\":\"' + (obj.type || 0 ) + '\",\"state\":\"' + (obj.ifshowtip || 0) + '\"}';
        window.external.sendCommand("playGame", params);

    }
   


}

export default MyPlugin;