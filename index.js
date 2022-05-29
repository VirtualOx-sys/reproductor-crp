<!DOCTYPE html>
<html>
<head>
	<title>Reproductor Crunchyroll</title>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="assets/css/player.css?v=1">
	<link rel="stylesheet" type="text/css" href="assets/css/download_dialog.css?v=1">
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-154158844-1"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-154158844-1');
	</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="assets/js/jwplayer.js"></script>
</head>
<body>
	<div class="loading_container">
		<div class="loading_icon">
			<svg width="30px"  height="30px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;">
				<circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="#ffffff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(159.051 50 50)">
					<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
				</circle>
			</svg>
		</div>
		<div class="loading_text_container">
			<div class="loading_text">Tu video comenzará en un momento. (^-^)<span class="corta_linha"></span>Esperando datos de transmisión..</div>
		</div>
	</div>
	<div class="modal" style="transform: translate3d(0px, 0px, 0px);visibility: hidden;">
		   <button class="close-modal">×</button>
		   <div class="download-item">
			<span class="partdditem quality not-copyable">1080p<sup>HD</sup></span>
		   	<span id="1080p_down_size" class="partdditem size not-copyable"><img src="assets/icon/fetching-icon.svg" /> MB</span>
		   	<a id="1080p_down_url" class="partdditem down-icon" href="javascript:void(0);" target="_top" download="1080p"></a>
		   </div>
		   <div class="download-item">
			<span class="partdditem quality not-copyable">720p<sup>HD</sup></span>
		   	<span id="720p_down_size" class="partdditem size not-copyable"><img src="assets/icon/fetching-icon.svg" /> MB</span>
		   	<a id="720p_down_url" class="partdditem down-icon" href="javascript:void(0);" target="_top" download="720p"></a>
		   </div>
		   <div class="download-item">
		   	<span class="partdditem quality not-copyable">480p</span>
		   	<span  id="480p_down_size" class="partdditem size not-copyable"><img src="assets/icon/fetching-icon.svg" /> MB</span>
		   	<a id="480p_down_url" class="partdditem down-icon" href="javascript:void(0);" target="_top" download="480p"></a>
		   </div>
		   <div class="download-item">
		   	<span class="partdditem quality not-copyable">360p</span>
		   	<span id="360p_down_size" class="partdditem size not-copyable"><img src="assets/icon/fetching-icon.svg" /> MB</span>
		   	<a id="360p_down_url" class="partdditem down-icon" href="javascript:void(0);" target="_top" download="360p"></a>
		   </div>
		   <div class="download-item">
		   	<span class="partdditem quality not-copyable">240p</span>
		   	<span id="240p_down_size" class="partdditem size not-copyable"><img src="assets/icon/fetching-icon.svg" /> MB</span>
		   	<a id="240p_down_url" class="partdditem down-icon" href="javascript:void(0);" target="_top" download="240p"></a>
		   </div>
	</div>
	<div class="modal" style="transform: translate3d(0px, 0px, 0px);visibility: hidden;">
		   <button class="close-modal">×</button>
		   <div class="download-item">
			<span class="partdditem quality not-copyable">Registro De Cambios</span>
			<span class="partdditem size not-copyable">v1.1.0</span>
		   </div>
		   <div class="download-item">
			<span id="changelog" class="partdditem quality not-copyable" style="font-family: 'SFProDisplay-Regular';">
				<strong>Actualización disponible:</strong><br/>
				- Añadida la compatibilidad con <strong>Crunchyroll Beta</strong><br/>
				- Se Eliminó la dependencia de allOrigins (proxy externo)<br/>
			</span>
		   </div>
		   <div class="download-item">
		   	<span class="partdditem quality not-copyable">Descargar (pc)</span>
		   	<a class="partdditem down-icon" href="https://github.com/mateus7g/crp-iframe-player/releases/download/v1.1.0/Crunchyroll_Premium.zip" target="_top" download></a>
		   </div>
	<div id="player_div"></div>
	<script src="assets/js/player.js"></script>
</body>
</html>