class Matrix{
    //建立全為0的矩陣
    constructor(rows, cols){
        this.rows = rows;
        this.cols= cols;
        this.data = [];

        for(let i=0; i<this.rows; i++){
            this.data[i] = [];
            for(let j=0; j<this.cols; j++){
                this.data[i][j] = 0;
            }
        }
    }

    //給矩陣每個元素給予隨機數字
    randomize(){
        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.cols; j++){
                this.data[i][j] = Math.floor(Math.random()*10);
            }
        }
    }

    //矩陣加法的函式
    add(n){
        if(n instanceof Matrix){
            //如果要加上去的n是矩陣...，否則...
            for(let i=0; i<this.rows; i++){
                for(let j=0; j<this.cols; j++){
                    this.data[i][j] += n.data[i][j];
                }
            }
        }else{
            for(let i=0; i<this.rows; i++){
                for(let j=0; j<this.cols; j++){
                    this.data[i][j] += n;
                }
            }
        }
    }

    //矩陣轉置 transpose matrix
    transpose(){
        //轉置就是矩陣的列跟行交換
        //先宣告一個result變數，作為一個Matrix的實體，其行與列的數量與原先相反
        let result = new Matrix(this.cols, this.rows);
        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.cols; j++){
                result.data[j][i] = this.data[i][j];
            }
        }
        return result;
    }

    //矩陣乘法的函式：矩陣相乘
    static multiply(a, b){
        //要先確定前面矩陣的cols數等於後面矩陣的rows數
        if(a.cols !== b.rows){
            console.log("Colums of A must match rows of B.");
            return undefined;
        }
        //result是a, b兩個矩陣相乘的結果
        let result = new Matrix(a.rows, b.cols);
        for(let i=0; i<result.rows; i++){
            for(let j=0; j<result.cols; j++){
                //內積後所得到的新矩陣的col
                let sum = 0;
                for(let k=0; k<a.cols; k++){
                    sum += a.data[i][k] * b.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }

    //矩陣乘法的函式：矩陣與純量相乘
    multiply(n){
        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.cols; j++){
                this.data[i][j] *= n
            }
        }
    }

    //map function
    map(func){
        //將某個function對矩陣中的所有元素作用
        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.cols; j++){
                let val = this.data[i][j];
                this.data[i][j] = func(val);
            }
        }
    }

    //用來印出我們想看到的結果
    print(){
        console.table(this.data);
    }
}