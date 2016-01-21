import time
import urllib.request
from urllib.error import URLError
import json


MENSA_API_URL = 'http://openmensa.org/api/v2/canteens/{mensa}/days/{date}/meals'


def getmeals():
    '''
    Loads, Reads and parses the meals.

    '''
    today = time.strftime('%Y-%m-%d')
    link = MENSA_API_URL.format(
        mensa=79, date=today)

    try:
        ret = urllib.request.urlopen(link)
        raw_meals = json.loads(ret.read().decode('UTF-8'))
    except URLError:
        return [{
            'name': 'Keine Daten',
            'notes': 'no_data'
        }]

    is_morning = int(time.strftime('%H')) < 15

    return [
        mk_meal(meal, is_morning)
        for meal in raw_meals if is_morning or meal['category'] == 'Abendangebot'
    ]


def mk_meal(raw_data, is_morning):
    return {
        'price': calc_price(raw_data['prices']['students']),
        'notes': get_notes(raw_data['notes']),
        'name': 'Abendangebot: ' + raw_data['name']
                if is_morning and raw_data['category'] == 'Abendangebot'
                else raw_data['name']
    }


def get_notes(meal):
    notes = []

    if "Menü enthält Knoblauch" in meal:
        notes.append('knoblauch')
    if "Menü ist vegetarisch" in meal:
        notes.append('vegetarisch')
    if "Menü ist vegan" in meal:
        notes.append('vegan')
    if "Menü enthält Schweinefleisch" in meal:
        notes.append('schwein')
    if "Menü enthält Rindfleisch" in meal:
        notes.append('rind')
    if "Menü enthält Alkohol" in meal:
        notes.append('alkohol')

    return notes


def calc_price(price):
    if price is None:
        return None
    else:
        return '{0:.2f} €'.format(float(price))
