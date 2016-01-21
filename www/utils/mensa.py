import time
import urllib.request
from urllib.error import URLError
import json


def getmeals():
    '''
    Loads, Reads and parses the meals.

    '''
    today = time.strftime('%Y-%m-%d')
    link = 'http://openmensa.org/api/v2/canteens/{mensa}/days/{date}/meals'.format(
        mensa=79, date=today)

    try:
        ret = urllib.request.urlopen(link)
        raw_meals = json.loads(ret.read().decode('UTF-8'))
    except URLError:
        return {
            'name': 'Keine Daten',
            'notes': 'no_data'
        }

    hour = int(time.strftime('%H'))

    return [
        mk_meal(meal)
        for meal in raw_meals
    ]


def mk_meal(raw_data):
    return {
        'price': calc_price(raw_data['prices']['students']),
        'notes': get_notes(raw_data['notes'])
        'name': 'Abendangebot: ' + raw_data['name']
                if hour < 15 and raw_data['category'] == 'Abendangebot'
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
