
//
// All button handlers on all pages re: facebook tracking are populated in this one file.
//
$(document).ready (function(){
    // Item analytics attributes like price are embedded in the item html
    $(".track-init_checkout_product").on('click',
        function() {
            let name = $(this).attr("data-track-name");
            let price = $(this).attr("data-track-price");
            fbq('track', 'InitiateCheckout', {
                name: name,
                value: price,
                currency: "USD"
            });
        }
    );

    $(".track-purchase").on('click',
        function() {
            let name = $(this).attr("data-track-name");
            let price = $(this).attr("data-track-price");
            fbq('track', 'Purchase', {
                name: name,
                value: price,
                currency: "USD"
            })
        }
    );

    $(".track-init_checkout_plan").on('click',
        function() {
            let name = $(this).attr("data-track-name");
            let price = $(this).attr("data-track-price");
            let period = $(this).attr("data-track-period");
            fbq('track', 'InitiateCheckout', {
                name: name,
                value: price,
                period: period,
                currency: "USD",
            });
        }
    );

    $(".track-subscribe").on('click',
        function() {
            let name = $(this).attr("data-track-name");
            let price = $(this).attr("data-track-price");
            let period = $(this).attr("data-track-period");
            fbq('track', 'Subscribe', {
                name: name,
                value: price,
                period: period,
                currency: "USD",
            });
        }
    );

    $(".track-lead").on('click',
        function() {
            fbq('track', 'Lead', {})
        }
    );
});


/*
var button = document.getElementById('addToCartButton');
button.addEventListener(
  'click', 
  function() { 
    fbq('track', 'AddToCart', {
      content_name: 'Really Fast Running Shoes', 
      content_category: 'Apparel & Accessories > Shoes',
      content_ids: ['1234'],
      content_type: 'product',
      value: 4.99,
      currency: 'USD' 
    });          
  },
  false
);
*/