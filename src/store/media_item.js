import server from "../repository/server"

export default {
    //----------------------------------------------------------------------------------
    state: {
        media: null
    },

    //----------------------------------------------------------------------------------
    mutations: {
        SET_MEDIA(state, payload) {
            state.media = payload
        },
    },

    //----------------------------------------------------------------------------------
    actions: {
        CREATE_MEDIA({ commit, dispatch }, payload) {
            let formData = new FormData()
            formData.append('file', payload.file)
            formData.append('category', payload.category)
            formData.append('type', 'image')
            server.post("media", formData, { is_upload: true }, (response) => {
                if (response.data.success) {
                    commit("APPEND_MEDIA", response.data.success)
                    commit("SET_MEDIA_ID", response.data.success.id)
                    dispatch("SET_SUCCESS_MESSAGE", 'Image has been uploaded')
                }
            });
        },

        DELETE_MEDIA({ commit, dispatch }, payload) {
            server.delete("media/" + payload, () => {
                commit("DELETE_MEDIA_FROM_LIST", payload)
                dispatch("SET_SUCCESS_MESSAGE", 'Image has been deleted')
            })
        },

        LOAD_MEDIA() {
            /*
            server.delete("media/"+payload, () => {
                commit("DELETE_MEDIA_FROM_LIST", payload)
                dispatch("SET_SUCCESS_MESSAGE", 'Image has been deleted')
            })
            */
        }

    },

    //----------------------------------------------------------------------------------
    getters: {
        getMedia: (state) => state.media

    }
}