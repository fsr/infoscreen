import json
import urllib.request
from urllib.error import URLError


def get_departures(station, city, nextStopCount):
    link = 'http://widgets.vvo-online.de/abfahrtsmonitor\
/Abfahrten.do?ort={ort}&hst={hst}'.format(ort=city, hst=station)

    next_stops = []

    try:
        ret = urllib.request.urlopen(link)
        next_stops = json.loads(ret.read().decode("UTF-8"))
    except URLError:
        return next_stops

    return next_stops[:nextStopCount]


def all_departures():
    dep_helmholtz = get_departures('Helmholtzstrasse', 'Dresden', 3)
    dep_muenchner = get_departures('Muenchner%20Platz', 'Dresden', 3)
    dep_tu = get_departures('Technische%20Universitaet', 'Dresden', 3)

    return dep_helmholtz, dep_muenchner, dep_tu
