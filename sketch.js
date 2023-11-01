let mnist;
let train_index = 0;
let nn;
let user_digit; //用來存使用者化的圖

function setup(){
    createCanvas(400, 200).parent("container");
    user_digit = createGraphics(200, 200);
    user_digit.pixelDensity(1);

    nn = new NeuralNetwork(784, 64, 10);

    loadMNIST(function(data){
        mnist = data;
        console.log(mnist);
    });
}

function train(){
    //宣告一個inputs陣列，用來放置待會要丟進神經網路的輸入
    //且經過處理(bright/255)，使得inputs裡的值介於0~1間
    let inputs = [];
    let img = createImage(28,28);
    img.loadPixels();
    for(let i=0; i<784; i++){
        //在p5.js中pixel載入需要給予r, g, b, alpha(透明度)
        let bright = mnist.train_images[train_index][i];
        inputs[i] = bright / 255;
        let index = i*4;
        img.pixels[index + 0] = bright; //red
        img.pixels[index + 1] = bright; //green
        img.pixels[index + 2] = bright; //blue
        img.pixels[index + 3] = 255;    //alpha
    }
    img.updatePixels();
    image(img, 200, 0, 200, 200);

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
    if(guess == label){
        select("#label").class("correct");
        select("#guess").class("correct");
    }else{
        select("#label").class("wrong");
        select("#guess").class("wrong");
    }


    nn.train(inputs, targets);
    ////-----神經網路-----////

    train_index = train_index + 1;
    // noLoop();
}

function draw(){
    background(0);

    //確保mnist已經載入
    if(mnist){
        train();
    }

    image(user_digit, 0, 0);
    if(mouseIsPressed){
        user_digit.fill(255);
        user_digit.stroke(255);
        user_digit.ellipse(mouseX, mouseY, 16);
    }
}

function keyPressed(){
    
}

//用來找output陣列中最大的數值，並回傳該數值的index值
function findMax(arr){
    let record = 0;
    let index = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] > record){
            record = arr[i];
            index = i;
        }
    }
    return index;
}