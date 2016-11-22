import re
import os
import json
import forecastio
import urllib.request
from datetime import datetime

API_KEY = ''
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'../backend.json'), 'r') as data:
    temp_data = json.load(data)
    API_KEY = temp_data['API_KEY']


def get_warnings(id='114612000'):
    url = "http://www.dwd.de/DWD/warnungen/warnapp/json/warnings.json"
    try:
        full_warnings = urllib.request.urlopen(
            url).read().decode("UTF-8")
    except:
        return None
    weather_json = json.loads(full_warnings[full_warnings.find("{"):
                                            full_warnings.rfind("}") + 1])

    return gerate_return(weather_json['warnings'][id][0]) if weather_json.get(
        'warnings').get(id) is not None else None


def gerate_return(warning):
    time = '{} - {}'.format(
        datetime.utcfromtimestamp(
            warning['start'] / 1000).strftime("%d.%m. %H:%M"),
        datetime.utcfromtimestamp(warning['end'] / 1000).strftime("%H:%M"))

    return {'time': time,
            'description': warning['description'],
            'warning': True}


def get_weather(lat=51.0536, lng=13.7408):
    weather = forecastio.load_forecast(API_KEY, lat, lng)
    return {'temperature': '{} °C'.format(weather.currently().temperature),
            'summary': weather.currently().summary,
            'warning': False}
