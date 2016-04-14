import json
import urllib.request
from urllib.error import URLError


DEPARTURE_LINK = 'http://widgets.vvo-online.de/abfahrtsmonitor/Abfahrten.do?ort={ort}&hst={hst}'


def get_departures(station, city, nextStopCount):
    link = DEPARTURE_LINK.format(ort=city, hst=station)

    try:
        ret = urllib.request.urlopen(link)
        next_stops = json.loads(ret.read().decode("UTF-8"))
    except URLError:
        return []

    formatted_stops = [{'number': stop[0], 'name': stop[1], 'minutes': stop[2]}
                       for stop in next_stops[:nextStopCount]]

    return {station.lower().replace('%20', ''): formatted_stops}


def all_departures():
    all_stops = {}
    all_stops.update(crop_departures(get_departures('Helmholtzstrasse', 'Dresden', 6), 3))
    all_stops.update(crop_departures(get_departures('Muenchner%20Platz',
                                                    'Dresden', 6), 3, 7))
    all_stops.update(crop_departures(get_departures('Technische%20Universitaet', 'Dresden', 6), 3, 1))

    return all_stops


def crop_departures(all_departures, nextStopCount, minutes=None):
    departure_list = []
    key = sorted(all_departures.keys())[:1][0]
    for departure in all_departures[key]:
        if departure['minutes'] != '':
            if minutes is not None:
                if int(departure['minutes']) >= minutes:
                    departure_list.append(departure)
            else:
                departure_list.append(departure)
    new_departures = {key: departure_list[:nextStopCount]}

    return new_departures
