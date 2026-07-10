#!/usr/bin/env node

/**
 * Script de seed data para popular as APIs do Rádio Coringão
 * Uso: node seed-data.js
 */

const SPORTS_NEWS_API = 'http://localhost:3007/api';
const CLUBE_API = 'http://localhost:3010/api';

// ============================================================
// DADOS DO CORINTHIANS
// ============================================================
const CORINTHIANS = {
  id: 'corinthians-main',
  name: 'Sport Club Corinthians Paulista',
  shortName: 'COR',
  foundedYear: 1910,
  city: 'São Paulo',
  state: 'SP',
  country: 'Brasil',
  stadium: 'Neo Química Arena',
  website: 'https://www.corinthians.com.br',
  color: '#000000',
};

// ============================================================
// ADVERSÁRIOS (BRAZILEIRÃO SÉRIE A)
// ============================================================
const OPPONENTS = [
  { name: 'Palmeiras', shortName: 'PAL', color: '#006437', stadium: 'Allianz Parque', city: 'São Paulo' },
  { name: 'São Paulo', shortName: 'SPF', color: '#EE2523', stadium: 'Morumbis', city: 'São Paulo' },
  { name: 'Santos', shortName: 'SAN', color: '#000000', stadium: 'Vila Belmiro', city: 'Santos' },
  { name: 'Flamengo', shortName: 'FLA', color: '#E31D1D', stadium: 'Maracanã', city: 'Rio de Janeiro' },
  { name: 'Fluminense', shortName: 'FLU', color: '#8B0023', stadium: 'Maracanã', city: 'Rio de Janeiro' },
  { name: 'Botafogo', shortName: 'BOT', color: '#000000', stadium: 'Nilton Santos', city: 'Rio de Janeiro' },
  { name: 'Vasco da Gama', shortName: 'VAS', color: '#000000', stadium: 'São Januário', city: 'Rio de Janeiro' },
  { name: 'Grêmio', shortName: 'GRE', color: '#0068AB', stadium: 'Arena do Grêmio', city: 'Porto Alegre' },
  { name: 'Internacional', shortName: 'INT', color: '#D20F24', stadium: 'Beira-Rio', city: 'Porto Alegre' },
  { name: 'Cruzeiro', shortName: 'CRU', color: '#003DA5', stadium: 'Mineirão', city: 'Belo Horizonte' },
  { name: 'Atlético Mineiro', shortName: 'CAM', color: '#000000', stadium: 'Arena Independência', city: 'Belo Horizonte' },
  { name: 'Bahia', shortName: 'BAH', color: '#003DA5', stadium: 'Arena Fonte Nova', city: 'Salvador' },
  { name: 'Fortaleza', shortName: 'FOR', color: '#003DA5', stadium: 'Castelão', city: 'Fortaleza' },
  { name: 'Athletico Paranaense', shortName: 'CAP', color: '#D20F24', stadium: 'Arena da Baixada', city: 'Curitiba' },
  { name: 'Coritiba', shortName: 'CFC', color: '#006633', stadium: 'Couto Pereira', city: 'Curitiba' },
  { name: 'São Bernardo', shortName: 'SBC', color: '#006633', stadium: 'Naturalismo', city: 'São Bernardo do Campo' },
  { name: 'Mirassol', shortName: 'MIR', color: '#009B3A', stadium: 'José Maria de Campos Maia', city: 'Mirassol' },
  { name: 'Criciúma', shortName: 'CRI', color: '#006633', stadium: 'Heriberto Hülse', city: 'Criciúma' },
  { name: 'Juventude', shortName: 'JUV', color: '#006633', stadium: 'Alfredo Jaconi', city: 'Caxias do Sul' },
  { name: 'Vitória', shortName: 'VIT', color: '#D20F24', stadium: 'Barradão', city: 'Salvador' },
];

// ============================================================
// CATEGORIAS ESPORTIVAS
// ============================================================
const CATEGORIES = [
  { name: 'Futebol', slug: 'futebol', gender: 'MALE', modality: 'FOOTBALL', children: [
    { name: 'Principal Masculino', slug: 'futebol-principal', gender: 'MALE' },
    { name: 'Futebol Feminino', slug: 'futebol-feminino', gender: 'FEMALE' },
    { name: 'Sub-20', slug: 'futebol-sub-20', gender: 'MALE' },
    { name: 'Sub-17', slug: 'futebol-sub-17', gender: 'MALE' },
  ]},
  { name: 'Basquete', slug: 'basquete', gender: 'MALE', modality: 'BASKETBALL', children: [
    { name: 'Basquete Masculino', slug: 'basquete-masculino', gender: 'MALE' },
    { name: 'Basquete Feminino', slug: 'basquete-feminino', gender: 'FEMALE' },
  ]},
  { name: 'Futsal', slug: 'futsal', gender: 'MALE', modality: 'FUTSAL', children: [
    { name: 'Futsal Masculino', slug: 'futsal-masculino', gender: 'MALE' },
    { name: 'Futsal Feminino', slug: 'futsal-feminino', gender: 'FEMALE' },
  ]},
  { name: 'Vôlei', slug: 'volei', gender: 'MALE', modality: 'VOLLEYBALL', children: [
    { name: 'Vôlei Masculino', slug: 'volei-masculino', gender: 'MALE' },
    { name: 'Vôlei Feminino', slug: 'volei-feminino', gender: 'FEMALE' },
  ]},
];

