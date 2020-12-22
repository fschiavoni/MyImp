
//--------------------------------------------------------IMPRESORAS--------------------------------------------------------->


function select_all_impresoras() {
    var checkboxes_imp = document.getElementsByName('select_impresoras');
    var button = document.getElementById('checkbox_impresoras');
    if (button.checked == true) {
        for (var i in checkboxes_imp) {
            checkboxes_imp[i].checked = true;
        }
        button.checked = true;
    } else {
        for (var i in checkboxes_imp) {
            checkboxes_imp[i].checked = '';
        }
        button.checked = false;
    }
}

function doSearchImp() {
    var tableReg = document.getElementById('imp');
    var searchText = document.getElementById('myInputImp').value.toLowerCase();

    for (var i = 1; i < tableReg.rows.length; i++) {
        var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            tableReg.rows[i].style.display = 'none';
        }
    }
}

function validateIp(ip) {
    var patronIp = new RegExp(
        "^([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3})$"
    );
    var valores;

    // early return si la ip no tiene el formato correcto.
    if (ip.search(patronIp) !== 0) {
        return false;
    }

    valores = ip.split(".");

    return (
        valores[0] <= 255 &&
        valores[1] <= 255 &&
        valores[2] <= 255 &&
        valores[3] <= 255
    );
}

//--------------------------------------------------------Trabajos--------------------------------------------------------->

function select_all_jobs() {
    var checkboxes_job = document.getElementsByName('select_jobs');
    var button = document.getElementById('checkbox_jobs');
    if (button.checked == true) {
        for (var i in checkboxes_job) {
            checkboxes_job[i].checked = true;
        }
        button.checked = true;
    } else {
        for (var i in checkboxes_job) {
            checkboxes_job[i].checked = '';
        }
        button.checked = false;
    }
}


function doSearchJob() {
    var tableReg = document.getElementById('job');
    var searchText = document.getElementById('myInputJob').value.toLowerCase();
    
    for (var i = 1; i < tableReg.rows.length; i++) {
        var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            tableReg.rows[i].style.display = 'none';
        }
    }
}

//--------------------------------------------------------GRUPOS--------------------------------------------------------->

function select_all_groups() {
    var checkboxes_grp = document.getElementsByName('select_grupos');
    var button = document.getElementById('checkbox_grupos');
    if (button.checked == true) {
        for (var i in checkboxes_grp) {
            checkboxes_grp[i].checked = true;
        }
        button.checked = true;
    } else {
        for (var i in checkboxes_grp) {
            checkboxes_grp[i].checked = '';
        }
        button.checked = false;
    }
}


//Buscar grupos
function doSearchGroup() {
    var tableReg = document.getElementById('grp');
    var searchText = document.getElementById('myInputGrp').value.toLowerCase();
    for (var i = 1; i < tableReg.rows.length; i++) {
        var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            tableReg.rows[i].style.display = 'none';
        }
    }
}

