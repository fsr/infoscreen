import time
import urllib.request
import json


def getmeals():
    '''
    Loads, Reads and parses the meals.

    '''
    today = time.strftime('%Y-%m-%d')
    link = 'http://openmensa.org/api/v2/canteens/{mensa}/days/{date}/meals'.format(
        mensa=79, date=today)

    ret = urllib.request.urlopen(link)
    raw_meals = json.loads(ret.read().decode('UTF-8'))
    hour = int(time.strftime('%H'))

    meals = []
    for meal in raw_meals:
        new_meal = {}
        if hour < 15:
            if meal['category'] == 'Abendangebot':
                new_meal['name'] = 'Abendangebot: ' + meal['name']
            else:
                new_meal['name'] = meal['name']
            new_meal['price'] = meal['prices']['students']
            new_meal['notes'] = get_notes(meal['notes'])
            meals.append(new_meal)

        elif meal['category'] == 'Abendangebot':
            new_meal['name'] = meal['name']
            new_meal['price'] = meal['prices']['students']
            new_meal['notes'] = get_notes(meal['notes'])
            meals.append(new_meal)

    return meals


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
