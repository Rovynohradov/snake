jQuery(document).ready(function($) {

	var square = $('.square'),
		cycle = 2499, // 99 base in the row
		i;

	for(i = 0; i < cycle; i++) {
		square.clone().appendTo('.container');		
	}

	$('.square').each(function(i, element) {
		$(element).attr('dataId', i);
	});

	$(document).on('click', '.square', function() {
        var startId = $(this).attr('dataId');

        $('.square[dataId="' + startId + '"]').addClass('current');
    }).on('click', '#start', function(e) {
		e.preventDefault();
        randomStart(0, 2499);
	}).on('click', '#stop', function(e) {
		e.preventDefault();
		dots();
	});

    function randomStart(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

    var left, right, down, up;
	$(document).on('keyup', function(e) {
		var	arrow = e.charCode || e.keyCode;
        var currentId = $('.current').attr('dataId');
        var current = $('.current');

        if(arrow == 38 && !current.is('.up')) { // up
            up = setInterval(function() {
                currentId = +currentId - 50;
                var prev = +currentId + 50;
                $('.square[dataId="' + prev + '"]').removeClass('current');
                $('.square[dataId="' + currentId + '"]').addClass('current up');
            }, 500);

            clear(right, down, left, 'left right down');
		} else if(arrow == 40 && !current.is('.down')) { // down
            down = setInterval(function() {
                currentId = +currentId + 50;
                var prev = +currentId - 50;
                $('.square[dataId="' + prev + '"]').removeClass('current');
                $('.square[dataId="' + currentId + '"]').addClass('current down');
                if($('.square[dataId="' + currentId + '"]').is('.dot')) {
                    alert('yes');
                }
            }, 500);

            clear(right, up, left, 'left up down');
		} else if(arrow == 37 && !current.is('.left')) { // left
            var n = 1;
            left = setInterval(function() {
                currentId--;
                var prev = currentId + n;
                $('.square[dataId="' + prev + '"]').removeClass('current');
                $('.square[dataId="' + currentId + '"]').addClass('current left');

                if($('.square[dataId="' + currentId + '"]').is('.dot')) {
                    ++n;
                }
            }, 500);

            clear(right, up, down, 'right up down');
		} else if(arrow == 39 && !current.is('.right')) { // right
            var n = 1;
            right = setInterval(function() {
                currentId++;
                var prev = currentId - n;
                $('.square[dataId="' + prev + '"]').removeClass('current');
                $('.square[dataId="' + currentId + '"]').addClass('current right');

                if($('.square[dataId="' + currentId + '"]').is('.dot')) {
                    ++n;
                }
            }, 500);

            clear(left, up, down, 'left up down');
        }
	});

    function clear(int1, int2, int3, selectors) {
        clearInterval(int1);
        clearInterval(int2);
        clearInterval(int3);
        $('.square').each(function() {
            $(this).removeClass(selectors);
        });
    }

    function dots() {
        var nextDot = randomStart(0, 2499);

        $('.square[dataId="' + nextDot + '"]').addClass('dot');
        console.log(nextDot);
    }

});