<?php
include('header.php');

echo '<div class="content"><div id="content_inner" class="container"><div class="row"><div class="col-xs-12"><div id="main_inner_wrapper">';

$url = $_SERVER['REQUEST_URI'];

$content = file_get_contents('404.php');

if ($url)
{
	if($url == '/'){
		$content = file_get_contents('main.php');
	} elseif($url == '/opt/') {
		$content = file_get_contents('opt.php');
	} elseif($url == '/sto/') {
		$content = file_get_contents('sto.php');
	} else {


		$path = strip_tags($url);
	
		 if(!empty($path)){

		 	$url = 'http://emex23.ru' . $path;


			include('./include/simple_html_dom.php');

			$html = @file_get_html($url);

			if(!$html) echo $content;

			$content = $html->getElementById("cat_content_wrapper");

			if(!$content) $content = $html->find(".detail_page_wrapper", 0);

			if(!$content) $content = $html->find(".page_wrapper", 0);

			// Find all images 
			foreach($content->find('img') as $element){
				@$element->src = 'http://emex23.ru' . $element->src;
				// echo $element->href . '<br>';
			}

			//buttons
			foreach($content->find('.btn_show_price_wrapper input[type=button]') as $element){
				@$element->class = "btn basket-page__submit-button";
				// echo $element->href . '<br>';
			}

			//buttons
			foreach($content->find('.desc input[type=button]') as $element){
				@$element->class = "btn basket-page__submit-button";
				// echo $element->href . '<br>';
			}

			//buttons
			foreach($content->find('table.parts_table input[type=button]') as $element){
				@$element->class = "btn basket-page__submit-button";
				// echo $element->href . '<br>';
			}
	    }

	}
}

echo $content;

echo '</div></div></div></div></div>';

include('footer.php');
?>