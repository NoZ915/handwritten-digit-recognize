let mnist;
//testing 變數
let test_index = 0;
let total_tests = 0;
let total_correct = 0;

//training 變數
let train_index = 0;
let train_image;
let trainnig_correct = 0;
let total_trainnig = 0;

let nn;
let user_digit; //用來存使用者化的圖

function setup() {
    createCanvas(400, 200).parent("container");
    user_digit = createGraphics(200, 200);
    user_digit.pixelDensity(1);

    train_image = createImage(28, 28);

    nn = new NeuralNetwork(784, 64, 10);

    loadMNIST(function (data) {
        mnist = data;
        console.log(mnist);
    });
}

function train(show) {
    //宣告一個inputs陣列，用來放置待會要丟進神經網路的輸入
    //且經過處理(bright/255)，使得inputs裡的值介於0~1間
    let inputs = [];
    //把下面的程式註解掉，因為train在迴圈中，會不斷呼叫createImage()，改放置在setup()裡面
    // let img = createImage(28, 28);
    if (show) {
        train_image.loadPixels();
    }
    for (let i = 0; i < 784; i++) {
        //在p5.js中pixel載入需要給予r, g, b, alpha(透明度)
        let bright = mnist.train_images[train_index][i];
        inputs[i] = bright / 255;
        if (show) {
            let index = i * 4;
            train_image.pixels[index + 0] = bright; //red
            train_image.pixels[index + 1] = bright; //green
            train_image.pixels[index + 2] = bright; //blue
            train_image.pixels[index + 3] = 255;    //alpha
        }
    }
    if (show) {
        train_image.updatePixels();
        image(train_image, 200, 0, 200, 200);
    }

    ////-----神經網路-----////
    let label = mnist.train_labels[train_index];
    let targets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    targets[label] = 1;

    //經過predict後可得到回傳的output陣列，陣列中最大的數值，該index即為預測的數字
    let prediction = nn.predict(inputs);
    let guess = findMax(prediction);

    //視覺化
    //如果label跟guess一樣的話，讓他們都得到correct的class -> 變成綠色
    select("#label").html(label);
    select("#guess").html(guess);
    if (guess == label) {
        select("#label").class("correct");
        select("#guess").class("correct");
    } else {
        select("#label").class("wrong");
        select("#guess").class("wrong");
    }

    nn.train(inputs, targets);
    total_trainnig++;
    if (label == guess) {
        trainnig_correct++;
    }
    ////-----神經網路-----////
    let percent = 100 * (trainnig_correct / total_trainnig);
    select("#training_correct").html(nf(percent, 2, 2) + "%");

    train_index = (train_index + 1) % mnist.train_labels.length; //超過60000筆會再從頭training
}

function testing() {
    let inputs = [];
    for (let i = 0; i < 784; i++) {
        let bright = mnist.test_images[test_index][i];
        inputs[i] = bright / 255;
    }

    ////-----神經網路-----////
    let label = mnist.test_labels[test_index];
    let prediction = nn.predict(inputs);
    let guess = findMax(prediction);
    total_tests++;
    if (guess == label) { //程式猜測的數字若跟圖片的label一樣
        // console.log(`猜測是${guess}，但實際label為${label}`)
        total_correct++;
    }
    let percent = 100 * (total_correct / total_tests);
    select("#percent").html(nf(percent, 2, 2) + "%");
    // console.log(`${total_correct}跟${total_tests}正確率${percent}`);
    ////-----神經網路-----////

    //超過10000筆會再從頭testing
    test_index++;
    if (test_index == mnist.test_labels.length) {
        test_index = 0;
        console.log('finished test set');
        console.log(percent);
        total_tests = 0;
        total_correct = 0;
    }
}

function guessUserDigit() {
    let inputs = [];
    let img = user_digit.get(); //先copy user_digit，因為等等要做resize
    img.resize(28, 28);
    img.loadPixels();
    for (let i = 0; i < 784; i++) {
        inputs[i] = img.pixels[i * 4] / 255;
    }
    let prediction = nn.predict(inputs);
    let guess = findMax(prediction);
    select("#user_guess").html(guess);
    for (let j = 0; j < 10; j++) {
        select(`[id='${j}']`).html(prediction[j]);
    }

    return img;
}

function draw() {
    background(0);
    let user = guessUserDigit();

    //確保mnist已經載入
    if (mnist) {
        let total = 10;
        for (let i = 0; i < total; i++) {
            if (i == total - 1) {
                train(true);
            } else {
                train(false);
            }
        }
        for (let i = 0; i < total; i++) {
            testing();
        }
    }


    //使用者畫布&畫筆
    image(user_digit, 0, 0);
    if (mouseIsPressed) {
        user_has_drawing = true;
        user_digit.stroke(255);
        user_digit.strokeWeight(11);
        user_digit.line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

//keyPressed()是p5.js的function，按下空白鍵可以清空畫布
function keyPressed() {
    if (key == " ") {
        user_digit.background(0);
    }
}

//用來找output陣列中最大的數值，並回傳該數值的index值
function findMax(arr) {
    let record = 0;
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > record) {
            record = arr[i];
            index = i;
        }
    }
    return index;
}