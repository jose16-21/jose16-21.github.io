import React from 'react';
import { useTranslation } from 'react-i18next';
import { clients, Client } from '../../data/clients';

/**
 * Mapa id -> URL del logo, resuelto en tiempo de build.
 * Solo contiene entradas para archivos que REALMENTE existen en
 * src/assets/clients. Si no hay archivo, no se intenta cargar imagen
 * y se muestra el nombre como wordmark de texto.
 */
const logoModules = import.meta.glob('../../assets/clients/*.{svg,png,webp,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const logoMap: Record<string, string> = {};
for (const [path, url] of Object.entries(logoModules)) {
  const base = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  logoMap[base] = url;
}

const ClientLogo: React.FC<{ client: Client }> = ({ client }) => {
  const logo = logoMap[client.id];

  const content = logo ? (
    <img
      src={logo}
      alt={`${client.name} — ${client.sector}`}
      loading="lazy"
      className="h-9 md:h-10 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
    />
  ) : (
    <span className="text-base md:text-lg font-semibold text-gray-400 group-hover:text-gray-700 transition-colors whitespace-nowrap">
      {client.name}
    </span>
  );

  return (
    <div
      className="group flex items-center justify-center h-12"
      title={`${client.name} — ${client.sector}`}
    >
      {client.url ? (
        <a
          href={client.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${client.name} (${client.sector})`}
          className="flex items-center"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
};

const Clients: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white border-t border-gray-100" id="clientes" aria-labelledby="clientes-title">
      <div className="max-w-7xl mx-auto px-6">
        <p
          id="clientes-title"
          className="text-center text-sm text-gray-400 uppercase tracking-widest mb-12 font-semibold"
        >
          {t('clients.title')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-16">
          {clients.map((client) => (
            <ClientLogo key={client.id} client={client} />
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-12 max-w-2xl mx-auto font-light">
          {t('clients.disclaimer')}
        </p>
      </div>
    </section>
  );
};

export default Clients;
