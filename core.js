var pt = {
    a: [],
    b: [],
    mod: [],
    n: 0
}
// a: [11, 7, 10, 2],
// b: [2, 4, 6, 8],
// mod: [3, 5, 7, 11],
// n: 4
var answer = {
    a_sgle: [],
    b_sgle: [],
    mod_sgle: [],
    a_answ: [],
    b_answ: [],
    mod_answ: [],
    index_mod: [],
    val_a: [],
    val_t: [],
    temp_a: [],
    temp_t: [],
    step: 0
}
var createClickHandler = function (a) {
    return function () {
        var data = "<br><label for='a1' id='la1'>Nhập a</label>" + (a + 1)
            + "<input type='number' id='a1' placeholder='Chưa được nhập' >"
            + "<br><label for='b1' id='lb1'>Nhập b</label>" + (a + 1)
            + "<input type='number' id='b1' placeholder='Chưa được nhập' >"
            + "<br><label for='mod1' id='lmod1'>Nhập mod</label>"
            + (a + 1) + "<input type='number' id='mod1' placeholder='Chưa được nhập'>"
            + "<br><input type='button' id='ok3' value='Đồng ý' onclick = 'getelementmul()'>";
        document.getElementById("location").innerHTML = data;
    };
};
function getelementmul() {
    pt.a.push(document.getElementById("a1").value);
    pt.b.push(document.getElementById("b1").value);
    pt.mod.push(document.getElementById("mod1").value);
}
function testresult() {
    equation_mutiple();
}
function inresult() {
    // var i = pt.a[0] + "x" + " đồng dư với " + pt.b[0] + " theo modulo: " + pt.mod[0];
    // document.getElementById("kq").innerHTML = i;
    f_answer();
}
function getn() {
    pt.n = document.getElementById("n1").value;
    if (pt.n > 1) {
        for (var a = 0; a < pt.n; a++) {
            var b = document.createElement("input");
            b.setAttribute("type", "button");
            b.setAttribute("value", "PT " + (a + 1));
            b.id = "btn";
            b.onclick = createClickHandler(a);
            b.innerHTML = "PT " + (a + 1);
            //b.appendChild(t);
            document.getElementById("turnno").appendChild(b);
        }
    }
}
function shown() {
    var free_single = "<div id='location'></div>";
    var datan = "<label for='n1'>Nhập n:</label><input type='number' id='n1'>"
        + "<br><input type='button' value='OK' id='n' onclick='getn()'>";
    document.getElementById("loca2").innerHTML = datan;
    document.getElementById("location").innerHTML = free_single;
}
function showformsingle() {
    var free_n = "<div id='loca2'></div>";
    var data = "<label for='a'>Nhập a:</label><input type='number' id='a'>"
        + "<br><label for='b'>Nhập b:</label><input type='number' id='b'>"
        + "<br><label for='mod'>Nhập mod:</label><input type='number' id='mod'>"
        + "<input type='button' value='Đồng ý' id='ok' onclick='getelement()'>";
    document.getElementById("location").innerHTML = data;
    document.getElementById("loca2").innerHTML = free_n;
}
function changestates(obj) {
    var states = obj.value;
    if (states == '')
        alert("Bạn chưa chọn loại phương trình!");
    else if (states == 'single')
        showformsingle();
    else if (states == 'multi') {
        shown();
    }
}
function getelement() {
    pt.a.push(document.getElementById("a").value);
    pt.b.push(document.getElementById("b").value);
    pt.mod.push(document.getElementById("mod").value);
}

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
function MAX_3UC(t1, t2, t3) {
    if (t1 == 0)
        return MAX_2UC(t2, t3);
    if (t2 == 0)
        return MAX_2UC(t1, t3);
    if (t3 == 0)
        return MAX_2UC(t1, t2);
    while (t1 != t2) {
        if (t1 > t2) {
            t1 = t1 - t2;
        }
        else {
            t2 = t2 - t1;
        }
    }
    while (t1 != t3) {
        if (t1 > t3) {
            t1 = t1 - t3;
        }
        else {
            t3 = t3 - t1;
        }
    }
    return t1;
}
function index_max() {
    var max_temp = 0;
    for (var i = 0; i < pt.n; i++) {
        if (max_temp < pt.mod[i]) {
            max_temp = pt.mod[i];
        }
    }
    for (var i = 0; i < pt.n; i++) {
        if (max_temp == pt.mod[i]) {
            return i;
        }
    }
}
function equation_single(i) {
    var check = MAX_3UC(pt.a[i], pt.b[i], pt.mod[i]);
    pt.a[i] = parseInt(pt.a[i]);
    pt.b[i] = parseInt(pt.b[i]);
    pt.mod[i] = parseInt(pt.mod[i]);
    if (MAX_3UC(pt.a[i], pt.b[i], pt.mod[i]) != 1 && pt.b[i] > 0) {
        pt.a[i] = pt.a[i] / check;
        pt.b[i] = pt.b[i] / check;
        pt.mod[i] = pt.mod[i] / check;
        equation_single(i);
    }
    else {
        check = MAX_2UC(pt.a[i], pt.b[i]);
        if (check != 1 && pt.b[i] > 0) {
            pt.a[i] = pt.a[i] / check;
            pt.b[i] = pt.b[i] / check;
            equation_single(i);
        }
        else {
            var j = 1;
            while (pt.a[i] != 1) {
                if (pt.a[i] != MAX_2UC(pt.a[i], parseInt(pt.b[i]) + parseInt(j * pt.mod[i]))) {
                    j++;
                }
                else {
                    check = MAX_3UC(pt.a[i], pt.b[i], pt.mod[i]);
                    if (check != 1 && pt.b[i] > 0) {
                        pt.a[i] = pt.a[i] / check;
                        pt.b[i] = pt.b[i] / check;
                        pt.mod[i] = pt.mod[i] / check;
                        equation_single(i);
                    }
                    else {
                        pt.b[i] = (parseInt(pt.b[i]) + parseInt(j * pt.mod[i])) / pt.a[i];
                        pt.a[i] = pt.a[i] / pt.a[i];
                    }
                }
            }
        }
    }
}

