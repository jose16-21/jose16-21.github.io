/**
 * Instituciones y marcas para las que se han desarrollado soluciones,
 * en su mayoría como parte de equipos / esquemas de outsourcing.
 *
 * Logos: coloca el archivo en `src/assets/clients/<id>.svg` (o .png/.webp),
 * usando el mismo `id` de abajo como nombre de archivo. Si el archivo no
 * existe, la barra muestra automáticamente el nombre como wordmark de texto
 * (ver Clients.tsx). La detección es en tiempo de build con import.meta.glob,
 * así que es determinista: solo se muestra imagen si el archivo realmente existe.
 */
export interface Client {
  /** Identificador y nombre del archivo de logo esperado (sin extensión). */
  id: string;
  /** Nombre visible / alt de la imagen. */
  name: string;
  /** Sector, para contexto y accesibilidad. */
  sector: string;
  /** Sitio oficial (opcional). */
  url?: string;
}

export const clients: Client[] = [
  // Banca y finanzas
  { id: 'banco-industrial', name: 'Banco Industrial', sector: 'Banca', url: 'https://www.bi.com.gt' },
  { id: 'bac-credomatic', name: 'BAC Credomatic', sector: 'Banca', url: 'https://www.baccredomatic.com' },
  { id: 'banrural', name: 'Banrural', sector: 'Banca', url: 'https://www.banrural.com.gt' },
  { id: 'bancolombia', name: 'Bancolombia', sector: 'Banca', url: 'https://www.bancolombia.com' },
  { id: 'genesis-empresarial', name: 'Génesis Empresarial', sector: 'Microfinanzas', url: 'https://www.genesisempresarial.com.gt' },
  { id: 'finerio', name: 'Finerio Connect', sector: 'Fintech / Open Finance', url: 'https://finerioconnect.com' },
  // Comercio y delivery
  { id: 'rappi', name: 'Rappi', sector: 'Delivery', url: 'https://www.rappi.com' },
  { id: 'via-compras', name: 'Vía Compras', sector: 'E-commerce' },
  { id: 'shopstart', name: 'Shopstart', sector: 'E-commerce' },
  { id: 'don-julio', name: 'Distribuidora Don Julio', sector: 'Retail / Distribución' },
  { id: 'anabel', name: 'Distribuidora Anabel', sector: 'Retail / Distribución' },
  { id: 'menoo', name: 'Menoo', sector: 'Hostelería' },
  // Sector público / cooperación
  { id: 'villa-nueva', name: 'Municipalidad de Villa Nueva', sector: 'Sector público (USAID)' },
  { id: 'usaid', name: 'USAID', sector: 'Cooperación internacional', url: 'https://www.usaid.gov' },
];
