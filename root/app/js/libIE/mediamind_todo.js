function tagMediaMind(id) {
	var ebRand = Math.random()+'';
	ebRand = ebRand * 1000000;
	
	var url = 'http://bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&ActivityID='+id+'&rnd=' + ebRand ;

	if($('#mediamind').size() < 1) {
		$('body').append('<iframe src="" id="mediamind" style="position: absolute; top: -9999px; left: 0; width: 0; height: 0;"></iframe>');
	}
	$("#mediamind").attr("src", url);
}