const CATEGORIES = {
  sonido:         { name: 'Sonido',          icon: '🔊', color: '#7c3aed' },
  decoracion:     { name: 'Decoración',      icon: '🎊', color: '#ec4899' },
  catering:       { name: 'Catering',        icon: '🍽️', color: '#f59e0b' },
  mobiliario:     { name: 'Mobiliario',      icon: '🪑', color: '#06b6d4' },
  iluminacion:    { name: 'Iluminación',     icon: '💡', color: '#10b981' },
  entretenimiento:{ name: 'Entretenimiento', icon: '🎉', color: '#ef4444' },
};

const PRODUCTS = [
  { id:1,  name:'Sistema DJ Completo Pro',       category:'sonido',         type:'rental',  priceRental:150000, pricePurchase:null,    image:'images/sound.png',        rating:4.9, reviews:127, badge:'Más Alquilado', description:'Sistema completo para DJ: 2 parlantes 15", subwoofer 18", mixer 4 canales, micrófonos inalámbricos x2, cables y soporte técnico.', features:['2 Parlantes 15"','Subwoofer 18"','Mixer 4 canales','Micrófonos x2','Soporte técnico'], available:true },
  { id:2,  name:'Torre de Sonido 2000W',          category:'sonido',         type:'rental',  priceRental:90000,  pricePurchase:null,    image:'images/sound.png',        rating:4.7, reviews:84,  badge:null,            description:'Torre activa de 2000W RMS para eventos hasta 150 personas. Bluetooth, USB y ecualizador incluidos.', features:['2000W RMS','Bluetooth','USB/SD','Ecualizador 7 bandas','Luces LED'], available:true },
  { id:3,  name:'Kit Micrófonos Inalámbricos x4', category:'sonido',         type:'rental',  priceRental:45000,  pricePurchase:null,    image:'images/sound.png',        rating:4.8, reviews:63,  badge:null,            description:'4 micrófonos UHF inalámbricos. Ideales para karaoke, discursos y animaciones.', features:['4 micrófonos UHF','Rango 80m','Batería 8h','Receptor multi-canal'], available:true },
  { id:4,  name:'JBL PartyBox 1000',              category:'sonido',         type:'both',    priceRental:70000,  pricePurchase:3800000, image:'images/sound.png',        rating:4.9, reviews:201, badge:'Top Ventas',     description:'El legendario JBL PartyBox 1000. Show de luces integrado y 1100W RMS para fiestas épicas.', features:['1100W RMS','Luces LED','Bluetooth','Entrada guitarra/micro'], available:true },
  { id:5,  name:'Consola DJ Pioneer DDJ-FLX6',   category:'sonido',         type:'rental',  priceRental:120000, pricePurchase:null,    image:'images/sound.png',        rating:4.8, reviews:45,  badge:'Premium',       description:'Controlador DJ profesional Pioneer DDJ-FLX6. Compatible con Serato y rekordbox.', features:['4 canales','Serato/rekordbox','Jogs 6"','Efectos built-in'], available:true },
  { id:6,  name:'Subwoofer Doble 18"',            category:'sonido',         type:'rental',  priceRental:80000,  pricePurchase:null,    image:'images/sound.png',        rating:4.6, reviews:38,  badge:null,            description:'Doble subwoofer de 18" para bajos profundos. 3000W pico con crossover integrado.', features:['2 woofers 18"','3000W pico','Crossover integrado','Soporte incluido'], available:true },

  { id:7,  name:'Arco de Globos Personalizado',  category:'decoracion',     type:'purchase',priceRental:null,   pricePurchase:180000,  image:'images/decorations.png', rating:4.9, reviews:156, badge:'Más Popular',   description:'Arco de globos de 3m personalizable en los colores de tu fiesta. Incluye instalación.', features:['3m de altura','Colores a elegir','Instalación incluida','Base profesional'], available:true },
  { id:8,  name:'Pack Globos Metálicos x100',    category:'decoracion',     type:'purchase',priceRental:null,   pricePurchase:65000,   image:'images/decorations.png', rating:4.7, reviews:210, badge:null,            description:'100 globos metálicos premium en colores variados. Bomba de inflar incluida.', features:['100 globos metálicos','Bomba incluida','Colores a elegir','Resistentes'], available:true },
  { id:9,  name:'Telón Fotobooth con Accesorios', category:'decoracion',     type:'rental',  priceRental:60000,  pricePurchase:null,    image:'images/decorations.png', rating:4.8, reviews:92,  badge:null,            description:'Telón glitter + 30 accesorios para fotos divertidas. El hit de cualquier fiesta.', features:['Telón glitter 2x2m','30 accesorios','Marco para selfies','Bolsa de transporte'], available:true },
  { id:10, name:'Guirnaldas Fairy Lights 50m',   category:'decoracion',     type:'purchase',priceRental:null,   pricePurchase:55000,   image:'images/decorations.png', rating:4.6, reviews:143, badge:null,            description:'50 metros de luces de hada cálidas. Perfectas para decorar jardines y salones.', features:['50m de cable','500 LEDs','Luz cálida','Resistente al agua'], available:true },
  { id:11, name:'Pack Decoración Temática',      category:'decoracion',     type:'purchase',priceRental:null,   pricePurchase:120000,  image:'images/decorations.png', rating:4.7, reviews:67,  badge:'Nuevo',         description:'Kit completo de decoración: mantel, servilletas, platos, vasos y centros de mesa para 20 personas.', features:['Para 20 personas','Mantel incluido','Platos y vasos','Centros de mesa'], available:true },

  { id:12, name:'Barra de Tragos Premium',        category:'catering',       type:'rental',  priceRental:350000, pricePurchase:null,    image:'images/catering.png',    rating:4.9, reviews:88,  badge:'⭐ Premium',    description:'Barman profesional + barra equipada + ingredientes para cócteles clásicos y creativos por 4 horas.', features:['Barman profesional','4 horas de servicio','Cócteles ilimitados','Barra portátil'], available:true },
  { id:13, name:'Mesa de Postres Decorada',       category:'catering',       type:'rental',  priceRental:200000, pricePurchase:null,    image:'images/catering.png',    rating:4.8, reviews:74,  badge:null,            description:'Mesa de postres personalizada para 50 personas: torta, cupcakes, macarons, cookies y decoración.', features:['Torta personalizada','Para 50 personas','Macarons y cupcakes','Decoración incluida'], available:true },
  { id:14, name:'Kit Coctelería Completo',        category:'catering',       type:'purchase',priceRental:null,   pricePurchase:180000,  image:'images/catering.png',    rating:4.7, reviews:55,  badge:null,            description:'Todo para preparar tus propios cócteles: coctelera, jigger, strainer, muddler y más.', features:['Coctelera Boston','Jigger doble','Strainer','Muddler','Vertedor'], available:true },
  { id:15, name:'Estación de Café Gourmet',       category:'catering',       type:'rental',  priceRental:130000, pricePurchase:null,    image:'images/catering.png',    rating:4.6, reviews:41,  badge:null,            description:'Máquina espresso profesional + barista + insumos para 6 horas. Cafés, capuchinos y más.', features:['Máquina espresso','Barista incluido','6 horas','Insumos incluidos'], available:true },

  { id:16, name:'Mesas Redondas Premium x10',    category:'mobiliario',     type:'rental',  priceRental:180000, pricePurchase:null,    image:'images/furniture.png',   rating:4.8, reviews:99,  badge:null,            description:'10 mesas redondas de 1.8m de diámetro con faldón blanco. Para 8 personas c/u.', features:['10 mesas','Diámetro 1.8m','Faldón blanco incluido','Hasta 8 personas c/u'], available:true },
  { id:17, name:'Sillas Tiffany Blancas x50',    category:'mobiliario',     type:'rental',  priceRental:220000, pricePurchase:null,    image:'images/furniture.png',   rating:4.9, reviews:133, badge:'Más Alquilado', description:'50 sillas Tiffany blancas apilables. El clásico de las fiestas elegantes.', features:['50 sillas Tiffany','Blancas','Apilables','Transporte incluido'], available:true },
  { id:18, name:'Barra de Bar Portátil',          category:'mobiliario',     type:'rental',  priceRental:100000, pricePurchase:null,    image:'images/furniture.png',   rating:4.7, reviews:62,  badge:null,            description:'Barra de bar portátil LED con luces de colores. Impacto visual garantizado.', features:['Luces LED','Portátil','Estante inferior','2.5m de largo'], available:true },
  { id:19, name:'Set Lounge Puff + Sofás',        category:'mobiliario',     type:'rental',  priceRental:150000, pricePurchase:null,    image:'images/furniture.png',   rating:4.6, reviews:44,  badge:null,            description:'Zona lounge: 2 sofás de 3 puestos + 4 puffs gigantes + 2 mesas bajas.', features:['2 sofás 3 puestos','4 puffs gigantes','2 mesas bajas','Estilo moderno'], available:true },

  { id:20, name:'Kit Luces DJ Profesional',      category:'iluminacion',    type:'rental',  priceRental:120000, pricePurchase:null,    image:'images/lighting.png',    rating:4.9, reviews:108, badge:'Más Alquilado', description:'4 cabezas móviles + 2 láseres + máquina de humo + controlador DMX. Show de luces completo.', features:['4 cabezas móviles','2 láseres RGB','Máquina de humo','Controlador DMX'], available:true },
  { id:21, name:'Cañón de Confeti Eléctrico',    category:'iluminacion',    type:'rental',  priceRental:50000,  pricePurchase:null,    image:'images/lighting.png',    rating:4.8, reviews:87,  badge:null,            description:'Cañón eléctrico de confeti para el momento WOW de tu fiesta. Recarga incluida.', features:['Recarga incluida','Control remoto','Alcance 8m','Confeti biodegradable'], available:true },
  { id:22, name:'LED Uplighting x12',            category:'iluminacion',    type:'rental',  priceRental:90000,  pricePurchase:null,    image:'images/lighting.png',    rating:4.7, reviews:56,  badge:null,            description:'12 luces LED uplighting inalámbricas para iluminar paredes y columnas en cualquier color.', features:['12 unidades','Inalámbricas','16M colores','App de control'], available:true },
  { id:23, name:'DJ Profesional 4 Horas',        category:'entretenimiento',type:'purchase',priceRental:null,   pricePurchase:600000,  image:'images/lighting.png',    rating:5.0, reviews:178, badge:'⭐ Top DJ',      description:'DJ profesional certificado por 4 horas. Todos los géneros: electrónica, salsa, reguetón, pop.', features:['4 horas','Todos los géneros','Equipo incluido','Visuales opcionales'], available:true },
  { id:24, name:'Fotógrafo de Eventos',           category:'entretenimiento',type:'purchase',priceRental:null,   pricePurchase:500000,  image:'images/sound.png',       rating:4.9, reviews:112, badge:null,            description:'Fotógrafo profesional por 4 horas. Entrega de fotos editadas en 48h. 300+ fotos garantizadas.', features:['4 horas','300+ fotos','Edición profesional','Entrega en 48h'], available:true },
];

function formatPrice(price) {
  return '$' + price.toLocaleString('es-CO');
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function filterProducts({ category, type, minPrice, maxPrice, search, sortBy } = {}) {
  let list = [...PRODUCTS];
  if (category && category !== 'all') list = list.filter(p => p.category === category);
  if (type && type !== 'all') list = list.filter(p => p.type === type || p.type === 'both');
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || CATEGORIES[p.category].name.toLowerCase().includes(q));
  }
  if (minPrice != null) list = list.filter(p => (p.priceRental || p.pricePurchase) >= minPrice);
  if (maxPrice != null) list = list.filter(p => (p.priceRental || p.pricePurchase) <= maxPrice);
  if (sortBy === 'price-asc')  list.sort((a,b) => (a.priceRental||a.pricePurchase) - (b.priceRental||b.pricePurchase));
  if (sortBy === 'price-desc') list.sort((a,b) => (b.priceRental||b.pricePurchase) - (a.priceRental||a.pricePurchase));
  if (sortBy === 'rating')     list.sort((a,b) => b.rating - a.rating);
  if (sortBy === 'reviews')    list.sort((a,b) => b.reviews - a.reviews);
  return list;
}
