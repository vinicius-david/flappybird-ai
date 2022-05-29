class Matrix {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.data = [];

    for (let i = 0; i < this.rows; i++) {
      const array = [];
      for (let j = 0; j < this.columns; j++) {
        array.push((Math.random() * 2) - 1);
      }
      this.data.push(array);
    }
  }

  static arrayToMatrix(values) {
    const newMatrix = new Matrix(values.length, 1);

    for (let i = 0; i < values.length; i++) {
      newMatrix.data[i] = [values[i]];
    }

    return newMatrix;
  }

  static matrixToArray(matrix) {
    const newArray = [];

    for (let i = 0; i < matrix.data.length; i++) {
      newArray.push(matrix.data[i]);
    }

    return newArray;
  }

  static objectToArray(object) {
    const newArray = Object.values(object);

    return newArray;
  }

  static numberMultiply(matrixA, number) {
    const newMatrix = new Matrix(matrixA.rows, matrixA.columns);

    for (let i = 0; i < newMatrix.rows; i++) {
      for (let j = 0; j < newMatrix.columns; j++) {
        newMatrix.data[i][j] = matrixA.data[i][j] * number;
      }
    }

    return newMatrix;
  }

  static transpose(matrix) {
    const newMatrix = new Matrix(matrix.columns, matrix.rows);

    for (let i = 0; i < newMatrix.rows; i++) {
      for (let j = 0; j < newMatrix.columns; j++) {
        newMatrix.data[i][j] = matrix.data[j][i];
      }
    }

    return newMatrix;
  }

  static sum(matrixA, matrixB) {
    const newMatrix = new Matrix(matrixA.rows, matrixA.columns);

    for (let i = 0; i < newMatrix.rows; i++) {
      for (let j = 0; j < newMatrix.columns; j++) {
        newMatrix.data[i][j] = matrixA.data[i][j] + matrixB.data[i][j];
      }
    }

    return newMatrix;
  }

  static subtract(matrixA, matrixB) {
    const newMatrix = new Matrix(matrixA.rows, matrixA.columns);

    for (let i = 0; i < newMatrix.rows; i++) {
      for (let j = 0; j < newMatrix.columns; j++) {
        newMatrix.data[i][j] = matrixA.data[i][j] - matrixB.data[i][j];
      }
    }

    return newMatrix;
  }

  static hadamard(matrixA, matrixB) {
    const newMatrix = new Matrix(matrixA.rows, matrixA.columns);

    for (let i = 0; i < newMatrix.rows; i++) {
      for (let j = 0; j < newMatrix.columns; j++) {
        newMatrix.data[i][j] = matrixA.data[i][j] * matrixB.data[i][j];
      }
    }

    return newMatrix;
  }

  static matrixMultiply(matrixA, matrixB) {
    const newMatrix = new Matrix(matrixA.rows, matrixB.columns);

    for (let i = 0; i < matrixA.rows; i++) {
      for (let j = 0; j < matrixB.columns; j++) {

        newMatrix.data[i][j] = 0;

        for (let k = 0; k < matrixA.columns; k++) {

          newMatrix.data[i][j] += matrixA.data[i][k] * matrixB.data[k][j];
      }
    }
  }

    return newMatrix;
  }
}
