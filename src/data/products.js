export const initialProducts = [
  {
    id: 1,
    name: "Cachaça Premium",
    tagline: "Reconhecida pela sofisticação e pelos aromas exclusivos.",
    description: "Reconhecida pela sofisticação e pelos aromas exclusivos. Produzida com blend de Carvalho Americano e Francês, proporcionando equilíbrio, suavidade e personalidade.",
    price: 189.90,
    volume: "750ml",
    abv: "40%",
    wood: "Carvalho Americano",
    category: "Envelhecida",
    stock: 45,
    rating: 4.9,
    salesCount: 142,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecida 5 Anos", "Sem aditivos químicos", "Destilação em alambique de cobre"],
    details: {
      color: "Dourado intenso e límpido",
      aroma: "Baunilha, caramelo e coco tostado",
      taste: "Macio, frutado, com retrogosto de mel",
      pairing: "Carnes vermelhas grelhadas, queijos maturados e charutos."
    },
    reviews: [
      { id: 101, user: "Roberto S.", rating: 5, comment: "Excepcional! Baunilha muito marcante, super suave na boca. Combina muito bem com um queijo provolone tostado.", date: "2026-05-15" },
      { id: 102, user: "Mariana L.", rating: 5, comment: "Garrafa linda, acabamento de luxo. O sabor é fantástico, super aromático.", date: "2026-05-20" }
    ]
  },
  {
    id: 2,
    name: "Cachaça Kethy Rios Prata Cristal",
    tagline: "A expressão mais pura e cristalina da cana-de-açúcar.",
    description: "Nossa Prata Cristal é descansada em tonéis de aço inoxidável por 1 ano para preservar a pureza original da cana-de-açúcar. Totalmente transparente e brilhante, ela carrega aromas frescos e herbáceos que remetem a canaviais após a chuva, com toques cítricos de limão siciliano. Possui um paladar equilibrado, com frescor marcante e final limpo, perfeita para ser apreciada gelada ou como base de coquetéis premium.",
    price: 89.90,
    volume: "750ml",
    abv: "38%",
    wood: "Sem Madeira (Descansada)",
    category: "Prata",
    stock: 120,
    rating: 4.7,
    salesCount: 215,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Descansada 1 Ano", "Ideal para Caipirinhas", "Sabor frutado e herbáceo"],
    details: {
      color: "Incolor e cristalina",
      aroma: "Frutado suave com notas de capim-limão",
      taste: "Fresco, levemente picante, acidez equilibrada",
      pairing: "Petiscos de boteco, caldinho de feijão, iscas de peixe."
    },
    reviews: [
      { id: 103, user: "Felipe T.", rating: 4, comment: "A melhor prata que já tomei. Excelente para caipirinha, mas pura e gelada é sensacional.", date: "2026-05-10" }
    ]
  },
  {
    id: 3,
    name: "Cachaça Ouro",
    tagline: "Coloração dourada, sabor complexo e acabamento suave.",
    description: "Envelhecida em Carvalho Francês, apresenta coloração dourada, sabor complexo e acabamento suave. Uma experiência para apreciadores exigentes.",
    price: 159.90,
    volume: "750ml",
    abv: "39%",
    wood: "Carvalho Francês",
    category: "Envelhecida",
    stock: 60,
    rating: 4.9,
    salesCount: 188,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecida 3 Anos", "Madeira Nativa Brasileira", "Aromas de canela e baunilha"],
    details: {
      color: "Amarelo-palha brilhante",
      aroma: "Canela, especiarias e mel",
      taste: "Adocicado, aveludado e com baixa picância",
      pairing: "Sobremesas à base de banana, chocolate meio amargo e carne suína assada."
    },
    reviews: [
      { id: 104, user: "Guilherme M.", rating: 5, comment: "Amburana é sensacional, essa marca acertou em cheio na madeira. Aromática e zero queimação.", date: "2026-05-22" },
      { id: 105, user: "Clara R.", rating: 5, comment: "Minha favorita! O cheiro de canela preenche o copo. Maravilhosa.", date: "2026-05-24" }
    ]
  },
  {
    id: 4,
    name: "Cachaça Kethy Rios Jequitibá Rosa",
    tagline: "Maciez incomparável e suavidade floral sutil.",
    description: "Envelhecida por 2 anos em dornas de Jequitibá Rosa, esta cachaça surpreende pela neutralidade refinada e extrema suavidade. O Jequitibá Rosa amacia a cachaça sem mascarar suas qualidades originais da cana, conferindo discretas notas florais, herbáceas e frutadas, além de uma coloração levemente rosada e fascinante. Excelente para quem busca um destilado delicado e elegante.",
    price: 139.90,
    volume: "750ml",
    abv: "39%",
    wood: "Jequitibá Rosa",
    category: "Envelhecida",
    stock: 50,
    rating: 4.8,
    salesCount: 89,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecida 2 Anos", "Coloração levemente rosada", "Suavidade floral marcante"],
    details: {
      color: "Amarelo pálido com reflexos rosados",
      aroma: "Flores do campo, grama cortada e frutas brancas",
      taste: "Extremamente leve, macio, redondo",
      pairing: "Tábua de frios, carpaccio e massas leves com molho branco."
    },
    reviews: [
      { id: 106, user: "Sandra P.", rating: 5, comment: "Muito delicada, perfeita para o público feminino ou para quem não gosta de bebidas agressivas.", date: "2026-05-18" }
    ]
  },
  {
    id: 5,
    name: "Cachaça Kethy Rios Bálsamo Imperial",
    tagline: "Herbácea, mineral e de personalidade marcante.",
    description: "Para paladares exigentes que gostam de sabores rústicos e complexos. O envelhecimento de 3 anos em Bálsamo confere à cachaça uma cor dourada-esverdeada singular. Aromas intensos de especiarias secas, anis-estrelado, cravo e notas minerais. O sabor é levemente picante, seco e muito marcante. O Bálsamo é conhecido por deixar um retrogosto herbáceo refrescante que limpa as papilas gustativas.",
    price: 169.90,
    volume: "750ml",
    abv: "41%",
    wood: "Bálsamo",
    category: "Envelhecida",
    stock: 35,
    rating: 4.6,
    salesCount: 74,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecida 3 Anos", "Notas de anis e cravo", "Final herbáceo e refrescante"],
    details: {
      color: "Dourado com nuances esverdeadas",
      aroma: "Anis, erva-doce, madeira seca e especiarias",
      taste: "Seco, potente, picância moderada, retrogosto duradouro",
      pairing: "Churrasco gaúcho, costela bovina assada, pratos condimentados."
    },
    reviews: []
  },
  {
    id: 6,
    name: "Reserva Especial Kethy Rios 10 Anos",
    tagline: "Uma joia rara engarrafada. Lote único e exclusivo.",
    description: "Nossa cachaça mais prestigiada. Apenas duas barricas de carvalho francês foram reservadas por uma década inteira para gerar este néctar. De cor âmbar profunda, possui uma complexidade digna dos melhores cognacs mundiais. Notas complexas de tabaco, chocolate amargo, passas ao rum, castanhas tostadas e carvalho nobre. Um destilado encorpado, viscoso e inesquecível.",
    price: 850.00,
    volume: "750ml",
    abv: "42%",
    wood: "Carvalho Francês",
    category: "Reserva Especial",
    stock: 12,
    rating: 5.0,
    salesCount: 38,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecida 10 Anos", "Barril Único (Single Barrel)", "Garrafa numerada de cristal"],
    details: {
      color: "Âmbar escuro e oleoso",
      aroma: "Carvalho envelhecido, cacau, couro e ameixas secas",
      taste: "Encorpado, licoroso, caloroso e de longa duração",
      pairing: "Charuto cubano, queijos azuis (Gorgonzola/Roquefort) e chocolate belga 80%."
    },
    reviews: [
      { id: 107, user: "Luciano G.", rating: 5, comment: "Sem palavras. Uma obra-prima brasileira. Bate de frente com whiskies de 18 anos.", date: "2026-05-11" },
      { id: 108, user: "Eduardo F.", rating: 5, comment: "Exclusiva. Garrafa nº 87 está na minha cristaleira. Uma explosão de sabores.", date: "2026-05-19" }
    ]
  },
  {
    id: 7,
    name: "Cachaça Kethy Rios Castanheira Premium",
    tagline: "Dulçor natural com notas marcantes de castanhas e nozes.",
    description: "Envelhecida por 3 anos em tonéis de Castanheira do Pará. Esta madeira nacional diminui a acidez do destilado e enaltece o aroma adocicado da cana-de-açúcar, adicionando sabor amendoado requintado que remete a nozes, castanha-de-caju e amêndoas torradas. A bebida é macia e perfeita para consumo pura em temperatura ambiente.",
    price: 149.90,
    volume: "750ml",
    abv: "40%",
    wood: "Castanheira",
    category: "Envelhecida",
    stock: 40,
    rating: 4.8,
    salesCount: 65,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecida 3 Anos", "Madeira de Castanheira do Pará", "Sabor amendoado"],
    details: {
      color: "Dourado claro translúcido",
      aroma: "Castanhas, amêndoas e melaço de cana",
      taste: "Suave, macio, levemente oleoso no paladar",
      pairing: "Castanhas salgadas, risoto de cogumelos, sobremesas com nozes."
    },
    reviews: []
  },
  {
    id: 8,
    name: "Cachaça Kethy Rios Blend Três Madeiras",
    tagline: "O equilíbrio sublime entre Carvalho, Amburana e Bálsamo.",
    description: "Um blend meticulosamente desenhado por nosso Master Blender. Combinamos a doçura e as especiarias da Amburana (35%), a estrutura de baunilha do Carvalho Americano (45%) e o toque herbáceo e adocicado do Bálsamo (20%). O resultado é uma cachaça de altíssima complexidade tridimensional, mudando a cada gole e satisfazendo os paladares mais analíticos.",
    price: 199.90,
    volume: "750ml",
    abv: "40%",
    wood: "Blend (Carvalho/Amburana/Bálsamo)",
    category: "Envelhecida",
    stock: 28,
    rating: 4.9,
    salesCount: 110,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecimento Triplo", "Complexidade aromática premium", "Edição limitada"],
    details: {
      color: "Âmbar médio brilhante",
      aroma: "Baunilha, canela, especiarias secas e fundo floral",
      taste: "Entrada doce de canela, corpo amadeirado de carvalho e final fresco herbáceo",
      pairing: "Costelinha barbecue, pato assado ou saboreada pura como digestivo."
    },
    reviews: [
      { id: 109, user: "Carlos A.", rating: 5, comment: "Sensacional! As três madeiras se equilibram muito bem, nenhuma sobressai sobre a outra. Obra de mestre.", date: "2026-05-28" }
    ]
  },
  {
    id: 9,
    name: "Coquetel Sabor Canela",
    tagline: "A combinação perfeita entre o toque doce e picante da canela.",
    description: "A combinação perfeita entre o toque doce e picante da canela com a suavidade da cachaça. Ideal para momentos especiais e celebrações.",
    price: 79.90,
    volume: "500ml",
    abv: "25%",
    wood: "Sem Madeira",
    category: "Licor",
    stock: 80,
    rating: 4.7,
    salesCount: 175,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Mel Puro Silvestre", "Cítrico e Refrescante", "Teor Alcoólico Reduzido"],
    details: {
      color: "Amarelo turvo natural",
      aroma: "Mel de abelha fresco e raspas de limão",
      taste: "Doce equilibrado com acidez cítrica refrescante",
      pairing: "Torta de limão, cheesecake ou servido com gelo e hortelã."
    },
    reviews: [
      { id: 110, user: "Patrícia D.", rating: 4, comment: "Super gostoso, doce na medida certa e o cítrico do limão quebra a doçura do mel. Adorei!", date: "2026-05-14" }
    ]
  },
  {
    id: 10,
    name: "Coquetel Sabor Café",
    tagline: "A intensidade do café à suavidade da cachaça.",
    description: "Uma bebida marcante que une a intensidade do café à suavidade da cachaça. Pode ser apreciada pura, com gelo ou em receitas especiais.",
    price: 84.90,
    volume: "500ml",
    abv: "20%",
    wood: "Sem Madeira",
    category: "Licor",
    stock: 75,
    rating: 4.9,
    salesCount: 198,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Grãos 100% Arábica", "Textura cremosa premium", "Sabor de expresso e chocolate"],
    details: {
      color: "Marrom escuro cremoso (cor de café com leite)",
      aroma: "Café expresso moído na hora e chocolate meio amargo",
      taste: "Doce, cremoso, aveludado, presença marcante de café no retrogosto",
      pairing: "Sorvete de creme, petit gateau ou bebido puro bem gelado."
    },
    reviews: [
      { id: 111, user: "Bárbara S.", rating: 5, comment: "Incrível! Parece um cappuccino alcoólico premium. A consistência é muito boa.", date: "2026-05-17" }
    ]
  },
  {
    id: 11,
    name: "Cachaça Kethy Rios Ipê Premium",
    tagline: "O toque suave e adocicado do Ipê Amarelo.",
    description: "Envelhecida por 2 anos em barris de Ipê, esta cachaça possui uma cor amarelo-palha translúcida. O Ipê é conhecido por amaciar o destilado dando um caráter adocicado suave e diminuindo a acidez. No paladar, traz notas que remetem a açúcar mascavo e caldo de cana fresco, com final levemente condimentado.",
    price: 129.90,
    volume: "750ml",
    abv: "39%",
    wood: "Ipê",
    category: "Envelhecida",
    stock: 55,
    rating: 4.6,
    salesCount: 52,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecida 2 Anos", "Amaciamento natural", "Notas de cana fresca"],
    details: {
      color: "Amarelo palha claro",
      aroma: "Açúcar mascavo, caldo de cana e madeira suave",
      taste: "Leve, adocicado e de baixíssima acidez",
      pairing: "Bolinho de bacalhau, pastel de queijo e caldos quentes."
    },
    reviews: []
  },
  {
    id: 12,
    name: "Edição Especial Garuva 89248",
    tagline: "Uma homenagem à nossa terra de origem.",
    description: "Edição comemorativa que homenageia a cidade de Garuva/SC, origem de nosso envio e coração de nossa paixão. Esta cachaça é um blend especial de Carvalho Americano de primeiro uso e Amburana, envelhecidos por 4 anos. O rótulo traz um design clássico ilustrando a bela região serrana catarinense. Produção anual limitada de 1000 garrafas.",
    price: 249.90,
    volume: "750ml",
    abv: "41%",
    wood: "Blend (Carvalho/Amburana)",
    category: "Reserva Especial",
    stock: 25,
    rating: 4.9,
    salesCount: 88,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecida 4 Anos", "Edição Limitada e Numerada", "Homenagem à Garuva - SC"],
    details: {
      color: "Dourado acobreado",
      aroma: "Frutas secas, caramelo escuro e especiarias doces",
      taste: "Encorpado, doce balanceado, caloroso",
      pairing: "Defumados, embutidos artesanais da serra catarinense e carnes assadas no bafo."
    },
    reviews: [
      { id: 112, user: "Renan J.", rating: 5, comment: "Parabéns pela homenagem, a cachaça é de altíssimo nível. Carvalho muito presente com um toque doce da Amburana.", date: "2026-05-23" }
    ]
  },
  {
    id: 13,
    name: "Cachaça Kethy Rios Cristalina Orgânica",
    tagline: "Certificada orgânica do plantio ao engarrafamento.",
    description: "Produzida com cana-de-açúcar cultivada sem agrotóxicos ou fertilizantes químicos. A fermentação é natural com leveduras selvagens e a destilação ocorre em alambique de cobre alimentado por bagaço de cana. Descansada por 6 meses, entrega o sabor mais autêntico e limpo da cana orgânica com responsabilidade socioambiental.",
    price: 119.90,
    volume: "750ml",
    abv: "38%",
    wood: "Sem Madeira",
    category: "Prata",
    stock: 65,
    rating: 4.8,
    salesCount: 115,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Certificação Orgânica", "Fermentação Selvagem Natural", "Processo Sustentável"],
    details: {
      color: "Transparente e límpida",
      aroma: "Ervas frescas, cana fresca e terra úmida",
      taste: "Frescor vibrante, doçura de cana evidente",
      pairing: "Saladas com queijo de cabra, peixes grelhados, comida japonesa."
    },
    reviews: []
  },
  {
    id: 14,
    name: "Cachaça Kethy Rios Freijó",
    tagline: "O equilíbrio da madeira neutra da Amazônia.",
    description: "Envelhecida por 2 anos em barris de Freijó. Esta cachaça adquire um tom amarelo muito suave, quase imperceptível. O Freijó confere estabilidade ao destilado, mantendo as características sensoriais originais e adicionando leveza e frescor, com notas sutis de sementes e nozes.",
    price: 115.00,
    volume: "750ml",
    abv: "39%",
    wood: "Freijó",
    category: "Envelhecida",
    stock: 45,
    rating: 4.5,
    salesCount: 39,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecida 2 Anos", "Madeira Neutra de Freijó", "Aveludado leve"],
    details: {
      color: "Amarelo palha bem suave",
      aroma: "Sementes secas, cana e um toque amendoado sutil",
      taste: "Seco, limpo e muito suave na garganta",
      pairing: "Queijo coalho grelhado, pasteizinhos de palmito."
    },
    reviews: []
  },
  {
    id: 15,
    name: "Cachaça Kethy Rios Extra Premium Carvalho Francês",
    tagline: "A sofisticação europeia aplicada ao melhor destilado nacional.",
    description: "Cachaça envelhecida por 6 anos em barris de carvalho francês anteriormente utilizados para maturação de vinhos finos de Bordeaux. Apresenta notas sensoriais complexas de amêndoas torradas, chocolate amargo, melado, noz-moscada e um leve toque tânico de uvas passas. Um produto denso, encorpado e extremamente requintado.",
    price: 299.90,
    volume: "750ml",
    abv: "40%",
    wood: "Carvalho Francês",
    category: "Envelhecida",
    stock: 20,
    rating: 5.0,
    salesCount: 47,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecida 6 Anos", "Barris de Vinho Francês", "Notas de chocolate e uvas passas"],
    details: {
      color: "Âmbar acobreado profundo",
      aroma: "Frutas passas, chocolate belga, carvalho úmido",
      taste: "Encorpado, leve acidez tânica agradável, final aveludado e prolongado",
      pairing: "Torta de nozes, queijo Parmigiano Reggiano, carne de cordeiro assada."
    },
    reviews: [
      { id: 113, user: "Fabiano P.", rating: 5, comment: "Perfeita. A madeira francesa dá uma elegância indescritível para a cachaça. Parabéns!", date: "2026-05-16" }
    ]
  },
  {
    id: 16,
    name: "Cachaça Kethy Rios Ouro Express",
    tagline: "O melhor custo-benefício de envelhecimento.",
    description: "Nossa cachaça de entrada para os amantes de envelhecidas. Passa por 1 ano de envelhecimento em barris de carvalho americano de segundo uso. É levemente dourada, com notas sutis de caramelo e mel, ideal para quem quer uma cachaça dourada suave para o dia a dia ou para criar drinks sofisticados como o 'Rabo de Galo' e 'Old Fashioned Caipira'.",
    price: 99.90,
    volume: "750ml",
    abv: "39%",
    wood: "Carvalho Americano",
    category: "Envelhecida",
    stock: 90,
    rating: 4.6,
    salesCount: 154,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Envelhecida 1 Ano", "Ideal para Drinks", "Cor dourada suave"],
    details: {
      color: "Dourado palha brilhante",
      aroma: "Caramelo leve, melaço e madeira de carvalho",
      taste: "Suave, leve acidez, final curto e limpo",
      pairing: "Frango a passarinho, linguiça calabresa acebolada, batata frita."
    },
    reviews: []
  },
  {
    id: 17,
    name: "Cachaça Kethy Rios Prata Premium",
    tagline: "Descansada em Jequitibá por 1 ano para o máximo equilíbrio.",
    description: "Esta prata é descansada por 1 ano em grandes tonéis neutros de Jequitibá. O processo retira a agressividade do álcool recém-destilado, deixando a bebida redonda, macia e estável, porém sem alterar sua coloração cristalina original. Apresenta o frescor característico da prata, mas com uma doçura aveludada incomum.",
    price: 94.90,
    volume: "750ml",
    abv: "38%",
    wood: "Jequitibá (Neutro)",
    category: "Prata",
    stock: 85,
    rating: 4.8,
    salesCount: 122,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Descansada 1 Ano", "Máximo equilíbrio", "Totalmente cristalina"],
    details: {
      color: "Transparente e brilhante",
      aroma: "Flores brancas, caldo de cana morno",
      taste: "Super macio, redondo, zero ardência na garganta",
      pairing: "Caldinho de marisco, dadinhos de tapioca com geleia de pimenta."
    },
    reviews: [
      { id: 114, user: "Juliana K.", rating: 5, comment: "Incrível como ela é macia. Perfeita para tomar pura direto do congelador.", date: "2026-05-12" }
    ]
  },
  {
    id: 18,
    name: "Licor de Cachaça com Maracujá Gourmet",
    tagline: "A acidez tropical do maracujá com o corpo da cachaça.",
    description: "Um licor que equilibra perfeitamente a polpa e sementes do maracujá azedo com nossa cachaça prata de alambique. De sabor agridoce intenso, aroma tropical vibrante e teor alcoólico reduzido. Sirva super gelado, batido com gelo, ou use como calda para sorvetes de coco.",
    price: 79.90,
    volume: "500ml",
    abv: "22%",
    wood: "Sem Madeira",
    category: "Licor",
    stock: 70,
    rating: 4.7,
    salesCount: 135,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Polpa de Maracujá Real", "Agridoce Equilibrado", "Sabor Tropical Intenso"],
    details: {
      color: "Amarelo dourado intenso, com sementes decorativas",
      aroma: "Maracujá fresco, sementes cítricas e melaço",
      taste: "Início doce e aveludado com final ácido, fresco e frutado",
      pairing: "Mousse de coco, sorvete de baunilha, bolo de mandioca."
    },
    reviews: []
  },
  {
    id: 19,
    name: "Cachaça Kethy Rios Ouro Imperial 1 Litro",
    tagline: "Nossa consagrada Ouro em tamanho ideal para presentear ou compartilhar.",
    description: "O mesmo sabor excepcional da nossa envelhecida em Carvalho Americano por 5 anos, agora em garrafa luxuosa de 1 litro. Uma excelente opção para presentear amigos queridos, reuniões familiares ou para abastecer o bar doméstico com um produto de altíssima qualidade de fabricação e refinamento estético.",
    price: 229.90,
    volume: "1000ml",
    abv: "40%",
    wood: "Carvalho Americano",
    category: "Envelhecida",
    stock: 30,
    rating: 4.9,
    salesCount: 95,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Garrafa Família 1 Litro", "Envelhecida 5 Anos em Carvalho", "Embalagem premium para presente"],
    details: {
      color: "Dourado intenso",
      aroma: "Baunilha, coco queimado, tabaco suave e carvalho",
      taste: "Sedoso, doçura de caramelo, retrogosto macio e persistente",
      pairing: "Carnes grelhadas na brasa, fondue de queijo."
    },
    reviews: [
      { id: 115, user: "Marcos V.", rating: 5, comment: "Garrafa monumental. Fica linda no bar. O sabor é o mesmo espetáculo da garrafa de 750ml.", date: "2026-05-25" }
    ]
  },
  {
    id: 20,
    name: "Cachaça Kethy Rios Miniatura Ouro & Prata (Kit)",
    tagline: "O presente perfeito para degustação das nossas principais joias.",
    description: "Kit degustação contendo duas garrafas miniatura de vidro de 50ml cada: uma Cachaça Ouro Premium (Carvalho Americano) e uma Cachaça Prata Cristal. Acompanha caixa cartonada luxuosa revestida de veludo preto com descrições das madeiras e copinho shot personalizado de cristal com o logotipo dourado Kethy Rios gravado.",
    price: 69.90,
    volume: "2x 50ml",
    abv: "38% - 40%",
    wood: "Carvalho Americano / Sem Madeira",
    category: "Kit Presente",
    stock: 110,
    rating: 4.9,
    salesCount: 240,
    images: ["img/produto.jpg", "img/produto.jpg"],
    features: ["Kit com 2 miniaturas de 50ml", "Copinho shot de cristal incluso", "Caixa luxuosa de presente"],
    details: {
      color: "Uma dourada e uma incolor",
      aroma: "Aromas ricos de baunilha (ouro) e herbáceo fresco (prata)",
      taste: "Duas experiências sensoriais completas da nossa destilaria",
      pairing: "Ideal para dar de presente em casamentos, datas festivas e eventos corporativos."
    },
    reviews: [
      { id: 116, user: "Liliane O.", rating: 5, comment: "Lindo kit de lembrança. O copinho é super delicado. Vale muito a pena.", date: "2026-05-14" },
      { id: 117, user: "Thiago H.", rating: 5, comment: "Excelente para experimentar as cachaças antes de comprar a garrafa grande. Acabei comprando as duas!", date: "2026-05-21" }
    ]
  }
];
