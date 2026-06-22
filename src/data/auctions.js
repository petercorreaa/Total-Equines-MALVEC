import { horses } from './horses';

const slice1 = horses.slice(0, 8).map((h) => h.id);
const slice2 = horses.slice(8, 16).map((h) => h.id);
const slice3 = horses.slice(16, 23).map((h) => h.id);

export const auctions = [
  {
    id: 'subasta-otono-2025',
    name: 'Subasta Otoño 2025',
    subtitle: 'Selección Primavera — Palermo',
    date: '2025-09-15',
    dateDisplay: '15 de Septiembre, 2025',
    location: 'Palermo, Buenos Aires',
    format: 'Presencial + Online',
    status: 'upcoming',
    registrationOpen: true,
    description:
      'Nuestra subasta más importante del año. Presentamos una selección excepcional de 8 ejemplares criados en Total Equines, incluyendo yeguas de alto rendimiento y castrados con experiencia en Palermo.',
    horseIds: slice1,
    image: '/assets/horses/total-sachenca.webp',
    registrationLink: '#',
  },
  {
    id: 'subasta-fin-de-ano-2025',
    name: 'Gran Subasta Fin de Año',
    subtitle: 'Cierre de Temporada 2025',
    date: '2025-12-05',
    dateDisplay: '5 de Diciembre, 2025',
    location: 'Estancia Total Equines, Buenos Aires',
    format: 'Presencial',
    status: 'upcoming',
    registrationOpen: false,
    description:
      'El evento ecuestre más esperado del año. Cierre de temporada con los mejores ejemplares de nuestra producción anual. Incluye visita a la estancia, almuerzo y recorrido por las instalaciones.',
    horseIds: slice2,
    image: '/assets/horses/total-gonna.webp',
    registrationLink: '#',
  },
  {
    id: 'subasta-primavera-2024',
    name: 'Subasta Primavera 2024',
    subtitle: 'Resultados — Temporada Cerrada',
    date: '2024-10-20',
    dateDisplay: '20 de Octubre, 2024',
    location: 'Palermo, Buenos Aires',
    format: 'Presencial + Online',
    status: 'closed',
    registrationOpen: false,
    description:
      'Nuestra subasta de primavera 2024 fue un éxito rotundo con la participación de compradores de 8 países. Se vendieron los 7 ejemplares presentados.',
    horseIds: slice3,
    image: '/assets/horses/total-lola.webp',
    results: {
      totalSold: 7,
      countries: [
        'Argentina',
        'Reino Unido',
        'Francia',
        'Australia',
        'EEUU',
        'Nueva Zelanda',
        'Brasil',
        'China',
      ],
    },
  },
];

export const getAuctionById = (id) => auctions.find((a) => a.id === id);
