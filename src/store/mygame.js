const state = {
    localgamelist: [],
    webgamelist: [],
    isFetching: 0
}

const mutations = {
    GETMYGAMES(state, data) {
        state.localgamelist = data.localgamelist;
        state.webgamelist = data.webgamelist;
        state.isFetching = data.isFetching;
    },
    ADDLOCAL(state, data) {
        let tmpGameList = state.localgamelist;
        let index = -1;
        if (tmpGameList.length) {
            index = tmpGameList.findIndex((v) => {
                return v.package == data.package || v.name == data.package;
            })
        }
        if (index < 0) {
            state.localgamelist.push(data);
        }


    },
    DELETELOCAL(state, data) {
        // state.localgamelist =[];
        // state.localgamelistLen = state.localgamelist.length;
        let index = state.localgamelist.findIndex((v) => {
            return v.package == data.package || v.name == data.package;
        })
        state.localgamelist.splice(index, 1);

    }
}

const actions = {
    getMygamesAsync({ commit }, data) {
        try {
            window.external.sendCommand("checkGameList");
        } catch (e) { }
        global.checkGameListAck = (d) => {
            var data = JSON.parse(decodeURIComponent(d));

            commit('GETMYGAMES', Object.assign(data, { isFetching: 2 }))
        }
    },
    addLocal({ commit }, data) {
        try {
            window.external.sendCommand("openSelectFile");
        } catch (e) { }

        global.finishInstallLocalApk = (d) => {
            var data = JSON.parse(decodeURIComponent(d));
            // filePath：文件路径
            // state:0 安装成功
            // type:0 商店已有的游戏 1：本地游戏
            if (data.state == 0) {
                if (data.type == 1) {
                    commit('ADDLOCAL', data);
                }

            }
        }
    },
    deleteLocal({ commit }, data) {
        try {
            if (data.type == 1) {
                commit('DELETELOCAL', { package: data.name })
            }
            var params = '{\"name\":\"' + data.name + '\",\"type\":\"' + data.type + '\"}';
            window.external.sendCommand("deleteGame", params);



        } catch (e) {
            console.log(e);
        }
    }
}

export default {
    state,
    mutations,
    actions
}