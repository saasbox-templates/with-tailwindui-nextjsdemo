
$(document).ready (function(){

  // This is the public checkout key provided by stripe. Changes based on 
  // whether developer or live setup.
  let data_stripe_key = $("#data-stripe-key").attr("data-stripe-key");
  let clientSecret = $("#data-client-secret").attr("data-client-secret");

  // Create a Stripe client.
  var stripe = Stripe(data_stripe_key);

  // Create an instance of Elements.
  var elements = stripe.elements();

  // Custom styling can be passed to options when creating an Element.
  // (Note that this demo uses a wider set of styles than the guide below.)
  var style = {
    base: {
      color: '#32325d',
      lineHeight: '18px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  // Create an instance of the card Element.
  var card = elements.create('card', {style: style});

  // Add an instance of the card Element into the `card-element` <div>.
  card.mount('#card-element');

  // Handle real-time validation errors from the card Element.
  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

 

  // Send card payment method ID so it can be set up as default method.
  function stripeSuccessHandler(paymentMethodId) {
      var form = document.getElementById('payment-form');
      
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'paymentMethodId');
      hiddenInput.setAttribute('value', paymentMethodId);
      form.appendChild(hiddenInput);
      // Submit form
      form.submit();
  }

  // Instead of form submit, we listen to submit link's click event, then submit form.
  document.getElementById("payment-button").addEventListener('click', function(event) {
    event.preventDefault();

    stripe.confirmCardSetup(
      clientSecret,
      {
        payment_method: {
          card: card,
          /*billing_details: {
            name: cardholderName.value,
          },*/
        },
      }
    ).then(function(result) {
      if (result.error) {
        // Display error.message in your UI.
        console.log(result.error.message);
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // The setup has succeeded. Display a success message.
        console.log("Card setup succeeded with ID:", result.setupIntent.payment_method);
        stripeSuccessHandler(result.setupIntent.payment_method)
      }
    });
    // New method, no need to save token, card info already saved in Stripe
    /* This is for instant payments
    stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
      setup_future_usage: 'off_session'
    }).then(function(result) {
      if (result.error) {
        // Show error to your customer
        console.log(result.error.message);
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log("Transaction, succeeded. Card has been saved.\n");
          stripeSuccessHandler()
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback execution
          // Set up a webhook or plugin to listen for the payment_intent.succeeded event
          // to save the card to a Customer
          // The PaymentMethod ID can be found on result.paymentIntent.payment_method

        }
      }
    });*/

    /*
    // Old method with tokens:
    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        stripeTokenHandler(result.token);
      }
    });
    */
  });
});
