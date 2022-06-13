import firebase from "firebase/app"
export default {
    actions: {
        async login({commit},{email, password}){
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('setError', e) // комит позволяет изменять state в store
                throw e
            }
        },
        async register ({dispatch, commit}, {email, password, name}) {
            try{
                await firebase.auth().createUserWithEmailAndPassword(email,password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    name: name,
                    email: email,
                    pasno: password
                })
            } catch (e) {
                commit('setError', e) // комит позволяет изменять state в store
                throw e
            }
        },
        async getBill({dispatch, commit},pasno)
        {
            const ApartamentId = (await firebase.database().ref(`/tenant/${pasno}/apartament`).once('value')).val() || {}
            console.log(ApartamentId)
            return ApartamentId
        },
        getUid(){
            const user = firebase.auth().currentUser // получения пользователя из бд
            return user ? user.uid : null
        },
        async logout({commit}) {
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
}