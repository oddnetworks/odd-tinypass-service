# Tinypass Webhook Service

Standalone server for accepting POSTs from [Tinypass Webhooks](http://vx.piano.io/webhook-events-version-2).

Right now this just decrypts the event and logs it from a single Tinypass account.

## Webhooks

Tinypass lets you specify a single URL it will sent all events to.

```
POST / HTTP1.1
HOST yourserver.com
data=3AZvo7WmZ_Rm6CRFeEHv8rB5agHCqVCJwM0MVTAtM_WBl4YuwURzTr1H3vVqwW_GWywgYMOB3SmC791RXIp4Ty2lQPkYcwvov3Xu8oUU4LjlOg7Rr0YI5tNAF2O9iP5yAl034yUXRGWbLG4vDGlmRJfQLYlMYepGk0ckAwo7CPGvCXjwgyxGpsxgevi2NR89Se-oweJzvAxOGVdQRyqkXCSvg5eUA80KbPEw7X3EhwDwoWC68X_WmECCkEg8F6ecfFnWue0Nj-SGdvNllcENWg~~~V_JbW12a6A5s-wCRrDaTPUGNETqvqxbKUWMOhyAidRk
```

`data` is the query parameter that contains the encrypted event payload for the specific Tinypass Application ID and Private Key. The above request is decrypted to the following payload.

```json
{
  "version": 2,
  "type": "access_granted",
  "event": "new_purchase",
  "aid": "UiAvWQkDeI",
  "expires": 1508447698,
  "access_id": "mYjuzAuKFc0X",
  "term_id": "TM9SNMG0R2DQ",
  "rid": "RIITM3Y",
  "uid": "0032100000AYAsiAAH"
}
```

From here you can decide what you should do with that event.

## Environment Variables

The Tinypass variables can be obtained by logging into their dashboard. They are needed for the Tinypass client for decrypting the event payload.

- PORT
- TINYPASS_APPLICATION_ID
- TINYPASS_PRIVATE_KEY

## Development

```bash
$ npm run dev
```

## Production

```bash
$ npm start
```
