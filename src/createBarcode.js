import React from 'react';
import ReactDOM from 'react-dom';
import Barcode from './components/barcode';

export default class CreateBarcode extends React.Component {
  state = {
    text: [
      'test'
      // 'aa',
      // 'AA',
      // 'AaBbCcDd',
      // '1234567890',
      // 'a1b2c3d4e5f6g7',
      // 'Aa1Bb2Cc3',
      // 'test test test',
      // '1 1 1 1 1 1 1 1',
      // 'test 1111 test 1111',
      // '- - - - - -',
      // '_ _ _ _ _ _',
      // '_- -_ _- _- _- -_',
      // 'a-1-b-2-c-3-d-4',
      // 'S-1-A-23',
      // 'R-2-D-2',
      // 'Rack 1, Shelf B, Position 2',
      // 'Rack: 1, Shelf: B, Position: 2',
      // 'Co/|/|pL1Cat3D__B4RrRc0o0oDee3',
      // 'Storage: Sample, Rack: 1, Shelf: B, Position: 2',
      // 'I <3 Mui',
      // 'Mui is the best'
    ]
  };
  componentWillUnmount() {}

  printBarcode = (text, i) => {
    this.printWindow = window.open(
      '',
      '',
      'width=600,height=400,left=200,top=200'
    );
    const divEle = document.createElement('div');
    divEle.setAttribute('id', 'newCanvas');
    this.printWindow.document.body.appendChild(divEle);

    ReactDOM.render(
      <Barcode key={i} barcodeCode={text} />,
      this.printWindow.document.getElementById('newCanvas')
    );

    this.printWindow.print();
    this.printWindow.close();
  };

  render() {
    return (
      <div>
        {this.state.text.map((text, i) => (
          <div
            id={text}
            style={{ marginBottom: 15 }}
            onClick={() => this.printBarcode(text, i)}
          >
            <Barcode key={i} barcodeCode={text} />
          </div>
        ))}
        <br />
        <button
          onClick={() =>
            this.setState({
              text: ['NewCode']
            })
          }
        >
          change barcode text
        </button>
      </div>
    );
  }
}
