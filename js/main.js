jqWar(document).ready(function() {

	jqWar(window).scroll(function(){
		var top_scroll = jqWar(this).scrollTop();
		//arrow top

		if (top_scroll > 700)
		{
			jqWar('.arrow_top').show();
		} else {
			jqWar('.arrow_top').hide();
		}
	});

	jqWar('.arrow_top').on('click', function(){
		jqWar('body, html').animate({
			scrollTop: 0
		}, 500);
	});


	/* Search */
	jqWar('.search-form__submit').on('click', function() {

		jqWar('.search-form__input').attr('placeholder', "Поиск по коду или VIN");
		jqWar('.search-form__input').removeClass('search-error');

		var value = jqWar('.search-form__input').val();

		if (value) {
			
			jqWar('#loading_search').show();

			jqWar.ajax
			(
			{
				type:"POST",
				url:"/price_proxy.php",
				data:
				{
					_code:value,
					_command:'get_price_by_code'
				},
				dataType:"html",
				success:function(response)
				{
					jqWar('#loading_search').hide();
					jqWar('#main_inner_wrapper').html(response);
				},
				error:function()
				{
					jqWar('#loading_search').hide();
					alert('Ошибка AJAX!');
				}
			}
			);
		} else {
			jqWar('.search-form__input').attr('placeholder', "Введите код или VIN");
			jqWar('.search-form__input').addClass('search-error');
		}


		return false;
	});


	jqWar('.search-form__input').on('keydown', function(e) {
		if (e.keyCode == 13) {
			jqWar('.search-form__submit').trigger('click');
		}
	});

});


function showContent(url)
{
	jqWar('#loading_search').show();

	jqWar.ajax
	(
	{
		type:"POST",
		url:"/content_proxy.php",
		data:
		{
			path:url
		},
		dataType:"html",
		success:function(response)
		{
			jqWar('#loading_search').hide();
			jqWar('.menu-catalog').removeClass('menu-catalog--show');
			jqWar('.shadow').removeClass('shadow--open');

			jqWar('#main_inner_wrapper').html(response);
		},
		error:function()
		{
			jqWar('#loading_search').hide();
			jqWar('.menu-catalog').removeClass('menu-catalog--show');
			jqWar('.shadow').removeClass('shadow--open');
			alert('Ошибка AJAX!');
		}
	}
	);
}

function ShowPrice(_code)
{
	jqWar('#loading_search').show();

	jqWar.ajax
	(
	{
		type:"POST",
		url:"/price_proxy.php",
		data:
		{
			_command:"get_price",
			_code:_code
		},
		dataType:"html",
		success:function(response)
		{
			jqWar('#loading_search').hide();
			jqWar('#main_inner_wrapper').html(response);
		},
		error:function()
		{
			jqWar('#loading_search').hide();
			alert('Ошибка AJAX!');
		}
	}
	);    
}