import urllib.request
import json
import os

BASE_URL = ''

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'../backend.json'), 'r') as data:
    temp_data = json.load(data)
    BASE_URL = temp_data['BASE_URL']

md_news = []


def get_news():
    """
    Gets the infoscreen news from the (atm temporary) backend.
    :return: the last item from the `news` list which is a single article.
    """
    if len(md_news) == 0:

        url = BASE_URL + '/articles.php'
        try:
            news = json.loads(urllib.request.urlopen(
                url).read().decode("UTF-8"))
        except:
            news = []
            md_news.append('## No News')

        if len(news) > 0:
            for article in news:
                headline = '## {headline}  \n'.format(headline=article['headline'])
                img = '![Image]({})'.format(article['image']) if article[
                    'image'] != '' else None
                content = article['content']
                formated_article = '{headline}{img}{content}'.format(headline=headline if img is None else '',
                                                                     img=img if img is not None else '',
                                                                     content=content if img is None else '')
                md_news.append(formated_article)

    return md_news.pop()
