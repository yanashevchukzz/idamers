
(function(){
	
/* Load Script function we may need to load jQuery from the Google's CDN */
var loadScript = function(url, callback){
 
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.setAttribute('defer','');
  script.setAttribute('async','');

  // If the browser is Internet Explorer.
  if (script.readyState){ 
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" || script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  // For any other browser.
  } else {
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
    
};

var loadCSS = function(url, callback){
 
  var script = document.createElement("link");
  script.rel = "stylesheet";
  script.type = "text/css";
  script.media = "all";

  // If the browser is Internet Explorer.
  if (script.readyState){ 
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" || script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  // For any other browser.
  } else {
    script.onload = function(){
      callback();
    };
  }

  script.href = url;
  document.getElementsByTagName("head")[0].appendChild(script);
    
};
	
function pad(n) {return n < 10 ? "0"+n : n;}
	
var vnShop = 'motocity-store.myshopify.com';
var vnApiURL = 'https://verify.varinode.com/tsapi.php?';
var vnAppKey = '05ea5ec8a2504eed8efe4fd13485911c';
var vnAppSecret = 'f395d733bec24fc1b61c715013637475';
var vnCompanyID = '5ee0e748159f407eaecff7526cbbcfd7';
var maid = 'pk.eyJ1Ijoic2hvcGlmeSIsImEiOiJRS1hjczRZIn0.-QXj2pCqs2oirQ6KaP0c1A';
var vnCountry = 'US';

var shop_settings = {"subscription_ts":1473791062,"subscription_type":"starter","pci_enabled":"false","ssl_enabled":"false","shopify_enabled":"false","mobile_enabled":"false","reviews_enabled":"false","social_enabled":"false","guarantee_enabled":"false","guarantee_days":"3","guarantee_type":"custom","pagelocation_type":"default","pagelocation_alignment":"center","popup_position":"top","seal_style":"original","language":"es","version":2,"display_position":"bottom_left","bgcolor":"rgba(255,255,255,0.7)","contacts_enabled":"false","lat":"21.147523","lng":"-101.69038","company_name":"Motocity MX","addressline1":"PASEO DEL MORAL 504","addressline2":"","addressline3":"","city":"Le\u00f3n","region":"Guanajuato","zipCode":"37160","country":"MX","email":"shopify@motocity.mx","phone":"4776364094","guarantee_custom":"En MOTO CITY queremos que tu experiencia de compra sea placentera y satisfactoria, para que nos vuelvas a elegir como tu nueva opci\u00f3n de compra.  SIn embargo, si no estas 100 % satisfecho con tu compra,  puedes devolver el art\u00edculo y cambiarlo por otro de tu conveniencia.    <br \/>\nEl plazo para devolver el art\u00edculo ser\u00e1 de 3 d\u00edas a partir de la fecha de recepci\u00f3n del art\u00edculo.<br \/>\nEl art\u00edculo devuelto deber\u00e1 estar en impecables condiciones y en su empaque original.  <br \/>\nLos gastos de env\u00edo correr\u00e1n por parte del cliente.<br \/>\n<br \/>\nAgradecemos tu confianza y nos preocupamos por corresponderla. <br \/>\n<br \/>\nEquipo de Servicio al cliente MOTO CITY","checkout_enabled":"false","checkout_asseturl":"https:\/\/cdn.shopify.com\/s\/files\/1\/0998\/1534\/t\/13\/assets\/vntsc.js?3759775523224060603"};
var verify_ts = 1584167062000;
var ddid = new Date(verify_ts);
var dddate = pad(ddid.getMonth()+1)+"/"+pad(ddid.getDate())+"/"+ddid.getFullYear();

var vnTRUSTApp = function($){
	
	if(typeof jQuery === 'undefined')
		jQuery = $;
	
	if (!Date.now) {
	    Date.now = function() { return new Date().getTime(); }
	}
	
	function createCookie(name,value,timeInSecond) {
	    if (timeInSecond) {
	        var date = new Date();
	        date.setTime(date.getTime()+(timeInSecond*1000));
	        var expires = "; expires="+date.toGMTString();
	    }
	    else var expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
	}
	
	function readCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}
	
	function cookieExists(name) {
        var x = name + "=";
        var w = document.cookie.split(";");
        for (var z = 0; z < w.length; z++) {
            var A = a(w[z]);
            if (A.indexOf(x) == 0) {
                return A.substring(x.length, A.length)
            }
        }
        return ""
	}
	
	function eraseCookie(name) {
	    createCookie(name,"",-1);
	}
	
	$.fn.bindFirst = function(name, fn) {
	    // bind as you normally would
	    // don't want to miss out on any jQuery magic
	    this.on(name, fn);
	
	    // Thanks to a comment by @Martin, adding support for
	    // namespaced events too.
	    this.each(function() {
	        var handlers = $._data(this, 'events')[name.split('.')[0]];
	        // take out the handler we just inserted from the end
	        var handler = handlers.pop();
	        // move it at the beginning
	        handlers.splice(0, 0, handler);
	    });
	};
	
    function a(w) {
        if (!w) {
            return ""
        }
        try {
            return new String(w).trim()
        } catch (x) {
            return w
        }
    }
    
    function u() {
        return "margin:0 !important;padding:0 !important;border:0 !important;background:none !important;max-width:none !important;max-height:none !important;"
    }
    
    function p() {
        return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/BlackBerry/i)
    }

    function m() {
        return navigator.userAgent.match(/MSIE 8/i) || navigator.userAgent.match(/MSIE 7/i)
    }
        
    function b() {
        var w = cookieExists("vntrust_visit");
        if (w) {
            return
        }
        createCookie("vntrust_visit", 1, 24 * 60);
    }
    
    
    
	function bzg(shop_details)
	{
		var r =[];
		
		r.push('<div id="vnts_guarantee_wrp" class="vnts_tip_cts">');
			r.push("<div class='vntrow vntno_margin-lft'>");
				r.push("<div class='vntcol-xs-4 vntno_padding-rgt vntno_padding-lft'>");
					r.push("<div class='vnts_lft_sects'>");
						r.push('<img id="vnts_left_image" data-src="" src="https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_g'+shop_details.guarantee_days+'_280_1024x1024.png?v=3" alt="" class="vntimg-responsive">');
					r.push('</div>');
				r.push('</div>');
				r.push("<div class='vntcol-xs-8'>");
					r.push('<div style="font-size:25px;font-weight:bold;margin-bottom:5px">Garant&iacute;a de Satisfacci&oacute;n</div>');
					if(typeof shop_details.guarantee_type=='undefined' || shop_details.guarantee_type=='default'){
						r.push("<p>"+shop_details.company_name+" desea que est&eacute; emocionado con tu nueva compra. Sin embargo, si no est&aacute;s 100% satisfecho con su compra, puede regresar el art&iacute;culo y obtener una <b>devoluci&oacute;n completa</b>.</p>");
						r.push('<p>Puede regresar art&iacute;culos por hasta un periodo m&aacute;ximo de  <b>'+shop_details.guarantee_days+' d&iacute;as</b> desde la fecha en la que los recibi&oacute;.</p>');
						r.push('<p>Cualquier art&iacute;culo que reciba deber&aacute; estar en las mismas condiciones que lo recibi&oacute; y en el empaque original. Por favor conserve su recibo.</p>');
					} else {
						r.push(shop_details.guarantee_custom);
					}
				r.push('</div>');
			r.push('</div>');
		r.push('</div>');
		
		return r.join(' ');
	}
    
	function bsl(shop_details)
	{
		var r =[];
		
		r.push('<div id="vnts_ssl_wrp" class="vnts_tip_cts">');
			r.push("<div class='vntrow vntno_margin-lft'>");
				r.push("<div class='vntcol-xs-4 vntno_padding-rgt vntno_padding-lft'>");
					r.push("<div class='vnts_lft_sects'>");
						r.push('<img id="vnts_left_image" data-src="" src="https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_ssl_280_1024x1024.png?v=1" alt="" class="vntimg-responsive">');
						r.push('Verificado: '+ dddate);
					r.push('</div>');
				r.push('</div>');
				r.push("<div class='vntcol-xs-8'>");
					r.push('<div style="font-size:25px;font-weight:bold;margin-bottom:5px">Certificado SSL</div>');
					r.push('<p>'+shop_details.company_name+' utiliza un certificado <b>256-bit SSL</b> para establecer una conexi&oacute;n segura encriptada entre su computadora y sus servidores. Esta conexi&oacute;n protege sus datos sensitivos.</p>');
					r.push('<p>Todas las p&aacute;ginas, contenidos, tarjetas de cr&eacute;dito e informaci&oacute;n transaccional est&aacute;n protegidas por el mismo nivel de seguridad utilizada por los bancos.</p>');
					r.push('<p><a href="https://www.digicert.com/ssl-certificate.htm" target="_blank">Aprenda m&aacute;s acerca de SSL.</a></p>');
					r.push('<div><IMG style="height:50px" SRC="https://cdn.shopify.com/s/files/1/1100/4982/products/letsencrypt.png?v=1501556685"></div>');
				r.push('</div>');
			r.push('</div>');
		r.push('</div>');
		
		return r.join(' ');
	}
	
	function bzc(shop_details)
	{
		var r =[];
		
		r.push('<div id="vnts_contacts_wrp" class="vnts_tip_cts">');
			r.push("<div class='vntrow vntno_margin-lft'>");
				r.push("<div class='vntcol-xs-6 vntno_padding-rgt vntno_padding-lft'>");
					r.push("<div class='vnts_lft_sects'>");
						r.push('<img id="vnts_bzc_placeholder" data-src="" src="https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_contacts_280_1024x1024.png?v=1" alt="" class="vntimg-responsive">');
						r.push('<div style="position:absolute;top:0px;bottom:0;width:100%;" id="vnts_contacts_map" class="map" data-mapbox>');
						r.push('</div>');
					r.push('</div>');
				r.push('</div>');
				r.push("<div class='vntcol-xs-6' id='vnts_contacts_rgt_wrp'>");
					r.push('<div style="font-size:20px;font-weight:bold;margin-bottom:5px">'+shop_details.company_name+'</div>');
					r.push('<p>'+shop_details.addressline1+'</p>');
					if(typeof shop_details.addressline2!='undefined' && shop_details.addressline2!='')
						r.push('<p>'+shop_details.addressline2+'</p>');
					if(typeof shop_details.addressline3!='undefined' && shop_details.addressline3!='')	
						r.push('<p>'+shop_details.addressline3+'</p>');
					r.push('<p>');
					r.push(shop_details.city);
					if(typeof shop_details.region!='undefined' && shop_details.region!='')
						r.push(', '+shop_details.region);
					if(typeof shop_details.country!='undefined' && shop_details.country!='')
						r.push(', '+shop_details.country);
					r.push('</p>');
					
					if(typeof shop_details.email!='undefined' && shop_details.email!='')
						r.push('<p>'+shop_details.email+'</p>');
						
					if(typeof shop_details.phone!='undefined' && shop_details.phone!='')
						r.push('<p>'+shop_details.phone+'</p>');
				r.push('</div>');
			r.push('</div>');
		r.push('</div>');
		
		return r.join('');
	}
	
	function bzs(shop_details)
	{
		var r =[];
		
		r.push('<div id="vnts_shopify_wrp" class="vnts_tip_cts">');
			r.push("<div class='vntrow vntno_margin-lft'>");
				r.push("<div class='vntcol-xs-4 vntno_padding-rgt vntno_padding-lft'>");
					r.push("<div class='vnts_lft_sects'>");
						r.push('<img id="vnts_left_image" data-src="" src="https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_shopify_280_1024x1024.png?v=1" alt="" class="vntimg-responsive">');
						r.push('Verificado: '+ dddate);
					r.push('</div>');
				r.push('</div>');
				r.push("<div class='vntcol-xs-8'>");
					r.push('<div style="font-size:25px;font-weight:bold;margin-bottom:5px">Infraestructura Segura</div>');
					r.push('<p>'+shop_details.company_name+' est&aacute; hospedada por Shopify Inc. (NYSE:SHOP)</p>');
					r.push('<p>Apoyados en la plataforma l&iacute;der de comercio electr&oacute;nico que les permite ofrecer un 99.99% de disponibilidad y un monitoreo 24/7. Con una gran red de servidores ubicados alrededor del mundo, pueden ofrecerle una experiencia segura, robusta y alto desempe&ntilde;o de comercio electr&oacute;nico.</p>');
					r.push('<p><a href="https://www.shopify.com/?ref=developer-77e65bdbad7714d2" target="_blank">Aprenda c&oacute;mo iniciar su propia tienda con Shopify.</a></p>');
					r.push('<div><IMG SRC="https://cdn.shopify.com/s/files/1/1100/4982/products/shopify-secure-badge-light-shadow_1024x1024.png?v=1"></div>');
				r.push('</div>');
			r.push('</div>');
		r.push('</div>');
		
		return r.join(' ');
	}
	
	function bp(shop_details)
	{
		var r =[];
		
		r.push('<div id="vnts_pci_wrp" class="vnts_tip_cts">');
			r.push("<div class='vntrow vntno_margin-lft'>");
				r.push("<div class='vntcol-xs-4 vntno_padding-rgt vntno_padding-lft'>");
					r.push("<div class='vnts_lft_sects'>");
						r.push('<img id="vnts_left_image" data-src="" src="https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_pci_280_1024x1024.png?v=1" alt="" class="vntimg-responsive">');
						r.push('<div>V&aacute;lido: Until Aug 31, 2020</div>');
						r.push('Verificado: '+ dddate);
					r.push('</div>');
				r.push('</div>');
				r.push("<div class='vntcol-xs-8'>");
					r.push('<div style="font-size:25px;font-weight:bold;margin-bottom:5px">Cumplimiento de PCI</div>');
					r.push('<p>'+shop_details.company_name+' est&aacute; en cumplimiento con el certificado Nivel 1 de PCI DSS, el m&aacute;s alto nivel de certificaci&oacute;n de seguridad.</p>');
					r.push("<p>Esta certificaci&oacute;n significa su cumplimiento con los est&aacute;ndares de pol&iacute;ticas, tecnolog&iacute;as y procesos vigentes de seguridad que protegen sus sistemas de pago de fugas y robo de datos del due&ntilde;o de la tarjeta.</p>");
					r.push('<p><a href="https://www.pcicomplianceguide.org/pci-faqs-2/#1" target="_blank">Aprenda m&aacute;s acerca de PCI.</a></p>');
				r.push('</div>');
			r.push('</div>');
		r.push('</div>');
		
		return r.join(' ');
	}
	
		
	function pli(shop_details)
	{
		var i1 = new Image();i1.src = 'https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_pci_280_1024x1024.png?v=1';
		var i2 = new Image();i2.src = 'https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_shopify_280_1024x1024.png?v=1';
		var i3 = new Image();i3.src = 'https://cdn.shopify.com/s/files/1/1100/4982/products/shopify-secure-badge-light-shadow_1024x1024.png?v=1';
		var i4 = new Image();i4.src = 'https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_ssl_280_1024x1024.png?v=1';
		var i5 = new Image();i5.src = 'https://cdn.shopify.com/s/files/1/1100/4982/products/digicert_seal_1024x1024.png?v=1';
		var i6 = new Image();i6.src = 'https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_contacts_280_1024x1024.png?v=1';
		
		if(shop_details.guarantee_enabled=='true')
		{
			var i7 = new Image();i7.src = 'https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_g'+shop_details.guarantee_days+'_280_1024x1024.png?v=3';
		}
	}
	
   	function h(shop_settings) {
        if (window.vntrust_loaded) {
            return;
        }
        window.vntrust_loaded = true;
        var tip_pos_lookup = {};
        tip_pos_lookup['bottom_right'] = {'my':'bottom right','at':'top center','position':'top','tip_css':'position:fixed !important;bottom:0px !important;right:','wrp_css':'border-top-left-radius:3px !important;'};
        tip_pos_lookup['bottom_center'] = {'my':'bottom center','at':'top center','position':'top','tip_css':'position:relative !important;display: inline-block;text-align:center !important;','wrp_css':'width:100% !important;margin:0px auto !important:text-align:center;'};
        tip_pos_lookup['bottom_left'] = {'my':'bottom left','at':'top left','position':'top','tip_css':'position:fixed !important;bottom:0px !important;left:','wrp_css':'border-top-right-radius:3px !important;'};
        tip_pos_lookup['top_right'] = {'my':'top right','at':'bottom center','position':'bottom','tip_css':'position:fixed !important;top:0px !important;right:','wrp_css':'border-bottom-left-radius:3px !important;'};
        tip_pos_lookup['top_center'] = {'my':'top center','at':'bottom center','position':'bottom','tip_css':'position:relative !important;display: inline-block;text-align:center;','wrp_css':'width:100% !important;margin:0px auto !important:text-align:center;'};
        tip_pos_lookup['top_left'] = {'my':'top left','at':'bottom center','position':'bottom','tip_css':'position:fixed !important;top:0px !important;left:','wrp_css':'border-bottom-right-radius:3px !important;'};
        
        var vnsel_pos = shop_settings.display_position;
                
        var baseZIndex = 2147483646;
        var vbs = 43;
        var tc = 0;
        if(shop_settings.pci_enabled=='true')
        	tc++;
		if(shop_settings.ssl_enabled=='true')
			tc++;
		if(shop_settings.shopify_enabled=='true')
			tc++;
		if(shop_settings.guarantee_enabled=='true')
			tc++;
		if(shop_settings.contacts_enabled=='true')
			tc++;
		if(shop_settings.reviews_enabled=='true' && shop_settings.subscription_type!='starter')
			tc++;
		if(shop_settings.social_enabled=='true' && (shop_settings.subscription_type=='silver' || shop_settings.subscription_type=='gold'))
			tc++;
			
		if(tc==0)
			return false;
			
		var ewidths = 0;
			
		if(vnsel_pos!='top_center' && vnsel_pos!='bottom_center' && vnsel_pos!='custom')
		{
			var vheight = $(window).height();
			var vwidth = $(window).width();
			try
			{
				if(vnsel_pos=='bottom_right')
		        	var elemCheck = document.elementFromPoint((vwidth-20), (vheight-20));
		        else if(vnsel_pos=='bottom_left')
		        	var elemCheck = document.elementFromPoint(20, (vheight-20));
				else if(vnsel_pos=='top_right')
					var elemCheck = document.elementFromPoint((vwidth-20), 20);
				else if(vnsel_pos=='top_left')
					var elemCheck = document.elementFromPoint(20, 20);
				
				if(typeof elemCheck!='null' && typeof elemCheck!='undefined')
				{
					ewidths = $(elemCheck).width();
					if(ewidths>100)
						ewidths = 0;
				}
			}
			catch(e)
			{}
		}


        var bgw = 40 + (vbs * (tc - 1));
        var hpos = 0 + ewidths;
        var bgc = (typeof shop_settings.bgcolor!='undefined' && shop_settings.bgcolor!='') ? shop_settings.bgcolor : 'rgba(255,255,255,0.7)';
        var udi = '1'; //Date.now()
        if(tc>1)
        {
        	hpos = hpos + 3;
        	bgw = bgw + 6;
        }
        var bgwt = bgw+'px';
        
        var x = 0;
        if (parseInt(cookieExists("vntrust_session")) == 1) {
            x = 1
        } else {
            createCookie("vntrust_session", 1, 5)
        }
        var vntbs = document.createElement("div");
        vntbs.id = "vntbs-wrp-el";
        jQuery(vntbs).addClass("vntbs-wrp-el");
        vntbs.style.cssText = "color:#333333 !important;clear:both;font-size:0px";
        
        var y;
        if (!m()) {
            y = document.createElement("div");
            jQuery(y).addClass("vntrust-wrp-el");
            y.style.cssText = u() + "z-index:"+baseZIndex+";width:"+bgwt+" !important;height:40px !important;background:"+bgc+" !important;"+tip_pos_lookup[vnsel_pos]['wrp_css']+tip_pos_lookup[vnsel_pos]['tip_css']+ewidths+'px';
        }
        vntbs.appendChild(y);
        
        	        if(vnsel_pos=='top_center')
	        	document.body.insertBefore(vntbs, document.body.firstChild);
	        else
	        	document.body.appendChild(vntbs);
	        	
			if(vnsel_pos=='bottom_center' || vnsel_pos=='top_center')
				baseBody = y;
			else
				baseBody = vntbs;
        		baseZIndex++;

				
		if(shop_settings.pci_enabled=='true')
		{
	        //*********** PCI SECTION ********************
	        var zpc = document.createElement("a");
	        jQuery(zpc).addClass("vntrust-el");
	        zpc.id = "vntrust-pci";
	        zpc.innerHTML = '<img class="needsfocus" src="https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_pci_1024x1024.png?v='+udi+'" width="40" height="40" style="' + u() + 'width:40px !important;height:40px !important;">';
	        zpc.style.cssText = u() + "height:40px !important;width:40px;overflow:hidden;"+tip_pos_lookup[vnsel_pos]['tip_css']+hpos+"px;z-index:"+baseZIndex+" !important;cursor:pointer !important;";
	        zpc.setAttribute('tabindex','0');
	        zpc.setAttribute('role','button');
	        zpc.setAttribute('data-toggle','popover');
	        zpc.oncontextmenu = function() {
	            return false
	        };
	        baseBody.appendChild(zpc);
	        hpos = hpos + vbs;
		    $('#'+zpc.id).popover({
		    	content: bp(shop_settings),
		    	container : '#vntbs-wrp-el',
		    	html : true,
		    	placement : tip_pos_lookup[vnsel_pos]['position'],
		    	trigger : 'hover focus',
		    	viewport : 'body'
		    });
	        //*********** PCI SECTION ********************
		}
        
		if(shop_settings.shopify_enabled=='true')
		{
	        //*********** SHOPIFY SECTION ****************
	        var zs = document.createElement("a");
	        jQuery(zs).addClass("vntrust-el");
	        zs.id = "vntrust-shopify";
	        zs.innerHTML = '<img class="needsfocus" src="https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_shopify_1024x1024.png?v='+udi+'" width="40" height="40" style="' + u() + 'width:40px !important;height:40px !important;">';
	        zs.style.cssText = u() + "height:40px !important;width:40px;overflow:hidden;"+tip_pos_lookup[vnsel_pos]['tip_css']+hpos+"px;z-index:"+baseZIndex+" !important;cursor:pointer !important;";
	        zs.setAttribute('tabindex','0');
	        zs.setAttribute('role','button');
	        zs.setAttribute('data-toggle','popover');
	        zs.oncontextmenu = function() {
	            return false
	        };
	        baseBody.appendChild(zs);
	        hpos = hpos + vbs;
		    $('#'+zs.id).popover({
		    	content: bzs(shop_settings),
		    	container : '#vntbs-wrp-el',
		    	html : true,
		    	placement : tip_pos_lookup[vnsel_pos]['position'],
		    	trigger : 'hover focus',
		    	viewport : 'body'
		    });
	        //*********** SHOPIFY SECTION ****************
		}
        
		if(shop_settings.guarantee_enabled=='true')
		{
	        //*********** GUARANTEE SECTION ********************
	        var zg = document.createElement("a");
	        jQuery(zg).addClass("vntrust-el");
	        zg.id = "vntrust-guarantee";
	        zg.innerHTML = '<img class="needsfocus" src="https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_g'+shop_settings.guarantee_days+'_1024x1024.png?v='+udi+'" width="40" height="40" style="' + u() + 'width:40px !important;height:40px !important;">';
	        zg.style.cssText = u() + "height:40px !important;width:40px;overflow:hidden;"+tip_pos_lookup[vnsel_pos]['tip_css']+hpos+"px;z-index:"+baseZIndex+" !important;cursor:pointer !important;";
	        zg.setAttribute('tabindex','0');
	        zg.setAttribute('role','button');
	        zg.setAttribute('data-toggle','popover');
	        zg.oncontextmenu = function() {
	            return false
	        };
	        baseBody.appendChild(zg);
	        hpos = hpos + vbs;
		    $('#'+zg.id).popover({
		    	content: bzg(shop_settings),
		    	html : true,
		    	placement : tip_pos_lookup[vnsel_pos]['position'],
		    	trigger : 'hover focus',
		    	viewport : 'body'
		    });
	        //*********** GUARANTEE SECTION ********************
		}

		if(shop_settings.ssl_enabled=='true')
		{
	        //*********** SSL SECTION ********************
	        var zsl = document.createElement("a");
	        jQuery(zsl).addClass("vntrust-el");
	        zsl.id = "vntrust-ssl";
	        zsl.innerHTML = '<img class="needsfocus" src="https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_ssl_1024x1024.png?v='+udi+'" width="40" height="40" style="' + u() + 'width:40px !important;height:40px !important;">';
	        zsl.style.cssText = u() + "height:40px !important;width:40px;overflow:hidden;"+tip_pos_lookup[vnsel_pos]['tip_css']+hpos+"px;z-index:"+baseZIndex+" !important;cursor:pointer !important;";
	        zsl.setAttribute('tabindex','0');
	        zsl.setAttribute('role','button');
	        zsl.setAttribute('data-toggle','popover');
	        zsl.oncontextmenu = function() {
	            return false
	        };
	        baseBody.appendChild(zsl);
	        hpos = hpos + vbs;
		    $('#'+zsl.id).popover({
		    	content: bsl(shop_settings),
		    	html : true,
		    	placement : tip_pos_lookup[vnsel_pos]['position'],
		    	trigger : 'hover focus',
		    	viewport : 'body'
		    });
	        //*********** SSL SECTION ********************
		}
        
		if(shop_settings.contacts_enabled=='true')
		{
			//*********** CONTACT SECTION ****************
	        var z = document.createElement("a");
	        jQuery(z).addClass("vntrust-el");
	        z.id = "vntrust-contact";
	        z.innerHTML = '<img class="needsfocus" src="https://cdn.shopify.com/s/files/1/1100/4982/products/vnts_map_1024x1024.png?v='+udi+'" width="40" height="40" style="' + u() + 'width:40px !important;height:40px !important;">';
	        z.style.cssText = u() + "height:40px !important;width:40px;overflow:hidden;"+tip_pos_lookup[vnsel_pos]['tip_css']+hpos+"px;z-index:"+baseZIndex+" !important;cursor:pointer !important;";
	        z.setAttribute('tabindex','0');
	        z.setAttribute('role','button');
	        z.setAttribute('data-toggle','popover');
	        z.oncontextmenu = function() {
	            return false
	        };
	        baseBody.appendChild(z);
	        hpos = hpos + vbs;
		    $('#'+z.id).popover({
		    	content: bzc(shop_settings),
		    	html : true,
		    	placement : tip_pos_lookup[vnsel_pos]['position'],
		    	trigger : 'hover focus',
		    	viewport : 'body'
		    });
			$('#'+z.id).on('inserted.bs.popover', function () {
				var vrc = $('#vnts_contacts_rgt_wrp').height();
				$('#vnts_contacts_map').css('height',vrc+'px');
				
				L.mapbox.accessToken = maid;
				var map = L.mapbox.map('vnts_contacts_map', 'mapbox.streets')
				    .setView([shop_settings.lat, shop_settings.lng], 12);
	
				var marker = L.mapbox.featureLayer({
				    // this feature is in the GeoJSON format: see geojson.org
				    // for the full specification
				    type: 'Feature',
				    geometry: {
				        type: 'Point',
				        // coordinates here are in longitude, latitude order because
				        // x, y is the standard for GeoJSON and many formats
				        coordinates: [
				          shop_settings.lng,
				          shop_settings.lat
				        ]
				    },
				    properties: {
				        title: shop_settings.company_name,
				        description: shop_settings.city + ', ' + shop_settings.region,
				        'marker-size': 'large',
				        'marker-color': '#FF0000',
				        'marker-symbol': 'star'
				    }
				}).addTo(map);
				marker.eachLayer(function(m) {
				  m.openPopup();
				});
				$('#vnts_bzc_placeholder').height($('#vnts_contacts_map').height());
			});
	        //*********** CONTACT SECTION ****************
		}
		
		
		
				
		
		
		if(p())
		{
			$('.vntrust-el').css('cursor', 'pointer');
			$('body').on("touchstart", function(e){
				$(".vntrust-el").each(function () {
					if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
						$(this).popover('hide');
					}////end if
				});
			});
		}
       
        //document.body.appendChild(w);
        b();
    }
    
    if(p() && typeof shop_settings.mobile_enabled!='undefined' && shop_settings.mobile_enabled=='false')
    	return false;
    
	pli(shop_settings);
    h(shop_settings);
    loadCSS('https://cdn.shopify.com/s/files/1/1100/4982/t/1/assets/vnts.css?'+Date.now(), function(){});
    if(shop_settings.contacts_enabled=='true')
    {
		loadScript('https://api.mapbox.com/mapbox.js/v2.3.0/mapbox.js', function(){});
    	loadCSS('https://api.mapbox.com/mapbox.js/v2.2.2/mapbox.css', function(){});
    }
    
    if(shop_settings.reviews_enabled=='true')
    {
    	loadScript('https://cdn.shopify.com/s/files/1/1100/4982/t/1/assets/vnts-rating.js', function(){});
    }
    
    //d();
    //k();
    	
};
if ((typeof jQuery === 'undefined') || (parseInt(jQuery.fn.jquery) === 3) || (parseInt(jQuery.fn.jquery) === 1 && parseFloat(jQuery.fn.jquery.replace(/^1\./,'')) < 9.1)) {
  loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js', function(){
  	var vnBootstrap_enabled = (typeof jQuery.fn.popover == 'function');
  	if(false && vnBootstrap_enabled)
  	{
		loadCSS('https://cdn.shopify.com/s/files/1/1100/4982/t/1/assets/vntsb.min.css?8', function(){
	    	jQuery1113 = jQuery.noConflict(true);
	    	vnTRUSTApp(jQuery);
		});
  	}
  	else
  	{
		loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js', function(){
			loadCSS('https://cdn.shopify.com/s/files/1/1100/4982/t/1/assets/vntsb.min.css?8', function(){
	    		jQuery1113 = jQuery.noConflict(true);
	    		vnTRUSTApp(jQuery1113);
			});
		});
  	}
	});
} else {
	var vnBootstrap_enabled = (typeof jQuery.fn.popover == 'function');
	if(vnBootstrap_enabled)
	{
		loadCSS('https://cdn.shopify.com/s/files/1/1100/4982/t/1/assets/vntsb.min.css?8', function(){
			vnTRUSTApp(jQuery);
		});
	}
	else
	{
		loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js', function(){
			loadCSS('https://cdn.shopify.com/s/files/1/1100/4982/t/1/assets/vntsb.min.css?8', function(){
			//loadCSS('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css', function(){
				vnTRUSTApp(jQuery);
			});
		});
	}
}


})();
