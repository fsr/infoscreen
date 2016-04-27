import urllib.request
from urllib.error import URLError
import json


def postillon_ticker():
    """
    Queries the `Postillon` ticker for a short ticker feed.
    :return: A list with formatted ticker news.
    """
    try:
        ret = urllib.request.urlopen(
            'http://www.der-postillion.de/ticker/newsticker2.php')
        ticker = json.loads(ret.read().decode("utf-8-sig"))
    except URLError:
        return '+++ Tickt nicht mehr richtig: Kein Ticker verfügbar +++'

    return ['+++ {} +++'.format(element['text'])
            for element in ticker["tickers"]]
