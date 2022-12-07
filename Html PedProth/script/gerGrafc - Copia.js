var myChart
setBotom();
function geracolor() {
    const letter = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letter[Math.floor(Math.random() * 16)];


    }
    return color;

}
function setdadogf(dadosreb, legenda) {
    var dados = {
        backgroundColor: legenda,
        data: [],

    };

    // dados['strokeColor'] = 'black';
    // for (let i = 0; i < dadosreb.length; i++) {
    //     dados['backgroundColor'].push(geracolor());
    // }
    // dados['backgroundColor'] = geracolor();
    dados['data'] = dadosreb

    return dados
}

function Grafico(idCanvas, labels, dadosreb, legenda, Tipo) {
    var options = {
        showAllTooltips: true,
        responsive: true, plugins: {
            legend: {
                display: false,
            }
        }
    };
    var data = { labels: [], datasets: [] };

    data.labels = labels;
    for (let i = 0; i < dadosreb.length; i++) {

        data.datasets.push(setdadogf(dadosreb[i], legenda));
    }

    const config = {
        type: Tipo,
        data: data,
        options: options
    };

    var canvas = document.getElementById(idCanvas)
    var ctx = canvas.getContext('2d');


    // ctx.clearRect(0, 0, canvas.width,canvas.height);
    if (myChart) {
        myChart.destroy();
    }


    myChart = new Chart(ctx, config);
    // myChart.destroy();
}

function SetGrfBarr(idTable, idCanvas, Tipo) {
    var table = document.getElementById(idTable);
    var tbody = table.querySelector("tbody");
    var trs = tbody.getElementsByTagName("tr");
    var aDds = table.getElementsByTagName("td");

    let graf = localizacoluna(document.getElementById("titulo").innerText)

    var header = [];
    var indexcab = [];
    var indexdDs = [];
    var legenda = [];
    var dados = [];
    var Tipo = Tipo || graf['tipografico'];

    for (let cell of table.getElementsByClassName("check")) {
        cell.cellIndex;
    }

    for (let cell of table.getElementsByClassName("cabec")) {
        indexcab.push(cell.cellIndex);
    }

    for (let cell of table.getElementsByClassName("dados")) {
        indexdDs.push(cell.cellIndex);
    }

    for (let tr of trs) {

        td = tr.getElementsByTagName('td');
        if (td[0].children[0].checked) {
            header.push(td[1].innerText);
            dados.push(td[2].innerText);
            legenda.push(td[3].children[0].style.backgroundColor);

        }
    }





    // for (const x of aDds) {
    //     result = indexcab.find(coluna => coluna === x.cellIndex);
    //     if (result !== undefined) {
    //         header.push(x.innerText);
    //     }

    // }

    // indexdDs.forEach(index => {
    //     var linha = [];
    //     for (let d of aDds) {
    //         if (d.cellIndex == index) {

    //             linha.push(d.innerText);
    //         }

    //     }

    //     dados.push(linha);


    // });

    totaldados(idTable);

    Grafico(idCanvas, header, [dados], legenda, Tipo);
}


function gergraf(indexEs, titulo, pos, Tipo) {

    var table = document.getElementById('total');
    var cabTT = [];
    var dados = [];
    var nPos = pos || 0
    var Tipo = Tipo || 'bar'


    for (let cell of table.getElementsByTagName("tr")) {
        coluna = cell.getElementsByTagName('td')[indexEs];
        if (coluna !== undefined) {
            index = cabTT.findIndex(linha => linha == coluna.innerText.substring(nPos))
            if (index > -1) {
                dados[index]++
            } else {

                cabTT.push(coluna.innerText.substring(nPos));
                dados.push(1);
            }

        }



    }
    document.getElementById("titulo").innerText = titulo;

    //totaldados(dados, cabTT,titulo)

    // cabTT.sort();
    gerlegend(cabTT, dados, titulo);
    sortTable();
    checkauto(10);
    SetGrfBarr('tbLegend', 'Barra', Tipo)
    //   Grafico("Barra", cabTT, [dados], Tipo);






}

