import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBKhosnsmovXd6ExOFGNTciYFsjX5QSnl4",
    authDomain: "citation-ff59d.firebaseapp.com",
    databaseURL: "https://citation-ff59d.firebaseio.com"
})

const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base