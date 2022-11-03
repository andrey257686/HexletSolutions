import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'reactjs-popup';

class Test extends React.Component {
  render () {
    return (
      <h1>test</h1>
    )
  }
}

const PopupExample = () => (  <Popup trigger={<button> Trigger</button>} position="right center">    <div>Popup content here !!</div>  </Popup>);

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<PopupExample />);
// root.render(<Test />);