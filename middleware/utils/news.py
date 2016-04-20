import urllib.request
import json

BASE_URL = 'http://192.168.33.10/' # URL for backend here

md_news = []


def get_news():

    if len(md_news) == 0:
        url = BASE_URL + 'articles.php'
        news = json.loads(urllib.request.urlopen(url).read().decode("UTF-8"))

        for article in news:
            headline = '## {headline}  \n'.format(headline=article['headline'])
            img = '![Image]({})'.format(article['image']) if article['image'] != '' else None
            content = article['content']
            formated_article = '{headline}{img}{content}'.format(headline=headline if img is None else '',
                                                                 img=img if img is not None else '',
                                                                 content=content if img is None else '')
            md_news.append(formated_article)

    return md_news.pop()
