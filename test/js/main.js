
function generateData(){

    var data = '';

    for(var i = 0; i < 500; i++){

        data += '<div class="level1"><span>level1 '+i+'</span>';

        for(var y = 0; y < 50; y++){

            data += '<div class="level2"><span>level2 '+y+'</span><div class="level3">';

            for(var k = 0; k < 15; k++){
                data += '<div>level3 '+k+'</div>';
            }

            data += '</div></div>';

        }

        data += '</div>';

        if(i % 50 == 0){
            data += '<span class="splitter"></span>';
        }

    }

    console.warn('Test data ready');

    return data;

}

var testData = generateData();

function checkResult(_start, testName){

    var _interval = 100;
    var start = _start;

    var interval = setInterval(function(){

        if($('#test')[0].innerHTML.length == testData.length){
            var end = new Date().getTime();
            var time = end - _start;
            clearInterval(interval);
            setResult(testName, time);
        }else if($('#test')[0].innerHTML.length > 0){
            start =- _interval/2;
        }


    }, _interval);

}

function setResult(testName, time){
    var color = '';

    if(time > 10000){
        color = 'red';
    }

    if(time > 5000 && time < 10000){
        color = 'orange';
    }

    if(time < 5000){
        color = 'blue';
    }

    if(time < 2000){
        color = 'green';
    }

    $('#result').append('<div class="result"><span class="name">'+testName+'</span> : <span class="time '+color+'">'+time+'s</span>');

}

var tests = {

    innerHTML: function(){

        $('#test').html('');

        var start = new Date().getTime();

        var div = document.getElementById("test");
        div.innerHTML = testData;

        checkResult(start, 'innerHTML');

    },

    jQueryAppend: function(){

        $('#test').html('');

        var start = new Date().getTime();

        var div = $('#test');
        div.append(testData);

        checkResult(start, 'jQuery.append');

    },

    jQueryParseHTML: function(){

        $('#test').html('');

        var start = new Date().getTime();

        var div = $('#test');
        var nodes = $.parseHTML(testData)
        div.append(nodes);

        checkResult(start, 'jQuery.parseHTML');

    },

    jQueryHTML: function(){

        $('#test').html('');

        var start = new Date().getTime();

        var div = $('#test');
        div.html(testData);

        checkResult(start, 'jQuery.html');

    },

    fragmentsAppending: function(){

        $('#test').html('');

        var start = new Date().getTime();

        var appendFragment = function(_selector, _fragments, _index){

            var selector = _selector;
            var fragments = _fragments;
            var index = _index;

            setTimeout(function(){

                selector.append(fragments[index]);
                index++;

                console.log(fragments.length + ' '+index);

                if(index < fragments.length){
                    appendFragment(selector, fragments, index);
                }

            }, 0);

        }

        var div = $('#test');

        var dataCopy = fragments+'';
        var fragments = testData.split('<span class="splitter"></span>');

        testData = fragments.join("");

        appendFragment(div, fragments, 0);

        checkResult(start, 'fragmentsAppending');

    }

}
