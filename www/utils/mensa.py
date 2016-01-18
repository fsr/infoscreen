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
    meals = json.loads(ret.read().decode("UTF-8"))

    return meals
