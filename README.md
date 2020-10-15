# react-context-store

## What is it?

React Context Store is a simple, context-based store for React applications. It 
uses the Context API to implement functionality similar to what Redux or other 
stores might offer.

I gradually wrote this code between May and September of 2020 while working on a
React app. Because the app's state was small, I had state live in the components 
that used it. Later I decided to centralize the state management and ensure that
components update when state changes. The question is, how should I do that?
My first thought was to use Redux. However, I don't really care about the 
opinions and optimizations that Redux + Reselect provides because my state 
object is pretty simple. Also the `actions/` and `reducers/` directories tend to
get pretty big, and I don't want to have to maintain them if I don't have to.
So my second thought was that Context should be able to do what I need. Long 
story short, it does. If you have a simple React app that has enough state to 
justify a store but not enough state to include a library like Redux, you should
give this a try. It's simple. It would be a breeze to optimize if you needed.

## Usage

### Initialize

entry.jsx
```
import Store from './store';

ReactDOM.hydrate(
  <Store store={store}>
    <YourApp />
  </Store>,
  document.getElementById('root')
);
```

context.js
```
import { createContext } from 'react';

const context = createContext();

export default context;
```

store.jsx
```
import StoreContext from './context'
import { fetchUsers } from './api';
import { selectUsers } from './selectors';

export default class Store extends Component {
  constructor(props) {
    super(props);

    const { store } = props;

    this.state = {
      ...store,
      fetchUsers: fetchUsers.bind(this),
      selectUsers: selectUsers.bind(this),
    };
  }

  render() {
    return (
      <StoreContext.Provider value={state}><children>
    );
  }
}
```

### Using `<Consumer />`

loadUserButton.jsx
```
import consumer from './consumer'

function LoadUserButton({ fetchUsers }) {
  return (
    <button onClick={fetchUsers}>Load Users</button>
  )
}

export default consumer('fetchUsers')(LoadUserButton)
```

userList.jsx
```
import consumer from './consumer'

function UserList({ selectUsers }) {
  return (
    <ul>
      {selectUsers().map(user => (
        <li>{user.firstName}{' '}{user.lastName}</li>
      ))}
    </ul>
  )
}

export default consumer('selectUsers')(UserList)
```

### Selectors
selectors.js
```
export function selectUsers() {
  return this.state.users
}
```

### Fetching data

api.js
```
export async function fetchUsers() {
  const { users } = await fetch('/api/v1/users').json()
  this.setState({ users })
}
```
