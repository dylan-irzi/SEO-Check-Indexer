function checkURLs() {
  // Tu clave de API de Google
  var apiKey = "Tu_Api_Key";

  // Tu ID de motor de búsqueda de Google
  var cseId = "Tu_Id_de_Motor_de_Busqueda";

  // ID de la hoja de cálculo de Google Sheets
  var spreadsheetId = "tu_id_google_sheets";

  // Leemos la hoja de cálculo usando la API de Sheets de Google
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("Tu_Hoja");
  var data = sheet.getRange("A2:A").getValues(); // Leemos solo la columna A a partir de la fila 2

  
  // Lista de URLs a validar
  var urls = [];
  for (var i = 0; i < data.length; i++) {
    // La columna A empieza en la posición 0
    var url = data[i][0];
    if (url) {
      urls.push(url);
    }
  }

  // Realizamos la búsqueda en Google utilizando la API de búsqueda
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    var googleUrl = "https://www.googleapis.com/customsearch/v1?key=" + apiKey + "&cx=" + cseId + "&q=site:" + url;
    var response = UrlFetchApp.fetch(googleUrl);
    var results = JSON.parse(response.getContentText());

    // Si la búsqueda no devuelve resultados, significa que la URL no está indexada
    if (!results.items) {
      sheet.getRange(2 + i, 2).setValue("NO está indexada en Google");
    } else {
      sheet.getRange(2 + i, 2).setValue("Sí está indexada en Google");
    }
  }
}
