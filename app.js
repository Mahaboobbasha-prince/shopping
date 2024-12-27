const axios = require("axios");
const cheerio = require("cheerio");

class WebCrawler {
    constructor() {
        this.visitedUrls = new Set();
        this.results = {};
    }

    async fetchHtml(url) {
        try {
            const { data } = await axios.get(url, { timeout: 10000 });
            return data;
        } catch (error) {
            console.error(`Error fetching ${url}: ${error.message}`);
            return null;
        }
    }

    extractUrls(baseUrl, htmlContent) {
        const $ = cheerio.load(htmlContent);
        const urls = new Set();

        $("a[href]").each((_, element) => {
            let link = $(element).attr("href");
            // Resolve relative URLs
            if (!link.startsWith("http") && !link.startsWith("https")) {
                link = new URL(link, baseUrl).href;
            }
            urls.add(link);
        });

        return urls;
    }

    async crawl(url) {
        if (this.visitedUrls.has(url)) {
            console.log(`Skipping already visited URL: ${url}`);
            return;
        }

        console.log(`Crawling: ${url}`);
        this.visitedUrls.add(url);

        const htmlContent = await this.fetchHtml(url);
        if (htmlContent) {
            const extractedUrls = this.extractUrls(url, htmlContent);
            this.results[url] = Array.from(extractedUrls);
        }
    }

    async startCrawling(startUrls) {
        const crawlPromises = startUrls.map((url) => this.crawl(url));
        await Promise.all(crawlPromises);
    }

    saveResults(outputFile) {
        const fs = require("fs");
        let output = "";
        for (const [baseUrl, urls] of Object.entries(this.results)) {
            output += `Base URL: ${baseUrl}\n`;
            urls.forEach((url) => (output += `  - ${url}\n`));
            output += "\n";
        }
        fs.writeFileSync(outputFile, output);
        console.log(`Results saved to ${outputFile}`);
    }
}

(async () => {
    // Example Usage
    const startUrls = [
        "https://example.com",
        "https://www.amazon.com",
        "https://www.flipkart.com",
    ];
    const outputFile = "crawled_urls.txt";

    const crawler = new WebCrawler();
    await crawler.startCrawling(startUrls);
    crawler.saveResults(outputFile);
})();