function totaldados(idTable) {
    var total = 0
    var totalCheck = 0
    var maximovalor = 0
    var minimovalor = 1
    var totalcompleted = 0
    var lenCheck = 0
    var descricaomin = ""
    var descricaomax = ""
    var table = document.getElementById(idTable);
    var tbody = table.querySelector("tbody");
    var trs = tbody.querySelectorAll("tr");

    for (let tr of trs) {

        td = tr.querySelectorAll('td');
        if (td[0].children[0].checked) {
            const temporariomaximo = parseInt(td[2].innerText);
            totalCheck += parseInt(td[2].innerText);

            lenCheck++;


            if (temporariomaximo > maximovalor) {
                maximovalor = temporariomaximo;
                descricaomax = td[1].innerText;

            }
        }
        total += parseInt(td[2].innerText);
    }


    minimovalor = total;


    for (let tr of trs) {

        td = tr.querySelectorAll('td');
        if (td[0].children[0].checked) {
            const temporariominimo = parseInt(td[2].innerText);

            if (temporariominimo <= minimovalor) {
                minimovalor = temporariominimo;
                descricaomin = td[1].innerText;


            }
        }

    }


    let totalcard = document.querySelector("#totalcard");
    totalcard.querySelector(".number").innerText = totalCheck.toString() + "/" + total.toString();
    totalcard.querySelector(".title").innerText = "Total Registros";


    let totalsint = document.querySelector("#totalsinte");
    totalsint.querySelector(".number").innerText = total.toString();
    totalsint.querySelector(".title").innerText = "Total Registros";

    let totalopc = document.querySelector("#totalopc");
    totalopc.querySelector(".number").innerText = lenCheck.toString() + "/" + trs.length.toString();
    totalopc.querySelector(".title").innerText = "Total Opção: " + document.getElementById("titulo").innerText;


    let maxcard = document.querySelector("#maxcard");
    maxcard.querySelector(".number").innerText = maximovalor;
    maxcard.querySelector(".title").innerText = "Maior Quantidade: " + descricaomax;

    let mincard = document.querySelector("#mincard");
    mincard.querySelector(".number").innerText = minimovalor;
    mincard.querySelector(".title").innerText = "Menor Quantidade: " + descricaomin;

    cellindex = columnindex("Status");
    if (cellindex > -1) {
        totalcompleted = TotalinParameter("CONCLUIDAS APROVADAS", cellindex);
    }

    let conclucard = document.querySelector("#concluida");
    conclucard.querySelector(".number").innerText = totalcompleted;
    conclucard.querySelector(".title").innerText = "Concluidas";

    effect = ((totalcompleted / total.toString()) * 100)
    let effcard = document.querySelector("#efect");
    effcard.querySelector(".number").innerText = parseInt(effect).toString() + "%";
    effcard.querySelector(".title").innerText = "Eficiência";

    let day = document.querySelector("#days");
    days = parseInt(day.querySelector(".number").innerText);

    let delivery = document.querySelector("#delivery");
    delivery.querySelector(".number").innerText = parseInt(totalcompleted / days);



    // let totalcard = document.querySelector("#totalcard");
    // totalcard.querySelector(".number").innerText = cabTT.length;

}

function gerlegend(cabec, dados, titulo) {
    let table = document.getElementById("tbLegend");
    let tbody = table.querySelector("tbody");

    document.getElementById("titleleg").innerText = titulo;


    while (tbody.rows.length > 0) {
        tbody.rows[tbody.rows.length - 1].remove();
    }

    for (let index = 0; index < cabec.length; index++) {
        let tr = tbody.insertRow();
        let check = tr.insertCell();
        let td_titulo = tr.insertCell();
        let td_valor = tr.insertCell();
        let td_Leg = tr.insertCell();
        td_Leg.innerHTML = '<div style="background-Color:' + geracolor() + ';padding:8px;width:15px"></div>'
        let input = document.createElement('input');
        input.type = 'checkbox';
        let graf = localizacoluna(titulo)
        input.onchange = function () { SetGrfBarr('tbLegend', 'Barra', graf['tipografico']) };

        // input.checked = true;
        check.appendChild(input);
        td_titulo.innerText = cabec[index];
        td_valor.innerText = dados[index];
        tr.addEventListener("dblclick", function () { filter(cabec[index], titulo) })

    }


}
function checkauto(limite, checked = true) {
    let table = document.getElementById("tbLegend");
    let tbody = table.querySelector("tbody").querySelectorAll("tr");
    var limite = limite || tbody.length;


    if (limite > tbody.length) {

        limite = tbody.length;
    }


    for (let index = 0; index < limite; index++) {

        tbody[index].querySelector("td").querySelector('input').checked = checked;
    }


}



