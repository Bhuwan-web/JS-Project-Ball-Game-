randomColorGenerator=function(){
    hexNum=["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9"];
    var colorIndex="#";
    for(let count=0;count<6;count++){
        colorIndex+=hexNum[Math.round(hexNum.length*Math.random())];
    }
    return colorIndex;
}