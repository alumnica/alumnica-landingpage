function addDatesToCalendar(fechas) {
  let array = [];
  fechas.forEach(function(row) {
    row.forEach(function(fecha) {
      array.push(fecha);
    });
  });
  return array;
}
