import re
import json
import forecastio
import urllib.request
from datetime import datetime

API_KEY = ''
with open('backend.json', 'r') as data:
    temp_data = json.load(data)
    API_KEY = temp_data['API_KEY']


def get_waringns(id='114612000'):
    url = "http://www.dwd.de/DWD/warnungen/warnapp/json/warnings.json"
    try:
        full_warnings = urllib.request.urlopen(
            url).read().decode("UTF-8")
    except:
        return None

    inner_json = re.compile(r'warnWetter\.loadWarnings\((.*)\);')

    weather_json = json.loads(inner_json.match(full_warnings).group(1))

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
