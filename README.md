
https://dev.to/challenges/brightdata

I am taking part in the BrightData challenge, i am from the UK.

Prompt:
Use a Web Scraper API to tackle common business challenges like aggregating 
product prices, monitoring competitors, 
or collecting reviews across platforms. 
Use Bright Data’s Web Scraper API for efficient and scalable data collection.


Idea:


Aggregate Monthly Phone plans from carphone warehouse.
Carphone warehouse sells monthly phone contracts from vodafone and ID,

i want to collect the entire selection of their phones and all their plans including capacity and storage of phones available


I've used AWS ECS as my platform to run the scrape jobs,

since it could take a 2-3 hours to scrape the entire website it should be done once daily or weekly to save money

i've placed the code in scrapeJobs/scrapes/carphone/carphone_bright.js

I used Brightdatas webbrowser, to avoid any blocks

I used AWS CDK to deploy this to my AWS Account and provision a task definition,


This is a laravel project which i used to fetch the scraped data from s3, as once the scrape is completed it uploads the entire data to s3 per day.