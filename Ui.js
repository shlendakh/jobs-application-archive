function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('Praca')
    .addItem('Dodaj Pracę', 'addJob')
    .addToUi();
}