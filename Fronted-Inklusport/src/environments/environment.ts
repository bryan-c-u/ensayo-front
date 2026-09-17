export const environment = {
  production: true,
  /** Base del API Gateway (ink-ms-gateway). Todas las llamadas HTTP cuelgan de aqui. */
  apiUrl: 'http://localhost:8080',
  /** Public key de Mercado Pago (no es secreta) para tokenizar tarjetas con el SDK JS. */
  mercadoPagoPublicKey: 'TEST-faf3c04b-420e-4465-a899-de4d2a473c6d',
};
