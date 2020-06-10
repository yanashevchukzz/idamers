

//Some variable sets
var whatsappLeadjQuery_debug = 1;
var wb_serverpath = "https://www.adevole.com/products/whatsapp-leads/";
var init = 0;
var settingsJson;
var pageURL = window.location.href;
var shopURL = extractDomainMessenger(pageURL);
if (Shopify != null && Shopify.shop !=null && Shopify.shop != "") {
    shopURL = Shopify.shop;
}
var originalTitle = "";
var originalIcon = "";
var whatsappCreated = false;
if(typeof($whatsappLeadjQuery) == 'undefined' ){
    if (typeof(jQuery) == 'undefined') {
        (function() {
            // Load jquery script if doesn't exist
            var script = document.createElement("SCRIPT");
            script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
            script.type = 'text/javascript';
            script.onload = function() {
                $whatsappLeadjQuery = window.jQuery;  // $whatsappLeadjQuery is our jQuery
                whatsappLeadInit();
                if (getCookie("whatsapp_setting") != "") {
                    createWhatsappButton(JSON.parse(getCookie("whatsapp_setting")));
                    createWhatsappOptin(JSON.parse(getCookie("whatsapp_setting")));
                    createWhatsappShareButton(JSON.parse(getCookie("whatsapp_setting")));
                }

            };
            document.getElementsByTagName("head")[0].appendChild(script);
        })();
    }else{
        $whatsappLeadjQuery = window.jQuery;  // $whatsappLeadjQuery is our jQuery
        whatsappLeadInit();
    }
}

function whatsappLeadInit(){
    if (shopURL == "win-kids.myshopify.com") {
        $whatsappLeadjQuery("form[action='/cart/add']").hide();
    } 
   	if (shopURL == "stevia-colombia.myshopify.com") {
        return;
    }   
    if (init==1) {
        return;
    }else{
        init=1;
    }

     $whatsappLeadjQuery.ajax({
        url:  wb_serverpath + 'ajax.php',
        dataType: "json",
        type: 'POST',
        data: {
            'domain': shopURL
        },
        success: function (settings) {
            settingsJson = settings;
            if (Shopify.shop != "kj-style-boutique.myshopify.com") {
                setCookie("whatsapp_setting",JSON.stringify(settingsJson),1);
            }

            createWhatsappOptin(settings);
            createWhatsappShareButton(settings);
            if (settings != null && settings.number != "") {
                createWhatsappButton(settings);
            }

        }
    });
}
var low_default_text = "";    
var low_numbers = ""; 
var low_buttons = "";

function showAllLow() {
    $whatsappLeadjQuery(".all-numbers").toggle(), $whatsappLeadjQuery("#whatsapp-lead").find("span").toggle()
}

function shareWhatsapp(){

}
function createWhatsappShareButton(settings){
    if (settings.share_button_text != "" && settings.share_button_text != null && $(window).width() < 760 && top.location.href.indexOf("/products") > 0) {
        if (settings.share_message.indexOf("{link}") > 0) {
            var message = "whatsapp://send?text="+settings.share_message.replace("{link}",top.location.href);
        }else{
            var message = "whatsapp://send?text="+settings.share_message+" "+top.location.href;
        }
        whatsappShareButton = "<a href='"+message+"' class='whatsappShareButtonBox' onclick='shareWhatsapp()'><img src='https://www.adevole.com/products/whatsapp-leads/assets/whatsapp-icon-64.png' style='width: 25px; margin-bottom: -5px;'><span style='vertical-align: middle;padding: 8px; color: white !important;'>"+ settings.share_button_text +"</span></a>";
        whatsappShareButtonCSS = "<style>.whatsappShareButtonBox,.whatsappShareButtonBox:hover, .whatsappShareButtonBox:focus,.whatsappShareButtonBox:visited {display: block; z-index: 9999; text-decoration:none  !important; padding: 5px; position: fixed; right: -10px; top: 50%; transform: rotate(-90deg);background: #25D366; color: white !important;     border-radius: 5px 4px 0px 0px;}</style>";
        
        $whatsappLeadjQuery("body").append(whatsappShareButtonCSS);
        $whatsappLeadjQuery("body").append(whatsappShareButton);
        var width = $('.whatsappShareButtonBox').width();
        if (width < $('.whatsappShareButtonBox').height()) {
            width = $('.whatsappShareButtonBox').height();
        }
        var calcRight = 0-width/2+10;
        $(".whatsappShareButtonBox").css("right",calcRight-100)
        $(".whatsappShareButtonBox").animate({
            "right":calcRight
        },500);
    }
}

