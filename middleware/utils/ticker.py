import urllib.request
from urllib.error import URLError
import json


def postillon_ticker():
    '''
    Get ticker data from the Postillon.
    '''

    try:
        ret = urllib.request.urlopen(
            'http://www.der-postillion.de/ticker/newsticker2.php')
        ticker = json.loads(ret.read().decode("utf-8-sig"))
    except URLError:
        return '+++ Tickt nicht mehr richtig: Kein Ticker verfügbar +++'

    space = 6
    return (' ' * space).join(
        '+++ ' + line['text'] + ' +++'
        for line in ticker['tickers']
    )
