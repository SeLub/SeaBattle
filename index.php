<html>

<head>
    <title>Sea Holy battle v.3.02</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="holywar.css">
    <script src="test2.js"></script>
</head>

<body onload="javascript:PlayGame()">
    
    
    <div class="container">
  <ul class="nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#home">Game</a></li>
    <li><a data-toggle="tab" href="#menu1">Settings</a></li>
    <li><a data-toggle="tab" href="#menu2">Fasti</a></li>
    <li><a data-toggle="tab" href="#menu3">Stats & Ruls</a></li>
  </ul>

  <div class="tab-content">
    <div id="home" class="tab-pane fade in active">
      
      <div class="row">
  <div class="col-xs-2 col-sm-2" style="margin-top: 10px">
  <div style="text-align: center;font-size: 20;color: wheat;"><span class="seconds" id="seconds">0</span></div></div>
  <div class="col-xs-10 col-sm-10"><div class="progress"><div class="progress-bar progress-bar-success" id="bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:0%">0% Complete (success)</div></div>

  </div>
  <div class="row"><div class="col-xs-12 col-sm-12">
       <table class="sea" align="center" id="BattleField" onclick="TimerOnOff = 1; timer(1)"></table>
   </div></div>

</div>
        
    </div>
    <div id="menu1" class="tab-pane fade">
      <h3>Settings</h3>
         <div class="container">
          <div class="panel panel-primary">
            <div class="panel-heading">Name Yourself</div>
            <div class="panel-body">
              <form>
                <div class="form-group">
                  <label for="usr">Enter Name:</label>
                  <input type="text" placeholder="don't be undefined" class="name_control" onkeydown="name_control(this)"/> 
                </div>
              </form>

            </div>
            <div class="panel-footer">Enter Your Real Name in latin for our war history and get a honor to be in Fasti Triumphales.</div>
          </div>
      
          <div class="panel panel-success">
            <div class="panel-heading">Enemy Positions</div>
            <div class="panel-body">
              <div class="checkbox">
                <label><input type="checkbox" onclick="ShowEnemyPositions()" >Enemy Positions</label>
              </div>
            </div>
            <div class="panel-footer">You can sea Enemy Positions and feel like Alexander the Great .</div>
          </div>
  <!--    
          <div class="panel panel-info">
            <div class="panel-heading">Battle Field Dimension</div>
            <div class="panel-body">Experimental (Under Development)</div>
            <div class="panel-footer">Select Battle Field Dimension</div>
          </div>
-->
        </div>
      </div>


    <div id="menu2" class="tab-pane fade">
      <h3>Fasti Triumphales</h3>
      <p>Welcome to Hall of Fame. To be in Fasci - Name Yourself in Settings. After Play - REFRESH Page to see changes.</p>
        
        
                        <div class="panel panel-success">
                    <div class="panel-heading">Fasti Triumphales</div>
                    <div class="panel-body">
                       
                            <table class="table">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Score</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                 
<?php
$row = 1;
if (($handle = fopen("heroes.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        $row++;
        echo "<tr>";
        for ($c=0; $c < $num; $c++) {
            echo "<td>" . $data[$c] . "</td>";
        }
        echo "</tr>";
    }
    fclose($handle);
}
?>

                                </tbody>
                              </table>
                        </div>
                  </div>
    </div>
    <div id="menu3" class="tab-pane fade">
    <div class="panel panel-default">
    <div class="panel-body">
    <h3 style="text-align: center; color: black;">Your Status:</h3>
          <div class="progress">
          <div class="progress-bar progress-bar-success" role="progressbar" id="status1" style="width:33%;">Profan</div>
          <div class="progress-bar progress-bar-warning" role="progressbar" id="status2" style="width:34%;">Sergant</div>
          <div class="progress-bar progress-bar-danger" role="progressbar" id="status3" style="width:33%;">General</div>
          </div>
        
          <div style="text-align:center;margin: 10px;">
          <button type="button" class="btn btn-danger">Win <span class="badge" id="orcs_dead">0</span></button>
          <button type="button" class="btn btn-primary">Shots <span class="badge" id="guesses">0</span></button>
          <button type="button" class="btn btn-success">Lost <span class="badge" id="pigs_dead">0</span></button>                
          </div>
  
          <div class="row" id="Statistic">
          </div>
          <div class="panel panel-primary">
            <div class="panel-heading">Ruls</div>
            <div class="panel-body">
              1. Every your miss is a dead pig!<br />2. Every your hit is a dead orc<br />3. Five ships: XXXXX, XXXX, XXX, XX and X randomly<br />4. To START jast hit the Field<br />5. On Change Settings - page AutoReload and Game restart.<br />6. Named honors Fasci records.
            </div>
          </div>
        
        <div class="media">
          <div class="media-body">
            <h4 class="media-heading">Sea Battle v.3.02</h4>
            <p>With courtesy to all Comrades<br />
            Belarus, 2021</p>
          </div>
          <div class="media-right">
            <img src="surikat_logo.png" class="media-object" style="width:60px">
          </div>
        </div>
      </div>


  
  </div>
  </div>
 
 
  </div>
</div>
 
</body>

</html>
