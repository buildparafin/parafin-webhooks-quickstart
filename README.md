# Parafin Webhook Handler

Set up a webhook handler to listen for and process Parafin events. Test out your webhook handler by:
* using ngrok to create a temporary public URL to tunnel requests to your local application 
* triggering events in sandbox mode with Parafin's [Trigger Webhook](https://docs.parafin.com/api/#tag/Sandbox/operation/Trigger%20Webhook) endpoint


## Prerequisites 
* Access to a [Parafin dashboard](https://dashboard.parafin.com)
* [Node.js](https://nodejs.org/en/)
* [ngrok](https://ngrok.com/)


## Instructions

### 1. Clone repo
First, clone the repository and install dependencies:

```bash
$ git clone https://github.com/mattmitchell6/parafin-webhook-handler.git
$ cd parafin-webhook-handler
$ npm install
```

### 2. Start ngrok tunnel
Start a new ngrok tunnel from your terminal, specifying the port you plan on using for your local server.

```bash
$ ngrok http 3000
```

> ⚠️ Heads up! <br/>
> This ngrok forwarding URL has an exipiry of about two hours. You will need to refresh your session every time you plan on testing this.


### 3. Submit webhook URL and fetch webhook secret
Navigate to the [Webhooks section](https://dashboard.parafin.com/developer/webhooks?sandbox_mode=true) of the Parafin dashboard. Using the forwarding URL generated from ngrok in the previous step, submit your webhook URL (e.g. `https://097f-67-169-0-215.ngrok.io/parafin-webhook-handler`) 


![Submit webhook URL](/img/submit-webhook-url.png)


Copy the generated webhook secret key, rename the `sample.env` file to `.env`, and populate with your webhook secret key.

```bash
$ mv sample.env .env
```

```bash
# .env
WEBHOOK_SECRET="<your-webhook-secret-key>"
```


### 4. Run the app
In a separate terminal tab, run the following to start listening for events:

```bash
$ npm start
```

### 5. Trigger events in sandbox mode
Once your webhook handler is running and listening for events, Fetch your [client ID and client secret](https://dashboard.parafin.com/developer/api-keys?sandbox_mode=true) from the Parafin dashboard and use our [Trigger Webhook](https://docs.parafin.com/api/#tag/Sandbox/operation/Trigger%20Webhook) endpoint to simulate events. 

```bash
curl https://api.parafin.com/v1/sandbox/trigger_webhook \
  -u <your-client-id>:<your-client-secret> \
  -d '{
    "webhook_event_type": "flex_loan_offer_created"
  }'   
```

If everything succeeded, you should see the following response:

```json
{
  "success": "true"
}
```