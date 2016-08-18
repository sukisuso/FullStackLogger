/*
* Jesús Juan Aguilar
* Client viewer for Loggers
*/

var grid = null;
var actualView = 'client';

  var columns = [
    {id: "level", name: "Level", field: "level", width:100},
    {id: "date", name: "Date", field: "date", width:250},
    {id: "content", name: "Content", field: "content", width:850}
  ];

  var options = {
    enableCellNavigation: true,
    enableColumnReorder: false
  };

  //setInterval(function(){ refresh(); }, 2000);

  $(function () {
    $.ajax({
    type: "POST",
    url: '/logger/getFirstClientLogs',
    success:function(data){
      
      grid = new Slick.Grid("#myGrid", setRowColor(data), columns, options);
    }
  });    
});

function changeToServerLogs () {
  $('#actualPage')[0].textContent = 1;
  actualView = 'server';
  $('#tabClient')[0].removeAttribute('class');
  $('#tabServer')[0].setAttribute('class', 'is-active');
  grid.invalidateAllRows();
  $.ajax({
    type: "POST",
    url: '/logger/getFirstServerLogs',
    success:function(data){
      grid = new Slick.Grid("#myGrid",setRowColor(data), columns, options);
    }
  }); 
}

function changeToClientLogs () {
  $('#actualPage')[0].textContent = 1;
  actualView= 'client';
  $('#tabServer')[0].removeAttribute('class');
  $('#tabClient')[0].setAttribute('class', 'is-active');
  grid.invalidateAllRows();
  $.ajax({
    type: "POST",
    url: '/logger/getFirstClientLogs',
    success:function(data){
      grid = new Slick.Grid("#myGrid", setRowColor(data), columns, options);
    }
  }); 
}

function goToNextPage () {
 
  var page = parseInt($('#actualPage')[0].textContent);
  $('#actualPage')[0].textContent = page+1;

  if(actualView == 'client'){
      $.ajax({
        type: "POST",
        data:{
          page:page
        },
        url: '/logger/getPageClientLogs',
        success:function(data){
          if(data.length != 0){
            grid.invalidateAllRows();
            grid = new Slick.Grid("#myGrid", setRowColor(data), columns, options);
          }else{
            $('#actualPage')[0].textContent = page;
          }
        }
      }); 

  }else{
    $.ajax({
        type: "POST",
        data:{
          page:page
        },
        url: '/logger/getPageServerLogs',
        success:function(data){
          if(data.length != 0){
            grid.invalidateAllRows();
            grid = new Slick.Grid("#myGrid", setRowColor(data), columns, options);
          }else{
            $('#actualPage')[0].textContent = page;
          }
        }
      }); 
  }

}

function goToPreviousPage () {
  var page = parseInt($('#actualPage')[0].textContent);
  if (page == 1 )
    return;

  $('#actualPage')[0].textContent = page-1;
  page = page -2;

   if(actualView == 'client'){
      $.ajax({
        type: "POST",
        data:{
          page:page
        },
        url: '/logger/getPageClientLogs',
        success:function(data){
          if(data.length != 0){
            grid.invalidateAllRows();
            grid = new Slick.Grid("#myGrid", setRowColor(data), columns, options);
          }else{
            $('#actualPage')[0].textContent = page;
          }
        }
      }); 

  }else{
    $.ajax({
        type: "POST",
        data:{
          page:page
        },
        url: '/logger/getPageServerLogs',
        success:function(data){
          if(data.length != 0){
            grid.invalidateAllRows();
            grid = new Slick.Grid("#myGrid", setRowColor(data), columns, options);
          }else{
            $('#actualPage')[0].textContent = page;
          }
        }
      }); 
  }

}


function refresh () {
  var page = parseInt($('#actualPage')[0].textContent);

  page = page -1;

   if(actualView == 'client'){
      $.ajax({
        type: "POST",
        data:{
          page:page
        },
        url: '/logger/getPageClientLogs',
        success:function(data){
          if(data.length != 0){
            grid.invalidateAllRows();
            grid = new Slick.Grid("#myGrid", setRowColor(data), columns, options);
          }
        }
      }); 

  }else{
    $.ajax({
        type: "POST",
        data:{
          page:page
        },
        url: '/logger/getPageServerLogs',
        success:function(data){
          if(data.length != 0){
            grid.invalidateAllRows();
            grid = new Slick.Grid("#myGrid", setRowColor(data), columns, options);
          }
        }
      }); 
  }
}

function setRowColor (data){
  data.getItemMetadata = function (index) {
      if (this[index].level == "ERROR") {
        return { "cssClasses": "error-row" };
      }else if (this[index].level == "WARN"){
        return { "cssClasses": "warn-row" };
      }else if (this[index].level == "INFO"){
        return { "cssClasses": "info-row" };
      }else if (this[index].level == "DEBUG"){
        return { "cssClasses": "debug-row" };
      }else if (this[index].level == "TRACE"){
        return { "cssClasses": "trace-row" };
      }
    };
    return data;
} 


function goToPageNumberOne () {

  $('#actualPage')[0].textContent = 1;
  page = 0;

   if(actualView == 'client'){
      $.ajax({
        type: "POST",
        data:{
          page:page
        },
        url: '/logger/getPageClientLogs',
        success:function(data){
          if(data.length != 0){
            grid.invalidateAllRows();
            grid = new Slick.Grid("#myGrid", setRowColor(data), columns, options);
          }else{
            $('#actualPage')[0].textContent = 1;
          }
        }
      }); 

  }else{
    $.ajax({
        type: "POST",
        data:{
          page:page
        },
        url: '/logger/getPageServerLogs',
        success:function(data){
          if(data.length != 0){
            grid.invalidateAllRows();
            grid = new Slick.Grid("#myGrid", setRowColor(data), columns, options);
          }else{
            $('#actualPage')[0].textContent = 1;
          }
        }
      }); 
  }
}

/*
/logger/getLastPageClientLogs', function(req, res) {getLastPageClientLogs(req,res);});
  app.post('/logger/getLastPageServerLogs
*/

function goToLastPage () {
  var page = parseInt($('#actualPage')[0].textContent);

  if(actualView == 'client'){
      $.ajax({
        type: "POST",
        url: '/logger/getLastPageClientLogs',
        success:function(data){
          if(data.data.length != 0){
            grid.invalidateAllRows();
            grid = new Slick.Grid("#myGrid", setRowColor(data.data), columns, options);
            $('#actualPage')[0].textContent = data.page;
          }else{
            $('#actualPage')[0].textContent = page;
          }
        }
      }); 

  }else{
    $.ajax({
        type: "POST",
        url: '/logger/getLastPageServerLogs',
        success:function(data){
          if(data.data.length != 0){
            grid.invalidateAllRows();
            grid = new Slick.Grid("#myGrid", setRowColor(data.data), columns, options);
            $('#actualPage')[0].textContent = data.page;
          }else{
            $('#actualPage')[0].textContent = page;
          }
        }
      }); 
  }
}