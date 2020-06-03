## Mise en place de redux 

# Les module
yarn add redux react-redux

# Création du fichier store 
Créer un fichier "myStore.js" 
Ce fichier contient 
    => Une const "initialisation" qui contient le l'essemble du store 
    => Une const myStore qui retourne le state 

exemple : 
```javascript
const initialisationState = {
    AllQuote: [
        {
            id: "1",
            citation: "Tout le monde est un génie. Mais si vous jugez un poisson à sa capacité de grimper à un arbre, il vivra toute sa vie en croyant qu'il est stupide",
            auteur: "Albert Einstein"
        },
        {
            id: "2",
            citation: "Dans un environnement qui change, il n'y a pas de plus grand risque que de rester immobile",
            auteur: "Jacques Chirac"
        }
    ],
    ActiveQuote: [
        {
            id: "1",
            citation: "Tout le monde est un génie. Mais si vous jugez un poisson à sa capacité de grimper à un arbre, il vivra toute sa vie en croyant qu'il est stupide",
            auteur: "Albert Einstein"
        }
    ]

}

const myStore = (state = initialisationState, action) => {
    return state
}

export default myStore
```
# Connecter le store a notre app 
Dans le fichier principal creer une const store qui permet de do connecter notre store 

exemple : 
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/app';
import myStore from './reducers/myStore'

const store = createStore(myStore)

  ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);
```
## Lire des donner dans notre store 
# Creer une classe pour retourner notre store 
```javascript
class ShowCitation extends Component {
    render() {
        const { quote } = this.props
        return (
            <h1>{ quote[0].citation }</h1>
            <h2>{ quote[0].auteur }</h2>
        )
    }
}
```
# Creer une const mapStateToProps qui prend en parametre le state et qui retourne la partit du store que l'on souhaite lire 
EXEMPLE :
```javascript
 const mapStatetoProps = state => {
    return {
        quote: state.ActiveQuote
    }
}
```
# Exporter et connecter
```javascript
export default connect(mapStatetoProps)(ShowCitation)
```