// ============================================================
// ARTIGOS (30 notícias)
// ============================================================
const ARTICLES = [
  // Futebol Principal (10)
  { title: 'Corinthians goleia rival e assume liderança do Brasileirão', category: 'Futebol', type: 'NEWS', content: '<p>O Corinthians venceu por 4 a 1 o clássico contra o Palmeiras em plena Neo Química Arena. Com gols de Yuri Alberto, Memphis Depay, Maycon e Roger Guedes, o Timão assumiu a liderança do campeonato brasileiro.</p><p>A equipe comandada por Antônio Carlos Zago apresentou um futebol ofensivo e dominou do início ao fim. O primeiro tempo já terminava 3 a 0, com atuações brilhantes do meio-campo.</p><p>Com esta vitória, o Corinthians soma 65 pontos e abre 3 pontos de vantagem sobre o segundo colocado.</p>' },
  { title: 'Memphis Depay brilha e Corinthians vence na Neo Química Arena', category: 'Futebol', type: 'ANALYSIS', content: '<p>O neerlandês Memphis Depay continuou sua série de ótimas apresentações com mais um gol e duas assistências na vitória do Corinthians sobre o Botafogo.</p><p>Desde sua chegada ao Timão, o atacante tem sido decisivo em importantíssimas partidas, contribuindo com 12 gols e 8 assistências na temporada.</p><p>"Estou muito feliz aqui. O Corinthians é um clube enorme e estou ajudando o time a conquistar títulos", declarou Memphis após o jogo.</p>' },
  { title: 'Yuri Alberto é eleito melhor jogador do mês no Brasileirão', category: 'Futebol', type: 'NEWS', content: '<p>O centroavante Yuri Alberto foi eleito o melhor jogador do mês no Campeonato Brasileiro. O atacante marcou 6 gols e deu 3 assistências em julho.</p><p>A premiação reforça a fase do jogador, que se consolidou como um dos principais artilheiros da temporada.</p><p>Yuri Alberto agradeceu os torcedores e prometeu continuar trabalhando para o bem do clube.</p>' },
  { title: 'Corinthians anuncia renovação de contrato com Hugo Souza', category: 'Futebol', type: 'NEWS', content: '<p>O Sport Club Corinthians Paulista anunciou a renovação de contrato do goleiro Hugo Souza até dezembro de 2027. O camisa 12 é um dos líderes da equipe.</p><p>Hugo Souza tem apresentado atuações sólidas e é fundamental para a defesa corintiana.</p><p>"O Corinthians é minha casa. Quero conquistar títulos aqui", disse o goleiro na coletiva de imprensa.</p>' },
  { title: 'Análise: Como o 4-3-3 de Antônio Carlos Zago transformou o Timão', category: 'Futebol', type: 'ANALYSIS', content: '<p>A chegada de Antônio Carlos Zago ao comando técnico do Corinthians marcou uma reviravolta na temporada. O técnico implementou um 4-3-3 ofensivo que tem dado resultados.</p><p>Com mais posse de bola e movimentação constante dos alas, o Corinthians passou a criar mais chances de gol e marcar com mais frequência.</p><p>O esquema tático permite que Memphis Depay atue mais livre, conectando meio-campo e ataque.</p>' },
  { title: 'Roger Guedes volta de lesão e volta a ser titular do Timão', category: 'Futebol', type: 'NEWS', content: '<p>O meia Roger Guedes está de volta após 30 dias de recuperação de uma lesão no joelho. O jogador já treina normalmente e deve reaparecer no próximo jogo.</p><p>A volta de Guedes é uma grande notícia para o Corinthians, que perdeu um dos principais jogadores em momentos importantes.</p><p>"Estou ansioso para voltar a ajudar o time. A lesão foi difícil, mas superada", disse o jogador.</p>' },
  { title: 'Corinthians goleia Taubaté e avança na Copa do Brasil', category: 'Futebol', type: 'NEWS', content: '<p>O Corinthians avançou para as oitavas de final da Copa do Brasil após golear o Taubaté por 5 a 0 na Neo Química Arena. Com a vitória, o Timão garantiu classificação com tranquilidade.</p><p>Gols de Yuri Alberto (2), Maycon, Cássio e um gol contra definiram o placar.</p><p>O técnico Antônio Carlos Zago elogiou a atuação da equipe e disse estar confiante na campanha do torneio.</p>' },
  { title: 'Entrevista: Maycon fala sobre sua forma física e objetivos', category: 'Futebol', type: 'INTERVIEW', content: '<p>O volante Maycon concedeu entrevista exclusiva ao Rádio Coringão e falou sobre sua recuperação de lesão e expectativas para o restante da temporada.</p><p>"Passei por um momento difícil com a lesão, mas agora estou 100%. O trabalho da comissão técnica é fundamental para minha recuperação", disse Maycon.</p><p>O jogador também falou sobre os objetivos do time: "Queremos o Brasileirão e a Copa do Brasil. O Corinthians merece títulos".</p>' },
  { title: 'Corinthians x Palmeiras: tudo sobre o maior clássico do Brasil', category: 'Futebol', type: 'NEWS', content: '<p>O Derby Paulista volta a reunir Corinthians e Palmeiras neste domingo, às 16h, na Neo Química Arena. O jogo válido pela 25ª rodada do Brasileirão promete ser intenso.</p><p>O Corinthians chega ao jogo na liderança, enquanto o Palmeira tenta aproximar-se na tabela.</p><p>Expectativa de público recorde para o clássico mais disputado do futebol brasileiro.</p>' },
  { title: 'Comissão técnica do Corinthians elogia evolução do elenco', category: 'Futebol', type: 'ANALYSIS', content: '<p>A comissão técnica do Corinthians destacou a evolução do elenco ao longo da temporada. O técnico Antônio Carlos Zago apontou a melhoria no físico e tático.</p><p>"Os jogadores estão mais preparados fisicamente e mentalmente. Isso reflete nos resultados", disse o auxiliar-técnico.</p><p>O trabalho de preparação física tem sido destacado como um dos fatores do sucesso da equipe.</p>' },
  // Futebol Feminino (5)
  { title: 'Corinthians Feminino conquista o Paulistão Feminino', category: 'Futebol', type: 'NEWS', content: '<p>O Corinthians Feminino conquistou o Campeonato Paulista Feminino após vencer o São Paulo por 2 a 1 na final. A equipe comandada por Arthur Elias voltou a levantar um título.</p><p>Com gols de Millene e Tamires, o Timão Feminino consolidou sua hegemonia no futebol feminino paulista.</p><p>A conquista é a 12ª vez que o Corinthians levanta o troféu do Paulistão Feminino.</p>' },
  { title: 'Tamires é eleita melhor lateral-esquerda do Brasil', category: 'Futebol', type: 'NEWS', content: '<p>A zagueira/lateral Tamires foi eleita a melhor lateral-esquerda do futebol feminino brasileiro em cerimônia realizada em São Paulo.</p><p>A jogadora do Corinthians destacou-se pela consistência e importância na defesa do Timão Feminino.</p><p>"Essa premiação é fruto do trabalho coletivo. Agradeço ao Corinthians pela confiança", declarou Tamires.</p>' },
  { title: 'Corinthians Feminino goleia na estreia do Brasileirão', category: 'Futebol', type: 'NEWS', content: '<p>O Corinthians Feminino estreou com vitória goleada no Brasileirão Feminino, vencendo o Ferroviária por 4 a 0. A equipe mostrou força ofensiva desde o início.</p><p>Millene marcou dois gols e Virgínia fez mais dois na goleada que animou a torcida.</p><p>A próxima partida será contra o Palmeiras Feminino, em clássico válido pela 2ª rodada.</p>' },
  { title: 'Entrevista: Millene fala sobre temporada e títulos', category: 'Futebol', type: 'INTERVIEW', content: '<p>A atacante Millene concedeu entrevista exclusiva ao Rádio Coringão e falou sobre a temporada do Corinthians Feminino.</p><p>"Estamos trabalhando muito para conquistar mais um título. O Corinthians é o maior do Brasil no futebol feminino", disse Millene.</p><p>A jogadora destacou a importância do trabalho coletivo e do apoio da torcida.</p>' },
  { title: 'Corinthians Feminino busca tetracampeonato no Paulistão', category: 'Futebol', type: 'ANALYSIS', content: '<p>O Corinthians Feminino busca o tetracampeonato consecutivo do Campeonato Paulista Feminino. A equipe é a grande favorita para mais uma conquista.</p><p>Com um elenco forte e experiente, o Timão Feminino tem tudo para repetir o sucesso dos últimos anos.</p><p>As principais rivais são São Paulo e Palmeiras, que reforçaram seus elencos para a temporada.</p>' },
  // Basquete (5)
  { title: 'Corinthians Basquete vence o Franca na Liga Nacional', category: 'Basquete', type: 'NEWS', content: '<p>O Corinthians Basquete venceu o Franca por 85 a 78 em partida válida pela Liga Nacional de Basquete. A equipe corintiana mostrou solidez defensiva.</p><p>Com a vitória, o Corinthians soma 18 pontos e mantém-se na zona de classificação para os playoffs.</p><p>O técnico elogiou a atuação coletiva e a eficiência nas finalizações de três pontos.</p>' },
  { title: 'Base do Corinthians Basquete revela novo talento', category: 'Basquete', type: 'NEWS', content: '<p>A base do Corinthians Basquete revelou mais um talento. O armador Lucas Silva, de 19 anos, foi convocado para a seleção brasileira sub-21.</p><p>O jogador tem se destacado nas categorias de base e já integra o elenco profissional.</p><p>"O Corinthians tem uma das melhores escolas de basquete do Brasil. Estou orgulhoso de representar o Timão", disse Lucas.</p>' },
  { title: 'Corinthians Basquete anuncia reforço para a temporada', category: 'Basquete', type: 'NEWS', content: '<p>O Corinthians Basquete anunciou a contratação do pivô norte-americano Michael Johnson para a temporada 2025. O jogador tem experiência em ligas europeias.</p><p>A contratação reforça o compromisso do clube com o basquete profissional.</p><p>Johnson chegará ao Brasil na próxima semana para se integrar ao elenco.</p>' },
  { title: 'Análise: Corinthians Basquete pode chegar aos playoffs', category: 'Basquete', type: 'ANALYSIS', content: '<p>Após um início irregular, o Corinthians Basquete encontra-se em crescimento na Liga Nacional. A equipe conquistou 4 vitórias nas últimas 5 partidas.</p><p>O trabalho do técnico e a melhoria do elenco são apontados como fatores decisivos.</p><p>Se mantiver o ritmo, o Timão pode garantir vaga nos playoffs pela primeira vez em 5 anos.</p>' },
  { title: 'Corinthians Basquete recebe o Flamengo em clássico', category: 'Basquete', type: 'NEWS', content: '<p>O Corinthians Basquete recebe o Flamengo neste sábado, às 18h, no Ginásio da PUC. O clássico válido pela Liga Nacional promete ser disputado.</p><p>Ambas as equipes chegam ao jogo com vitórias recentes e querem se consolidar na tabela.</p><p>Ingressos já estão à venda no site do clube e no estádio.</p>' },
  // Futsal (5)
  { title: 'Corinthians Futsal conquista o Campeonato Paulista', category: 'Futsal', type: 'NEWS', content: '<p>O Corinthians Futsal conquistou o Campeonato Paulista de Futsal após vencer oMagnus por 3 a 2 na final. A equipe corintiana voltou a levantar o troféu.</p><p>Com gols de Ferrugem, Dieguinho e Rafa Santos, o Timão garantiu a classificação para a Libertadores.</p><p>A conquista é a 8ª vez que o Corinthians vence o Paulistão de Futsal.</p>' },
  { title: 'Ferrugem é eleito melhor jogador do Paulistão de Futsal', category: 'Futsal', type: 'NEWS', content: '<p>O lateral Ferrugem foi eleito o melhor jogador do Campeonato Paulista de Futsal. O jogador do Corinthians marcou 15 gols na competição.</p><p>A premiação coroou uma temporada excepcional do atleta.</p><p>"Agradeço ao Corinthians e aos torcedores. Esse prêmio é para todos nós", disse Ferrugem.</p>' },
  { title: 'Corinthians Futsal busca título da Libertadores', category: 'Futsal', type: 'ANALYSIS', content: '<p>O Corinthians Futsal busca o título da Copa Libertadores de Futsal. A equipe é uma das favoritas para a conquista do torneio continental.</p><p>Com um elenco experiente e técnico de renome, o Timão tem tudo para brigar pelo título.</p><p>A competição será disputada em maio, no Paraguai.</p>' },
  { title: 'Base do Corinthians Futsal revela talentos', category: 'Futsal', type: 'NEWS', content: '<p>A base do Corinthians Futsal continua revelando talentos. O jovem zagueiro Pedro Henrique, de 18 anos, foi convocado para a seleção brasileira sub-20.</p><p>O jogador tem se destacado nas categorias de base e já integra o elenco profissional.</p><p>"O Corinthians é uma escola de futsal. Estou aprendendo muito aqui", disse Pedro Henrique.</p>' },
  { title: 'Corinthians Futsal vence o Carlos Drummond na Arena', category: 'Futsal', type: 'NEWS', content: '<p>O Corinthians Futsal venceu o Carlos Drummond por 4 a 1 em partida válida pelo Campeonato Paulista. A equipe mostrou superioridade técnica.</p><p>Com a vitória, o Corinthians soma 25 pontos e mantém-se na liderança do campeonato.</p><p>O técnico elogiou a atuação da equipe e a eficiência nas finalizações.</p>' },
  // Vôlei (5)
  { title: 'Corinthians Vôlei conquista a Superliga Feminina', category: 'Vôlei', type: 'NEWS', content: '<p>O Corinthians Vôlei Feminino conquistou a Superliga Feminina de Vôlei após vencer o Minas por 3 a 1 na final. A equipe corintiana voltou a levantar o troféu.</p><p>Com atuações brilhantes de Gabi e Macris, o Timão garantiu mais um título histórico.</p><p>A conquista é a 3ª vez que o Corinthians vence a Superliga Feminina.</p>' },
  { title: 'Gabi é eleita melhor ponteira da Superliga', category: 'Vôlei', type: 'NEWS', content: '<p>A ponteira Gabi foi eleita a melhor jogadora da Superliga Feminina de Vôlei. A atleta do Corinthians marcou 45 pontos na final.</p><p>A premiação coroou uma temporada excepcional da jogadora.</p><p>"Estou muito feliz com essa premiação. O Corinthians é meu lar", disse Gabi.</p>' },
  { title: 'Corinthians Vôlei Masculino busca vaga nos playoffs', category: 'Vôlei', type: 'ANALYSIS', content: '<p>O Corinthians Vôlei Masculino encontra-se em zona de playoffs na Superliga Masculina. A equipe conquistou 3 vitórias nas últimas 5 partidas.</p><p>O trabalho do técnico e a melhoria do elenco são apontados como fatores decisivos.</p><p>Se mantiver o ritmo, o Timão pode garantir vaga nos playoffs pela primeira vez em 3 anos.</p>' },
  { title: 'Corinthians Vôlei recebe o Sesi-SP em clássico', category: 'Vôlei', type: 'NEWS', content: '<p>O Corinthians Vôlei recebe o Sesi-SP neste sábado, às 17h, no Ginásio da PUC. O clássico válido pela Superliga Feminina promete ser disputado.</p><p>Ambas as equipes chegam ao jogo com vitórias recentes e querem se consolidar na tabela.</p><p>Ingressos já estão à venda no site do clube e no estádio.</p>' },
  { title: 'Base do Corinthians Vôlei revela novo talento', category: 'Vôlei', type: 'NEWS', content: '<p>A base do Corinthians Vôlei revelou mais um talento. A levantadora Ana Paula, de 18 anos, foi convocada para a seleção brasileira sub-21.</p><p>A jogadora tem se destacado nas categorias de base e já integra o elenco profissional.</p><p>"O Corinthians tem uma das melhores escolas de vôlei do Brasil. Estou orgulhosa de representar o Timão", disse Ana Paula.</p>' },
];

