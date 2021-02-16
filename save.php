<?php
echo 'Hello ' . htmlspecialchars($_GET["name"]) . '!';
$name = htmlspecialchars($_GET["name"]);
$score = htmlspecialchars($_GET["score"]);
$status = htmlspecialchars($_GET["status"]);
echo $name.'.'.$score.'.'.$status;

    if (isset($_GET["name"]) && trim($_GET["name"])) {
$rewrite =0;
$path = 'heroes.csv';
$write = '';
$row = 1;
if (($handle = fopen($path, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        if ($data[0] == $name){ echo "YES";
                                 $rewrite = 1;
                                 $data[1] = $score;
                                 $data[2] = $status;    
                              }
        $str = $data[0].','.$data[1].','.$data[2].PHP_EOL;
        $write = $write.$str;
        $row++;
    }
        if ($rewrite == 0){
                            $str = $name.','.$score.','.$status.PHP_EOL;
                            $write = $write.$str;
                          }
        fclose($path);
}
if ($write != '') {
$f=fopen($path,'w');
fwrite($f,$write);
fclose($f);
echo $write;
}
}