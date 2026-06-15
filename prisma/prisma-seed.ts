import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const vocabularioInicial = [
  // SALUDOS
  {
    palabraES: 'Hola',
    palabraIT: 'Ciao',
    categoria: 'saludos',
    nivel: 'A1',
    ejemploES: 'Hola, ¿cómo estás?',
    ejemploIT: 'Ciao, come stai?',
  },
  {
    palabraES: 'Buenos días',
    palabraIT: 'Buongiorno',
    categoria: 'saludos',
    nivel: 'A1',
    ejemploES: 'Buenos días, ¿qué tal?',
    ejemploIT: 'Buongiorno, come va?',
  },
  {
    palabraES: 'Buenas noches',
    palabraIT: 'Buonasera',
    categoria: 'saludos',
    nivel: 'A1',
    ejemploES: 'Buenas noches a todos',
    ejemploIT: 'Buonasera a tutti',
  },
  {
    palabraES: 'Adiós',
    palabraIT: 'Arrivederci',
    categoria: 'saludos',
    nivel: 'A1',
    ejemploES: 'Adiós, hasta luego',
    ejemploIT: 'Arrivederci, a presto',
  },
  {
    palabraES: 'Hasta luego',
    palabraIT: 'A presto',
    categoria: 'saludos',
    nivel: 'A1',
    ejemploES: 'Hasta luego, que disfrutes',
    ejemploIT: 'A presto, divertiti',
  },

  // NÚMEROS
  {
    palabraES: 'Uno',
    palabraIT: 'Uno',
    categoria: 'numeros',
    nivel: 'A1',
    ejemploES: 'Tengo uno manzana',
    ejemploIT: 'Ho una mela',
  },
  {
    palabraES: 'Dos',
    palabraIT: 'Due',
    categoria: 'numeros',
    nivel: 'A1',
    ejemploES: 'Tengo dos gatos',
    ejemploIT: 'Ho due gatti',
  },
  {
    palabraES: 'Tres',
    palabraIT: 'Tre',
    categoria: 'numeros',
    nivel: 'A1',
    ejemploES: 'Tengo tres hermanos',
    ejemploIT: 'Ho tre fratelli',
  },
  {
    palabraES: 'Cuatro',
    palabraIT: 'Quattro',
    categoria: 'numeros',
    nivel: 'A1',
    ejemploES: 'Tengo cuatro primos',
    ejemploIT: 'Ho quattro cugini',
  },
  {
    palabraES: 'Cinco',
    palabraIT: 'Cinque',
    categoria: 'numeros',
    nivel: 'A1',
    ejemploES: 'Tengo cinco años',
    ejemploIT: 'Ho cinque anni',
  },

  // COLORES
  {
    palabraES: 'Rojo',
    palabraIT: 'Rosso',
    categoria: 'colores',
    nivel: 'A1',
    ejemploES: 'La manzana es roja',
    ejemploIT: 'La mela è rossa',
  },
  {
    palabraES: 'Azul',
    palabraIT: 'Blu',
    categoria: 'colores',
    nivel: 'A1',
    ejemploES: 'El cielo es azul',
    ejemploIT: 'Il cielo è blu',
  },
  {
    palabraES: 'Verde',
    palabraIT: 'Verde',
    categoria: 'colores',
    nivel: 'A1',
    ejemploES: 'El árbol es verde',
    ejemploIT: 'L\'albero è verde',
  },
  {
    palabraES: 'Amarillo',
    palabraIT: 'Giallo',
    categoria: 'colores',
    nivel: 'A1',
    ejemploES: 'El plátano es amarillo',
    ejemploIT: 'La banana è gialla',
  },
  {
    palabraES: 'Negro',
    palabraIT: 'Nero',
    categoria: 'colores',
    nivel: 'A1',
    ejemploES: 'El gato es negro',
    ejemploIT: 'Il gatto è nero',
  },

  // COMIDA
  {
    palabraES: 'Manzana',
    palabraIT: 'Mela',
    categoria: 'comida',
    nivel: 'A1',
    ejemploES: 'Me encanta la manzana',
    ejemploIT: 'Mi piace la mela',
  },
  {
    palabraES: 'Pan',
    palabraIT: 'Pane',
    categoria: 'comida',
    nivel: 'A1',
    ejemploES: 'Compro pan en la panadería',
    ejemploIT: 'Compro pane al panificio',
  },
  {
    palabraES: 'Queso',
    palabraIT: 'Formaggio',
    categoria: 'comida',
    nivel: 'A1',
    ejemploES: 'El queso italiano es delicioso',
    ejemploIT: 'Il formaggio italiano è delizioso',
  },
  {
    palabraES: 'Leche',
    palabraIT: 'Latte',
    categoria: 'comida',
    nivel: 'A1',
    ejemploES: 'Bebo leche en el desayuno',
    ejemploIT: 'Bevo latte a colazione',
  },
  {
    palabraES: 'Agua',
    palabraIT: 'Acqua',
    categoria: 'comida',
    nivel: 'A1',
    ejemploES: 'Necesito agua para beber',
    ejemploIT: 'Ho bisogno di acqua per bere',
  },

  // FAMILIA
  {
    palabraES: 'Padre',
    palabraIT: 'Padre',
    categoria: 'familia',
    nivel: 'A1',
    ejemploES: 'Mi padre es ingeniero',
    ejemploIT: 'Mio padre è ingegnere',
  },
  {
    palabraES: 'Madre',
    palabraIT: 'Madre',
    categoria: 'familia',
    nivel: 'A1',
    ejemploES: 'Mi madre es doctora',
    ejemploIT: 'Mia madre è dottore',
  },
  {
    palabraES: 'Hermano',
    palabraIT: 'Fratello',
    categoria: 'familia',
    nivel: 'A1',
    ejemploES: 'Mi hermano es menor',
    ejemploIT: 'Mio fratello è più giovane',
  },
  {
    palabraES: 'Hermana',
    palabraIT: 'Sorella',
    categoria: 'familia',
    nivel: 'A1',
    ejemploES: 'Mi hermana estudia medicina',
    ejemploIT: 'Mia sorella studia medicina',
  },
  {
    palabraES: 'Abuelo',
    palabraIT: 'Nonno',
    categoria: 'familia',
    nivel: 'A1',
    ejemploES: 'Mi abuelo es muy sabio',
    ejemploIT: 'Mio nonno è molto saggio',
  },

  // VIAJES
  {
    palabraES: 'Tren',
    palabraIT: 'Treno',
    categoria: 'viajes',
    nivel: 'A1',
    ejemploES: 'Viajaré en tren a Roma',
    ejemploIT: 'Viaggerò in treno a Roma',
  },
  {
    palabraES: 'Coche',
    palabraIT: 'Macchina',
    categoria: 'viajes',
    nivel: 'A1',
    ejemploES: 'Mi coche es rojo',
    ejemploIT: 'La mia macchina è rossa',
  },
  {
    palabraES: 'Avión',
    palabraIT: 'Aereo',
    categoria: 'viajes',
    nivel: 'A1',
    ejemploES: 'Tomaré un avión a Italia',
    ejemploIT: 'Prenderò un aereo per l\'Italia',
  },
  {
    palabraES: 'Hotel',
    palabraIT: 'Albergo',
    categoria: 'viajes',
    nivel: 'A1',
    ejemploES: 'Nos quedamos en un hotel 5 estrellas',
    ejemploIT: 'Abbiamo alloggiato in un albergo a 5 stelle',
  },
  {
    palabraES: 'Mapa',
    palabraIT: 'Mappa',
    categoria: 'viajes',
    nivel: 'A1',
    ejemploES: 'Necesito un mapa para las direcciones',
    ejemploIT: 'Ho bisogno di una mappa per le direzioni',
  },

  // VERBOS BÁSICOS
  {
    palabraES: 'Ser/Estar',
    palabraIT: 'Essere',
    categoria: 'verbos',
    nivel: 'A1',
    ejemploES: 'Yo soy ingeniero',
    ejemploIT: 'Io sono ingegnere',
  },
  {
    palabraES: 'Tener',
    palabraIT: 'Avere',
    categoria: 'verbos',
    nivel: 'A1',
    ejemploES: 'Tengo un gato',
    ejemploIT: 'Ho un gatto',
  },
  {
    palabraES: 'Hacer',
    palabraIT: 'Fare',
    categoria: 'verbos',
    nivel: 'A1',
    ejemploES: 'Hago los deberes',
    ejemploIT: 'Faccio i compiti',
  },
  {
    palabraES: 'Ir',
    palabraIT: 'Andare',
    categoria: 'verbos',
    nivel: 'A1',
    ejemploES: 'Voy al cine',
    ejemploIT: 'Vado al cinema',
  },
  {
    palabraES: 'Venir',
    palabraIT: 'Venire',
    categoria: 'verbos',
    nivel: 'A1',
    ejemploES: 'Vengo a tu casa',
    ejemploIT: 'Vengo a casa tua',
  },
];

async function main() {
  console.log('🌱 Comenzando seed de vocabulario...');

  // Limpiar vocabulario anterior
  await prisma.vocabulary.deleteMany();

  // Insertar vocabulario
  for (const vocab of vocabularioInicial) {
    await prisma.vocabulary.create({
      data: vocab,
    });
  }

  console.log(`✅ Se crearon ${vocabularioInicial.length} palabras`);
  console.log('🌱 Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
