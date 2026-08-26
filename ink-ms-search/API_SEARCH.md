# API Search - Microservicio de Filtros y Busquedas Administrativas (M07)

Documentacion de los endpoints disponibles en el microservicio de busqueda y
filtrado avanzado de InkluSport. Cubre los requisitos RF37-RF40.

## Base URL

```
http://localhost:3007/api/search
```

## Autenticacion

Todos los endpoints requieren un token JWT en el encabezado:

```
Authorization: Bearer <token_jwt>
```

El usuario debe tener el rol `ADMIN` para acceder a cualquier endpoint de este
microservicio.

## Como funciona

Este microservicio mantiene, en una base de datos MongoDB (`search_db`)
independiente, una copia de solo lectura de usuarios, deportes, eventos y
discapacidades sincronizada periodicamente (y bajo demanda) desde
`ink-ms-users` e `ink-ms-sports`. Esto permite filtrar y ordenar por
combinaciones arbitrarias de campos, y hacer busqueda de texto completo, sin
sobrecargar los microservicios de origen. Las inscripciones a eventos (RF37)
se consultan en vivo contra `ink-ms-sports`, ya que cambian constantemente.

---

## RF37 - Filtrar usuarios por evento

```http
GET /api/search/events/{eventId}/participants
```

**Query Parameters:**
- `disability` (opcional): filtra por tipo de discapacidad del usuario inscrito
- `status` (opcional): `CONFIRMED`, `WAITLIST` o `ATTENDED`
- `sortBy` (opcional): `name`, `registrationDate`, `status`
- `direction` (opcional): `asc` (default) o `desc`
- `page`, `size` (paginacion, default `0`/`20`)

**Respuesta exitosa (200 OK):**
```json
{
  "content": [
    {
      "registrationId": "uuid",
      "userId": "uuid-usuario",
      "userName": "Ana Gomez",
      "userEmail": "ana@example.com",
      "disability": "Visual",
      "eventId": "uuid-evento",
      "eventName": "Maraton Inclusiva",
      "registrationDate": "2026-01-10T10:00:00",
      "attended": false,
      "waitlistPosition": null,
      "registrationStatus": "CONFIRMED"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "currentPage": 0
}
```

---

## RF38 - Busqueda global del sistema

```http
GET /api/search/global?q=maraton
```

Busca en paralelo entre usuarios, eventos, deportes y discapacidades usando
los indices de texto de cada coleccion.

**Respuesta exitosa (200 OK):**
```json
{
  "query": "maraton",
  "totalResults": 3,
  "users": [],
  "events": [{ "id": "uuid", "name": "Maraton Inclusiva", "...": "..." }],
  "sports": [],
  "disabilities": []
}
```

### Sugerencias (autocompletado)

```http
GET /api/search/suggestions?prefix=mar&limit=10
```

### Terminos mas buscados

```http
GET /api/search/popular?limit=10
```

### Historial de busquedas (auditoria)

```http
GET /api/search/logs?page=0&size=20
```

### Resincronizar el indice manualmente

```http
POST /api/search/sync
```

**Respuesta exitosa (200 OK):**
```json
{
  "usersSynced": 120,
  "sportsSynced": 8,
  "eventsSynced": 34,
  "disabilitiesSynced": 12,
  "syncedAt": "2026-08-22T10:00:00"
}
```

---

## RF39 - Filtrado de eventos por fecha/ubicacion

```http
GET /api/search/events
```

**Query Parameters:**
- `location` (opcional): coincidencia parcial (ciudad/lugar)
- `dateFrom`, `dateTo` (opcional, `yyyy-MM-dd`)
- `sportName` (opcional)
- `status` (opcional): `draft`, `active`, `finished`
- `sortBy`: `name`, `eventDate`, `location`, `sportName`, `status`
- `direction`, `page`, `size`

---

## RF40 - Ordenamiento dinamico

Todos los listados (`/api/search/users`, `/api/search/events`,
`/api/search/sports`, `/api/search/disabilities`) aceptan `sortBy` y
`direction` para ordenar la tabla por el campo solicitado.

```http
GET /api/search/users?sortBy=name&direction=asc
GET /api/search/sports?sortBy=difficulty&direction=desc
GET /api/search/disabilities?sortBy=category&direction=asc
```

### Filtro general de usuarios

```http
GET /api/search/users?name=ana&roles=ENTRENADOR&isActive=true&disability=Visual
```

### Filtro general de deportes

```http
GET /api/search/sports?name=natacion&difficulty=medio&isActive=true
```

### Filtro general de discapacidades

```http
GET /api/search/disabilities?category=motriz&isActive=true
```

---

## Codigos de Error

| Codigo | Descripcion |
| --- | --- |
| 200 | OK - Solicitud exitosa |
| 400 | Bad Request - Error en los datos enviados |
| 401 | Unauthorized - Token invalido o faltante |
| 403 | Forbidden - Usuario no autorizado (requiere rol ADMIN) |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## Notas

- La paginacion usa parametros estandar: `page` (0-indexed) y `size`.
- Las fechas se envian/retornan en formato ISO 8601.
- El indice se sincroniza automaticamente al arrancar y cada 5 minutos
  (`search.sync.interval-ms`); tambien puede forzarse con `POST /sync`.
- Si `ink-ms-users` o `ink-ms-sports` no estan disponibles durante una
  sincronizacion, esa coleccion simplemente conserva su ultimo estado
  conocido (no se borra nada).
