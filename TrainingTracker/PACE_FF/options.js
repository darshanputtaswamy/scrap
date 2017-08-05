/* 
 Oracle Internal Use ONLY. 
 */
var preferences = '';
var options_set = {};
var options_get = {};
var optiondata='';

function get_options()
{
    try {
        var obj = JSON.parse(preferences);
        for (var i = 0; i < obj.options.length; i++)
        {
            options_get[obj.options[i].name] = obj.options[i].value;
        }
    } catch (err)
    {
        alert("get_options : " + err.message);
    }
}
function set_options()
{
    try {
        var obj = JSON.parse(preferences);
        for (var i = 0; i < obj.options.length; i++)
        {
            options_set[obj.options[i].name] = document.getElementById(obj.options[i].name).value;
        }
    } catch (err)
    {
        alert("set_options : " + err.message);
    }
}

function save_options() {
    try {
        set_options();
        chrome.storage.local.set(options_set, function () {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function () {
                status.textContent = '';
            }, 750);
        });

    } catch (err)
    {
        alert(err.message);
    }

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    try {

        /*
         alert(JSON.stringify(options_get, null, 4));
         var options = {
         op1: "red",
         op2: true,
         op3: 'org1'
         };
         */
        get_options();
        chrome.storage.local.get(options_get, function (items) {
            for (var key in items) {
                document.getElementById(key).value = items[key];
            }

        });
    } catch (err)
    {
        alert(err.message);
    }
}

document.addEventListener('DOMContentLoaded', loadOptions);

function loadOptionData()
{
    document.getElementById("data").innerHTML = optiondata;
    document.getElementById('save').addEventListener('click', save_options);
}

function loadDoc() {
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                optiondata = xhttp.responseText;
                if(optiondata.length > 0)
                {
                loadOptionData();
                restore_options();
                }
            }
        };
        xhttp.open("GET", "https://proactivesupport.oraclecorp.com/psc/pace/CDN/V1-0/Option/options.html", true);
        xhttp.send();


    } catch (err)
    {
        alert(err.message);
    }
}


function loadOptions() {
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                preferences = xhttp.responseText;
                loadDoc();
            }
        };
        xhttp.open("GET", "https://proactivesupport.oraclecorp.com/psc/pace/CDN/V1-0/Option/options.json", true);
        xhttp.send();


    } catch (err)
    {
        alert(err.message);
    }
} 









