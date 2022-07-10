from transformers import pipeline
import requests

classifier = pipeline('zero-shot-classification', model='facebook/bart-large-mnli')
candidate_labels = ["mortgage", "debit card", "bank account", "credit card", "apps"]

print('starting')

response = requests.get('http://localhost:3000/api/label/uncategorized')
tweets = response.json()['tweets']

while(len(tweets)>0):
    print('processing a batch')
    for tweet in tweets:
        res = classifier(tweet['text'], candidate_labels)
        if res['scores'][0] > 0.7:
            print(res['labels'][0])
            labelpayload = {'mentionedTweetId': tweet['id'], 'label':res['labels'][0]}
            labelRes = requests.post('http://localhost:3000/api/label/', json = labelpayload)
            print(labelRes.json())
        else:
            print('UNCATEGORIZED')
            labelpayload = {'mentionedTweetId':  tweet['id'], 'label':'UNCATEGORIZED'}
            labelRes = requests.post('http://localhost:3000/api/label/', json = labelpayload)
            print(labelRes.json())
    response = requests.get('http://localhost:3000/api/label/uncategorized')
    tweets = response.json()['tweets']