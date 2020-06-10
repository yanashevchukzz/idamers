function previewerInit(params) {
  document.addEventListener('DOMContentLoaded', function() {
    var modal = document.querySelector('[data-behavior="previewer_modal"]'),
        closeInited = undefined,
        productVariant = {},
        noImage = 'https://cdn.shopify.com/s/images/admin/no-image-compact.gif',
        productLinks = [],
        currentUrl = undefined,
        mobile = isMobile(),
        svgArrow = undefined,
        showingProductId = undefined;

    if(!params.enable || mobile && params.mobileView == 'disable') {
      return;
    } else setMobileView();

    if(window.location.pathname.match(/.*\/products\/.+/)) {
      return;
    }

    var linkSelector = 'a[href*="/products/"]:not(form a[href*="/products/"]):not(.related-products a[href*="/products/"]):not([href*=".JP"]):not([href*=".png"]):not([href*=".PNG"])';
    var imageSelector = 'img[src*="/products/"], img[src*="/no-image"], img[data-src*="/products/"], img[data-srcset*="/products/"]';

    findProducts();
    var linkSelector = 'form[action="/cart/add"] a[href*="/products/"]:not(.related-products a[href*="/products/"]):not([href*=".JP"]):not([href*=".png"]):not([href*=".PNG"])'
    var imageSelector = 'img[src*="/products/"], img[src*="/no-image"], img[data-src*="/products/"], img[data-srcset*="/products/"], .image';
    findProducts();

    function findProducts() {
      $.each($(linkSelector).has(imageSelector), function(i, el) {
        productLinks.push(el.href);
        el.parentNode.appendChild(quickViewBtnElement());
      });

      $.each($(linkSelector).parent().has(imageSelector), function(i, el) {
        if(!el.querySelector('.previewer-button')) {
          productLinks.push($(el).find(linkSelector)[0].href);
          el.appendChild(quickViewBtnElement());
        }
      });
    }

    function quickViewBtnElement() {
      var quickView = document.createElement("div");
      quickView.className = "previewer-button";
      quickView.innerHTML = '<a class="' + params.btnPosition + '" href="#">' + params.btnLabel + '</a>';
      quickView.addEventListener('click', previewClickHandler);
      return quickView
    }

    var styles = getComputedStyle(document.querySelector('[data-behavior="previewer_add_to_cart"]'));
    $('.previewer-button a').css({color: styles.color, backgroundColor: styles.backgroundColor});

    $(document).on('click', '[data-behavior="previewer_close_modal"]', function() {
      closeModal();
    });

    $(document).on('click', '.previewer_mobile-product[data-previewer="always"]', previewClickHandler);

    $(document).on('click', '[data-behavior="previewer_add_to_cart"]:not(.btn--secondary)', function(e) {
      $.ajax({
        url: '/cart/add.js',
        method: 'post',
        data: { quantity: document.querySelector('[data-behavior="previewer_quantity"] input').value, id: productVariant.id }
      }).always(function(response) {
        if(response.status == 200)
          if(params.checkoutRedirect == 'stay_on') {
            $(e.currentTarget).addClass('btn--secondary').text('Go to checkout');
          } else {
            window.location.pathname = '/cart';
          }
        else {
          $('[data-behavior="previewer_cart_error"]').text(JSON.parse(response.responseText).description);
          // Fail message, reload info
        }
      })
    });

    $(document).on('click', '[data-behavior="previewer_add_to_cart"].btn--secondary', function(e) {
      window.location.pathname = '/cart';
    });

    $('.previewer-loader').css('color', getComputedStyle(document.querySelector('[data-behavior="previewer_add_to_cart"]')).backgroundColor)

    $(document).on('click', '[data-behavior="previewer_prev_product"]:not(.disabled)', function(e) {
      var i = productLinks.indexOf(currentUrl);
      if(i > 0) {
        currentUrl = productLinks[i - 1];
        clearData();
        showProductCart();
      }
    });

    $(document).on('click', '[data-behavior="previewer_next_product"]:not(.disabled)', function(e) {
      var i = productLinks.indexOf(currentUrl);
      if(i != -1 && i < productLinks.length) {
        currentUrl = productLinks[i + 1];
        clearData();
        showProductCart();
      }
    });

    setModalStyles()

    function previewClickHandler(e) {
      e.preventDefault();
      var target = $(e.currentTarget).hasClass('previewer_mobile-product') ? e.currentTarget : e.currentTarget.parentElement
      currentUrl = target.querySelector('a').href;
      showProductCart();
    }

    function showProductCart() {
      if(showingProductId == currentUrl) {
        return
      }
      showingProductId = currentUrl
      modal.style.display = 'block';
      $('.previewer-loader').show();
      $('.previewer_modal-body').hide();
      setModalStyles();
      $('[data-behavior="previewer_modal"] .modal-body').hide();
      $('[data-behavior="previewer_product_type"]').hide();
      function fillCart () {
        $('.previewer-loader').hide();
        $('.previewer_modal-body').show();
        $('[data-behavior="previewer_modal"] .modal-body').show();
        var response = JSON.parse(this.responseText);
        document.querySelector('[data-behavior="previewer_product_title"]').textContent = response.title;
        assignPrice(response);
        var mainImage = response.variants[0].featured_image ? response.variants[0].featured_image.src : response.featured_image
        document.querySelector('[data-behavior="previewer_product_image"]').src = imageUrl(mainImage, 'large');
        document.querySelector('[data-behavior="previewer_product_image"]').dataset.zoom = mainImage;
        var description = response.description, tmpDescDiv = document.createElement('div');
        tmpDescDiv.innerHTML = description;
        var elements = tmpDescDiv.getElementsByTagName('iframe');
        while (elements[0]) {
          elements[0].parentNode.removeChild(elements[0])
        }
        document.querySelector('[data-behavior="previewer_product_description"]').innerHTML = tmpDescDiv.innerHTML;
        assignCategories(response);
        assignVariant(response.variants[0], response.url);
        response.options.forEach(function(option) {
          if(option.name !== 'Title') {
            var optionEl = document.querySelector('[data-behavior="previewer_options"] [data-position="' + option.position + '"]'),
                optionLabel = optionEl.querySelector('label'), optionSelect = optionEl.querySelector('select');
            var htmlName = "previewer-option_" + option.name;
            $(optionEl).removeClass('hidden');
            optionLabel.htmlFor = htmlName;
            optionLabel.textContent = option.name;
            optionSelect.id = htmlName;
            var values = '';
            option.values.forEach(function(v){
              var selected = productVariant['option' + option.position] == v ? 'selected' : '';
              values += '<option value="' + v + '"' + selected + '>' + v + '</option>'
            })
            optionSelect.innerHTML = values;
            optionSelect.addEventListener('change', function(e) {
              allowCartAdding();
              productVariant['option' + $(e.currentTarget).parents('.inline').data().position] = e.currentTarget.value;
              response.variants.forEach(function(v) {
                if(v.option1 == productVariant.option1 && v.option2 == productVariant.option2 && v.option3 == productVariant.option3) {
                  assignVariant(v, response.url);
                  if(v.featured_image) {
                    document.querySelector('[data-behavior="previewer_product_image"]').src = imageUrl(v.featured_image.src, 'large');
                  }
                }
              })
            })
          }
        });

        if(response.images.length) {
          $('[data-behavior="previewer_variant_images"]').append('<div class="action-wrapper"><div class="prev"></div></div>')
          $('[data-behavior="previewer_variant_images"]').append('<div class="content-images"></div>')
          $('[data-behavior="previewer_variant_images"]').append('<div class="action-wrapper"><div class="next"></div></div>')
          response.images.forEach(function(image) {
            $('[data-behavior="previewer_variant_images"] .content-images').append('<div class="variant-block" data-real_src="' + image + '"><img data-lazy="' + imageUrl(image, 'small') + '" /></div>');
          })
          if($().slick) {
            initSlick()
          } else {
            $('[data-behavior="previewer_variant_images"]').hide()
          }

          function initSlick() {
            if($().slick) {
              $('[data-behavior="previewer_variant_images"] .content-images').not('.slick-initialized').slick({
                lazyLoad: 'progressive',
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                vertical: true,
                verticalSwiping: true,
                infinite: false,
                adaptiveHeight: true,
                draggable: true,
                prevArrow: document.querySelector('[data-behavior="previewer_variant_images"] .prev'),
                nextArrow: document.querySelector('[data-behavior="previewer_variant_images"] .next')
              });
              return true
            }
          }

          $(document).on('click', '[data-behavior="previewer_variant_images"] .variant-block', function(e) {
            var src = e.currentTarget.dataset.real_src;
            setVariantZoom(src);
          })

          if(svgArrow) {
            document.querySelector('[data-behavior="previewer_variant_images"] .prev').style.background = svgArrow;
            document.querySelector('[data-behavior="previewer_variant_images"] .next').style.background = svgArrow;
          }
        }
        $('.previewer-product_action').show();
        delayedStyles();
        if(mainImage) {
          initZoom();
        }
      }

      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", fillCart);
      oReq.open("GET", currentUrl.split('?')[0] + ".js");
      oReq.send();
      if(closeInited != true) {
        closeInit();
      }
      var i = productLinks.indexOf(currentUrl);
      if(productLinks.length > 1 && i == 0) {
        $('[data-behavior="previewer_prev_product"]').addClass('disabled');
        $('[data-behavior="previewer_next_product"]').removeClass('disabled');
      } else if(productLinks.length > 1 && i == productLinks.length - 1) {
        $('[data-behavior="previewer_prev_product"]').removeClass('disabled');
        $('[data-behavior="previewer_next_product"]').addClass('disabled');
      } else if(productLinks.length > 1) {
        $('[data-behavior="previewer_prev_product"]').removeClass('disabled');
        $('[data-behavior="previewer_next_product"]').removeClass('disabled');
      } else {
        $('[data-behavior="previewer_prev_product"]').addClass('disabled');
        $('[data-behavior="previewer_next_product"]').addClass('disabled');
      }
      window.addEventListener('keydown', changeProduct);
    }

    function assignVariant(variant, url) {
      productVariant.id = variant.id;
      productVariant.option1 = variant.option1;
      productVariant.option2 = variant.option2;
      productVariant.option3 = variant.option3;
      productVariant.available = variant.available;
      productVariant.price = variant.price;
      productVariant.compare_at_price = variant.compare_at_price;

      if(productVariant.available) {
        $('[data-behavior="previewer_add_to_cart"]').text('Add to cart').prop('disabled', false);
      } else {
        $('[data-behavior="previewer_add_to_cart"]').text('Sold out').prop('disabled', true);
      }

      var old_link = document.querySelector('[data-behavior="previewer_link"]');
      var new_link = old_link.cloneNode(true);
      new_link.href = url + '?variant=' + productVariant.id;
      old_link.parentNode.replaceChild(new_link, old_link);

      if(variant.featured_image) {
        setVariantZoom(variant.featured_image.src);
      }
      assignPrice(variant)
    }

    function assignPrice(variant) {
      document.querySelector('[data-behavior="previewer_product_price"]').innerHTML = priceInFormat(variant.price);
      if(variant.compare_at_price) {
        document.querySelector('[data-behavior="previewer_product_old_price"]').innerHTML = priceInFormat(variant.compare_at_price);
        $('[data-behavior="previewer_product_price"]').addClass('product-price__sale--single')
      } else {
        document.querySelector('[data-behavior="previewer_product_old_price"]').textContent = '';
        $('[data-behavior="previewer_product_price"]').removeClass('product-price__sale--single')
      }
    }

    function allowCartAdding() {
      $('[data-behavior="previewer_add_to_cart"]').removeClass('btn--secondary').text('Add to cart');
      $('[data-behavior="previewer_cart_error"]').text('');
    }

    function assignCategories(response) {
      if(response.type) {
        $('[data-behavior="previewer_product_type"]').show();
        $('[data-behavior="previewer_product_type"] span').text(response.type);
        $('.previewer_categories').show();
      } else {
        $('[data-behavior="previewer_product_type"]').hide();
      }
      if(response.vendor) {
        $('[data-behavior="previewer_product_vendor"]').show();
        $('[data-behavior="previewer_product_vendor"] span').text(response.vendor);
        $('.previewer_categories').show();
      } else {
        $('[data-behavior="previewer_product_vendor"]').hide();
      }
    }

    function closeInit(argument) {
      window.onclick = function(event) {
        if (event.target == modal) {
          closeModal();
        }
      }
      window.addEventListener('keydown', function(event) {
        if (event.keyCode == 27) {
          closeModal();
        }
      })
      closeInited = true;
    }

    function closeModal() {
      modal.style.display = 'none';
      clearData();
    }

    function clearData() {
      $('[data-behavior="previewer_options"] .inline').addClass('hidden');
      document.querySelector('[data-behavior="previewer_variant_images"]').innerHTML = '';
      document.querySelector('[data-behavior="previewer_variant_images"]').className = 'variant_images-block';
      $('.previewer-product_action').hide();
      $('.previewer_categories').hide();
      allowCartAdding();
      destroyZoom();
      window.removeEventListener('keydown', changeProduct);
      showingProductId = null
    }

    function changeProduct(event) {
      if (event.keyCode == 37) {
        $('[data-behavior="previewer_prev_product"]').click();
      } else if (event.keyCode == 39) {
        $('[data-behavior="previewer_next_product"]').click();
      }
    }

    function setModalStyles(){
      var wrapper = document.querySelector('body');
      if(wrapper) {
        var colorsArr = parsedColor(getComputedStyle(wrapper).backgroundColor)
        var backgroundColor = 'rgb(' + colorsArr.slice(1,4).join(', ') + ')'
        $('.previewer_modal .previewer_modal-content').css({backgroundColor: backgroundColor});
        $('.previewer-loader').css({backgroundColor: backgroundColor});
        var desc = "linear-gradient(to bottom, rgba(255, 255, 255, 0)," + backgroundColor + "100%) !important";
        $( "<style>.product-description:after { background: " + desc + "; }</style>" ).appendTo( "head" );
      }
      var productTitle = document.querySelector('[data-behavior="previewer_product_title"]');
      if(productTitle) {
        var colorsArr = parsedColor(getComputedStyle(productTitle).color)
        var textColor = 'rgba(' + colorsArr.slice(1,4).join(', ') + ', 0.4)'
        $('.previewer_modal').css({backgroundColor: textColor});
        // arrows
        var color = getComputedStyle(productTitle).color;
        var svg = arrowSvgHtml(color, '70px', '50px');
        var encoded = window.btoa(svg);
        svgArrow = "url(data:image/svg+xml;base64,"+encoded+")";
        document.querySelector('[data-behavior="previewer_prev_product"]').style.background = svgArrow;
        document.querySelector('[data-behavior="previewer_next_product"]').style.background = svgArrow;
        svg = arrowSvgHtml(color);
        encoded = window.btoa(svg);
        svgArrow = "url(data:image/svg+xml;base64,"+encoded+")";

        //
        $('.previewer_modal-content').css({borderColor: 'rgba(' + colorsArr.slice(1,4).join(', ') + ', 0.4)'});
      }
    }

    function delayedStyles() {
      $('[data-behavior="previewer_add_to_cart"]').css({marginBottom: getComputedStyle(document.querySelector('[data-behavior="previewer_quantity"] input')).marginBottom});
    }

    function arrowSvgHtml(color, width = '70px', height = '25px') {
      return '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 265.000000 141.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,141.000000) scale(0.100000,-0.100000)" fill="' + color + '" stroke="none"><path d="M62 1324 c-26 -18 -29 -54 -4 -81 9 -11 116 -107 237 -214 121 -107 337 -298 479 -424 659 -584 602 -535 626 -535 12 0 242 222 615 591 618 615 622 618 583 657 -38 38 -45 33 -634 -548 -312 -308 -571 -560 -574 -560 -3 0 -59 48 -126 108 -66 59 -253 224 -414 367 -162 143 -377 334 -480 425 -295 263 -267 243 -308 214z"/></g></svg>';
    }

    function setVariantZoom(src) {
      destroyZoom();
      document.querySelector('[data-behavior="previewer_product_image"]').src = imageUrl(src, 'large');
      document.querySelector('[data-behavior="previewer_product_image"]').dataset.zoom = src;
      initZoom();
      allowCartAdding();
    }

    function initZoom() {
      var image = $('[data-behavior="previewer_product_image"]')
        .wrap('<span style="display:inline-block"></span>')
        .css('display', 'block')
        .parent()
      if(image.zoom) {
        image.zoom({
          url: $(this).find('img').attr('data-zoom'),
          onZoomIn: function() {
            $('.zoomImg').css("background-color", getComputedStyle(document.querySelector('.previewer_modal .previewer_modal-content')).backgroundColor)
          }
        });
      }
    }

    function destroyZoom() {
      $('[data-behavior="previewer_product_image"]').trigger('zoom.destroy');
      $('[data-behavior="previewer_product_image"]').parents('.main_image-block').html('<img data-behavior="previewer_product_image" src="">');
    }

    function priceInFormat(price) {
      var format = $('[data-behavior="previewer_money_wrapper"]').data().money_format;
      return format.replace(/{{.*}}/gm, price / 100)
    }

    function imageUrl(src, size) {
      if(!src) {
        return noImage
      }
      try {
        if ("original" == size) return src;
        var t = src.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
        return t[1] + "_" + size + "." + t[2]
      } catch (e) {
        return src
      }
    }

    function parsedColor(rgb) {
      var rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      return rgb.match(rgbRegex)
    }

    function setMobileView() {
      if(!mobile) {
        return;
      }
      var links = 'a[href*="/products/"]:not(form a[href*="/products/"]):not(.related-products a[href*="/products/"]):not([href*=".JP"]):not([href*=".png"]):not([href*=".PNG"])',
          hasImg = 'img[src*="/products/"], img[src*="/no-image"],img[data-srcset*="/products/"]';
      if (params.mobileView == 'always_modal') {
        $.each($(links).has(hasImg), function(i, el) {
          $(el).parent().parent().addClass('previewer_mobile-product').attr("data-previewer", "always");
        })
        $.each($(links).parent().has(hasImg), function(i, el) {
          $(el).parent().addClass('previewer_mobile-product').attr("data-previewer", "always");
        })
      } else if (params.mobileView == 'always_button') {
        $.each($(links).has(hasImg), function(i, el) {
          $(el).parent().parent().addClass('previewer_show-product');
        })
        $.each($(links).parent().has(hasImg), function(i, el) {
          $(el).parent().addClass('previewer_show-product');
        })
      }
    }

    function isMobile() {
      if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
          return true;
      }
    }
  });
}

var params = {
  enable: false,
  mobileView: "always_button",
  checkoutRedirect: "stay_on",
  btnPosition: "center",
  btnLabel: "Vista Rápida"
}

previewerInit(params);
