// const Matrix = require('./Matrix');

function sigmoid(values) {
  const newMatrix = new Matrix(values.data.length, 1);

  for (let i = 0; i < values.data.length; i++) {
    newMatrix.data[i] = [( 1 / ( 1 + Math.exp(-values.data[i]) ) )];
  }

  return newMatrix;
}

function derivateSigmoid(values) {
  const newMatrix = new Matrix(values.data.length, 1);

  for (let i = 0; i < values.data.length; i++) {
    newMatrix.data[i] = [( values.data[i] * (1 - values.data[i]))];
  }

  return newMatrix;
}

class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;

    this.biasInputHidden = new Matrix(this.hiddenNodes, 1);
    this.biasHiddenOutput = new Matrix(this.outputNodes, 1);

    this.inputWeigths = new Matrix(this.hiddenNodes, this.inputNodes);
    this.hiddenWeigths = new Matrix(this.outputNodes, this.hiddenNodes);
  }

  run(inputObject) {
    // object into Matrix
    const inputArray = Matrix.objectToArray(inputObject);
    const inputMatrix = Matrix.arrayToMatrix(inputArray);
    
    // input to hidden layer
    const firstMultiply = Matrix.matrixMultiply(this.inputWeigths, inputMatrix);
    const hiddenLayer = sigmoid(Matrix.sum(firstMultiply, this.biasInputHidden));

    // hidden to output
    const seccondMultiply = Matrix.matrixMultiply(this.hiddenWeigths, hiddenLayer);
    const output = sigmoid(Matrix.sum(seccondMultiply, this.biasHiddenOutput));

    const outputArray = Matrix.matrixToArray(output);

    return outputArray;
  }

  mutate() {
    const bias1 = Math.floor(Math.random() * this.hiddenNodes);
    const bias2 = Math.floor(Math.random() * this.outputNodes);
    const input1 = Math.floor(Math.random() * this.inputNodes);
    const input2 = Math.floor(Math.random() * this.hiddenNodes);
    const hidden1 = Math.floor(Math.random() * this.hiddenNodes);
    const hidden2 = Math.floor(Math.random() * this.outputNodes);

    // this.biasInputHidden.data[bias1] = Math.random() * 2 - 1;
    // this.biasHiddenOutput.data[bias2] = Math.random() * 2 - 1;
    this.inputWeigths.data[input2][input1] = Math.random() * 2 - 1;
    this.hiddenWeigths.data[hidden2][hidden1] = Math.random() * 2 - 1;

    return this;
  }

  train(dataArray, learningRate, iterations) {
    this.learningRate = learningRate || 0.1;
    this.iterations = iterations || 20000;

    for (let i = 0; i < this.iterations; i++) {
      let index = Math.floor(Math.random() * dataArray.length);

      const inputArray = Matrix.objectToArray(dataArray[index].input);
      const inputMatrix = Matrix.arrayToMatrix(inputArray);

      const expectedArray = Matrix.objectToArray(dataArray[index].output);
      const expectedMatrix = Matrix.arrayToMatrix(expectedArray);
      
      // feedforward
      // input to hidden layer
      const firstMultiply = Matrix.matrixMultiply(this.inputWeigths, inputMatrix);
      const hiddenLayer = sigmoid(Matrix.sum(firstMultiply, this.biasInputHidden));

      // hidden to output
      const seccondMultiply = Matrix.matrixMultiply(this.hiddenWeigths, hiddenLayer);
      const output = sigmoid(Matrix.sum(seccondMultiply, this.biasHiddenOutput));

      // backpropagation
      // output to hidden
      const absoluteError = Matrix.subtract(expectedMatrix, output);
      const outputDerivate = derivateSigmoid(output);
      const transposedHiddenLayer = Matrix.transpose(hiddenLayer);

      let hiddenGradient = Matrix.hadamard(absoluteError, outputDerivate);
      hiddenGradient = Matrix.numberMultiply(hiddenGradient, this.learningRate);

      // adjust bias
      this.biasHiddenOutput = Matrix.sum(this.biasHiddenOutput, hiddenGradient);

      // adjust weigths
      const deltaHiddenWeigths = Matrix.matrixMultiply(hiddenGradient, transposedHiddenLayer);
      this.hiddenWeigths = Matrix.sum(this.hiddenWeigths, deltaHiddenWeigths);

      // hidden to input
      const transposedHiddenWeigths = Matrix.transpose(this.hiddenWeigths);
      const hiddenError = Matrix.matrixMultiply(transposedHiddenWeigths, absoluteError);
      const hiddenDerivate = derivateSigmoid(hiddenLayer);
      const transposedInputLayer = Matrix.transpose(inputMatrix);

      let inputGradient = Matrix.hadamard(hiddenError, hiddenDerivate);
      inputGradient = Matrix.numberMultiply(inputGradient, this.learningRate);

      // adjust bias
      this.biasInputHidden = Matrix.sum(this.biasInputHidden, inputGradient);

      // adjust weigths
      const deltaInputWeigths = Matrix.matrixMultiply(inputGradient, transposedInputLayer);
      this.inputWeigths = Matrix.sum(this.inputWeigths, deltaInputWeigths);
    }
  }
}
