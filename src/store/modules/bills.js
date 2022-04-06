import firebase from "firebase/app"
export default{
    actions: {
        async fetchBill({dispatch, commit}, {year, apartamentId}){
            console.log(year, apartamentId)
            const bill = (await firebase.database().ref(`/apartaments/${apartamentId}/${year}`).once('value')).val()
            if (!bill){
                let billData = {}
                const rates = await dispatch('fetchRates')
                const months = {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0}
                for (const [key, value] of Object.entries(rates)) {
                    billData[value.name] = months
                  }
                console.log(billData)  
                await firebase.database().ref(`/apartaments/${apartamentId}/${year}/`).set(billData) 
                const bill = (await firebase.database().ref(`/apartaments/${apartamentId}/${year}`).once('value')).val()
                return bill
            }
            return bill
        }
    }
}