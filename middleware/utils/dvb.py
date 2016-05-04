import json
import urllib.request
from urllib.error import URLError


DEPARTURE_LINK = 'http://widgets.vvo-online.de/abfahrtsmonitor/Abfahrten.do?ort\
={ort}&hst={hst}&vz={minutes}&lim={count}'


def get_departures(station, city='Dresden', min_minutes=None, nextStopCount=4):
    """
    Queries the DVB 'API' for the next departures from a single station.
    :param station: The name of the Station as String.
    :param city: City in which the station is located. Defaults to 'Dresden'.
    :param min_minutes: Minimal amount of time between now and the earliest departure (in minutes, as integer). `None` by default.
    :param nextStopCount: Number of next stops to be displayed (int). Defaults to 3 Stops.
    :return: A dict which contains the name of the station as key and a list of upcoming departures as value.
    """
    link = DEPARTURE_LINK.format(
        ort=city, hst=station, minutes=min_minutes, count=nextStopCount)

    try:
        ret = urllib.request.urlopen(link)
        next_stops = json.loads(ret.read().decode("UTF-8"))
    except URLError:
        return []

    formatted_stops = [{'number': '0' if stop[0] == '' else stop[0], 'name': stop[1], 'minutes': stop[2]}
                       for stop in next_stops]

    return {station.lower().replace('%20', ''): formatted_stops}


def all_departures():
    """
    Gets all 'default' stops for the infoscreen: "Helmholtzstraße", "Technische Universität" and "Münchner Platz".
    :return: A dict with an entry for every stop and a list of departures as values.
    """
    all_stops = {}
    all_stops.update(get_departures('Helmholtzstrasse'))
    all_stops.update(get_departures('Muenchner%20Platz', min_minutes=7))
    all_stops.update(get_departures(
        'Technische%20Universitaet', min_minutes=1))

    return all_stops
