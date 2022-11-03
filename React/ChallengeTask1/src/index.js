import React from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component {
  render () {
    return (
      <h1>test</h1>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Test />);