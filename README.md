
https://dev.to/challenges/brightdata

I am taking part in the BrightData challenge, i am from the UK.

Prompt:
Use a Web Scraper API to tackle common business challenges like aggregating 
product prices, monitoring competitors, 
or collecting reviews across platforms. 
Use Bright Data’s Web Scraper API for efficient and scalable data collection.


Idea:

Company Brand Compliance 

S: I am Apple and i want to ensure if users on certain websites such as
    - Carphone Warehouse
    - Vodafone
    - Amazon UK

Search for the term Iphone the website does not get suggest any phone that is not Iphone or apple related

I want to pay companies a bonus for complying with Apples Brand Compliance Rules

Search Compliance Feature


Terms: (search per day)
Apple Phone -> if no violations -> score = 1, Violation = Score =0


//score per month should be 25 or fail for that month


//create an Laravel App (for now lets just make it in the context of Apple, to save time on this MVP)


Models:
    User
    Rules:
        - Search term
        - Found Term (Samsung),//special rules
        - penantly = -1 if fail
        - Website URL

    Scrapes:
        - Rule ID
        - Timestamp
        - Score
    
^ more models may be required