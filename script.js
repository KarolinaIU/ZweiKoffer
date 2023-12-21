//   console.log(abholadresse);
//alert("Все буде добре!");
//var myName=prompt("What is your name?");
//alert("Hello "+myName+"!");
//    window.location = "t_kleider.html";
// document.write("<h1>Это моя домашняя страница</h1>");

var abhol = 'false';
var plz = '86165';
//var ort = '';
var strasse = '';
var hausnum = '';
var abholadresse = '';
var abholplz = 0;
var kleidung = [];
var kriesengebiet = '';


function func_plz() {

    abholplz = document.getElementById("abholplz").value;
    strasse = document.getElementById("strasse").value;
    hausnum = document.getElementById("hausnum").value;
    abholadresse = document.getElementById("abholadresse").value;

    if (plz.slice(0, 2) == abholplz.slice(0, 2)) {
        if (strasse == '') {
            document.getElementById("antwort").innerHTML = "Geben Sie bitte eine Straße.";
            document.getElementById("antwort").style.visibility = "visible";
        } else {
            if (hausnum == '') {
                document.getElementById("antwort").innerHTML = "Geben Sie bitte eine Hausnummer.";
                document.getElementById("antwort").style.visibility = "visible";
            } else {
                document.getElementById("Ccont_adress").style.display = "none";
                document.getElementById("Cmain_kleid").style.display = "block";
                document.getElementById("Cmain_gebiet").style.display = "block";
                document.getElementById("antwort").style.visibility = "hidden";
            }
        }
    }
    else {
        //       console.log("abholplz >" + typeof (abholplz) + "<");

        if (abholplz == '') {
            document.getElementById("antwort").innerHTML = "Wählen Sie bitte einen Ort.";
        } else {
            document.getElementById("antwort").innerHTML = "Leider ist die Abholadresse weit von unserer Geschäftsstelle entfernt.";
      //          + " Bitte geben Sie eine andere Adresse ein oder liefern Sie die Kleidung selbst in unserer Geschäftstelle ab. Entschuldigen Sie die Umstände!";
        }
        document.getElementById("antwort").style.visibility = "visible";
    }
}

function plz_aktualisieren() {

    selplz = document.getElementById("abholadresse");
    iii = selplz.length
    for (i = 0; i < iii; i++) {
        // //     console.log(i+"  "+selplz[i].value);
        if (selplz[i].value == 'kein') {
            selplz[i] = null;
            break;
        }
    }

    var bbb5 = document.getElementById("abholadresse").value;

    if (abholadresse != bbb5) {
        abholadresse = bbb5;
        selplz = document.getElementById("abholplz");

        iii = selplz.length
        for (i = 0; i < iii; i++) {
            selplz[0] = null;
        }

        //var selectedIndex=selplz.options.selectedIndex;
        //selplz.options[selectedIndex]=null;

        //add
        // var arr=new Array();
        switch (abholadresse) {
            case "Augsburg":
                var arr = [86150, 86165, 86167, 86169, 86179, 86199];
                break;
            case "Ingolstadt":
                var arr = [85049, 85051, 85053, 85055, 85057];
                break;
            case "Kempten":
                var arr = [87435, 87437, 87439];
                break;
            case "Nürnberg":
                var arr = [90402, 90408, 90411, 90419, 90425, 90431, 90449, 90455, 90475];
                break;
            case "Fürstenfeldbruck":
                var arr = [82256, 82282, 82285];
                break;
            default:
                var arr = [];
        }
        for (i = 0; i < arr.length; i++) {
            var newOption = new Option(arr[i]);
            selplz.options[selplz.options.length] = newOption;
        }
        //   console.log(abholadresse);
        //   document.getElementById("demo").innerHTML = abholadresse + selplz.value;
    }
}



function fun1() {
    document.getElementById("button2").style.visibility = "visible";
    document.getElementById("button3").style.visibility = "visible";
}


function func_kleid() {
    abhol = location.search.substring(7);
    if (abhol == 'true') {
        document.getElementById("Ccont_adress").style.display = "block";
        document.getElementById("Cmain_kleid").style.display = "none";
        document.getElementById("Cmain_gebiet").style.display = "none";
    }
    else {
        document.getElementById("Ccont_adress").style.display = "none";
        document.getElementById("Cmain_kleid").style.display = "block";
        document.getElementById("Cmain_gebiet").style.display = "block";
    }
}

function kriesengebiet_aktualisieren(){
    selplz = document.getElementById("kriesengebiete");
    iii = selplz.length
    for (i = 0; i < iii; i++) {
          if (selplz[i].value == 'kein') {
            selplz[i] = null;
            break;
        }
    }    
}

function func_submit() {
    var checkboxes = document.getElementsByClassName("checkbox");
    console.log("odag->" + checkboxes.length);
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(" " + checkboxes[i].value);
            //  console.log(checkboxes[i].value);
        }
    }
    //   console.log("odag->" + checkboxesChecked.length);
    //return checkboxesChecked
    if (checkboxesChecked.length == 0) {
        //      document.getElementById("demo").;
        document.getElementById("antwort").innerHTML = "Wählen Sie bitte die Kleidungsarten aus.";
        document.getElementById("antwort").style.visibility = "visible";

    }
    else {
        kleidung = checkboxesChecked;
        //    console.log(kleidung);
        if (document.getElementById("kriesengebiete").value == 'kein') {
            document.getElementById("antwort").innerHTML = "Wählen Sie bitte ein aktuelles Krisengabiet aus.";
            document.getElementById("antwort").style.visibility = "visible";
        }
        else {
            kriesengebiet = document.getElementById("kriesengebiete").value;
        
            document.getElementById("antwort").style.visibility = "hidden";
            document.getElementById("ekleidung").innerHTML = kleidung;
            document.getElementById("ekriesengebiet").innerHTML = kriesengebiet;

            if (abhol == 'true') {
                document.getElementById("eabhol1").style.display = "block";
                document.getElementById("eabhol2").innerHTML = abholplz + "  " + abholadresse;
                document.getElementById("eabhol2").style.display = "block";
                document.getElementById("eabhol3").innerHTML = strasse + "  " + hausnum;
                document.getElementById("eabhol3").style.display = "block";
            }
            document.getElementById("Ccont_adress").style.display = "none";
            document.getElementById("Cmain_kleid").style.display = "none";
            document.getElementById("Cmain_gebiet").style.display = "none";
            document.getElementById("Cende").style.display = "block";
        }
    }
}

// function func_zurueck() {

// }