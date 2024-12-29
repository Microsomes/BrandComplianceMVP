BrightData Challenge - Monthly Phone Plans Aggregator

This project is part of the BrightData Web Scraper Challenge, aiming to aggregate monthly phone plans from Carphone Warehouse, including plans from Vodafone and ID Mobile. The goal is to efficiently scrape detailed data and present it in a user-friendly format.
🚀 Challenge Prompt

    Use a Web Scraper API to tackle common business challenges like aggregating product prices, monitoring competitors, or collecting reviews across platforms. Use Bright Data’s Web Scraper API for efficient and scalable data collection.

🌟 Project Overview
Objective

    Scrape and aggregate Carphone Warehouse's monthly phone plans.
    Collect details such as:
        Phone models
        Storage capacities
        Available colors
        Associated monthly plans

Solution Highlights

    Scrape the entire selection of phones and plans available on Carphone Warehouse.
    Schedule scraping jobs to run daily or weekly to save costs and keep data fresh.
    Use Bright Data’s browser-based scraper to bypass blocking mechanisms.

🛠️ Technologies Used
Technology	Purpose
Bright Data Web Scraper API	Efficient and scalable web scraping, bypassing blocks with browser emulation.
AWS ECS	Run scraping jobs in a containerized environment, ensuring scalability and efficiency.
AWS S3	Store scraped data in structured JSON format, uploaded after each job.
AWS CDK	Infrastructure as code to deploy and manage the scraping task definitions on ECS.
Laravel	Backend framework to fetch and display scraped data from S3 for end users.
📂 Project Structure
Scraper Code

    Path: scrapeJobs/scrapes/carphone/carphone_bright.js
    Handles:
        Fetching phone plans and details using Bright Data.
        Structuring data into JSON.
        Uploading the output to AWS S3.

Backend Application

    Framework: Laravel
    Fetches the data from S3 and provides an API to serve it to the front-end.
    URL: ScraperBrightDataChallenge

🖥️ Deployment Workflow
Scraping Workflow:

    Task Definition: Deployed using AWS CDK.
    Execution: Scraper runs on AWS ECS as a scheduled job (daily/weekly).
    Data Storage: Results are uploaded to AWS S3 in JSON format.

Backend Workflow:

    Data Fetching: Laravel application pulls the latest data from S3.
    Data Presentation: Data is served through an interactive web application.

🔧 Setup Instructions
Prerequisites:

    AWS account with necessary permissions for ECS, S3, and CDK.
    Bright Data account with access to the Web Scraper API.
    Laravel installed for backend development.


🌐 Live Demo

Check out the live application:
👉 http://scraperbrightdatachallenge.phase2.maeplet.com/
🚀 Future Enhancements

    Add more data sources for comparative analysis.
    Introduce analytics to monitor price trends over time.
    Optimize the scraping process for faster results.

    If their was time...

🤝 Credits

This project is built for the BrightData Challenge by a developer based in the UK (ME (:). Special thanks to Bright Data, AWS, and the open-source community for their tools and resources.
