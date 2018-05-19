import React, { Component } from 'react';

const JsBarcode = require('jsbarcode');

export default class Barcode extends Component {
  createNewBarcode = barcodeCode => {
    this.barcode = JsBarcode(this.refs.barcodeCanvas, barcodeCode);
  };
  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    // though never re-rendered, the component will receive new props here
    this.barcode = this.createNewBarcode(nextProps.barcodeCode);
  }

  componentDidMount() {
    this.barcode = JsBarcode(this.refs.barcodeCanvas, this.props.barcodeCode);
  }

  render() {
    return <canvas style={{ height: 100 }} ref="barcodeCanvas" />;
  }
}
