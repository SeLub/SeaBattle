<?php
echo 'Hello ' . htmlspecialchars($_GET["name"]) . '!';
$string = htmlspecialchars($_GET["name"]).",". htmlspecialchars($_GET["score"]) ."," . htmlspecialchars($_GET["status"]);
file_put_contents("heroes.csv", $string."\n", FILE_APPEND);
?>