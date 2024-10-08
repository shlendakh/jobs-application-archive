function addJob() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const ui = SpreadsheetApp.getUi();
  let response = ui.prompt('Enter job URL:');

  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.OK) {
    const link = response.getResponseText();
    const job = scrapeData(link);

    if (job === undefined) {
      ui.alert("Niewspierany link");
      addJob();
    } else {
      let jobAlertDescription = '';

      for (let prop in job) {
        if (job.hasOwnProperty(prop)) {
          jobAlertDescription = jobAlertDescription + prop + ": " + job[prop] + "\n";
        }
      }

      let duplicate = checkCompany(job.companyName);

      if (duplicate) {
        response = ui.alert(`Jest ${duplicate.length} ofert podobnych do tej którą próbujesz dodać, czy chcesz je przejrzeć przed dodaniem?`, ui.ButtonSet.YES_NO);
        if (response == ui.Button.YES) {
          duplicate.forEach((row) => linkOpen(sheet.getRange(row, 4).getValue()));
        }
      }

      response = ui.alert("Dodać pracę?", jobAlertDescription, ui.ButtonSet.YES_NO);

      if (response == ui.Button.YES) {
        const lastRow = sheet.getLastRow() + 1;

        sheet.getRange(lastRow, 1, 1, 6).setValues([[job.date, job.companyName, job.jobTitle, job.link, job.service, job.done]]);
      } else {
        addJob();
      }
    }
  } else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}

/**
 * Check if company name is already added in sheet.
 * @param {string} companyName Name of company.
 * @return {(Array|null)} rowNums Returns null if can't find anything or array of row numbers with query result.
 */
function checkCompany(companyName) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const tf = sheet.getRange(2, 2, sheet.getLastRow(), 1).createTextFinder(companyName);
  let all = tf.findAll();
  let rowNums = [];

  if (!all.length) return null;
  for (let i = 0; i < all.length; i++) {
    rowNums.push(all[i].getRow());
  }

  return rowNums;
}

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */