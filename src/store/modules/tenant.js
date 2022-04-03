import firebase from "firebase/app"
export default{
    actions: {
        async addTenant ({dispatch, commit}, {email, password, name, datereg}) {
            try{
                let ErrorCode = 0
                let users = []
                users = await dispatch('fetchUsers')
                users.forEach(user => {
                    if (user.pasno == password)
                    {
                    ErrorCode = 1
                    }
                    else if (user.email == email)
                    {
                    ErrorCode = 2
                    }
                }); 
                switch (ErrorCode){
                    case(1):
                    alert('Такой паспорт уже зарегистрирован');
                    return;
                    case(2):
                    alert('Такой email уже зарегистрирован');
                    return;
                  }
                const id = crypto.randomUUID(password)
                await firebase.database().ref(`/tenant/${id}`).set({
                    name: name,
                    email: email,
                    pasno: password,
                    datereg: datereg
                }) 
            } catch (e) {
                commit('setError', e) // комит позволяет изменять state в store
                throw e
            }
        },
        async editTenant ({commit}, {email, password, name, datereg, userId}) {
            try{
                await firebase.database().ref(`/tenant/${userId}`).set({
                    name: name,
                    email: email,
                    pasno: password,
                    datereg: datereg
                }) 
            } catch (e) {
                commit('setError', e) // комит позволяет изменять state в store
                throw e
            }
        },

        async fetchUsers({commit}) {
            try {
                const tenants = (await firebase.database().ref(`/tenant/`).once('value')).val() || {}
                return Object.keys(tenants).map(key => ({...tenants[key], id: key})) // Object.keys - каждый проход получения ключа | .map - трансформация массива в новый по заданным параметрам
            } catch (e) {
                commit('setError', e)
            }
        },
        async fetchUser({commit}, userId) {
            try {
                const tenant = (await firebase.database().ref(`/tenant/${userId}`).once('value')).val() || {}
                return tenant
            } catch (e) {
                commit('setError', e)
            }
        },
        async deleteTenant({ commit}, userId) {
            try {
                await firebase.database().ref(`/tenant/${userId}`).remove()
            } catch (e) {
                commit('setError', e)
            }
        },
    }
}