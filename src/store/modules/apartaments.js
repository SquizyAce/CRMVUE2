import firebase from "firebase/app"
export default{
    actions: {
        async fetchApartaments({commit, dispatch}) {
            try {
                const Apartaments = (await firebase.database().ref(`/apartaments/`).once('value')).val() || {}
                return Object.keys(Apartaments).map(key => ({...Apartaments[key], id: key})) 
            } catch (e) {
                commit('setError', e)
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
                const id = crypto.randomUUID(name)
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