class Matrix{
    //建立全為0的矩陣
    constructor(rows, cols){
        this.rows = rows;
        this.cols= cols;
        this.matrix = [];

        for(let i=0; i<this.rows; i++){
            this.matrix[i] = [];
            for(let j=0; j<this.cols; j++){
                this.matrix[i][j] = 0;
            }
        }
    }

    //給矩陣每個元素給予隨機數字
    randomize(){
        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.cols; j++){
                this.matrix[i][j] = Math.floor(Math.random()*10);
            }
        }
    }

    //矩陣相加的函式
    add(n){
        //如果要加上去的n是矩陣...，否則...
        if(n instanceof Matrix){
            for(let i=0; i<this.rows; i++){
                for(let j=0; j<this.cols; j++){
                    this.matrix[i][j] += n.matrix[i][j];
                }
            }
        }else{
            for(let i=0; i<this.rows; i++){
                for(let j=0; j<this.cols; j++){
                    this.matrix[i][j] += n;
                }
            }
        }
    }

    //矩陣相乘的函式
    multiply(n){
        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.cols; j++){
                this.matrix[i][j] *= n
            }
        }
    }  
}