function setup(){
    let a = new Matrix(2,3);
    a.randomize();
    let b = a.transpose();
    console.table(a.data);
    console.table(b.data);

    // let a = new Matrix(2,3);
    // let b = new Matrix(3,2);
    // a.randomize();
    // b.randomize();
    // console.table(a.data);
    // console.table(b.data);
    
    // let c = a.multiply(b);
    // console.table(c.data);
}