// ============================================================
// ELENCO (Jogadores por categoria)
// ============================================================
const SQUAD_PLAYERS = [
  // Futebol Principal Masculino
  { name: 'Hugo Souza', position: 'Goleiro', shirtNumber: 1, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Fagner', position: 'Lateral', shirtNumber: 2, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Gustavo Henrique', position: 'Zagueiro', shirtNumber: 3, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Caetano', position: 'Zagueiro', shirtNumber: 4, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Caíque', position: 'Lateral', shirtNumber: 6, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Raniele', position: 'Volante', shirtNumber: 5, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Maycon', position: 'Volante', shirtNumber: 7, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Charles', position: 'Meia', shirtNumber: 8, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Memphis Depay', position: 'Atacante', shirtNumber: 9, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Yuri Alberto', position: 'Centroavante', shirtNumber: 10, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Pedro Henrique', position: 'Ponta', shirtNumber: 11, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Cássio', position: 'Goleiro', shirtNumber: 12, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Matheuzinho', position: 'Lateral', shirtNumber: 13, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Bruno Méndez', position: 'Zagueiro', shirtNumber: 14, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Paulinho', position: 'Volante', shirtNumber: 15, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Roger Guedes', position: 'Meia', shirtNumber: 16, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Ángel Romero', position: 'Ponta', shirtNumber: 17, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Cuaresma', position: 'Zagueiro', shirtNumber: 18, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Lucas Piton', position: 'Lateral', shirtNumber: 19, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Wesley', position: 'Volante', shirtNumber: 20, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Raúl Gustavo', position: 'Zagueiro', shirtNumber: 21, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Igor Torres', position: 'Ponta', shirtNumber: 22, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Felix Torres', position: 'Zagueiro', shirtNumber: 23, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Breno Bidon', position: 'Meia', shirtNumber: 24, category: 'Futebol', subcategory: 'Principal Masculino' },
  { name: 'Arthur Sousa', position: 'Centroavante', shirtNumber: 25, category: 'Futebol', subcategory: 'Principal Masculino' },
  // Futebol Feminino
  { name: 'Marcelle', position: 'Goleiro', shirtNumber: 1, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Tamires', position: 'Zagueiro', shirtNumber: 2, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Tamine', position: 'Lateral', shirtNumber: 3, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Ingrid', position: 'Zagueiro', shirtNumber: 4, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Yaya', position: 'Lateral', shirtNumber: 5, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Formiga', position: 'Volante', shirtNumber: 6, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Vitinha', position: 'Meia', shirtNumber: 7, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Duda', position: 'Meia', shirtNumber: 8, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Millene', position: 'Atacante', shirtNumber: 9, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Jheniffer', position: 'Centroavante', shirtNumber: 10, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Gabi Portilho', position: 'Ponta', shirtNumber: 11, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Nicoly', position: 'Ponta', shirtNumber: 17, category: 'Futebol', subcategory: 'Futebol Feminino' },
  { name: 'Fernanda', position: 'Volante', shirtNumber: 20, category: 'Futebol', subcategory: 'Futebol Feminino' },
  // Basquete Masculino
  { name: 'Lucas Silva', position: 'Armador', shirtNumber: 4, category: 'Basquete', subcategory: 'Basquete Masculino' },
  { name: 'Michael Johnson', position: 'Pivô', shirtNumber: 5, category: 'Basquete', subcategory: 'Basquete Masculino' },
  { name: 'Rafael Mineiro', position: 'Ala', shirtNumber: 6, category: 'Basquete', subcategory: 'Basquete Masculino' },
  { name: 'Vítor Benite', position: 'Ala', shirtNumber: 7, category: 'Basquete', subcategory: 'Basquete Masculino' },
  { name: 'Leonardo Meindl', position: 'Pivô', shirtNumber: 8, category: 'Basquete', subcategory: 'Basquete Masculino' },
  { name: 'Alex Garcia', position: 'Armador', shirtNumber: 9, category: 'Basquete', subcategory: 'Basquete Masculino' },
  { name: 'Cordero Bennett', position: 'Ala', shirtNumber: 10, category: 'Basquete', subcategory: 'Basquete Masculino' },
  { name: 'William Artur', position: 'Pivô', shirtNumber: 11, category: 'Basquete', subcategory: 'Basquete Masculino' },
  // Futsal Masculino
  { name: 'Ferrugem', position: 'Lateral', shirtNumber: 2, category: 'Futsal', subcategory: 'Futsal Masculino' },
  { name: 'Dieguinho', position: 'Ala', shirtNumber: 3, category: 'Futsal', subcategory: 'Futsal Masculino' },
  { name: 'Rafa Santos', position: 'Pivô', shirtNumber: 9, category: 'Futsal', subcategory: 'Futsal Masculino' },
  { name: 'Léo Nascimento', position: 'Ala', shirtNumber: 7, category: 'Futsal', subcategory: 'Futsal Masculino' },
  { name: 'Billy', position: 'Goleiro', shirtNumber: 1, category: 'Futsal', subcategory: 'Futsal Masculino' },
  { name: 'Pipoca', position: 'Ala', shirtNumber: 10, category: 'Futsal', subcategory: 'Futsal Masculino' },
  { name: 'Marcelo', position: 'Fixo', shirtNumber: 4, category: 'Futsal', subcategory: 'Futsal Masculino' },
  // Vôlei Feminino
  { name: 'Gabi', position: 'Ponteira', shirtNumber: 1, category: 'Vôlei', subcategory: 'Vôlei Feminino' },
  { name: 'Macris', position: 'Levantadora', shirtNumber: 2, category: 'Vôlei', subcategory: 'Vôlei Feminino' },
  { name: 'Daniele Lins', position: 'Oposta', shirtNumber: 3, category: 'Vôlei', subcategory: 'Vôlei Feminino' },
  { name: 'Kasiely', position: 'Central', shirtNumber: 4, category: 'Vôlei', subcategory: 'Vôlei Feminino' },
  { name: 'Regiane', position: 'Ponteira', shirtNumber: 5, category: 'Vôlei', subcategory: 'Vôlei Feminino' },
  { name: 'Anielle', position: 'Líbero', shirtNumber: 6, category: 'Vôlei', subcategory: 'Vôlei Feminino' },
  { name: 'Joyce', position: 'Central', shirtNumber: 7, category: 'Vôlei', subcategory: 'Vôlei Feminino' },
  { name: 'Tandara', position: 'Oposta', shirtNumber: 8, category: 'Vôlei', subcategory: 'Vôlei Feminino' },
];

// ============================================================
// COMPETIÇÕES
// ============================================================
const COMPETITIONS = [
  { name: 'Brasileirão Série A', season: '2025', category: 'Futebol', subcategory: 'Principal Masculino', tableFormat: 'single' },
  { name: 'Copa do Brasil', season: '2025', category: 'Futebol', subcategory: 'Principal Masculino', tableFormat: 'single' },
  { name: 'Paulistão', season: '2025', category: 'Futebol', subcategory: 'Principal Masculino', tableFormat: 'single' },
  { name: 'Libertadores', season: '2025', category: 'Futebol', subcategory: 'Principal Masculino', tableFormat: 'single' },
  { name: 'Paulistão Feminino', season: '2025', category: 'Futebol', subcategory: 'Futebol Feminino', tableFormat: 'single' },
  { name: 'Brasileirão Feminino', season: '2025', category: 'Futebol', subcategory: 'Futebol Feminino', tableFormat: 'single' },
  { name: 'Copa Libertadores Feminina', season: '2025', category: 'Futebol', subcategory: 'Futebol Feminino', tableFormat: 'single' },
  { name: 'Liga Nacional', season: '2025', category: 'Basquete', subcategory: 'Basquete Masculino', tableFormat: 'single' },
  { name: 'Copa Super 8', season: '2025', category: 'Basquete', subcategory: 'Basquete Masculino', tableFormat: 'single' },
  { name: 'Paulistão de Futsal', season: '2025', category: 'Futsal', subcategory: 'Futsal Masculino', tableFormat: 'single' },
  { name: 'Liga Nacional de Futsal', season: '2025', category: 'Futsal', subcategory: 'Futsal Masculino', tableFormat: 'single' },
  { name: 'Libertadores de Futsal', season: '2025', category: 'Futsal', subcategory: 'Futsal Masculino', tableFormat: 'single' },
  { name: 'Superliga Feminina', season: '2025', category: 'Vôlei', subcategory: 'Vôlei Feminino', tableFormat: 'single' },
  { name: 'Superliga Masculina', season: '2025', category: 'Vôlei', subcategory: 'Vôlei Feminino', tableFormat: 'single' },
];

// ============================================================
// CLASSIFICAÇÕES (Brasileirão Série A - 20 times)
// ============================================================
const STANDINGS = [
  { position: 1, teamName: 'Corinthians', points: 65, matches: 28, wins: 20, draws: 5, losses: 3, goalsFor: 58, goalsAgainst: 22 },
  { position: 2, teamName: 'Palmeiras', points: 62, matches: 28, wins: 19, draws: 5, losses: 4, goalsFor: 52, goalsAgainst: 20 },
  { position: 3, teamName: 'Flamengo', points: 58, matches: 28, wins: 17, draws: 7, losses: 4, goalsFor: 48, goalsAgainst: 25 },
  { position: 4, teamName: 'São Paulo', points: 55, matches: 28, wins: 16, draws: 7, losses: 5, goalsFor: 45, goalsAgainst: 28 },
  { position: 5, teamName: 'Botafogo', points: 52, matches: 28, wins: 15, draws: 7, losses: 6, goalsFor: 42, goalsAgainst: 26 },
  { position: 6, teamName: 'Fortaleza', points: 50, matches: 28, wins: 14, draws: 8, losses: 6, goalsFor: 40, goalsAgainst: 24 },
  { position: 7, teamName: 'Bahia', points: 48, matches: 28, wins: 13, draws: 9, losses: 6, goalsFor: 38, goalsAgainst: 26 },
  { position: 8, teamName: 'Grêmio', points: 46, matches: 28, wins: 12, draws: 10, losses: 6, goalsFor: 36, goalsAgainst: 28 },
  { position: 9, teamName: 'Internacional', points: 44, matches: 28, wins: 12, draws: 8, losses: 8, goalsFor: 34, goalsAgainst: 30 },
  { position: 10, teamName: 'Athletico Paranaense', points: 42, matches: 28, wins: 11, draws: 9, losses: 8, goalsFor: 32, goalsAgainst: 30 },
  { position: 11, teamName: 'Santos', points: 40, matches: 28, wins: 11, draws: 7, losses: 10, goalsFor: 30, goalsAgainst: 32 },
  { position: 12, teamName: 'Cruzeiro', points: 38, matches: 28, wins: 10, draws: 8, losses: 10, goalsFor: 28, goalsAgainst: 32 },
  { position: 13, teamName: 'Vasco da Gama', points: 36, matches: 28, wins: 10, draws: 6, losses: 12, goalsFor: 26, goalsAgainst: 34 },
  { position: 14, teamName: 'Fluminense', points: 34, matches: 28, wins: 9, draws: 7, losses: 12, goalsFor: 24, goalsAgainst: 36 },
  { position: 15, teamName: 'Atlético Mineiro', points: 32, matches: 28, wins: 8, draws: 8, losses: 12, goalsFor: 22, goalsAgainst: 36 },
  { position: 16, teamName: 'Vitória', points: 30, matches: 28, wins: 8, draws: 6, losses: 14, goalsFor: 20, goalsAgainst: 38 },
  { position: 17, teamName: 'Criciúma', points: 28, matches: 28, wins: 7, draws: 7, losses: 14, goalsFor: 18, goalsAgainst: 40 },
  { position: 18, teamName: 'Coritiba', points: 26, matches: 28, wins: 7, draws: 5, losses: 16, goalsFor: 16, goalsAgainst: 42 },
  { position: 19, teamName: 'Juventude', points: 24, matches: 28, wins: 6, draws: 6, losses: 16, goalsFor: 14, goalsAgainst: 44 },
  { position: 20, teamName: 'São Bernardo', points: 22, matches: 28, wins: 5, draws: 7, losses: 16, goalsFor: 12, goalsAgainst: 46 },
];

// ============================================================
// FUNÇÕES DE SEED
// ============================================================

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || error.message || response.statusText);
  }
  return response.json();
}

