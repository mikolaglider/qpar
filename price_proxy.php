<?php

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){

	$response = 'error';

    if(!empty($_REQUEST['_code']) && !empty($_REQUEST['_command'])){
		
			
		$code = strip_tags($_REQUEST['_code']);
		$command = strip_tags($_REQUEST['_command']);
		
		
		
		// _command:"get_price",
		// _detail_id:_detail_id

		// _command:"get_price_by_code",
  		// _code:_code

		$myCurl = curl_init();
		curl_setopt_array($myCurl, array(
		    CURLOPT_URL => 'http://emex23.ru/price',
		    CURLOPT_RETURNTRANSFER => true,
		    CURLOPT_POST => true,
		    // CURLOPT_POSTFIELDS => http_build_query(array('_command' => 'get_price', '_detail_id' => $code))
		    CURLOPT_POSTFIELDS => http_build_query(array('_command' => $command, '_code' => $code))
		));
		$response = curl_exec($myCurl);
		curl_close($myCurl);
							
			
    }
    
    echo $response;
}


?>
