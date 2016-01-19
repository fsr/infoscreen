import time
import urllib.request
import json


def getmeals():
    '''
    Loads, Reads and parses the meals.
    TODO: Return tomorrows meals or only meals in the evening if the canteen
          doesn't serve old supper meals anymore
    '''
    today = time.strftime("%Y-%m-%d")
    link = 'http://openmensa.org/api/v2/canteens/{mensa}/days/{date}/meals'.format(
        mensa=79, date=today)

    ret = urllib.request.urlopen(link)
    raw_meals = json.loads(ret.read().decode("UTF-8"))

    meals = []
    for meal in raw_meals:
        new_meal = {}
        if meal['category'] == 'Abendangebot':
            new_meal['name'] = 'Abendangebot: ' + meal['name']
        else:
            new_meal['name'] = meal['name']
        new_meal['price'] = meal['prices']['students']
        new_meal['notes'] = []

        if "Menü enthält Knoblauch" in meal['notes']:
            new_meal['notes'].append('knoblauch')
        if "Menü ist vegetarisch" in meal['notes']:
            new_meal['notes'].append('vegetarisch')
        if "Menü ist vegan" in meal['notes']:
            new_meal['notes'].append('vegan')
        if "Menü enthält Schweinefleisch" in meal['notes']:
            new_meal['notes'].append('schwein')
        if "Menü enthält Rindfleisch" in meal['notes']:
            new_meal['notes'].append('rind')
        if "Menü enthält Alkohol" in meal['notes']:
            new_meal['notes'].append('alkohol')

        meals.append(new_meal)

    return meals
