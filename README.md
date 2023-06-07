# mle-example
A simple example of a implementation of an API with Message Level Encryption communication

# Usage
## Sending requests to the clients routes.
### POST /clients to create a client
### GET /clients to get all saved clients

![Example withou MLE](https://github.com/teohen/mle-example/blob/mle-feature/assets/api-clients.gif)

## Sending requests to the clients routes using MLE (Message Level Encryption)
### adding encrypted and mle headers
### POST /encrypt to encrypt the body with a public key
### POST /clients (with headers) to create a client
### GET /clients (with mle headers) to get all saved clients 
### POST /decrypt to decrypt the body with a private key

![Example with MLE](https://github.com/teohen/mle-example/blob/mle-feature/assets/api-mle-clients.gif)