async function seedSportsNewsAPI() {
  console.log('🚀 Iniciando seed da sports-news-api...');
  
  // 1. Buscar categorias existentes
  console.log('📥 Buscando categorias...');
  const categories = await fetchJSON(`${SPORTS_NEWS_API}/categories`);
  console.log(`   Encontradas ${categories.length} categorias`);
  
  // 2. Buscar autores existentes
  console.log('📥 Buscando autores...');
  const users = await fetchJSON(`${SPORTS_NEWS_API}/admin/users`);
  const authors = Array.isArray(users) ? users : users?.data || [];
  console.log(`   Encontrados ${authors.length} autores`);
  
  if (authors.length === 0) {
    console.log('⚠️  Nenhum autor encontrado. Criando autor padrão...');
    // Não há endpoint público para criar usuários, precisaria do admin
    console.log('   Pulando criação de artigos (sem autor)');
    return;
  }
  
  // 3. Criar artigos
  console.log('📝 Criando artigos...');
  let created = 0;
  for (const article of ARTICLES) {
    try {
      // Encontrar categoria correspondente
      const category = categories.find(c => 
        c.name.toLowerCase().includes(article.category.toLowerCase())
      );
      
      if (!category) {
        console.log(`   ⚠️  Categoria "${article.category}" não encontrada para: ${article.title}`);
        continue;
      }
      
      const slug = article.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      const payload = {
        title: article.title,
        content: article.content,
        excerpt: article.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        status: 'PUBLISHED',
        type: article.type || 'NEWS',
        categoryId: category.id,
        authorId: authors[0].id,
        coverImage: null,
        slug: slug + '-' + Date.now(),
        isFeatured: Math.random() > 0.7,
        isBreaking: Math.random() > 0.9,
        publishedAt: new Date().toISOString(),
      };
      
      await fetchJSON(`${SPORTS_NEWS_API}/admin/articles`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      
      created++;
      console.log(`   ✅ [${created}/${ARTICLES.length}] ${article.title}`);
    } catch (error) {
      console.log(`   ❌ Erro ao criar "${article.title}": ${error.message}`);
    }
  }
  
  console.log(`\n✅ Sports News API: ${created} artigos criados`);
}

async function seedClubeAPI() {
  console.log('\n🚀 Iniciando seed da clube-api...');
  
  // 1. Buscar categorias existentes
  console.log('📥 Buscando categorias...');
  const categories = await fetchJSON(`${CLUBE_API}/categories`);
  console.log(`   Encontradas ${categories.length} categorias`);
  
  // 2. Buscar adversários existentes
  console.log('📥 Buscando adversários...');
  const opponents = await fetchJSON(`${CLUBE_API}/opponents`);
  const existingOpponents = Array.isArray(opponents) ? opponents : opponents?.data || [];
  console.log(`   Encontrados ${existingOpponents.length} adversários`);
  
  // 3. Criar adversários que não existem
  console.log('🏟️  Criando adversários...');
  const opponentMap = {};
  for (const opp of existingOpponents) {
    opponentMap[opp.name] = opp.id;
  }
  
  for (const opp of OPPONENTS) {
    if (!opponentMap[opp.name]) {
      try {
        const newOpp = await fetchJSON(`${CLUBE_API}/admin/opponents`, {
          method: 'POST',
          body: JSON.stringify({
            name: opp.name,
            shortName: opp.shortName,
            color: opp.color,
            stadium: opp.stadium,
            city: opp.city,
          }),
        });
        opponentMap[opp.name] = newOpp.id;
        console.log(`   ✅ ${opp.name}`);
      } catch (error) {
        console.log(`   ⚠️  ${opp.name}: ${error.message}`);
      }
    }
  }
  
  // 4. Buscar competições existentes
  console.log('📥 Buscando competições...');
  const competitions = await fetchJSON(`${CLUBE_API}/admin/competitions`);
  const existingCompetitions = Array.isArray(competitions) ? competitions : competitions?.data || [];
  console.log(`   Encontradas ${existingCompetitions.length} competições`);
  
  // 5. Criar competições
  console.log('🏆 Criando competições...');
  const competitionMap = {};
  for (const comp of existingCompetitions) {
    competitionMap[`${comp.name}-${comp.season}`] = comp.id;
  }
  
  // Mapear subcategorias
  const categoryMap = {};
  for (const cat of categories) {
    categoryMap[cat.name] = cat;
    if (cat.children) {
      for (const child of cat.children) {
        categoryMap[`${cat.name} → ${child.name}`] = child;
        categoryMap[`${child.name}`] = child;
      }
    }
  }
  
  for (const comp of COMPETITIONS) {
    const key = `${comp.name}-${comp.season}`;
    if (!competitionMap[key]) {
      // Encontrar categoria
      const catKey = comp.subcategory || comp.category;
      const cat = categoryMap[catKey] || categoryMap[comp.category];
      
      if (!cat) {
        console.log(`   ⚠️  Categoria "${catKey}" não encontrada para: ${comp.name}`);
        continue;
      }
      
      try {
        const newComp = await fetchJSON(`${CLUBE_API}/admin/competitions`, {
          method: 'POST',
          body: JSON.stringify({
            name: comp.name,
            season: comp.season,
            categoryId: cat.id,
            tableFormat: comp.tableFormat || 'single',
            isParticipating: true,
          }),
        });
        competitionMap[key] = newComp.id;
        console.log(`   ✅ ${comp.name} (${comp.season})`);
      } catch (error) {
        console.log(`   ⚠️  ${comp.name}: ${error.message}`);
      }
    }
  }
  
  // 6. Criar jogadores
  console.log('⚽ Criando jogadores...');
  let playersCreated = 0;
  for (const player of SQUAD_PLAYERS) {
    try {
      const cat = categoryMap[player.subcategory] || categoryMap[player.category];
      if (!cat) {
        console.log(`   ⚠️  Categoria "${player.subcategory}" não encontrada para: ${player.name}`);
        continue;
      }
      
      await fetchJSON(`${CLUBE_API}/admin/squad`, {
        method: 'POST',
        body: JSON.stringify({
          name: player.name,
          position: player.position,
          shirtNumber: player.shirtNumber,
          categoryId: cat.id,
          isActive: true,
        }),
      });
      
      playersCreated++;
      console.log(`   ✅ [${playersCreated}/${SQUAD_PLAYERS.length}] ${player.name}`);
    } catch (error) {
      console.log(`   ⚠️  ${player.name}: ${error.message}`);
    }
  }
  
  // 7. Criar classificações (Brasileirão)
  console.log('📊 Criando classificações...');
  const brasileiraoComp = competitionMap['Brasileirão Série A-2025'];
  if (brasileiraoComp) {
    try {
      await fetchJSON(`${CLUBE_API}/admin/standings`, {
        method: 'PUT',
        body: JSON.stringify({
          competitionId: brasileiraoComp,
          standings: STANDINGS.map(s => ({
            position: s.position,
            teamName: s.teamName,
            points: s.points,
            matches: s.matches,
            wins: s.wins,
            draws: s.draws,
            losses: s.losses,
            goalsFor: s.goalsFor,
            goalsAgainst: s.goalsAgainst,
            goalDifference: s.goalsFor - s.goalsAgainst,
          })),
        }),
      });
      console.log(`   ✅ Brasileirão Série A: ${STANDINGS.length} posições criadas`);
    } catch (error) {
      console.log(`   ⚠️  Brasileirão: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Clube API: ${playersCreated} jogadores, ${Object.keys(competitionMap).length} competições`);
}

async function main() {
  console.log('🎯 Rádio Coringão - Seed Data Script');
  console.log('====================================\n');
  
  try {
    await seedSportsNewsAPI();
    await seedClubeAPI();
    
    console.log('\n====================================');
    console.log('✅ Seed concluído com sucesso!');
    console.log('====================================');
  } catch (error) {
    console.error('\n❌ Erro durante o seed:', error);
    process.exit(1);
  }
}

main();
