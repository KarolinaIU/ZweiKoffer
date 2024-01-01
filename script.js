var abhol = 'false';// true-wenn Übergabe an der Geschäftsstelle, false-wenn Abholung von einem Sammelfahrzeug
var plz = '86165';//plz der Geschäftsstelle
var abholadresse = '';
var abholplz = 0;
var strasse = '';
var hausnum = '';
var abholdatum = '';
var abholzeit = '';
var kleidung = [];
var kriesengebiet = '';

//indexHtmlLoad() wird beim Laden von index.html ausgeführt.
function indexHtmlLoad() {
    var parameter = location.search.substring(1);
    if (parameter !== "") {
       
        buttonsZeigen(true);
    }
}

//buttonsZeigen() macht die Schaltflächen zur Auswahl der Kleiderspendenmethode sichtbar
 function buttonsZeigen(sichtbar) {
     console.log(sichtbar);
     if (sichtbar) {
         document.getElementById("buttonUebergabe").style.visibility = "visible";
         document.getElementById("buttonAbholung").style.visibility = "visible";
     } else {
         document.getElementById("buttonUebergabe").style.visibility = "hidden";
         document.getElementById("buttonAbholung").style.visibility = "hidden";
     }
 }

//registrierungHtmlLoad() wird beim Laden von registrierung.html ausgeführt.
//Funktion gibt einen Teil des Anmeldeformulars aus, je nach Art der Bekleidungslieferung.
function registrierungHtmlLoad() {
    var alleparameter = location.search.substring(1);
    var parameter = alleparameter.split("&");//abhol=false  zeigen=kleid
    var param0 = parameter[0].split("=");// ['abhol', 'false']
    abhol = param0[1];
    if (parameter.length == 2) {
        var param1 = parameter[1].split("=");// ['zeigen', 'kleid']
        zeigen = param1[1];
    } else {
        zeigen = ''
        var elemMenu = document.querySelector("[data-action='kleiderSpenden']");
        elemMenu.remove();
    }

    if (abhol == 'true') {
        document.getElementById("Ccont_adress").style.display = "block";
        document.getElementById("Cmain_kleid").style.display = "none";
        document.getElementById("Cmain_gebiet").style.display = "none";
    }
    else {
        switch (zeigen) {
            case "kleid":
                document.getElementById("demo2").innerHTML = "Dies sind die möglichen Arten von Kleidung, die Sie spenden können.";
                document.getElementById("Cmain_kleid").style.display = "block";
                document.getElementById("Cmain_gebiet").style.display = "none";

                var checkboxes = document.getElementsByClassName("checkbox");
                var checkboxesChecked = [];
                for (var i = 0; i < checkboxes.length; i++) {
                    checkboxes[i].disabled = true;
                }
                var elemMenu = document.querySelector("[data-action='kleidZeigen']");
                elemMenu.remove();
                break;

            case "gebiet":
                document.getElementById("demo3").innerHTML = "Dies sind Krisengebiete für Kleiderspenden."
                document.getElementById("button6").style.visibility = "hidden";
                document.getElementById("button7").style.visibility = "hidden";
                document.getElementById("Cmain_kleid").style.display = "none";
                document.getElementById("Cmain_gebiet").style.display = "block";
                var elemMenu = document.querySelector("[data-action='gebietZeigen']");
                elemMenu.remove();
                break;
            default:
                document.getElementById("Cmain_kleid").style.display = "block";
                document.getElementById("Cmain_gebiet").style.display = "block";
        }
        document.getElementById("Ccont_adress").style.display = "none";
    }
}

