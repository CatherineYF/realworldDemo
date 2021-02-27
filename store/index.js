const cookieParser = process.server?require('cookieparser'):null
const state = ()=>{
    return {
        user:null
    }
}

const mutations = {
    setUser (state,value){
        state.user = value
    }
}

const actions = {
    nuxtServerInit({commit},{req}){
        let user = null
        if(req.headers.cookie){
            const parsed = cookieParser.parse(req.headers.cookie)
            try{
                user = JSON.parse(parsed.user)
            }catch(err){

            }
        }
        commit('setUser',user)
    }
}

export {
    state,
    mutations,
    actions
}