# Sistema de Sorteos Automáticos

Este documento explica cómo funciona el sistema de sorteos automáticos para los juegos de lotería.

## Características Principales

### 1. Sorteos Automáticos

Los sorteos se ejecutan automáticamente según los horarios configurados en cada juego:

- **La Diaria**: 11:00 AM, 3:00 PM, 9:00 PM
- **Juega Tres**: 11:00 AM, 3:00 PM, 9:00 PM

### 2. Gestión de Sorteos

- Los sorteos se crean automáticamente con 7 días de anticipación
- Cada sorteo tiene un estado: `pendiente`, `realizado`, o `anulado`
- Los números ganadores se generan aleatoriamente en el rango correcto

### 3. Procesamiento de Resultados

Cuando se ejecuta un sorteo:

1. Se genera el número ganador aleatorio
2. Se revisan todas las jugadas del sorteo
3. Se marcan las jugadas ganadoras y perdedoras
4. Se calculan los premios según el multiplicador del juego
5. Se acreditan los premios a las billeteras de los ganadores
6. Se registran las transacciones de premios

## Endpoints de Administración

### Gestión de Juegos

#### Obtener todos los juegos

```
GET /api/admin/juegos
```

Requiere autenticación de administrador.

#### Obtener un juego específico

```
GET /api/admin/juegos/:id
```

#### Actualizar reglas de un juego

```
PUT /api/admin/juegos/:id/reglas
```

Body:

```json
{
  "reglas": {
    "inversionMinima": 5,
    "inversionMaxima": 500,
    "multiplicador": 60,
    "limitePorBoleto": 10,
    "horarios": ["11:00", "15:00", "21:00"]
  }
}
```

#### Cambiar estado de un juego

```
PATCH /api/admin/juegos/:id/estado
```

Body:

```json
{
  "estado": "activo" // o "inactivo"
}
```

### Gestión de Sorteos

#### Obtener sorteos con filtros

```
GET /api/admin/sorteos?juegoId=xxx&estado=pendiente&fecha=2025-11-07
```

#### Obtener detalle de un sorteo

```
GET /api/admin/sorteos/:id
```

Incluye estadísticas:

- Total de boletos
- Total de jugadas
- Jugadas ganadoras
- Total de premios pagados

#### Anular un sorteo

```
PATCH /api/admin/sorteos/:id/anular
```

Solo se pueden anular sorteos con estado `pendiente`.

## Estructura de Reglas de Juego

Las reglas de cada juego se almacenan en formato JSON:

```json
{
  "objetivo": "Acertar un número de dos dígitos (00 al 99)",
  "horarios": ["11:00", "15:00", "21:00"],
  "inversionMinima": 5,
  "inversionMaxima": 500,
  "multiplicador": 60,
  "limitePorBoleto": 10,
  "digitosNumero": 2
}
```

### Campos Editables por el Administrador

- `inversionMinima`: Monto mínimo de apuesta
- `inversionMaxima`: Monto máximo de apuesta
- `multiplicador`: Multiplicador para calcular premios
- `limitePorBoleto`: Cantidad máxima de jugadas por boleto
- `horarios`: Horarios de sorteos (formato "HH:MM")

### Campos Fijos (parte de la lógica del servidor)

- `objetivo`: Descripción del juego
- `digitosNumero`: Cantidad de dígitos del número (2 o 3)

## Flujo de Ejecución

### Al Iniciar el Servidor

1. Se inicializan los juegos "La Diaria" y "Juega Tres" (si no existen)
2. Se crean sorteos pendientes para los próximos 7 días
3. Se programan tareas cron para ejecutar sorteos automáticamente

### Cuando se Ejecuta un Sorteo

1. La tarea cron se dispara a la hora programada
2. Se busca el sorteo pendiente correspondiente
3. Se genera un número ganador aleatorio
4. Se actualiza el sorteo con el resultado
5. Se procesan todas las jugadas del sorteo
6. Se pagan los premios a los ganadores

## Modelos de Datos

### Juego

- `id`: UUID
- `nombre`: String (único)
- `reglas`: JSON (reglas configurables)
- `estado`: ENUM ('activo', 'inactivo')

### Sorteo

- `id`: UUID
- `juego_id`: UUID (relación con Juego)
- `fechaHora`: DateTime
- `resultado`: String (número ganador)
- `estado`: ENUM ('pendiente', 'realizado', 'anulado')

### Boleto

- `id`: UUID
- `cliente_id`: UUID (relación con Cliente)
- `sorteo_id`: UUID (relación con Sorteo)
- `fechaCompra`: DateTime
- `totalInvertido`: Decimal

### Jugada

- `id`: UUID
- `boleto_id`: UUID (relación con Boleto)
- `numero`: String (número jugado)
- `monto`: Decimal
- `estado`: ENUM ('pendiente', 'ganadora', 'perdedora')
- `premio`: Decimal (null si no ganó)

## Validaciones

### Validación de Números

- **La Diaria**: 2 dígitos (00-99)
- **Juega Tres**: 3 dígitos (000-999)

### Validación de Jugadas

- Monto mínimo: L. 5
- Monto máximo: L. 500
- Máximo 10 jugadas por boleto

## Transacciones y Premios

Cuando una jugada gana:

1. Se calcula el premio: `monto × multiplicador`
2. Se actualiza el saldo de la billetera del cliente
3. Se crea una transacción de tipo "premio"
4. Se actualiza el estado de la jugada a "ganadora"

## Zona Horaria

Los sorteos están configurados para la zona horaria de Honduras:

```javascript
timezone: "America/Tegucigalpa";
```

Puedes modificar esto en `src/servicios/sorteo.servicio.mjs` si necesitas otra zona horaria.

## Mantenimiento

### Crear Sorteos Futuros Manualmente

Si necesitas crear más sorteos a futuro, puedes llamar a:

```javascript
await crearSorteosFuturos(30); // Crear sorteos para 30 días
```

### Reprogramar Sorteos

Si cambias los horarios de un juego, necesitarás reiniciar el servidor para que las nuevas tareas cron se programen correctamente.
