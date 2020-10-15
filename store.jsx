import React, { Component } from 'react'

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
    const {
      props: { children },
      state,
    } = this

    return (
      <StoreContext.Provider value={state}>
        { children }
      </StoreContext.Provider>
    )
  }
}
