var guess = 0;
var hits = 0;
var isSunk = false;
var countOfShips = 3;
var value1;
var value2;
var mapSize = 7;
var map = [];
//map = new Array(mapSize);
//for (i = 0; i < mapSize; i++) {
//    map[i] = new Array(mapSize);
//    for (j = 0; j < mapSize; j++) {
//        map[i][j] = "false";
//    }
//}

for (var x = 0; x < mapSize; x++) {
    map[x] = [];
    for (var y = 0; y < mapSize; y++) {
        map[x][y] = "false";
    }
}


function resizeShip(toChange1, toChange2, invert) {
    var secondPart;
    var thirdPart;
    if (invert != true) {
        if (toChange2 != 0 && toChange2 != (mapSize - 1)) {
            secondPart = toChange2 - 1;
            thirdPart = toChange2 + 1;

        } else if (toChange2 === 0) {
            secondPart = toChange2 + 1;
            thirdPart = toChange2 + 2;

        } else if (toChange2 === mapSize - 1) {
            secondPart = toChange2 - 1;
            thirdPart = toChange2 - 2;
        }

        map[value1][secondPart] = "ship";
        map[value1][thirdPart] = "ship";

    } else {
        if (toChange1 != 0 && toChange1 != (mapSize - 1)) {
            secondPart = toChange1 - 1;
            thirdPart = toChange1 + 1;

        } else if (toChange1 === 0) {
            secondPart = toChange1 + 1;
            thirdPart = toChange1 + 2;

        } else if (toChange1 === mapSize - 1) {
            secondPart = toChange1 - 1;
            thirdPart = toChange1 - 2;
        }
        map[secondPart][value2] = "ship";
        map[thirdPart][value2] = "ship";

    }

}

function checkShips(field1, field2) {
    var f1min;
    var f1max;
    var f2min;
    var f2max;
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

    for (i = f1min; i < f1max; i++) {
        for (j = f2min; j < f2max; j++) {
            if (map[i][j] == "ship") {
                return false;
            } else {
                return true;
            }

        }
    }
}
var counter = 0;
while (counter < countOfShips) {

    value1 = Math.floor(Math.random() * mapSize);
    value2 = Math.floor(Math.random() * mapSize);
    if (checkShips(value1, value2)) {
        counter++;
        map[value1][value2] = "ship";
        var whichWay = Math.floor(Math.random() * 2);
        console.log("WhichWay: " + whichWay)
        if (whichWay == 0) {
            resizeShip(value1, value2, false)
        } else {
            resizeShip(value1, value2, true)
        }
    }
}

function showArray() {
    var counter = 0;
    for (i = 0; i < mapSize; i++) {
        for (j = 0; j < mapSize; j++) {
            // document.writeln("i: " + i + ", j: " + j + " - " + map[i][j] + " <br>");
            document.getElementById("f" + counter).innerHTML = map[i][j];
            if (document.getElementById("f" + counter).innerHTML == "ship") {
                document.getElementById("f" + counter).className = "isShip";
            }
            counter++;
        }
    }
}

//showArray();
function drawMatrix() {
    var countFilds = 0;
    var container = document.getElementById('fields');
    for (i = 0; i < mapSize; i++) {
        var newTr = document.createElement('tr');
        container.appendChild(newTr);

        if (i == 0) {
            for (k = 0; k < mapSize; k++) {
                var newTdTitles = document.createElement('td');
                newTdTitles.className = "headerTitle";
                newTdTitles.innerHTML = k;
                container.appendChild(newTdTitles);
            }
            var newTr = document.createElement('tr');
            container.appendChild(newTr);
        }


        for (j = 0; j < mapSize; j++) {
            var newTd = document.createElement('td');
            newTd.id = "f" + countFilds;
            countFilds++;
            newTd.className = "field";
            container.appendChild(newTd);
        }
    }
}
drawMatrix();
showArray();
