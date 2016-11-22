<?php
$db = new SQLite3("items.sqlite");
$query = $db->query("SELECT id, headline, content, image FROM items WHERE visibility = 1;");

$results = array();

while ($datarow = $query->fetchArray(SQLITE3_ASSOC)) {
    array_push($results, $datarow);
}

echo json_encode($results);
