function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('Praca')
    .addItem('Dodaj Pracę', 'AddJob')
    .addToUi();
}