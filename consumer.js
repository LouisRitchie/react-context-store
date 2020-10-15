/*
 * this is a higher-order component (HOC) which simplifies the code as follows:
 *
 * instead of
 *
 * export default MyComponent = ({ ...props }) => (
 *   <StoreContext.Consumer>
 *     {({ myStoreFunction }) => (
 *       <Button onClick={() => myStoreFunction()}>Click Me</Button>
 *     )
 *   </StoreContext.Consumer>
 * )
 *
 * you can do this:
 *
 * const MyComponent = ({ myStoreFunction, ...props }) => (
 *   <Button onClick={() => myStoreFunction()}>Click Me</Button>
 * )
 *
 * export default consumer('myStoreFunction')(MyComponent)
 */

import React from 'react';

import StoreContext from './context';

const consumer = (...propertyNames) => (Component) => (props) => (
  <StoreContext.Consumer>
    {(storeState) => {
      const properties = {};
      propertyNames.map((propertyName) => {
        properties[propertyName] = storeState[propertyName];
      });

      return <Component {...properties} {...props} />;
    }}
  </StoreContext.Consumer>
);

export default consumer;
