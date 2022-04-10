import re
import os
import json
import urllib.request
from forecastiopy import *
from datetime import datetime


API_KEY = ''
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../backend.json'), 'r') as data:
    temp_data = json.load(data)
    API_KEY = temp_data['API_KEY']


def get_weather(lat=51.0536, lng=13.7408):
    try:
        weather = ForecastIO.ForecastIO(API_KEY,
                                        units=ForecastIO.ForecastIO.UNITS_SI,
                                        lang=ForecastIO.ForecastIO.LANG_GERMAN,
                                        latitude=lat, longitude=lng)

        if weather.has_currently() is True:
            cw = FIOCurrently.FIOCurrently(weather)
            return {'temperature': str(round(cw.temperature)),
                    'summary': cw.summary,
                    'icon': cw.icon}
        else:
            return {'temperature': '',
                    'summary': '',
                    'icon': ''}
    except:
        return {'temperature': '',
                'summary': '',
                'icon': ''}
