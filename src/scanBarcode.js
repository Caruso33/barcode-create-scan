import React, { Component } from 'react';
import Quagga from 'quagga'; // ES6

export default class ScanBarcode extends Component {
  state = { results: [], patchSize: 'medium' };
  onDetect = result => {
    console.log(result.codeResult.code);
    this.setState(prevState => ({
      results: [...prevState.results, result.codeResult.code]
    }));
    if (this.state.results.length >= 10) {
      this.stopQuagga();
    }
  };

  onProcess = result => {
    var drawingCtx = Quagga.canvas.ctx.overlay,
      drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute('width'), 10),
          parseInt(drawingCanvas.getAttribute('height'), 10)
        );
        result.boxes
          .filter(box => {
            return box !== result.box;
          })
          .forEach(box => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: 'green',
              lineWidth: 2
            });
          });
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: '#00F',
          lineWidth: 2
        });
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(
          result.line,
          { x: 'x', y: 'y' },
          drawingCtx,
          { color: 'red', lineWidth: 3 }
        );
      }
    }
  };

  stopQuagga = () => {
    Quagga.stop();
    console.log('Scanning stopped');
    Quagga.offDetected(this.onDetect);
    Quagga.offProcessed(this.onProcess);
  };

  componentDidMount() {
    if (
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function'
    ) {
      const hardwareThreads = navigator.hardwareConcurrency
        ? navigator.hardwareConcurrency
        : 0;
      console.log(`hardware threads found: ${hardwareThreads}`);

      const resolutions = {
        640: {
          width: 640,
          height: 480
        },
        800: {
          width: 800,
          height: 600
        },
        1024: {
          width: 1024,
          height: 768
        },
        1280: {
          width: 1280,
          height: 960
        }
      };
      const init = {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: resolutions[1024].width,
            height: resolutions[1024].height,
            facingMode: 'environment' // or user
          }
        },
        decoder: {
          readers: ['code_128_reader']
        },
        numOfWorkers: hardwareThreads,
        locator: {
          patchSize: this.state.patchSize, // x-small, small, medium, large, x-large
          halfSample: true,
          multiple: false
        },
        locate: true
      };

      Quagga.init(init, err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Initialization finished. Ready to start');
        Quagga.start();

        const drawingBuffer = document.getElementsByClassName(
          'drawingBuffer'
        )[0];
        drawingBuffer.style.position = 'absolute';
        drawingBuffer.style.left = 0;
        drawingBuffer.style.top = 0;
      });

      Quagga.onProcessed(result => this.onProcess(result));

      Quagga.onDetected(result => this.onDetect(result));
    } else {
      throw new Error('no browser support on this device');
    }
  }

  componentWillUnmount() {
    this.stopQuagga();
  }

  render() {
    const { results } = this.state;
    console.log(results.map(res => res));
    return (
      <div>
        <div
          style={{ position: 'relative' }}
          id="interactive"
          className="viewport"
        />
        {results.map((result, ind) => <p key={ind}>{result}</p>)}
      </div>
    );
  }
}

/* <button onClick={() => this.quagga(this.onDetect)}>Scan Code</button>
{console.log(Quagga)}
<button onClick={Quagga.stop}>Stop Scan</button> */
