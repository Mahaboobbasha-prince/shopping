WebCrawler
This project is a simple web crawler implemented in JavaScript using the axios library for making HTTP requests and cheerio for parsing and extracting URLs from HTML. The crawler visits a list of starting URLs, fetches their HTML content, extracts all hyperlinks, and recursively visits new URLs. It avoids revisiting previously visited URLs and saves the results to a text file.

Table of Contents
Overview
Installation
Usage
Code Breakdown
How it Works
Limitations and Improvements
Overview
The WebCrawler:

Starts from a given set of URLs.
Fetches the HTML content of each URL.
Extracts all the hyperlinks present in the HTML.
Saves the results to a text file, listing the base URL and all the hyperlinks found on that page.
Libraries Used:
axios: For making HTTP requests to fetch the HTML content of web pages.
cheerio: For parsing and traversing the HTML document to extract URLs.
fs: For saving the extracted URLs to a file.
Installation