var seaField =[]; // Массив Поле Боя; 0- нет корабля, 1-есть корабль
var WarriorName="0";
var shipsTerminated = false;
var guesses = 0;
var TotalTime, startTimeTake = false, stopTimer = false;
var TimerOnOff = 0;
var orcs_dead = 0;
var pigs_dead = 0;
var bar = 0, barStep = 0;
var status='', TotalScore = 0;
var showPositions = 0;
var message_General = '<div class="alert alert-success"><strong>CONGRATS!</strong> Your Status is GENERAL!</div>';
var message_Sergant = '<div class="alert alert-warning"><strong>Ok!</strong> You are Sergant now!</div>';
var message_Profan = '<div class="alert alert-danger"><strong>POOR BODY!</strong> You looks like PROFAN!</div>';

WarriorName = getCookie('name');
showPositions = getCookie('positions');

if (typeof showPositions == "undefined") { showPositions = 0;}
if (typeof WarriorName == "undefined") { WarriorName = "0";}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
const BattleField = {
    createField(rows, cols, defaultValue) {

        var arr = [];
        var html_string = "";

        // Creates all lines:
        for (var i = 0; i < rows; i++) {
            html_string = html_string + '<tr>';
            // Creates an empty line
            arr.push([]);

            // Adds cols to the empty line:
            arr[i].push(new Array(cols));

            for (var j = 0; j < cols; j++) {
                // Initializes:
                if (j === 0) {
                    arr[i][j] = i;
                } else if (i === 0) { arr[i][j] = j; }
                else { arr[i][j] = defaultValue; }
                html_string = html_string + '<td id="' + i.toString() + j.toString() + '"onClick = "YourChoice({row:'+ i.toString() +',col:'+ j.toString() + '})"></td>';  
            }
            html_string = html_string + '</tr>';
        }

        return [arr, html_string];
    },

    showField(Field) {
        rows = Field;
        cols = Field[0]
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < cols.length; j++) {
                var el = i.toString() + j.toString();
                if (i === 0) {
                    document.getElementById(el).style.backgroundColor = "red";
                    document.getElementById(el).style.color = "white";
                    document.getElementById(el).innerHTML = Field[i][j];
                }
                if (j === 0) {
                    document.getElementById(el).style.backgroundColor = "red";
                    document.getElementById(el).style.color = "white";
                    document.getElementById(el).innerHTML = Field[i][j];
                }
                if (showPositions == 1) {
                document.getElementById(el).innerHTML = Field[i][j];
                }
            }
        }
        return Field;
    }
};

function getRandom(MaxNumber){
    this.n = MaxNumber;
    this.w = Math.floor(Math.random() * (this.n + 1));
    if (this.w == 0) { this.w = 1;} 
    return this.w;
}

function ShipArea(ShipOrientation,number_of_decks){
   this.d = ShipOrientation;
   this.palubs = number_of_decks;

   if (d == 1) {
    switch (palubs) {
        case 5: { var rows = 3; cols = 7; break; }
        case 4: { var rows = 3; cols = 6; break; }
        case 3: { var rows = 3; cols = 5; break; }
        case 2: { var rows = 3; cols = 4; break; }
        default: { var rows = 3; cols = 3; break; }
    }

   } else {
    switch (palubs) {
        case 5: { var rows = 7; cols = 3; break; }
        case 4: { var rows = 6; cols = 3; break; }
        case 3: { var rows = 5; cols = 3; break; }
        case 2: { var rows = 4; cols = 3; break; }
        default: { var rows = 3; cols = 3; break; }
    }

   } 

   return {rows:rows, cols:cols};

}

function CheckShip(CoordinateY,CoordinateX,Number_Rows,Number_Cols){
    this.y = CoordinateY;
    this.x = CoordinateX;

    this.rows = y + Number_Rows;
    this.cols = x + Number_Cols;
    var IsAnyBodyHere = 0;

    for (var i = this.y; i < this.rows; i++) {
        for (var j = this.x; j < this.cols; j++) {
            if (this.rows > seaField.length || this.cols > seaField[0].length)
            {alert('Суммируем за пределом' + this.rows.toString() + ' '+ this.cols.toString());}else
            {
               if(seaField[i][j] == 1) { IsAnyBodyHere += 1;};  
            }
        }
    }

    return IsAnyBodyHere;
}

function InsertShip(CoordinateY,CoordinateX,Number_Rows,Number_Cols){
    this.y = CoordinateY;
    this.x = CoordinateX;

    this.rows = y + Number_Rows;
    this.cols = x + Number_Cols;
    for (var i = this.y + 1; i < (this.rows-1); i++) {
        for (var j = this.x+1; j < (this.cols-1); j++) {
            if (this.rows > seaField.length || this.cols > seaField[0].length)
            {alert('Корабль не вмещается' + this.rows.toString() + ' '+ this.cols.toString());}else
            {
            seaField[i][j] = 1;  
            }
  //          alert (i.toString() + ' ' + j.toString());          
        }
    }
return seaField;
}

function PlaceShip(Number_of_Decks){
this.palub = Number_of_Decks;

var ShipOrientation = getRandom(2),
        x,y,controlSumShip = 0,
        NumberShipRows = ShipArea(ShipOrientation,this.palub).rows;
        NumberShipCols = ShipArea(ShipOrientation,this.palub).cols;

        y = Math.floor(Math.random() * (seaField.length - NumberShipRows));
        if (y === 0) { y = 1; }
        x = Math.floor(Math.random() * (seaField[0].length - NumberShipCols));
        if (x === 0) { x = 1; }

        controlSumShip = CheckShip(y,x,NumberShipRows,NumberShipCols);
        if (controlSumShip == 0) {
            seaField = InsertShip(y,x,NumberShipRows,NumberShipCols);
        } else {
            return this.PlaceShip(Number_of_Decks);
        }
}

