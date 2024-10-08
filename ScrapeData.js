/**
 * @typedef {Object} jobInfoType Test.
 * @property {Date} date Today's date.
 * @property {string} link URL for a job.
 * @property {string} jobTitle The job's title
 * @property {string} companyName The company's name.
 * @property {string} service Name of job service.
 * @property {boolean} done Status.
 */
const jobInfoType = {
  date: Utilities.formatDate(new Date(), "GMT+1", "dd-MM-yyyy"),
  link: "https://example.com",
  jobTitle: "FrontEnd Dev",
  companyName: "Company Inc.",
  service: "JustJoin",
  done: false,
};

/**
 * Scrape job info
 * @param {string} link 
 * @return {(jobInfoType|undefined)} jobInfo Returns jobInfo object or undefined if smth wrong.
 */
function scrapeData(link) {
  try {
    const HTMLString = UrlFetchApp.fetch(link).getContentText();

    if (!HTMLString) return undefined;

    const regex = new RegExp('justjoin|nofluffjobs|pracuj|theprotocol|rocketjobs', "gm");
    let jobInfo = {
      date: Utilities.formatDate(new Date(), "GMT+1", "dd-MM-yyyy"),
      link: link,
      done: false,
    };

    const $ = Cheerio.load(HTMLString);

    switch (regex.exec(link)[0]) {
      case 'justjoin':
        jobInfo.jobTitle = $('h1').first().text().trim();
        jobInfo.companyName = $('h2').first().text();
        jobInfo.service = 'justjoin.it';
        break;
      case 'nofluffjobs':
        jobInfo.jobTitle = $('h1').first().text().trim();
        jobInfo.companyName = $('#postingCompanyUrl').first().text();
        jobInfo.service = 'NoFluffJobs';
        break;
      case 'pracuj':
        jobInfo.jobTitle = $('h1').first().text().trim();
        jobInfo.companyName = $('h2').first().text().replace('About the company', '').replace('O firmie', '');
        jobInfo.service = 'Pracuj';
        break;
      case 'theprotocol':
        jobInfo.jobTitle = $('p[data-test="text-offerTitle"]').first().text().trim();
        jobInfo.companyName = $('a[data-test="anchor-company-link"]').first().text();
        jobInfo.service = 'TheProtocol';
        break;
      case 'rocketjobs':
        jobInfo.jobTitle = $('h1').first().text().trim();
        jobInfo.companyName = $('h2[class="MuiTypography-root MuiTypography-body1 css-1xejd57"]').first().text();
        jobInfo.service = 'RocketJobs';
      break;
      default:
        return undefined;
        break;
    }

    return jobInfo;
  } catch (error) {
    console.error("smth wrong during fetching url", error);
    return undefined;
  }
}

function testScrapeData() {
  const link = "https://rocketjobs.pl/oferta/proassist-sem-specialist-krakow-zdrowie-inne";
  Logger.log(scrapeData(link));
}