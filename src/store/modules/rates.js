import firebase from "firebase/app"
export default {
    actions: {
        async addRate ({commit}, {name, ns, price, nstype}) {
            try{
                const id = name
                await firebase.database().ref(`/rates/${id}`).set({
                    name: name,
                    ns: ns,
                    price: price,
                    nstype: nstype
                }) 
            } catch (e) {
                commit('setError', e) // комит позволяет изменять state в store
                throw e
            }
        },
        async fetchRates({commit}) {
            try {
                const rates = (await firebase.database().ref(`/rates/`).once('value')).val() || {}
                return rates
            } catch (e) {
                commit('setError', e)
            }
        },
        async updateRates ({commit}, ratesCol) {
            try{
                await firebase.database().ref(`/rates/`).set(ratesCol) 
            } catch (e) {
                commit('setError', e) // комит позволяет изменять state в store
                throw e
            }
        }, 
    }
}