function localizacoluna(cTitulo) {

    var table = document.getElementById("total");
    var graf = { tipografico: "bar", index: 0 }


    for (let cell of table.getElementsByClassName("cabec")) {

        if (cell.innerText == cTitulo) {

            graf['tipografico'] = cell.classList[2] || "bar"
            graf['index'] == cell.classList[1] || 0

        }

    }
    return graf

}


function filter(valor, titulo) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = valor;
    filter = input.toUpperCase();
    table = document.getElementById("total");
    tr = table.getElementsByTagName("tr");
    th = table.getElementsByTagName("th");
    for (i = 0; i < th.length; i++) {
        if (th[i].innerText == titulo) {

            index = th[i].cellIndex;
        }

    }

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[index];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    var filtro = document.querySelector("#id_filter");
    filtro.querySelector("label").innerText = "Filtro:" + titulo
    filtro.querySelector("input").checked = true;

}

function limpafiltro() {
    var table = document.getElementById("total");
    var tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";

    }

    var filtro = document.querySelector("#id_filter");
    filtro.querySelector("input").checked = false;
    filtro.querySelector("label").innerText = "Filtro:"

}

function setBotom() {
    var table = document.getElementById("total");
    var list = document.getElementById("lisbotton");
    var idfor = 1
    var cabec = table.getElementsByClassName("cabec");

    for (let cell of cabec) {

        let tipoGrafico = cell.classList[2]
        let indexString = cell.classList[1]
        let tituloalter = cell.classList[3] || cell.innerText
        tituloalter = tituloalter.replace(/;/gi, " ")
        let cIdlabel = "rd" + idfor.toString()
        let el = document.createElement("li");
        el.addEventListener("click", function () { gergraf(cell.cellIndex, tituloalter, indexString, tipoGrafico) })
        el.innerHTML = `<label for='${cIdlabel}'><span>${cell.innerText}</span><input id='${cIdlabel}' type='radio' name='opcao'/> <i></i></label>`
        list.appendChild(el);

        if (idfor == 1) {
            gergraf(cell.cellIndex, tituloalter, indexString, tipoGrafico);
            el.querySelector("input").checked = true;


        }

        idfor++

    }


}

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tbLegend");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            // Check if the two rows should switch place:
            if (parseInt(x.innerHTML.toLowerCase()) < parseInt(y.innerHTML.toLowerCase())) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function allcheck() {
    checkauto(null, event.target.checked);
    SetGrfBarr('tbLegend', 'Barra');

}

function columnindex(nameColunn) {
    var table = document.getElementById("total");
    var ths = table.getElementsByTagName("th");
    var cellIndex = -1
    for (let index = 0; index < ths.length; index++) {
        const cabec = ths[index];
        if (cabec.innerText === nameColunn) {

            cellIndex = cabec.cellIndex;
            return cellIndex;
        }


    }



    return cellIndex;

}

function TotalinParameter(wanted, cellindex) {
    var table = document.getElementById("total");
    var trs = table.getElementsByTagName("tr");
    var total = 0

    for (let index = 0; index < trs.length; index++) {
        const tds = trs[index].querySelectorAll("td");
        if (tds.length > 0) {

            if (tds[cellindex].innerText == wanted) {
                total++

            }
        }


    }

    return total
}


function displayLegend(bt) {

    var table = document.getElementById("tbLegend");

    if (table.style.display == "none") {

        table.style.display = "";
        bt.innerText = "-";
    } else {

        bt.innerText = "+";
        table.style.display = "none";
    }


}