var guess = 0;
var hits = 0;
var isSunk = false;
var countOfShips = 4;
var value1;
var value2;
var mapSize = 10;
var map = [];
var mainPointsOfShips = [];
var finishOfChoosePoints = false;
var fourMastedShips = 1;
var treeMastedShips = 2;
var twoMastedShips = 3;
var oneMastedShips = 4;
var maxChanges = 50;
var counterChanges = 0;
var letters = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
var shipsContainer = [];
var counterShips = 0;
var fields = [];
var fieldsCounter = 0;
var shotsCounter = 0;
var countOfSunk = 0;
var shotsCounts = document.getElementById("shotsCount");
var comunicat = document.getElementById("comunicats");
for (var x = 0; x < mapSize; x++) {
    map[x] = [];
    for (var y = 0; y < mapSize; y++) {
        //        map[x][y] = "";
        map[x][y] = new Field(x, y);
        //        console.log("Tworze nowy Field " + x + " " + y);
        //        field[fieldsCounter] = new Field(x, y);
        //        fieldsCounter++;
        map[x][y] = "";

    }
}

function Field(x, y) {
    this.x = x;
    this.y = y;
    this.hit = false;
}
Field.prototype.getX = function () {
    return this.x;
};
Field.prototype.getY = function () {
    return this.y;
};

function Ship(masts) {
    this.masts = masts;
    this.position = [];
    this.hits = 0;
    this.isSunk = false;
}