function createWhatsappOptin(settings){

    setTimeout(function(){
        if (settings.optin == 1) {
            setupWhatsappOptin();
        }
    },2000);
}
function createWhatsappButton(settings){
	$ = jQuery;
    if (settings.store_id == '3565027441') {
        low_default_text = "خدمات العملاء";
        low_numbers = ["966548321992","966501208767"];
        low_buttons = ["خدمات العملاء 1","خدمات العملاء 2"];
        var t = document.createElement("a");
        t.setAttribute("class", "whatsapp-lead-box"), t.setAttribute("id", "whatsapp-lead"), t.setAttribute("style", "font-size: 18px; text-decoration: none; z-index: 2147483640 !important; position: fixed; border-radius: 5px; bottom: 20px;left: 25px;padding: 5px;background: #25D366 ;color: white; cursor: pointer; box-shadow: 2px 2px 6px #4d4d4d; "), $whatsappLeadjQuery("body").append(t), $whatsappLeadjQuery("#whatsapp-lead").html("<img src='https://www.adevole.com/products/whatsapp-leads/assets/whatsapp-icon-64.png' style='width: 32px; vertical-align: middle; '/><span style='text-decoration: none;'>" + low_default_text + " &nbsp;&nbsp;</span>"), $whatsappLeadjQuery("#whatsapp-lead").on("click", showAllLow), $whatsappLeadjQuery("body").append("<style>.whatsapp-shaking {-webkit-animation: shake 2s ease-in-out; -moz-animation: shake 2s ease-in-out; animation: shake 2s ease-in-out; }</style>"), $whatsappLeadjQuery("body").append("<style>@keyframes shake {   0% { transform: translate(1px, 1px) rotate(0deg); }  10% { transform: translate(-1px, -2px) rotate(-1deg); }  20% { transform: translate(-3px, 0px) rotate(1deg); }  30% { transform: translate(3px, 2px) rotate(0deg); }  40% { transform: translate(1px, -1px) rotate(1deg); }  50% { transform: translate(-1px, 2px) rotate(-1deg); }  60% { transform: translate(-3px, 1px) rotate(0deg); }  70% { transform: translate(3px, 1px) rotate(-1deg); }  80% { transform: translate(-1px, -1px) rotate(1deg); }  90% { transform: translate(1px, 2px) rotate(0deg); }  100% { transform: translate(1px, -2px) rotate(-1deg); }}</style>");
        for (var a = "", e = 0; e < low_numbers.length; e++) a += "<div><a class='whatsapp-lead-link' style='text-decoration:none;display: inline-block; margin: 10px 5px;text-decoration: none;border-radius: 5px;padding: 5px 20px 5px 10px;background: #25D366 ;color: white; cursor: pointer; box-shadow: 2px 2px 6px #4d4d4d;font-size: 18px; ' href='https://api.whatsapp.com/send?phone=" + low_numbers[e] + "'><img src='https://www.adevole.com/products/whatsapp-leads/assets/whatsapp-icon-64.png' style='width: 32px; vertical-align: middle;'/><span class>" + low_buttons[e] + "</span></a><div>";
        $whatsappLeadjQuery("body").append("<div class='all-numbers' style='display: none;position: fixed; z-index:2147483640;bottom: 60px; left: 20px;'>" + a + "</div>");
        whatsappCreated = true;
    }
    if (whatsappCreated) {
        return false;
    }
    whatsappCreated = true;
    var whatsappDiv = document.createElement("div");
    if (settings.hide_url == 1) {
        var message = settings.message;
    }else{
        var message = settings.message + " \r\n\r\n " + top.location.href;
    }    
    whatsappMessage = window.encodeURIComponent(message)
    //whatsappDiv.setAttribute("href", "https://api.whatsapp.com/send?phone="+settings.number+"&text="+whatsappMessage);
    whatsappDiv.setAttribute("class", "whatsapp-lead-box");
    whatsappDiv.setAttribute("id", "whatsapp-lead");
    whatsappDiv.setAttribute("style","z-index: 2147483640 !important; position: fixed; border-radius: 5px; bottom: 30px;left: 46px;padding: 5px 20px 5px 10px;background: #25D366 ;color: white; cursor: pointer; box-shadow: 2px 2px 6px #4d4d4d; "+settings.custom_css);
    if($whatsappLeadjQuery("#whatsapp-placement-box").length > 0){
        $whatsappLeadjQuery("#whatsapp-placement-box").append(whatsappDiv);
    }else{
        $whatsappLeadjQuery("body").append(whatsappDiv);
    }
    $whatsappLeadjQuery("#whatsapp-lead").html("<a id='whatsapp-lead-link' href='#' style='text-decoration: none; display: block;'><img src='https://www.adevole.com/products/whatsapp-leads/assets/whatsapp-icon-64.png' style='width: 32px; vertical-align: middle;' id='pwa-whatsapp-icon'/><span style='color: white !important;'>"+settings.button_text+"</span></a>");
    $whatsappLeadjQuery("#whatsapp-lead").append("<a id='whatsapp-promo-link' href='https://apps.shopify.com/leads-on-whatsapp' target='_blank' style='position: absolute;font-size: 10px;color:  #afafaf;top: 42px;left: 3px;'></a>");
    $whatsappLeadjQuery("#whatsapp-lead-link").attr("href", "https://api.whatsapp.com/send?phone="+settings.number+"&text="+whatsappMessage);
    $whatsappLeadjQuery("#whatsapp-lead-link").attr("target", "_blank");
    $whatsappLeadjQuery("body").append("<style>.whatsapp-shaking {-webkit-animation: shake 2s ease-in-out; -moz-animation: shake 2s ease-in-out; animation: shake 2s ease-in-out; }</style>");
    $whatsappLeadjQuery("body").append("<style>@keyframes shake {   0% { transform: translate(1px, 1px) rotate(0deg); }  10% { transform: translate(-1px, -2px) rotate(-1deg); }  20% { transform: translate(-3px, 0px) rotate(1deg); }  30% { transform: translate(3px, 2px) rotate(0deg); }  40% { transform: translate(1px, -1px) rotate(1deg); }  50% { transform: translate(-1px, 2px) rotate(-1deg); }  60% { transform: translate(-3px, 1px) rotate(0deg); }  70% { transform: translate(3px, 1px) rotate(-1deg); }  80% { transform: translate(-1px, -1px) rotate(1deg); }  90% { transform: translate(1px, 2px) rotate(0deg); }  100% { transform: translate(1px, -2px) rotate(-1deg); }}</style>");
    if (settings.ios == 1) {
        $whatsappLeadjQuery("#whatsapp-lead").attr("href", "sms://"+settings.apple_id);
        $whatsappLeadjQuery("#whatsapp-lead").find("img").attr("src", "https://www.adevole.com/products/whatsapp-leads/assets/imessage.png");
        $whatsappLeadjQuery("#whatsapp-lead").css("background","white")
        $whatsappLeadjQuery("#whatsapp-lead").find("span").css("color","#37a8fc")
        $whatsappLeadjQuery("#whatsapp-lead").find("span").html(" "+$whatsappLeadjQuery("#whatsapp-lead").find("span").html()+"");
    }
    if (settings.mobile_only == 1 && $whatsappLeadjQuery(window).width() > 760) {
        $whatsappLeadjQuery("#whatsapp-lead").hide();
    }else{
        /*$whatsappLeadjQuery(window).focus(function() {
           document.title = originalTitle;
           $whatsappLeadjQuery("link[rel*='icon']").attr("href", originalIcon);
        });

        $whatsappLeadjQuery(window).blur(function() {
           document.title = settings.button_text + " | " +originalTitle;
           $whatsappLeadjQuery("link[rel*='icon']").attr("href", "https://web.whatsapp.com/img/favicon/1x/favicon.png");
        });*/
    }
    if ($whatsappLeadjQuery(window).width() < 760) {
        $whatsappLeadjQuery("#whatsapp-lead").removeAttr("target");
        setTimeout(function(){ 
            if (settings.animate == "1") {
                $whatsappLeadjQuery("#whatsapp-lead").animate({
                    left: "10",
                  }, 500, function() {
                    // Animation complete.
                });
            }
            
        },100);
        if (settings.minimize == "1") {
            var minimizeDelay =  7000;
            if (shopURL == "onlinemarkat-com.myshopify.com") {
                $whatsappLeadjQuery("#whatsapp-lead").find("span").hide();
                $whatsappLeadjQuery("#whatsapp-promo-link").hide();
                $whatsappLeadjQuery("#whatsapp-lead").css({"borderRadius":"50%","padding":"8px"});
                minimizeDelay = 50;
            }
            if (shopURL == "xzinshop-ksa.myshopify.com") {
                $whatsappLeadjQuery("#whatsapp-lead").find("span").hide();
                $whatsappLeadjQuery("#whatsapp-promo-link").hide();
                $whatsappLeadjQuery("#whatsapp-lead").css({"borderRadius":"50%","padding":"8px"});
                minimizeDelay = 50;
            }
            setTimeout(function(){  
                $whatsappLeadjQuery("#whatsapp-lead").find("span").hide();
                $whatsappLeadjQuery("#whatsapp-lead").animate({
                    borderRadius: "50%",
                    padding: "8px"
                  },1000, function() {
                    // Animation complete.
                });
                $whatsappLeadjQuery("#whatsapp-promo-link").hide();
            },minimizeDelay);
        }
        if (settings.animate == "1") {
            setInterval(function(){
                $whatsappLeadjQuery("#whatsapp-lead").toggleClass("whatsapp-shaking")
                $whatsappLeadjQuery("#pwa-whatsapp-icon").attr("src","https://www.adevole.com/products/whatsapp-leads/assets/whatsapp-icon-64-red.png");
            },12000)
        }
    }else{
        if (settings.animate == "1") {
            setTimeout(function(){ 
                $whatsappLeadjQuery("#whatsapp-lead").animate({
                    left: "50",
                  }, 500, function() {
                    // Animation complete.
                });
            },200);
        }

    }

    $whatsappLeadjQuery("#whatsapp-lead").on("click",function(){
        saveWhatsappClick(settings.button_text);
    });
    originalTitle = document.title;
    originalIcon = $whatsappLeadjQuery("link[rel*='icon']").attr("href");
    
    if (settings.html != "") {
        $whatsappLeadjQuery(settings.parent_div).append(settings.html);
        $whatsappLeadjQuery("#low-copy").html($whatsappLeadjQuery("#whatsapp-lead").find("span").html());
        $whatsappLeadjQuery("#low-copy").attr("href",$whatsappLeadjQuery("#whatsapp-lead-link").attr("href"));
    }

    if (shopURL == "dr-koala-natural-house.myshopify.com" && $whatsappLeadjQuery(window).width() < 760) {
        $whatsappLeadjQuery("#whatsapp-lead").find("img").css("width","42px");
    }

    if (shopURL == "win-kids.myshopify.com") {
        if (top.location.href.indexOf("products/") > 0) {
            $whatsappLeadjQuery("#whatsapp-lead").addClass("bottom-whatsapp");
            $whatsappLeadjQuery("form[action='/cart/add']").after("<div id='winkidstnb-whatsapp'></div>");
            $whatsappLeadjQuery("#winkidstnb-whatsapp").append($whatsappLeadjQuery("#whatsapp-lead").clone());
            $whatsappLeadjQuery("#winkidstnb-whatsapp").find("#whatsapp-lead").removeClass("bottom-whatsapp");
            $whatsappLeadjQuery("#winkidstnb-whatsapp").find("#whatsapp-lead").css({"position":"static","margin": "20px 0px","max-width": "315px", "padding": "10px", "position": "static"});
            $whatsappLeadjQuery(".bottom-whatsapp").css({"width":"100%","margin": "0px","padding": "15px 0px","bottom": "0px", "left": "0px", "text-align": "center", "border-radius": "0px"});

        }else{
            $whatsappLeadjQuery("#whatsapp-lead").hide();
        }
    }    
    if (shopURL=="babyhoki.myshopify.com") {
        if (top.location.href.indexOf("/car") > 0) {
        }else{
            $whatsappLeadjQuery("#whatsapp-lead").hide();
        }
    }
    if (Shopify.shop == "ghazzali.myshopify.com") {
    	if (top.location.href.indexOf("products/") > 0) {
	        settings.animate == 0;
	        $whatsappLeadjQuery(".whatsapp-lead-box").addClass("bottom-whatsapp");
	        $whatsappLeadjQuery(".product-single__add-to-cart").append($whatsappLeadjQuery(".whatsapp-lead-box"));
	        $whatsappLeadjQuery("#winkidstnb-whatsapp").find("#whatsapp-lead").removeClass("bottom-whatsapp");
	        //$whatsappLeadjQuery(".bottom-whatsapp").remove();
	        $whatsappLeadjQuery(".product-single__add-to-cart").find(".whatsapp-lead-box").css({"position":"static","margin-top":"20px","width":"100%"});  
    	}else{
    		$whatsappLeadjQuery(".whatsapp-lead-box").remove();
    	}
    }
    if (Shopify.shop == "toko4joy.myshopify.com") {
        $(".shopify-payment-button__button").after($(".whatsapp-lead-box").clone());
        $(".shopify-payment-button__button").parent().find(".whatsapp-lead-box").css({"position":"static","margin-top":"10px","box-shadow":"0px"})
    }
    if (Shopify.shop == "duddibeauty.myshopify.com") {
        if (top.location.href.indexOf("bee-you") < 0) {
            $(".whatsapp-lead-box").remove();
        }
    }
    if(Shopify.shop == "juicychemistry.myshopify.com" && (top.location.href.indexOf("thank") > 0 || top.location.href.indexOf("orders") > 0)){
        $(".whatsapp-lead-box").hide();
    }

    if(Shopify.shop == "onlinemarkat-com.myshopify.com"){
        var whatsappClone = $(".whatsapp-lead-box").clone();
        $(".whatsapp-lead-box").remove();
        $("#AddToCart-product-template").after(whatsappClone.css({"position":"static","text-align":"center", "margin-top": "20px"})); 
    }if(Shopify.shop == "xzinshop-ksa.myshopify.com"){
        var whatsappClone = $(".whatsapp-lead-box").clone();
        $(".whatsapp-lead-box").remove();
        $(".shopify-payment-button").after(whatsappClone.css({"position":"static","text-align":"center", "margin-top": "20px"})); 
    }
    if(Shopify.shop == "aanswr-com.myshopify.com"){
        var whatsappClone = $(".whatsapp-lead-box").clone();
        $(".whatsapp-lead-box").remove();
        $(".add-to-cart-container").after(whatsappClone.css({"position":"static","text-align":"center", "margin-top": "20px"})); 
    }
    $("body").append("<style>"+settings.custom_css_class+"</style>");
}
var whatsappOptinTriggered = false;
 
