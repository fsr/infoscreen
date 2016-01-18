import urllib.request
import json


def postillon_ticker():
    '''
    Get ticker data from the Postillon.
    TODO: abstract get_from_api() function?
    '''
    ret = urllib.request.urlopen('http://www.der-postillion.de/ticker/newsticker2.php')
    ticker = json.loads(ret.read().decode("utf-8-sig"))
    return ticker["tickers"]