Ship.prototype = {
    constructor: Ship,
    setShip: function (fieldObject) {
        this.position.push(fieldObject);
    },
    removeShip: function (fieldObject) {
        this.position.pop(fieldObject);
    },
    isSunkAction: function () {
        if (this.isSunk) {

        }
        //        for (i = 0; i < this.position.length; i++)
        //            if (this.position[i] === fieldObject) {
        //                this.hits++;
        //                console.log("trafiłeś");
        //            }
    }
}
//initPoints(1, oneMastedShips);
//console.log("Pierwszy element: " + shipsContainer[2].position[0]);
//console.log("Drugi element: " + shipsContainer[2].position[1]);
//console.log("Trzeci element: " + shipsContainer[2].position[2]);
//console.log("Czwarty element: " + shipsContainer[0].position[3]);
//for (i = 0; i < shipsContainer[9].position.length; i++)
//    console.log("Element: " + i + " = " +
//        shipsContainer[9].position[i]);
function resizeShip(toChange1, toChange2, dimension, invert) {
    var secondPart;
    var thirdPart;
    var fourthPart;
    if (invert != true) {
        if (toChange2 != 0 && toChange2 != (mapSize - 1)) {
            secondPart = toChange2 - 1;
            thirdPart = toChange2 + 1;
            if (toChange2 < mapSize - 2) fourthPart = toChange2 + 2;
            else
                fourthPart = toChange2 - 2;
        } else if (toChange2 === 0) {
            secondPart = toChange2 + 1;
            thirdPart = toChange2 + 2;
            fourthPart = toChange2 + 3;

        } else if (toChange2 === mapSize - 1) {
            secondPart = toChange2 - 1;
            thirdPart = toChange2 - 2;
            fourthPart = toChange2 - 3;
        }
        switch (dimension) {
            case 4:
                if (checkShips(toChange1, secondPart) && checkShips(toChange1, thirdPart) && checkShips(toChange1, fourthPart)) {
                    map[toChange1][secondPart] = "ship";
                    map[toChange1][thirdPart] = "ship";
                    map[toChange1][fourthPart] = "ship";
                    shipsContainer[counterShips - 1].setShip([toChange1, secondPart]);
                    shipsContainer[counterShips - 1].setShip([toChange1, thirdPart]);
                    shipsContainer[counterShips - 1].setShip([toChange1, fourthPart]);
                    break;
                }
            case 3:
                if (checkShips(toChange1, secondPart) && checkShips(toChange1, thirdPart)) {
                    map[toChange1][secondPart] = "ship";
                    map[toChange1][thirdPart] = "ship";
                    shipsContainer[counterShips - 1].setShip([toChange1, secondPart]);
                    console.log("Dodaje do" + (counterShips - 1) + " " + toChange1 + " i " + secondPart);
                    shipsContainer[counterShips - 1].setShip([toChange1, thirdPart]);
                    console.log("Dodaje " + (counterShips - 1) + " " + toChange1 + " i " + thirdPart);
                } else {
                    resizeShip(toChange1, toChange2, 3, true);
                }
                break;
            case 2:
                if (checkShips(toChange1, secondPart)) {
                    map[toChange1][secondPart] = "ship";
                    shipsContainer[counterShips - 1].setShip([toChange1, secondPart]);
                } else {
                    resizeShip(toChange1, toChange2, 2, true);
                }
                //console.log("Pierwszy element: " + shipsContainer[2].position[0]);
                //console.log("Drugi element: " + shipsContainer[2].position[1]);
                //console.log("Trzeci element: " + shipsContainer[2].position[2]);
                //console.log("Czwarty element: " + shipsContainer[0].position[3]);
                //for (i = 0; i < shipsContainer[9].position.length; i++)
                //    console.log("Element: " + i + " = " +
                //        shipsContainer[9].position[i]);
                break;
            default:
                break;
        }

    } else {
        if (toChange1 != 0 && toChange1 != (mapSize - 1)) {
            secondPart = toChange1 - 1;
            thirdPart = toChange1 + 1;
            if (toChange1 < mapSize - 2)
                fourthPart = toChange1 + 2;
            else
                fourthPart = toChange1 - 2;
        } else if (toChange1 === 0) {

            secondPart = toChange1 + 1;
            thirdPart = toChange1 + 2;
            fourthPart = toChange1 + 3;

        } else if (toChange1 === mapSize - 1) {
            secondPart = toChange1 - 1;
            thirdPart = toChange1 - 2;
            fourthPart = toChange1 - 3;

        }
        switch (dimension) {
            case 4:
                if (checkShips(secondPart, toChange2) && checkShips(thirdPart, toChange2) && checkShips(fourthPart, toChange2)) {

                    map[secondPart][toChange2] = "ship";
                    map[thirdPart][toChange2] = "ship";
                    map[fourthPart][toChange2] = "ship";
                    shipsContainer[counterShips - 1].setShip([secondPart, toChange2]);
                    shipsContainer[counterShips - 1].setShip([thirdPart, toChange2]);
                    shipsContainer[counterShips - 1].setShip([fourthPart, toChange2]);

                }
                break;
            case 3:
                if (checkShips(secondPart, toChange2) && checkShips(thirdPart, toChange2)) {
                    map[secondPart][toChange2] = "ship";
                    map[thirdPart][toChange2] = "ship";
                    shipsContainer[counterShips - 1].setShip([secondPart, toChange2]);
                    console.log("Dodaje do" + (counterShips - 1) + " " + secondPart + " i " + toChange2);
                    shipsContainer[counterShips - 1].setShip([thirdPart, toChange2]);
                    console.log("Dodaje do" + (counterShips - 1) + " " + thirdPart + " i " + toChange2);

                } else {
                    map[toChange1][toChange2] = "";
                    shipsContainer[counterShips - 1].removeShip([toChange1, toChange2]);
                    console.log("Usuwam z " + (counterShips - 1) + toChange1 + " i " + toChange2);
                    counterShips--;
                    initPoints(3, 1);
                }
                break;
            case 2:
                if (checkShips(secondPart, toChange2)) {
                    map[secondPart][toChange2] = "ship";
                    shipsContainer[counterShips - 1].setShip([secondPart, toChange2]);

                } else {
                    map[toChange1][toChange2] = "";
                    shipsContainer[counterShips - 1].removeShip([toChange1, toChange2]);
                    console.log("Usuwam z " + (counterShips - 1) + toChange1 + " i " + toChange2);
                    counterShips--;
                    initPoints(2, 1);
                }
            default:
                {
                    break;
                }

        }

    }
}

function checkShips(field1, field2) {
    var f1min;
    var f1max;
    var f2min;
    var f2max;

    var checkMainPoint = false;
    if (map[field1][field2] === "ship")
        return false;

    if (field1 != 0 && field1 != mapSize - 1) {
        f1min = field1 - 1;
        f1max = field1 + 1;

    } else if (field1 == 0) {
        f1min = field1;
        f1max = field1 + 1;
    } else if (field1 == mapSize - 1) {
        f1min = field1 - 1;
        f1max = field1;
    }

    if (field2 != 0 && field2 != mapSize - 1) {
        f2min = field2 - 1;
        f2max = field2 + 1;
    } else if (field2 == 0) {
        f2min = field2;
        f2max = field2 + 1;
    } else if (field2 == mapSize - 1) {
        f2min = field2 - 1;
        f2max = field2;
    }

    for (i = f1min; i <= f1max; i++) {
        columns: for (j = f2min; j <= f2max; j++) {
            if (map[i][j] == "ship") {
                for (k = 0; k < 1; k++) {
                    if (value1 == i && value2 == j) {
                        continue columns;
                    }
                    return false;
                }
            }
        }
    }
    return true;
}

