import dvb


def get_departures(station, city='Dresden', min_minutes=None, nextStopCount=4):
    """
    Queries the DVB 'API' for the next departures from a single station.
    :param station: The name of the Station as String.
    :param city: City in which the station is located. Defaults to 'Dresden'.
    :param min_minutes: Minimal amount of time between now and the earliest departure (in minutes, as integer). `None` by default.
    :param nextStopCount: Number of next stops to be displayed (int). Defaults to 3 Stops.
    :return: A dict which contains the name of the station as key and a list of upcoming departures as value.
    """

    minutes = min_minutes if min_minutes is not None else 0
    stops = dvb.monitor(stop=station, offset=minutes, limit=nextStopCount, city=city)


    formatted_stops = [{'number': stop['line'] , 'name': stop['direction'], 'minutes': stop['arrival']}
                       for stop in stops]

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
        'Technische%20Universitaet', min_minutes=15))

    return all_stops