//plz_aktualisieren() aktualisiert die Postleitzahl nach Ortänderung
function plz_aktualisieren() {
    selplz = document.getElementById("abholadresse");
    iii = selplz.length
    for (i = 0; i < iii; i++) {
        if (selplz[i].value == 'kein') {
            selplz[i] = null;
            break;
        }
    }

    let bbb5 = document.getElementById("abholadresse").value;

    if (abholadresse != bbb5) {
        abholadresse = bbb5;
        selplz = document.getElementById("abholplz");

        iii = selplz.length
        for (i = 0; i < iii; i++) {
            selplz[0] = null;
        }

        switch (abholadresse) {
            case "Augsburg":
                var arr = [86150, 86152, 86153, 86154, 86156, 86157, 86159, 86161, 86163, 86165, 86167, 86169, 86179, 86199];
                break;
            case "Eresing":
                var arr = [86922, 86926, 86941];
                break;
            case "Friedberg":
                var arr = [86136];
                break;
            case "Fürstenfeldbruck":
                var arr = [82256, 82282, 82285];
                break;
            case "Ingolstadt":
                var arr = [85049, 85051, 85053, 85055, 85057];
                break;
            case "Kempten":
                var arr = [87435, 87437, 87439];
                break;
            case "Königsbrunn":
                var arr = [86343];
                break;
            case "Landsberg am Lech":
                var arr = [86899, 86932];
                break;
            case "Mering":
                var arr = [86415];
                break;
            case "Neusäß":
                var arr = [86356];
                break;
            case "Nürnberg":
                var arr = [90402, 90403, 90408, 90409, 90411, 90419, 90425, 90427, 90429, 90431, 90439, 90449, 90455, 90461, 90475, 90480];
                break;
            default:
                var arr = [];
        }
        for (i = 0; i < arr.length; i++) {
            var newOption = new Option(arr[i]);
            selplz.options[selplz.options.length] = newOption;
        }
    }
}

//kriesengebiet_aktualisieren() entfernt den Eintrag "Wählen Sie ein Gebiet" aus der Liste.
function kriesengebiet_aktualisieren() {
    selplz = document.getElementById("kriesengebiete");
    iii = selplz.length
    for (i = 0; i < iii; i++) {
        if (selplz[i].value == 'kein') {
            selplz[i] = null;
            break;
        }
    }
}

