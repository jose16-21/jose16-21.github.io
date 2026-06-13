# Logos de clientes / instituciones

La sección "Marcas que confían en mi trabajo" (`src/presentation/components/Clients.tsx`)
muestra estos logos. **Mientras no exista el archivo, se muestra el nombre como texto**
automáticamente (detección en build con `import.meta.glob`), así que la sección funciona
aunque falten logos.

## Cómo agregar un logo

1. Consigue el logo oficial de la marca (de preferencia **SVG**; si no, PNG/WEBP con fondo transparente).
2. Guárdalo en esta carpeta (`src/assets/clients/`) con **exactamente** el nombre de archivo de abajo.
3. Recompila (`npm run build`): el logo reemplaza al texto automáticamente.

La barra muestra los logos en escala de grises y a color al pasar el cursor.
Altura de referencia: ~40px.

## Nombres de archivo esperados

| Institución                   | Archivo (cualquier extensión svg/png/webp/jpg) |
|-------------------------------|------------------------------------------------|
| Banco Industrial              | `banco-industrial.svg`                         |
| BAC Credomatic                | `bac-credomatic.svg`                           |
| Banrural                      | `banrural.svg`                                 |
| Bancolombia                   | `bancolombia.svg`                              |
| Génesis Empresarial           | `genesis-empresarial.svg`                      |
| Rappi                         | `rappi.svg`                                    |
| Vía Compras                   | `via-compras.svg`                              |
| Shopstart                     | `shopstart.svg`                                |
| Distribuidora Don Julio       | `don-julio.svg`                                |
| Menoo                         | `menoo.svg`                                    |
| Municipalidad de Villa Nueva  | `villa-nueva.svg`                              |

> Para agregar o quitar instituciones, edita `src/data/clients.ts` (el campo `id`
> debe coincidir con el nombre del archivo).
