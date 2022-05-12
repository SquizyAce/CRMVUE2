import firebase from "firebase/app"
export default{
    actions: {
        async fetchBill({dispatch, commit}, {year, apartamentId}){
            try{
            const billCheck = (await firebase.database().ref(`/apartaments/${apartamentId}/${year}`).once('value')).val()
            const billCheck2 = (await firebase.database().ref(`/apartaments/${apartamentId}`).once('value')).val()
            if (!billCheck && billCheck2)
            {
                let billData = {}
                const rates = await dispatch('fetchRates')
                const months = {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0}
                const calcs = {0: {value: 0, total: 0},1:{value: 0, total: 0},2:{value: 0, total: 0},
                                3:{value: 0, total: 0},4:{value: 0, total: 0},5:{value: 0, total: 0},
                                6:{value: 0, total: 0},7:{value: 0, total: 0},8:{value: 0, total: 0},
                                9:{value: 0, total: 0},10:{value: 0, total: 0},11:{value: 0, total: 0}}
                for (const [key, value] of Object.entries(rates)) {
                    billData[value.name] = calcs
                  }
                console.log(billData)  
                await firebase.database().ref(`/apartaments/${apartamentId}/${year}/calculation`).set(billData) 
                await firebase.database().ref(`/apartaments/${apartamentId}/${year}/payment`).set(months) 
                const bill = (await firebase.database().ref(`/apartaments/${apartamentId}/${year}/calculation`).once('value')).val()
                return bill
            }
            const bill = (await firebase.database().ref(`/apartaments/${apartamentId}/${year}/calculation`).once('value')).val()
            return bill
            }
            catch (e) {
            e.code = 'ApartamentMiss'
            commit('setError', e) 
            throw e 
            }
        },
        async lastBill({dispatch, commit}, {year, apartamentId}){
            try{
                year--
                const billCheck = (await firebase.database().ref(`/apartaments/${apartamentId}/${year}`).once('value')).val()
                if (!billCheck)
                {
                    return {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0}
                }
                else
                {
                    let bill = (await firebase.database().ref(`/apartaments/${apartamentId}/${year}/calculation`).once('value')).val()
                    let billForCount = Object.keys(bill).map(key => ({...bill[key], id: key})) 
                    bill = {}
                    for (let service in billForCount)
                    {
                        bill[service] = billForCount[service][11]
                    }
                    return bill
                } 
            }
            catch (e) {
            commit('setError', e) 
                throw e 
            }
        },
        async fetchPayment({commit}, {year, apartamentId}){
            try{
                const payment = (await firebase.database().ref(`/apartaments/${apartamentId}/${year}/payment`).once('value')).val()
                return payment
            }
            catch (e) {
                commit('setError', e) 
                throw e  
            }
        },
        async updateBills({commit}, {year, apartamentId, billsCol, paymentsCol}){
            try{
                await firebase.database().ref(`/apartaments/${apartamentId}/${year}/calculation`).set(billsCol)
                await firebase.database().ref(`/apartaments/${apartamentId}/${year}/payment`).set(paymentsCol)
            }
            catch (e) {
                commit('setError', e) 
                throw e      
            }
        }
    }
}