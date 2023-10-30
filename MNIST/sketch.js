let mnist;

function setup(){
    loadMNIST(function(data){
        mnist = data;
        console.log(mnist);
    })
}