function set_var(c) {
    for (var i = c; i < (pt.n); i++) {
        pt.a[i] = pt.a[i + 1];
        pt.b[i] = pt.b[i + 1];
        pt.mod[i] = pt.mod[i + 1]
    }
    pt.n = pt.n - 1;

}
function equation_mutiple() {
    for (var i = 0; i < pt.n; i++) {
        pt.a[i] = parseInt(pt.a[i]);
        pt.b[i] = parseInt(pt.b[i]);
        pt.mod[i] = parseInt(pt.mod[i]);
        equation_single(i);
        answer.a_sgle.push(pt.a[i]);
        answer.b_sgle.push(pt.b[i]);
        answer.mod_sgle.push(pt.mod[i]);
        //console.log(answer.a_sgle[i], answer.b_sgle[i], answer.mod_sgle[i], "push tam  vo" + i);
    }
    var n = pt.n - 1;
    answer.step = n;
    var stp = 0;
    var stp_2 = 1;
    for (var j = 0; j < n; j++) {
        //console.log("j = " + j + "n =" + n);
        var check = index_max();
        answer.index_mod.push(check + 1);
        //console.log(pt.a[check], pt.b[check], pt.mod[check], "check = ", check);
        var t = 0;
        var a = 0;
        var tempt = 0;
        var tempa = 0;
        var i = 1;
        t = parseInt(pt.mod[check]);
        tempt = t;
        answer.temp_t.push(tempt);
        a = pt.b[check];
        tempa = a;
        answer.temp_a.push(tempa);
        set_var(check);
        var check = index_max();
        answer.index_mod.push(check + 1);
        //console.log(pt.a[check], pt.b[check], pt.mod[check], 'sau khi setvar');
        var found = 0;
        while (found == 0) {
            if (t - (i * pt.mod[check]) >= 0) {
                i++;
            }
            else {
                found = 1;
            }
        }
        t = t - ((i == 1 ? i : i - 1) * pt.mod[check]);
        pt.a[check] = t;
        answer.val_t.push(t);
        answer.a_answ.push(pt.a[check]);
        i = 0;
        found = 0;
        while (found == 0) {
            if (a - (i * pt.mod[check]) >= 0) {
                i++;
            }
            else {
                found = 1;
            }
        }
        a = a - ((i == 1 ? i : i - 1) * pt.mod[check]);
        pt.b[check] = pt.b[check] - a;
        answer.val_a.push(a);
        answer.mod_answ.push(pt.mod[check]);
        if (pt.b[check] < 0) {
            pt.b[check] = parseInt(pt.b[check]) + parseInt(pt.mod[check]);
        }
        answer.b_answ.push(pt.b[check]);
        //console.log(pt.a[check], pt.b[check], pt.mod[check], "tinh duoc pt moi", check)
        equation_single(check);
        answer.a_answ.push(pt.a[check]);
        answer.b_answ.push(pt.b[check]);
        answer.mod_answ.push(pt.mod[check]);
        t = pt.mod[check];
        //answer.val_t.push(t);
        a = pt.b[check];
        //answer.val_a.push(a);
        t = tempt * t;
        answer.val_t.push(t);
        a = (tempt * a) + parseInt(tempa);
        answer.val_a.push(a);
        pt.mod[check] = t;
        pt.b[check] = a;
        answer.a_answ.push(pt.a[check]);
        answer.b_answ.push(pt.b[check]);
        answer.mod_answ.push(pt.mod[check]);
        //console.log(j+stp , answer.index_mod[j+stp], j+stp_2 , answer.index_mod[j + stp_2]);
        // console.log(answer.val_t[j] + "t" + "+" + answer.val_a[j] + " mod" + "(" + answer.mod_answ[j] + ")");
        // console.log(answer.a_answ[j] + "t" + " dong du " + answer.b_answ[j] + " mod" + "(" + answer.mod_answ[j] + ")");
        // console.log(answer.val_t[j + 1], answer.val_t[j + 2], j);
        // console.log(answer.val_a[j + 1], answer.val_a[j + 2], j);
        // console.log(answer.a_answ[j + 1], answer.b_answ[j + 1], answer.mod_answ[j + 1]);
        // if(j<1){
        //     stp=1;
        //     stp_2=2;
        // }
        // else{
        //     stp=2;
        //     stp_2=3;
        // }

    }
}
function f_answer() {
    console.log("Giải các phương trình đơn:")
    for (var i = 0; i < answer.step + 1; i++) {
        console.log(answer.a_sgle[i] + "x đồng dư " + answer.b_sgle[i] + " mod" + "(" + answer.mod_sgle[i] + ")" + " (" + (i + 1) + ")");
    }
    var check = 0;
    var stp = 0;
    var stp_3 = 0;
    var stp_2 = 1;
    var buff_stp2 = 1;
    var buff_stp3 = 2;
    for (var i = 0; i < answer.step; i++) {
        console.log("Bước " + (i + 1));
        console.log("Chọn phương trình " + "(" + answer.index_mod[i + stp] + ")" + " có mod lớn nhất");
        console.log("(" + answer.index_mod[i + stp] + ")" + " <=> " + "x = " + answer.temp_t[i] + "t + " + answer.temp_a[i] + " (" + (i + 1) + "*" + ")");
        console.log("Thay (" + (i + 1) + "*" + ") vào " + "(" + answer.index_mod[i + stp_2] + "):");
        answer.index_mod[i + stp] = answer.index_mod[i + stp] - 1;
        answer.index_mod[i + stp_2] = answer.index_mod[i + stp_2] - 1;
        console.log(answer.temp_t[i] + "t + " + answer.temp_a[i] + " = " + answer.b_sgle[answer.index_mod[i + stp_2]] + " mod(" + answer.mod_sgle[answer.index_mod[i + stp_2]] + ")");
        console.log("<=> " + answer.val_t[i + stp] + "t + " + answer.val_a[i + stp] + " = " + answer.b_sgle[answer.index_mod[i + stp_2]] + " mod(" + answer.mod_sgle[answer.index_mod[i + stp_2]] + ")");
        console.log("<=> " + answer.val_t[i + stp] + "t  = " + answer.b_answ[i + stp_3] + " mod(" + answer.mod_answ[i + stp_3] + ")");
        console.log("<=> " + answer.a_answ[i + buff_stp2] + "t = " + answer.b_answ[i + buff_stp2] + " mod" + "(" + answer.mod_answ[i + buff_stp2] + ")");
        console.log("<=> " + "t = " + answer.mod_answ[i+buff_stp2] + "k + " + answer.b_answ[i+buff_stp2]);
        console.log("Thay t vào ("+(i+1)+"*), ta được:");
        console.log("<=> " + "x = " + answer.temp_t[i] + "(" + answer.mod_answ[i+buff_stp2] + "k + " + answer.b_answ[i+buff_stp2] + ")" + " + " + answer.temp_a[i]);
        console.log("<=> " + "x = " + answer.val_t[i + stp_2] + "k + " + answer.val_a[i + stp_2]);
        console.log("Kết quả:")
        answer.index_mod[i + stp_2] = answer.index_mod[i + stp_2] + 1;
        console.log(answer.a_answ[i + buff_stp3] + "x đồng dư " + answer.b_answ[i + buff_stp3] + " mod" + "(" + answer.mod_answ[i + buff_stp3] + ")" +" ("+answer.index_mod[[i+stp_2]]+")");
        if (i < 1) {
            stp = 1;
            stp_2 = 2;
            stp_3 = 2;
            buff_stp2 = 3;
            buff_stp3 = 4;
        }
        else {
            stp = 2;
            stp_2 = 3;
            stp_3 = 4;
            buff_stp2 = 5;
            buff_stp3 = 6;
        }
    }
}