# React Eventbrite Popup Checkout
A React component that bootstraps Eventbrite's popup checkout widget.

## Install
If using NPM:
```
$ npm install react-eventbrite-popup-checkout --save
```

If using Yarn:
```
$ yarn add react-eventbrite-popup-checkout
```

## Usage

### Example
```js
import React from 'react';
import EventbriteButton from 'react-eventbrite-popup-checkout';

class MyApp extends React.Component {
  render() {
    return (
      <div>
        <EventbriteButton ebEventId='12555555'>Checkout</EventbriteButton>
      </div>
    );
  }
}
```
### Required Props
```
ebEventId: <string>
```

### Optional Props
```
className: <string>
ebScriptPath: <string>
isModal: <boolean>
onOrderComplete: <function>
```
