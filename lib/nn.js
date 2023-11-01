function sigmoid(x){
    return 1/(1+Math.exp(-x));
}
//derivative sigmoid（即sigmoid的微分）
function dsigmoid(y){
    //以下是我們希望的結果，不過會影響到先前寫得code，故稍做修正
    //return sigmoid(x) * (1-sigmoid(x));
    //直接另起一個名稱y，作為已經過sigmoid作用的變數
    return y * (1-y);
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
        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();

        this.learning_rate = 0.1;
    }

    //feedforward
    predict(input_array){
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

        //-----將output return給caller-----//
        return output.toArray();
    }

    train(input_array, target_array){
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
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        //activation function
        //利用sigmoid function轉換，會利用到在matrix.js中建立的map()
        outputs.map(sigmoid);

        //將array轉成matrix
        let targets = Matrix.fromArray(target_array);

        //計算error
        //ERROR = TARGETS - OUTPUTS
        let output_errors = Matrix.subtract(targets, outputs);

        //-----計算梯度(gradient)-----//
        //let gradeint = outputs * (1 - outputs);用下列替代
        let gradients = Matrix.map(outputs, dsigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_rate);

        //-----計算變化量(deltas)-----//
        //hidden的轉置(transpose)
        let hidden_T = Matrix.transpose(hidden);
        let weights_ho_deltas = Matrix.multiply(gradients, hidden_T);

        //透過deltas調整weights
        this.weights_ho.add(weights_ho_deltas);
        //透過bias調整deltas(也就是gradients)
        this.bias_o.add(gradients);

        //weights_ho_transpose這裡先簡稱為who_t
        let who_t =Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors);

        //-----計算hidden的梯度(gradient)-----//
        let hidden_gradient = Matrix.map(hidden, dsigmoid);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learning_rate);

        //-----計算 input -> hidden 變化量(deltas)-----//
        let inputs_T = Matrix.transpose(inputs);
        let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

        //透過deltas調整weights
        this.weights_ih.add(weights_ih_deltas);
        //透過bias調整deltas(也就是gradients)
        this.bias_h.add(hidden_gradient);
    }
}