function ControlSum(Field){
    SummaElementov = 0;
    for (var i = 1; i < Field.length; i++) {
        for (var j = 1; j < Field[0].length; j++) {
            SummaElementov = SummaElementov + Field[i][j];
        }
    }
    return SummaElementov;

}

function timer() {
    if (startTimeTake == false) { 
        fromTime = new Date().getTime(); startTimeTake = true; }
    if (TimerOnOff == 1 && stopTimer == false) {
        let div = document.getElementById('seconds');
        animate();
        function animate() {
            if (TimerOnOff == 1 && stopTimer == false) {
                let time = new Date().getTime();
                TotalTime = (time - fromTime) / 1000;
                div.innerHTML = (time - fromTime) / 1000;

                requestAnimationFrame(animate)
            } else { return; }
        }
    }
}

function name_control(ele) {
    if(event.key === 'Enter') {
        WarriorName = ele.value;
        let name = "name";
        let value = WarriorName;

        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        location.reload(); 
    }
}

function ShowEnemyPositions(){
    if (showPositions == 0) {
      showPositions = 1;
      let name = 'positions';
      let value = showPositions;
      document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; SameSite=Strict';  
      location.reload();   
    } else {
        showPositions = 0;
        let name = 'positions';
        let value = showPositions;
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)+ '; SameSite=Strict';  
        location.reload();       
    }

}

function SaveGame(PlayerName){
    var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
    
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function() { 
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            }
    
            anHttpRequest.open( "GET", aUrl, true );            
            anHttpRequest.send( null );
        }
    }
    
    var client = new HttpClient();
    var req = 'https://nepra.by/holywar3/save.php?name=' + PlayerName + '&score=' + guesses + '&status=' + status;
    alert (req)
    client.get(req);

}

function PlayGame(){
    var arr = BattleField.createField(11, 11, 0);
    seaField = arr[0];
    var seaFieldHTML = arr[1];
    document.getElementById("BattleField").innerHTML = seaFieldHTML;
    PlaceShip(5);        
    PlaceShip(4);
    PlaceShip(3);
    PlaceShip(2);  
    PlaceShip(1);
    BattleField.showField(seaField);
    barStep = Math.round(100/ControlSum(seaField));

}

function YourChoice(Shot) {
    if (ControlSum(seaField) !=0)  {
        guess = Shot.row.toString() + Shot.col.toString();
        guesses += 1;
    
        if (Shot.row != 0 && Shot.col !=0) { 
            if (seaField[Shot.row][Shot.col] ==0) {
                  pigs_dead += 1;
                  document.getElementById(guess).innerHTML = "&#8226;";
                  document.getElementById(guess).style.backgroundColor = "blue";
                  document.getElementById(guess).style.color = "white";
    
            } else {
                bar = bar + barStep;
                  document.getElementById("bar").style.width = bar + "%";
                  document.getElementById("bar").innerHTML = bar + "% Complete (success)";
                orcs_dead += 1;
                  document.getElementById(guess).innerHTML = "X";
                  document.getElementById(guess).style.backgroundColor = "red";
                  document.getElementById(guess).style.color = "white";
                  seaField[Shot.row][Shot.col] = 0;                  
                  
            }
        }
        
    
    
       } else {
                shipsTerminated = true;
                TimerOnOff = 0; stopTimer = true;
                
                var stat = "<div class='alert alert-warning'><strong>WAR Statistic!</strong> You spend " + TotalTime + " seconds to drown " + orcs_dead +
                " Orcs. You waste " + guesses + " bullets and " + pigs_dead + " pigs died.<br /><strong>PERSONAL SKILLS REPORT<br />Shooting accuracy:" + orcs_dead / guesses + "<br />Warrior Skills:" + (1 - (pigs_dead / orcs_dead)) + "<br />Time Management:" + 2 / TotalTime + "</strong>";
                document.getElementById("Statistic").innerHTML = stat;
                status;
                TotalScore = pigs_dead;
                    if (TotalScore == 0) {
                    document.getElementById("status1").style.width = "33%";
                    document.getElementById("status2").style.width = "34%";
                    document.getElementById("status3").style.width = "33%";
                    document.getElementById("Statistic").innerHTML = message_General;
                    status = 'General';
                    } else if (TotalScore <= 2) {
                    document.getElementById("status1").style.width = "33%";
                    document.getElementById("status2").style.width = "34%";
                    document.getElementById("status3").style.width = "0%";
                    document.getElementById("Statistic").innerHTML = message_Sergant;
                    status = 'Sergant';                    
                    }
                    else if (TotalScore >= 3) {
                    document.getElementById("status1").style.width = "20%";
                    document.getElementById("status2").style.width = "0%";
                    document.getElementById("status3").style.width = "0%";
                    document.getElementById("Statistic").innerHTML = message_Profan;
                    status = 'Profan';  
                    }

              if (WarriorName != '0') {SaveGame(WarriorName);} else {alert(WarriorName);}

              var list = document.querySelectorAll("ul.nav-tabs > li");
              list[0].classList.remove("active");
              list[list.length-1].classList.add("active");
              document.getElementById("home").classList.remove("in","active");
              document.getElementById("menu3").classList.add("in","active");

              }
       document.getElementById("orcs_dead").innerHTML = orcs_dead;
       document.getElementById("guesses").innerHTML = guesses;
       document.getElementById("pigs_dead").innerHTML = pigs_dead;



    } // End YourChoice function
