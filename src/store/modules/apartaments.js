import firebase from "firebase/app"
import { v4 as uuidv4 } from 'uuid';
export default{
    actions: {
        async fetchApartaments({commit}) {
            try {
                const Apartaments = (await firebase.database().ref(`/apartaments/`).once('value')).val() || {}
                return Object.keys(Apartaments).map(key => ({...Apartaments[key], id: key})) 
            } catch (e) {
                commit('setError', e)
            }
        },
        async fetchApartament({commit}, apartamentId) {
            try {
                const Apartament = (await firebase.database().ref(`/apartaments/${apartamentId}/info`).once('value')).val() || {}
                return Apartament
            } catch (e) {
                commit('setError', e)
            }
        },
        async editApartament ({commit}, {adr, apprice, name, apartamentId}) {
            try{
                console.log(adr,apprice,name)
                await firebase.database().ref(`/apartaments/${apartamentId}/info`).set({
                    adr: adr,
                    apprice: apprice,
                    name: name
                }) 
            } catch (e) {
                commit('setError', e) // комит позволяет изменять state в store
                throw e
            }
        },
        async addApartament ({dispatch, commit}, {adr, apprice, name}) {
            try{
                // let ErrorCode = 0
                // let users = []
                // users = await dispatch('fetchUsers')
                // users.forEach(user => {
                //     if (user.pasno == password)
                //     {
                //     ErrorCode = 1
                //     }
                //     else if (user.email == email)
                //     {
                //     ErrorCode = 2
                //     }
                // }); 
                // switch (ErrorCode){
                //     case(1):
                //     alert('Такой паспорт уже зарегистрирован');
                //     return;
                //     case(2):
                //     alert('Такой email уже зарегистрирован');
                //     return;
                //   }
                const id = uuidv4()
                await firebase.database().ref(`/apartaments/${id}/info`).set({
                    name: name,
                    adr: adr,
                    apprice: apprice,
                }) 
            } catch (e) {
                commit('setError', e) // комит позволяет изменять state в store
                throw e
            }
        },
        async deleteApartament({ commit}, apartamentID) {
            try {
                await firebase.database().ref(`/apartaments/${apartamentID}`).remove()
            } catch (e) {
                commit('setError', e)
            }
        },
    }
}