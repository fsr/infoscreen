import time
import urllib.request
from urllib.error import URLError
import json


MENSA_API_URL = 'http://openmensa.org/api/v2/canteens/{mensa}/days/{date}/meals'


def getmeals():
    """
    Gets todays' meals from the OpenMensa API and parses them.
    :return: A list of dicts where every dict represents a single meal.
    """
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
    """
    Generates a dict for a single meal containing all relevant information.
    :param raw_data: The raw API data for a single meal.
    :param is_morning: Boolean Value that indicates whether it's earlier than 3pm.
    :return:
    """
    return {
        'price': calc_price(raw_data['prices']['students']),
        'notes': get_notes(raw_data['notes']),
        'name': 'Abendangebot: ' + raw_data['name']
                if is_morning and raw_data['category'] == 'Abendangebot'
                else raw_data['name']
    }


def get_notes(meal):
    """
    Parses the annotations for a meal.
    :param meal: A list of notes for the meal, e.g. "Menü enthält Knoblauch"
    :return: A list of infoscreen-parsable annotations.
    """
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
    """
    Formats the price of a meal.
    :param price: A float number, representing the prize for a meal. May be `None`.
    :return: The prize, with two digits after the decimal point. May be `None`.
    """
    if price is None:
        return None
    else:
        return '{0:.2f} €'.format(float(price))