function myPosition() {
    this.x = x;
    this.y = y;
    value1 = Math.floor(Math.random() * mapSize);
    value2 = Math.floor(Math.random() * mapSize);
}

function isFree() {
    var freePoints = []
    for (i = 0; i < mapSize - 1; i++) {
        for (j = 0; j < mapSize - 1; j++) {
            if (map[i][j] == "") {
                freePoints.push({
                    row: i,
                    col: j
                })
            }
        }
    }
    return freePoints;
}

function initPoints(version, count) {
    if (counterChanges < maxChanges) {
        var counter = 0;
        while (counter < count) {
            if (version > 1) {
                value1 = Math.floor(Math.random() * mapSize);
                value2 = Math.floor(Math.random() * mapSize);

            } else {
                var tmp1;
                var tmp2;
                tmp1 = Math.floor(Math.random() * isFree().length);
                tmp2 = Math.floor(Math.random() * isFree().length);
                value1 = isFree()[tmp1].col;
                value2 = isFree()[tmp2].row;
            }


            if (checkShips(value1, value2)) {
                map[value1][value2] = "ship";
                console.log(value1);
                console.log(value2);
                if (shipsContainer[counterShips] === undefined) {
                    shipsContainer[counterShips] = new Ship(version);
                    console.log("Tworze counterShips" + [counterShips]);
                }

                shipsContainer[counterShips].setShip([value1, value2]);
                console.log("Dodaje " + value1 + " i " + value2);

                counterShips++;
                if (version > 1)
                    resizeInit(value1, value2, version);
                counter++;
            }
        }
    }
    counterChanges++;
}

///Find object when I put fild array

//function findObject(object) {
//
//    for (i = 0; i < shipsContainer.length; i++) {
//        for (j = 0; j < shipsContainer[i].position[j].length; j++) {
//            if (shipsContainer[i].position[j] === object) {
//                shipsContainer[i].hits++;
//            }
//        }
//    }
//}
//            mainPointsOfShips.push({
//                row: value1,
//                 col: value2
//            });


//    finishOfChoosePoints = true;2




drawMatrix();


initPoints(4, fourMastedShips);
initPoints(3, treeMastedShips);
initPoints(2, twoMastedShips);
//console.log(test[1].getX());
initPoints(1, oneMastedShips);
console.log("Pierwszy element: " + shipsContainer[0].position[0]);
//console.log("Drugi element: " + shipsContainer[2].position[1]);
//console.log("Trzeci element: " + shipsContainer[2].position[2]);
//console.log("Czwarty element: " + shipsContainer[0].position[3]);
//for (i = 0; i < shipsContainer[9].position.length; i++)
//    console.log("Element: " + i + " = " +
//        shipsContainer[9].position[i]);

function resizeInit(x, y, version) {
    var whichWay = Math.floor(Math.random() * 2);
    console.log("WhichWay: " + whichWay)
    if (whichWay == 0) {
        resizeShip(x, y, version, false);
    } else {
        resizeShip(x, y, version, true);

    }
}

function showArray() {
    var counter = 0;
    for (i = 0; i < mapSize; i++) {
        for (j = 0; j < mapSize; j++) {
            //            document.writeln("i: " + i + ", j: " + j + " - " + map[i][j] + " <br>");
            document.getElementById(counter).innerHTML = map[i][j];
            if (document.getElementById(counter).innerHTML == "ship") {
                document.getElementById(counter).className = "field isShip";
            }
            if (document.getElementById(counter).innerHTML == "hit") {
                document.getElementById(counter).className = "field hitted";
            }
            if (document.getElementById(counter).innerHTML == "s") {
                document.getElementById(counter).className = "field sunk";
            }
            if (document.getElementById(counter).innerHTML == "&bull;") {
                document.getElementById(counter).className = "field miss";
            }

            counter++;
        }
    }
}

function drawMatrix() {
    var countFilds = 0;
    var container = document.getElementById('fields');
    for (i = 0; i < mapSize; i++) {
        var newTr = document.createElement('tr');
        container.appendChild(newTr);

        if (i == 0) {
            for (k = 0; k < mapSize + 1; k++) {
                var newTdTitles = document.createElement('td');
                newTdTitles.className = "headerTitle";
                newTdTitles.innerHTML = letters[k];
                container.appendChild(newTdTitles);
            }
            var newTr = document.createElement('tr');
            container.appendChild(newTr);
        }
        var newTrTitles = document.createElement('td');
        newTrTitles.className = "header2Title";
        newTrTitles.innerHTML = i + 1;
        container.appendChild(newTrTitles);

        for (j = 0; j < mapSize; j++) {
            fields[countFilds] = new Field(x, y);
            var newTd = document.createElement('td');
            newTd.id = countFilds;
            countFilds++;
            newTd.className = "field";
            container.appendChild(newTd);
        }
    }
}

