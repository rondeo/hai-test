/*================================================================================
	Item Name: Materialize - Material Design Admin Template
	Version: 5.0
	Author: PIXINVENT
	Author URL: https://themeforest.net/user/pixinvent/portfolio
================================================================================

NOTE:
------
PLACE HERE YOUR OWN JS CODES AND IF NEEDED.
WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR CUSTOM SCRIPT IT'S BETTER LIKE THIS. */

/*
 * DataTables - Tables
 */


// Datatable click on select issue fix
$(window).on('load', function () {
  $(".dropdown-content.select-dropdown li").on("click", function () {
    var that = this;
    setTimeout(function () {
      if ($(that).parent().parent().find('.select-dropdown').hasClass('active')) {
        $(that).parent().parent().find('.select-dropdown').removeClass('active');
        $(that).parent().hide();
      }
    }, 100);
  });
});

$.fn.dataTable.ext.errMode = 'none';

var initDataTable = function () {
  $('#tbl-list').DataTable({
    'responsive': true,
    'lengthMenu': [
      [10]
    ],
    'lengthChange': false
  });
};

var destroyDataTable = function () {
  if ($.fn.dataTable.isDataTable($('#tbl-list'))) {
    $('#tbl-list').dataTable().api().destroy();
  }
}


