<?php
$db = new SQLite3("items.sqlite");
$query = $db->query("SELECT * FROM items;");

$results = array();

while ($datarow = $query->fetchArray(SQLITE3_ASSOC)) {
    array_push($results, $datarow);
}

echo json_encode($results);