function whatTargetIsClicked() {
    var field = document.getElementsByClassName("field");
    var fieldShot;
    var result;
    for (i = 0; i < field.length; i++) {
        field[i].addEventListener("click", checkPosition);
    }

    function checkPosition(e) {
        fieldShot = (e.target.id);
        if (fieldShot < 10) {
            tmp1 = 0;
            tmp2 = parseInt(fieldShot);
            result = [tmp1, tmp2];

        } else {
            var tmp1 = (fieldShot.slice(0, 1));
            var tmp2 = fieldShot.slice(1, 2);
            result = [parseInt(tmp1), parseInt(tmp2)];
        }
        if (checkIsShip(result)) {
            if (map[tmp1][tmp2] != "s") {
                map[tmp1][tmp2] = "hit";
            }

            field[fieldShot].removeEventListener("click", checkPosition);
        } else {
            map[tmp1][tmp2] = "&bull;";
            field[fieldShot].removeEventListener("click", checkPosition);
        }
        showArray();
        shotsCounter++;
        shotsCounts.innerHTML = "Ilość strzałów: " + shotsCounter;

    }


}


function checkIsShip(arr) {
    var result;
    for (i = 0; i < shipsContainer.length; i++) {
        for (j = 0; j < shipsContainer[i].position.length; j++) {
            if (parseInt(shipsContainer[i].position[j]["0"]) == parseInt(arr["0"]) && parseInt(shipsContainer[i].position[j]["1"]) == parseInt(arr["1"])) {
                switch (shipsContainer[i].masts) {
                    case 4:
                        comunicat.innerHTML += "Trafiłeś okręt czteromasztowy<br>";
                        break;
                    case 3:
                        comunicat.innerHTML += "Trafiłeś okręt trzymasztowy<br>";
                        break;
                    case 2:
                        comunicat.innerHTML += "Trafiłeś okręt dwumasztowy<br>";
                        break;
                    case 1:
                        comunicat.innerHTML += "Trafiłeś okręt jednomasztowy<br>";
                        break;
                }
                shipsContainer[i].hits++;
                if (shipsContainer[i].hits == shipsContainer[i].position.length) {
                    shipsContainer[i].isSunk = true;
                    countOfSunk++;

                    console.log("zatopiony");
                    switch (shipsContainer[i].masts) {
                        case 4:
                            comunicat.innerHTML += "<span class='sunkText'>Zatopiłeś okręt czteromasztowy</span><br>";
                            break;
                        case 3:
                            comunicat.innerHTML += "<span class='sunkText'>Zatopiłęś okręt trzymasztowy</span><br>";
                            break;
                        case 2:
                            comunicat.innerHTML += "<span class='sunkText'>Zatopiłeś okręt dwumasztowy</span><br>";
                            break;
                        case 1:
                            comunicat.innerHTML += "<span class='sunkText'>Zatopiłeś okręt jednomasztowy</span><br>";
                            break;
                    }

                    for (k = 0; k < shipsContainer[i].position.length; k++) {
                        var tmp1;
                        var tmp2;
                        tmp1 = (shipsContainer[i].position[k][0]);
                        tmp2 = (shipsContainer[i].position[k][1]);
                        map[tmp1][tmp2] = "s";
                        console.log("tempy: " + tmp1, tmp2);
                        console.log("temp: " + map[tmp1][tmp2]);


                        //showArray();

                    }
                    //                    for (i = 0; i < shipsContainer.length; i++) {
                    //
                    //                        if (shipsContainer[i].isSunk == true) {
                    //                            countOfSunk++;
                    //                            console.log("Zatopiłeś:" + countOfSunk);
                    //                        }
                    //                        if (countOfSunk == 10) {
                    //                            comunicat.innerHTML += "Koniec gry";
                    //                        }
                    //                    }
                    console.log("Zatopionych: " + countOfSunk);
                    if (countOfSunk == 10) {
                        comunicat.innerHTML += "Koniec gry";
                    }
                }
                //                console.log("porównuje " + shipsContainer[i].position[j] + " i " + arr)
                console.log("trafiles");


                return true;

            } else {
                console.log("porównuje " + shipsContainer[i].position[j] + " i " + arr)
                console.log("pudło");

            }
        }
    }


}

showArray();

whatTargetIsClicked();
