<html>
<head>
    <meta charset="utf-8" />
    <title>iFSR Infoscreen Backend</title>
    <link rel="stylesheet" type="text/css" href="milligram.min.css" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <link href='https://fonts.googleapis.com/css?family=Source+Code+Pro' rel='stylesheet' type='text/css'>
</head>
    
<body>
<?php
	$db = new SQLite3("items.sqlite");
	$db->exec("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, headline TEXT, content TEXT, image TEXT);");

	if(isset($_POST['new_submit'])) {
		$statement = $db->prepare('INSERT INTO items (headline, content, image) VALUES (:headline, :content, :image);');
		$statement->bindValue(':headline', $_POST['new_headline']);
		$statement->bindValue(':image', $_POST['new_image']);
		$statement->bindValue(':content', $_POST['new_content']);
		$result = $statement->execute();
	} else if(isset($_POST['delete_submit'])) {
		$statement = $db->prepare('DELETE FROM items WHERE id = :id;');
		$statement->bindValue(':id', $_POST['delete_nr']);
		$result = $statement->execute();
	}
?>

    <aside class="articlelist">
        <h4>Alle News</h4>
        <?php
            $res = $db->query("SELECT * FROM items;");
            while ($row = $res->fetchArray()) {
                echo "<div class=\"article\">$row[id]: $row[headline]<br />
                <form action=\"backend.php\" method=\"POST\">
                    <input name=\"delete_nr\" type=\"hidden\" value=\"$row[id]\" />
                    <input name=\"delete_submit\" type=\"submit\" class=\"delete\" value=\"Delete me.\" />
                    </form></div>";
            }
        ?>

    </aside>
    <div class="content">
        <h1>Einen Eintrag hinzufügen</h1>
        <br />
        
        <form action="backend.php" method="POST">
            <fieldset>
                <pre class="info">Der Nachrichtentext unterstützt valides <b>Markdown</b>.</pre>
                <label for="headline">Überschrift:</label>
                <input name="new_headline" placeholder="Titel" id="headline" class="inputfield" />
                <label for="imagelink">Bildlink:</label>
                <input name="new_image" placeholder="Bildlink" id="imagelink" class="inputfield" />
                <div class="newstextbox">
                    <textarea name="new_content" placeholder="Nachrichtentext hier einfügen..." class="newstext"></textarea>
                </div>
                <input name="new_submit" type="submit" class="submitbutton button-outline" />
            </fieldset>
        </form>
    </div>


</body>
</html>