//submit_plz() prüft die eingegebene Adresse und das Datum der Abholung
function submit_plz() {
    abholplz = document.getElementById("abholplz").value;
    abholadresse = document.getElementById("abholadresse").value;
    strasse = document.getElementById("strasse").value;
    hausnum = document.getElementById("hausnum").value;
    abholzeit = document.getElementById("zeit").value;
    let dat = document.getElementById("datum").value;
    if (dat == '') {
        abholdatum = '';
    } else {
        abholdatum = dat.substr(8, 2) + "." + dat.substr(5, 2) + "." + dat.substr(0, 4);
    }

    let antwortVisibility = "visible";
    let antwortInhalt = 'A';
    if (plz.slice(0, 2) == abholplz.slice(0, 2)) {
        if (strasse == '') {
            antwortInhalt = "Geben Sie bitte die Straße an.";
        } else {
            if (hausnum == '') {
                antwortInhalt = "Geben Sie bitte die Hausnummer an.";
            } else {
                if (abholdatum == '') {
                    antwortInhalt = "Geben Sie bitte das Datum der Abholung an.";
                } else {
                    //das Abholdatum muss größer als heute sein
                    let heute = new Date();
                    let abh = new Date(dat.substr(0, 4), Number(dat.substr(5, 2)) - 1, dat.substr(8, 2));
                    if (abh <= heute) {
                        antwortInhalt = "Geben Sie bitte das Abholdatum später als heute an.";
                    } else {
                        if (abh.getDay() == 0) {
                            antwortInhalt = "Wählen Sie Bitte einen anderen Wochentag als Sonntag.";
                        } else {
                            if (abholzeit == '') {
                                antwortInhalt = "Geben Sie bitte die Abholzeit an.";
                            } else {
                                let abhz = Number(abholzeit.substring(0, 2) + abholzeit.substring(3));
                                if (abhz < 900 || abhz > 1500) {
                                    antwortInhalt = "Wählen Sie Bitte eine Zeit zwischen 9 und 15 Uhr.";
                                } else {
                                    document.getElementById("Ccont_adress").style.display = "none";
                                    document.getElementById("Cmain_kleid").style.display = "block";
                                    document.getElementById("Cmain_gebiet").style.display = "block";
                                    antwortVisibility = "hidden";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        if (abholplz == '') {
            antwortInhalt = "Wählen Sie bitte einen Ort.";
        } else {
            antwortInhalt = "Leider ist die Abholadresse weit von unserer Geschäftsstelle entfernt.";
            // + " Bitte geben Sie eine andere Adresse ein oder liefern Sie die Kleidung selbst in unserer Geschäftstelle ab. Entschuldigen Sie die Umstände!";
        }
    }
    document.getElementById("antwort").innerHTML = antwortInhalt;
    document.getElementById("antwort").style.visibility = antwortVisibility;
}

//submit_KleidUndGebiet() prüft die eingegebene Kleidungsarten und das Krisengebiet 
//und zeigt die abschließende Seite an.
function submit_KleidUndGebiet() {
    var checkboxes = document.getElementsByClassName("checkbox");
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(" " + checkboxes[i].value);
        }
    }

    if (checkboxesChecked.length == 0) {
        document.getElementById("antwort").innerHTML = "Wählen Sie bitte die Kleidungsarten aus.";
        document.getElementById("antwort").style.visibility = "visible";
    }
    else {
        kleidung = checkboxesChecked;
        if (document.getElementById("kriesengebiete").value == 'kein') {
            document.getElementById("antwort").innerHTML = "Wählen Sie bitte ein aktuelles Krisengabiet aus.";
            document.getElementById("antwort").style.visibility = "visible";
        }
        else {
            kriesengebiet = document.getElementById("kriesengebiete").value;

            document.getElementById("antwort").style.display = "none";
            document.getElementById("ekleidung").innerHTML = kleidung;
            document.getElementById("ekriesengebiet").innerHTML = kriesengebiet;
            if (abhol == 'true') {
                document.getElementById("eabhol1").style.display = "block";
                document.getElementById("eabhol2").innerHTML = abholplz + "  " + abholadresse;
                document.getElementById("eabhol2").style.display = "block";
                document.getElementById("eabhol3").innerHTML = strasse + "  " + hausnum;
                document.getElementById("eabhol3").style.display = "block";
                document.getElementById("eabhol4").innerHTML = "am " + abholdatum + " um " + abholzeit;
                document.getElementById("eabhol4").style.display = "block";
            } else {
                document.getElementById("eabhol1").innerHTML = "Datum und Uhrzeit der Registrierung Ihrer Spende";
                document.getElementById("eabhol1").style.display = "block";
                let heute = new Date();//Mon Dec 25 2023 11:24:51 GMT+0100 (Central European Standard Time)
                let tag = (heute.getDate() < 10) ? '0' + heute.getDate() : heute.getDate();//aktueller Tag
                let monat = (heute.getMonth() + 1 < 10) ? '0' + (heute.getMonth() + 1) : heute.getMonth() + 1;//aktueller Monat
                let jahr = heute.getFullYear();//aktuelles Jahr
                let uhr = (heute.getHours() < 10) ? '0' + heute.getHours() : heute.getHours();
                let minute = (heute.getMinutes() < 10) ? '0' + heute.getMinutes() : heute.getMinutes();
                document.getElementById("eabhol2").innerHTML = tag + '.' + monat + '.' + jahr + '   ' + uhr + ':' + minute;
                document.getElementById("eabhol2").style.display = "block";
            }
            document.getElementById("Ccont_adress").style.display = "none";
            document.getElementById("Cmain_kleid").style.display = "none";
            document.getElementById("Cmain_gebiet").style.display = "none";
            document.getElementById("Cende").style.display = "block";
        }
    }
}

//func_zurueck() wird ausgeführt, wenn die Zurück-Taste gedrückt wird.
function func_zurueck() {
    if (abhol == 'true') {
        document.getElementById("Ccont_adress").style.display = "block";
        document.getElementById("Cmain_kleid").style.display = "none";
        document.getElementById("Cmain_gebiet").style.display = "none";
    } else {
        // window.location = "index.html";
        window.location = "index.html?spenderegistrieren";
    }
}