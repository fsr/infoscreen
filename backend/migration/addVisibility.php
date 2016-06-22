<?php

	// this code adds a new column for the visibility of the articles
	// you only need this once

	$db = new SQLite3("items.sqlite");
	$db->exec("ALTER TABLE items ADD visibility INTEGER;");

?>