<?php

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){

	$content = 'error';

    if(!empty($_REQUEST['path'])){
		
		$path = strip_tags($_REQUEST['path']);
	
		 if(!empty($path)){

		 	$url = 'http://emex23.ru' . $path;


			include('./include/simple_html_dom.php');

			$html = file_get_html($url);

			$content = $html->getElementById("cat_content_wrapper");

			if(!$content) $content = $html->find(".detail_page_wrapper", 0);

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

	echo $content;

}