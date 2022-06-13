import firebase from "firebase/app"
import { v4 as uuidv4 } from 'uuid';
import dateFilter from '@/filters/date.filter'
export default{
    actions: {
        async fetchApprice({commit}, apartamentId) {
            try {
                const apprice = (await firebase.database().ref(`/apartaments/${apartamentId}/info/apprice`).once('value')).val() || {}
                return apprice
            }
            catch (e){
                commit('setError', e)
            }
        },
        async fetchCalculation({commit}, apartamentId) {
            try {
                const year = dateFilter(new Date, 'fetchYear')
                // const month = parseInt(dateFilter(new Date, 'fetchMonth')) - 1
                const bill = (await firebase.database().ref(`/apartaments/${apartamentId}/${year}`).once('value')).val() || {}
                // for (const [key, value] of Object.entries(bill.payment)) {
                //     if (key != month) delete bill.payment[key] 
                // }
                // for (const [key1, value] of Object.entries(bill.calculation)) {
                //     for (const [key, value] of Object.entries(bill.calculation[key1])){
                //         if (key != month) delete bill.calculation[key1][key]
                //     }
                // }
                return bill
            }
            catch(e){
                commit('setError', e)
            }
        },
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
        async deleteApartament({dispatch, commit}, apartamentID) {
            try {
                const tenant = (await firebase.database().ref(`/tenant/`).once('value')).val() || {}
                for (const [key, value] of Object.entries(tenant)) {
                        console.log(value.apartament)
                        if (value.apartament == apartamentID) {await firebase.database().ref(`/tenant/${value.pasno}/apartament`).set('')}
                    }
                await firebase.database().ref(`/apartaments/${apartamentID}`).remove()
            } catch (e) {
                commit('setError', e)
            }
        },
    }
}