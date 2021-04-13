
function MAX_2UC(t1, t2) {
    if (t1 == 0 || t2 == 0)
        return parseInt(t1) + parseInt(t2);
    while (t1 != t2) {
        if (t1 > t2) {
            t1 = t1 - t2;
        }
        else {
            t2 = t2 - t1;
        }
    }
    return t1;
}
function Min_2B(t1, t2){
    var result = MAX_2UC(t1,t2);
    var mul = (t1*t2)/result;
    return mul;
}
function UandB(){
    var a = document.getElementById("a1").value;
    var b = document.getElementById("b1").value;
    document.getElementById("UCLN").innerHTML= "Ước Chung Lớn Nhất của " + a + ", "+b +" là: "+  MAX_2UC(a,b)+".";
    document.getElementById("BCNN").innerHTML= "Bội Chung Nhỏ Nhất của " + a + ", "+b +" là: "+ Min_2B(a,b)+".";
    document.getElementById("noti").innerHTML = "Cụ thể là:"
    document.getElementById("depsboi").innerHTML = "["+a+","+b+"] = " + a + "*" +b +"/("+a+","+b+") = "+a*b+"/"+MAX_2UC(a,b) +" = "+Min_2B(a,b)+".";
}