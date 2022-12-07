var tabela 
var linhas 
var cabc 
var list = function(){selLinha(this)}


		function showPage(id,bt,cab) {
	
    var row = document.getElementById(id);
      	  
	  if (row.style.display === 'none') {
        row.style.display = 'block';
    
        
        


     document.getElementById(bt).value = "-";
     //document.getElementById(corp).className = 'tbaberto';
      document.getElementById(cab).className = 'titulogray';
     
     // document.getElementById(corp).style.background ='#DDD'
     // document.getElementById(corp).className = 'tbaberto';
     

    // document.getElementById(cab).style.background ='#DDD'
     //document.getElementById(corp).style.background ='#DDD'


		
    } else {
       row.style.display = 'none';
	  //  document.getElementById(id + "b").style = 'none'
      document.getElementById(bt).value = "+";
    //   document.getElementById(corp).className = 'tbmeio'
      document.getElementById(cab).className = 'titulo';

      
  //    document.getElementById(corp).className = 'tbfechado';
      //document.getElementById(corp).style.background ='#f2f2f2'

	  
	//  document.getElementById(id + "b").className = "topnav"
    }
	
	//closeall(id)
	
}


function closeall(id){
	
	for(var i = 0; i < ids.length; i++){
		
		if(id != ids[i]){
	
			 var row = document.getElementById(ids[i]);
			row.style.display = 'none';
			// document.getElementById(ids[i] + "b").style = 'none'
			
			 
	  document.getElementById(ids[i] + "b").className = "topnav"
	}
	


}
}
	
	
	


function TableShow(Id) {
  // Get the snackbar DIV
  var x = document.getElementById(Id);
   var bT = document.getElementById(Id+"L");

  // Add the "show" class to DIV

  if( x.className == "snackbar"){
   x.className = "show";
   bT.value = "-"
   x.style.top = "";
   x.style.bottom = 40 + "px";
    x.style.left = 10 + "%";

	dragElement(document.getElementById(Id));
  }else{ 
  x.className = "snackbar";
   bT.value = "+"}

}

function openTb(id){
	
tabela = document.getElementById(id);
linhas = tabela.getElementsByTagName("td");
 cabc = tabela.getElementsByTagName("th");

for(var i = 0; i < linhas.length; i++){
	var linha = linhas[i];


linha.addEventListener("click",list,true );
}
}

function selLinha(linha){
	var cell = linha.cellIndex
  var desc = document.getElementById("head");
    desc.innerHTML = cabc[cell].innerText;
    showhead('head')

}



function showhead(id) {
  // Get the snackbar DIV
  var x = document.getElementById(id);

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


function sortTable(id) {
//carregando('carregando',id);
var aLen = []
var invert = true;
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(id.offsetParent.id);
  switching = true;
  
      rows = table.rows;
  	for (i = 1; i < (rows.length); i++) {
		
		if(rows[i].getElementsByTagName("td").length> 0){
			aLen[aLen.length] = i
			
		}else{
			 break
			
		}
		
	}
	
	try {
	linha1 = Number(rows[aLen[0]].getElementsByTagName("TD")[id.cellIndex].innerText.toLowerCase().replace(".","").replace(",","."))
  linha2 = Number(rows[aLen[aLen.length-2]].getElementsByTagName("TD")[id.cellIndex].innerText.toLowerCase().replace(".","").replace(",","."))
}
	catch(err) {
	linha1 = rows[aLen[0]].getElementsByTagName("TD")[id.cellIndex].innerText.toLowerCase()
	linha2 = rows[aLen[aLen.length-2]].getElementsByTagName("TD")[id.cellIndex].innerText.toLowerCase()
}
if(isNaN(linha1)){
	linha1 = rows[aLen[0]].getElementsByTagName("TD")[id.cellIndex].innerText.toLowerCase()
	linha2 = rows[aLen[aLen.length-2]].getElementsByTagName("TD")[id.cellIndex].innerText.toLowerCase()


}
	invert = linha1 > linha2
	
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
  rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
	

	
    for (i = aLen[0]; i < aLen[aLen.length-2]; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
	 contador = i.toString()
		rows[i].cells[0].innerText = contador.padStart(5,'0') 
      x = rows[i].getElementsByTagName("TD")[id.cellIndex];
	  y = rows[i + 1].getElementsByTagName("TD")[id.cellIndex];
	  ncol1 = Number(x.innerText.toLowerCase().replace(".","").replace(",","."))
	  ncol2 = Number(y.innerText.toLowerCase().replace(".","").replace(",","."))
	  
	  
	  
	 if ( isNaN(ncol1) && isNaN(ncol2)){
		col1 = x.innerText.toLowerCase()
		col2 = y.innerText.toLowerCase()
	 }else{
		col1 = ncol1
		col2= ncol2
		
	 }
	if(invert){
      //check if the two rows should switch place:
      if (col1 > col2 ) {
        //if so, mark as a switch and break the loop:
			shouldSwitch = true;
			break;
		} 
	}else{
		 if (col1 < col2 ) {
        //if so, mark as a switch and break the loop:
			shouldSwitch = true;
			break;
		} 
	}
		
	  
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  //  setTimeout(function(){ carregando('carregando') }, 100);
	
}



function pesq() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("MinhaTabela");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}


function carregando(id) {

  var x = document.getElementById(id);
  
  if( x.className == "visual"){
    x.className = "";
  
  }else{
    x.className = "visual";
  
  }
    
  }
  
  function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id )) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id ).onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
   /* e.preventDefault();*/
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	elmnt.style.bottom = "";
	

  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// funcao para criar tabela tamnho da tela
function criaTabela(total){  
  var screenWidth = screen.width; 
  var px = screenWidth.toString() +'px';
 var html = '';
 
     html += '			<th 	width = ' + px +' ></th>'
   for(var x = 1;x <= total;x++){
     var cadd = "add"+ String(x);
     document.getElementById(cadd ).innerHTML = html;
   }
 
 }  