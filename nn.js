function sigmoid(x){
    return 1/(1+Math.exp(-1));
}

class NeuralNetwork{
    constructor(input_nodes, hidden_nodes, output_nodes){
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        //input到hidden層間的weight & hidden到output層間的weight
        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        //對hidden層 & 對output層加上bias
        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.hidden_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
    }

    feedforword(input_array){
        let inputs = Matrix.fromArray(input_array);

        //-----產生hidden層的輸出值-----//
        //hidden層會得到weight與input層的內積，之後再加上bias
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        //activation function
        //利用sigmoid function轉換，會利用到在matrix.js中建立的map()
        hidden.map(sigmoid);

        //-----產生output層的輸出值-----//
        //output層會得到hidden與weight層的內積，之後再加上bias
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        //activation function
        //利用sigmoid function轉換，會利用到在matrix.js中建立的map()
        output.map(sigmoid);
        return output.toArray();
    }
}