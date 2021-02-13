<?php

echo 'Hello ' . htmlspecialchars($_GET["name"]) . '!';
// $string = htmlspecialchars($_GET["name"]).",". htmlspecialchars($_GET["score"]) ."," . htmlspecialchars($_GET["status"]);
// file_put_contents("heroes.csv", $string."\n", FILE_APPEND);

$name = htmlspecialchars($_GET["name"]);
$score = htmlspecialchars($_GET["score"]);
$status = htmlspecialchars($_GET["status"]);
echo $name, $score, $status;
$row = 1;
$rewrite = 0;
if (($handle = fopen("heroes.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
 //       echo "<p> $num fields in line $row: <br /></p>\n";
 echo $data[0]," ",$name,"\n";
       if ($data[0] == $name) { echo "YES";
    $rewrite = 1;
    $data[1] = $score;
    $data[2] = $status;    
    } else { echo "NO";}
        $row++;
    }
    echo $data;
    file_put_contents("heroes.csv", $data, FILE_APPEND);
    fclose($handle);


}


// file_put_contents("heroes.csv", $string."\n", FILE_APPEND);
?>