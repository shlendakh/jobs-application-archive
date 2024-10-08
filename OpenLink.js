function linkOpen(url) {
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(`<script>window.addEventListener('load',()=>{window.open('${url}'),google.script.host.close()});</script></body></html>`), 'Opening...');
}

function testLinkOpen() {
  linkOpen("https://www.linkedin.com/in/pawel-szlendak/");
}
