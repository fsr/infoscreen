import json
import urllib.request


def get_departures(station, city, nextStopCount):
    link = 'http://widgets.vvo-online.de/abfahrtsmonitor/Abfahrten.do?ort={ort}&hst={hst}'.format(
        ort=city,
        hst=station
    )
    ret = urllib.request.urlopen(link)
    next_stops = json.loads(ret.read().decode("UTF-8"))

    return next_stops[:nextStopCount]