function setupWhatsappOptin(){
    var optinHtml = '<div class="whatsapp-optin-box" style="display: none; padding: 5px;    text-align: center;">    <label><input type="checkbox" checked name="whatsapp-optin" style="vertical-align: middle;"><span style="    position: relative;"> Send order updates on Whatsapp</span></label></div>';
    $("form[action^='/cart']").append(optinHtml);
    if (Shopify.shop != "fusion-crystals.myshopify.com") {

        $("form[action^='/cart']").on("submit", function(){
            triggerWhatsappOptin(); 
        })
        $("form[action^='/cart']").find("button").on("click", function(){
            triggerWhatsappOptin(); 
        })
        $("form[action^='/cart/add']").find("button").on("click", function(){
            triggerWhatsappOptin(); 
        })
        $("#add-to-cart").on("click", function(){
            triggerWhatsappOptin(); 
        })
    }
    if (getCookie('askWhatsappNumber') != -1 && getCookie('askWhatsappNumber') != -2 && top.location.href.indexOf("/cart") > 0) {
        setTimeout(function(){
            triggerWhatsappOptin();
        },2000)
    }
}
function triggerWhatsappOptin(){
    if (getCookie('askWhatsappNumber') != -1 && whatsappOptinTriggered == false) {
        whatsappOptinTriggered  = true;
        setCookie("askWhatsappNumber","1",1);

        setTimeout(function(){
            showWhatsappOptinInputBox();
        },1000);
    }
}
function showWhatsappOptinInputBox(){
    var whatsappOptinTitle = "🚚 Get Order Updates & Offers on Whatsapp!";
    if (Shopify.shop == "japaorlando1.myshopify.com") {
        whatsappOptinTitle = "Receba uma cópia deste orçamento no seu WhatsApp!"
    }else if (Shopify.shop == "modamaniaitalia.myshopify.com") {
        whatsappOptinTitle = "Ricevi aggiornamenti e offerte sugli ordini su Whatsapp!";
    }else if (Shopify.shop == "mo-cosmetics.myshopify.com") {
        whatsappOptinTitle = "Recibe notificaciones de tu pedido y Ofertas Especiales en WhatsApp";
    }else if (Shopify.shop == "charme-do-detalhe.myshopify.com") {
        whatsappOptinTitle = "Receba notificações do seu pedido no WhatsApp";
    }else if (Shopify.shop == "dragon-brazil.myshopify.com") {
        whatsappOptinTitle = "Receba Atualizações de Pedidos & Ofertas no Whatsapp";
    }else if (Shopify.shop == "coegawear.myshopify.com") {
        whatsappOptinTitle = "Please enter your WhatsApp number for a free gift with today's order";
    }else if (top.location.href.indexOf(".br") > 0) {
        whatsappOptinTitle = "Recibe notificaciones de tu pedido y Ofertas Especiales en WhatsApp";
    }
    var optinInputHtml = '<div id="whatsapp-optin-input-box" style="position: fixed;width: 100%;height: auto;background: #fdfdfd;z-index: 2147483647;bottom: 0px;box-shadow: 1px 1px 9px 4px #4444444d;max-width: 550px;margin: 0 auto; left: 0px;"><p style="width: 100%;padding: 5px;margin: 0px;font-weight: bold;  margin-left: 12px;    font-family: calibri;">'+whatsappOptinTitle+'</p><span style="position: absolute;top: 6px;right: 7px;background: #FF5257;margin: 0px;color: #ffffffed;line-height: 5px;border-radius: 18px;width: 23px;height: 23px;padding: 6px 0px 0px 6px;font-size: 20px;cursor: pointer;    font-family: sans-serif;" id="whatsapp-optin-close">x</span><div style="display: flex;box-shadow: 1px 2px 10px 2px #cccccc9e;margin: 5px 15px 15px;"><input type="text" id="whatsapp-optin-input" placeholder="Whatsapp Number with Country Code." style="background: none; border: 0px;padding: 10px;margin: 0px;width: 100%; height: 50px; "><input id="whatsapp-optin-submit" type="button" value="✓" style="cursor: pointer; background: #1EB89F;color: white;font-weight: bold;font-size: 20px;border: none;min-width: 50px;margin: 0px; width: 50px;"></div></div>';
    $("#whatsapp-optin-input-box").remove();
    if ($("#whatsapp-optin-input-box").length == 0) {
        $("body").append(optinInputHtml);
    }
    $("#whatsapp-optin-input").focus();
    $("#whatsapp-optin-close").on("click",function(){
        $("#whatsapp-optin-input-box").hide();
        setCookie("askWhatsappNumber","-2",1);
    });
    $("#whatsapp-optin-submit").on("click",function(){
        var number = $("#whatsapp-optin-input").val();
        if (number.length > 6) {
            saveWhatsappNumber(number);
            setCookie("askWhatsappNumber","-1",1);
            $("#whatsapp-optin-input-box").hide();
            whatsappOptinTriggered = false;
        }
    });
    $.get("https://api.ipdata.co?api-key=test", function (response) {
        $("#whatsapp-optin-input").val("+"+response.calling_code);
    }, "jsonp");
}
function extractDomainMessenger(url) {
    var domain;
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    domain = domain.split(':')[0];
    return domain;
}

function saveWhatsappClick(button_text){
    $whatsappLeadjQuery.ajax({
        url:  wb_serverpath + 'save_clicks.php',
        type: 'POST',
        data: {
            'domain': shopURL,
            'button_text': button_text
        },
        success: function (settings) {
            console.log(settings);
        }
    });
}
function saveWhatsappNumber(number){
    $whatsappLeadjQuery.ajax({
        url:  wb_serverpath + 'save_number.php',
        type: 'POST',
        data: {
            'domain': shopURL,
            'number': number
        },
        success: function (settings) {
            console.log(settings);
        }
    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/*

*/