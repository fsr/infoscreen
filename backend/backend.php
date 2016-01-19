<html>
<body>
<?php
	$db = new SQLite3("items.sqlite");
	$db->exec("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, headline TEXT, content TEXT, image TEXT);");

	if(isset($_POST['new_submit'])) {
		$statement = $db->prepare('INSERT INTO items (headline, content) VALUES (:headline, :content);');
		$statement->bindValue(':headline', $_POST['new_headline']);
		$statement->bindValue(':content', $_POST['new_content']);
		$result = $statement->execute();
	} else if(isset($_POST['delete_submit'])) {
		$statement = $db->prepare('DELETE FROM items WHERE id = :id;');
		$statement->bindValue(':id', $_POST['delete_nr']);
		$result = $statement->execute();
	}
?>
<ul>
<?php
	$res = $db->query("SELECT * FROM items;");
	while ($row = $res->fetchArray()) {
		echo "<li>$row[id]: $row[headline]</li>";
	}
?>
</ul>
<hr />
<h2> Delete old entry: </h2>
<form action="index.php" method="POST">
	<input name="delete_nr" />
	<input name="delete_submit" type="submit" />
</form>
<hr />
<h2> Add new entry: </h2>
<form action="index.php" method="POST">
	<input name="new_headline" value="New Headline" />
	<textarea name="new_content">New text</textarea>
	<input name="new_submit" type="submit">
</form>
</body>
</html>