iFSR-Info-Screen für Raspberry Pi  
Dirk Legler - dirk@ifsr.de

Funktionen
==========
* aktuelle DVB-Abfahrtszeiten für Helmholtzstraße, Münchner Platz und Technische Universität
* Postillon-Newsticker
* Newsticker von https://ifsr.de/fsr:newsticker
* Mensa-Plan der Alten Mensa
* Uhrzeit, Datum, Kalenderwoche

Benutzungshinweise
==================
iFSR-Newsticker
--------------
* nur für iFSR-Mitglieder mit DokuWiki-Rechten möglich
* Adresse: https://ifsr.de/fsr:newsticker
* Wenn Seite leer: Editieren, Zahl der Beiträge ändern, speichern
* Neue News: Blogeintrag anlegen (Name beliebig, aber aussagekräftig), Template:
```html
	<html>
	<h2 class="newstitle">%newstitel%</h2>
	<div class="newstext">%newstext%</div>
	</html>
```
* für Bilder (1200x600px, am besten lokal auf Raspi speichern):
```html
	<html>
	<div style="width:1200px;height:600px;background:url('%bildurl1200x600%');">&nbsp;</div>
	</html>
```
* News löschen: Eintrag bearbeiten, Text löschen, speichern

Bedienung
---------
* Mögliche Aufrufe unter `http://<raspi>/service.html`
* Alternativ direkt über `http://<raspi>/serv.fsr?<befehl>`, Befehle:
  * `shutdown`: Herunterfahren. Bitte ausführen, bevor der Stecker gezogen wird, und eine Weile warten.
  * `reboot`  : Neustart des gesamten Raspis
  * `restart` : Neustart der Browserumgebung. Kann zu Fehlermeldung führen, dann einfach erneut ausführen.
  * `gitpull` : Neuesten Code aus dem master-Branch des github-Repos laden
  * `gitreset`: Lokale Änderungen zurücksetzen
  * `kaffee`  : Kaffee machen

Installation
============
Einfache Variante
-----------------
Zum Beispiel bei Dateisystemfehlern oder neuer SD-Karte anzuwenden.

1. fsrinfoscreen.sd.gz von der kaki unter `/home/fsr/Infoscreen` laden
2. Raspberry Pi und 4GB-SD-Karte versorgen
3. `$ gzip -d fsrinfoscreen.sd.gz`
4. `$ dd bs=1m if=fsrinfoscreen.sd of=/dev/<sdkarte>`
5. Raspberry Pi anschließen (inkl. Ethernetkabel), SD-Karte einstecken, Strom geben
6. Infoscreen bootet automatisch

Anmerkungen zur vorinstallierten Version:

* Softwarestand 18.05.2014
* MPEG2- und VC1-Keys für iFSR-Raspberry vorinstalliert
* startet automatisch im Kiosk-Modus
* User: pi, Passwort: fsrberry
* iFSR-WLAN-Verbindung voreingestellt
* IP-Adresse im iFSR-LAN siehe kleine Anzeige unter dem FSR-Logo
* /var/log und /tmp liegen im RAM, Webserver-Log ist deaktiviert
* Treiber für LEDborg vorinstalliert (müssen bei neuem Kernel aktualisiert werden)
* 
* Update des Codes per git möglich
  * `$ cd /home/pi/infoscreen`
  * `$ git pull origin master`
* keine Sicherheitsexperten drüberschauen lassen, die noch keinen Kaffee hatten – horribly insecure!
  * Webserver-Nutzer hat sudo-Rechte (um Browser neu zu starten etc.)
  * Begründung: Jeder, der Netzzugriff auf den Raspi hat, hat auch physischen Zugriff und sollte trustworthy sein

Manuelle Variante
-----------------
Vollständige Dokumentation der zu tätigenden Einstellungen.

1. Raspbian installieren (für andere Distributionen ggf. Anleitung geringfügig anpassen)
2. … TODO
3. Profit!

