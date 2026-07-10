export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  venue?: string;
  status: "agendado" | "encerrado" | "em andamento";
  image?: string;
  link?: string;
}

export interface EventCategory {
  name: string;
  items: EventItem[];
}

export interface EventData {
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  categories?: EventCategory[];
  items?: EventItem[];
}

const placeholderImg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCh5rWYWHh2ILCnOZuge7OeXQOKkvhBoXWWT-b9AYqyw9pZt__tGOOpylCVqYgyPvW7AXbw30lvcYaxovQExTo7M1W0l6OxQrWeL1KhgcAXQIUGpp_ZbPBS0XIJr883Dk0-Np7cQXTlFIjsIatMo1VTSGPytM31Hgw5agrY1Id_B_Xo1VhdehqJkGf0kYND39ZapobUQdS-W_QnZgeI6k8nkJQAOuZFjB7rnZ-lWJpwP5UuImNT_1WecNELu_hRA0xyRAlXa-EqY-I";

export const eventsData: Record<string, EventData> = {
  "proximos-jogos": {
    name: "Próximos Jogos",
    slug: "proximos-jogos",
    description: "Calendário completo de todos os próximos jogos do Corinthians em todas as categorias.",
    heroImage: placeholderImg,
    items: [
      { id: "1", title: "Corinthians x Palmeiras", description: "Brasileirão Série A - Clássico do derby das Américas.", date: "Dom, 22/06", time: "16:00", venue: "Neo Química Arena", status: "agendado" },
      { id: "2", title: "Emelec x Corinthians", description: "Libertadores - Fase de Grupos, última rodada.", date: "Ter, 24/06", time: "21:00", venue: "Estádio George Capwell", status: "agendado" },
      { id: "3", title: "Corinthians x Flamengo", description: "Copa do Brasil - Oitavas de Final.", date: "Qua, 25/06", time: "21:30", venue: "Neo Química Arena", status: "agendado" },
      { id: "4", title: "Corinthians x São Paulo", description: "Brasileirão Série A.", date: "Dom, 29/06", time: "16:00", venue: "Neo Química Arena", status: "agendado" },
      { id: "5", title: "Flamengo x Corinthians", description: "Brasileirão Série A.", date: "Qua, 02/07", time: "21:30", venue: "Maracanã", status: "agendado" },
      { id: "6", title: "Corinthians x Botafogo", description: "Brasileirão Série A.", date: "Dom, 06/07", time: "16:00", venue: "Neo Química Arena", status: "agendado" },
    ],
  },
  socios: {
    name: "Sócios",
    slug: "socios",
    description: "Vantagens e benefícios exclusivos para sócios do Sport Club Corinthians Paulista.",
    heroImage: placeholderImg,
    items: [
      { id: "1", title: "Programa de Sócios 2026", description: "Renove ou adira ao programa de sócios e tenha acesso a benefícios exclusivos.", date: "Todo ano", status: "agendado" },
      { id: "2", title: "Desconto em Ingressos", description: "Sócios têm desconto de até 30% na compra de ingressos para jogos do Corinthians.", date: "Sempre disponível", status: "agendado" },
      { id: "3", title: "Acesso à Neo Química Arena", description: "Sócios têm acesso prioritário ao estádio em dias de jogo.", date: "Dias de jogo", status: "agendado" },
      { id: "4", title: "Loja Oficial com Desconto", description: "Sócios ganham 15% de desconto na loja oficial do Corinthians.", date: "Sempre disponível", status: "agendado" },
      { id: "5", title: "Sorteios Exclusivos", description: "Participe de sorteios exclusivos para sócios: camisas, ingressos e mais.", date: "Mensal", status: "agendado" },
      { id: "6", title: "Cashback em Compras", description: "Acumule cashback em compras na loja oficial e parceiros.", date: "Sempre disponível", status: "agendado" },
    ],
  },
  "neo-quimica-arena": {
    name: "Neo Química Arena",
    slug: "neo-quimica-arena",
    description: "Informações sobre a Neo Química Arena, eventos, shows e festividades no estádio.",
    heroImage: placeholderImg,
    categories: [
      {
        name: "Próximos Eventos",
        items: [
          { id: "1", title: "Show de Pirotecnia - Derby", description: "Maior show de fogos da temporada para o clássico contra o Palmeiras.", date: "Dom, 22/06", time: "16:00", venue: "Neo Química Arena", status: "agendado", image: placeholderImg },
          { id: "2", title: "Festival da Fiel", description: "Evento com shows, food trucks e atrações para a torcida.", date: "Sáb, 28/06", time: "14:00", venue: "Neo Química Arena", status: "agendado", image: placeholderImg },
          { id: "3", title: "Corinthians Experience", description: "Passeio guiado pelo estádio com acesso ao vestiário e campo.", date: "Todos os sábados", time: "10:00", venue: "Neo Química Arena", status: "agendado", image: placeholderImg },
          { id: "4", title: "Concerto da Fiel", description: "Show musical após o jogo contra o São Paulo.", date: "Dom, 29/06", time: "18:00", venue: "Neo Química Arena", status: "agendado", image: placeholderImg },
          { id: "5", title: "Corinthians Fest", description: "Festa de fim de temporada com atrações nacionais.", date: "Sáb, 12/07", time: "20:00", venue: "Neo Química Arena", status: "agendado", image: placeholderImg },
          { id: "6", title: "Noite do Socio", description: "Evento exclusivo para sócios com shows e gastronomia.", date: "Sex, 18/07", time: "19:00", venue: "Neo Química Arena", status: "agendado", image: placeholderImg },
          { id: "7", title: "Corinthians Open Training", description: "Treinamento aberto ao público com participação dos jogadores.", date: "Qua, 23/07", time: "10:00", venue: "Neo Química Arena", status: "agendado", image: placeholderImg },
          { id: "8", title: "Fan Fest Libertadores", description: "Festa da torcida antes do jogo da Libertadores.", date: "Ter, 29/07", time: "18:00", venue: "Neo Química Arena", status: "agendado", image: placeholderImg },
          { id: "9", title: "Show de Réveillon", description: "Show de fogos artificiais para comemorar o fim de ano.", date: "Qua, 31/12", time: "23:00", venue: "Neo Química Arena", status: "agendado", image: placeholderImg },
        ],
      },
    ],
  },
  "fiel-torcida": {
    name: "Fiel Torcida",
    slug: "fiel-torcida",
    description: "Informações sobre a organização da Fiel Torcida, torcidas organizadas e como participar.",
    heroImage: placeholderImg,
    categories: [
      {
        name: "Próximos Eventos das Organizadas",
        items: [
          { id: "1", title: "Encontro das Torcidas", description: "Reunião de todas as torcidas organizadas para planejar o clássico.", date: "Qua, 18/06", time: "19:00", venue: "Sede da Fiel", status: "agendado", image: placeholderImg },
          { id: "2", title: "Caravana para o jogo fora", description: "Organização de caravana para o jogo contra o Flamengo no Maracanã.", date: "Qua, 02/07", time: "06:00", venue: "Partida da Neo Química Arena", status: "agendado", image: placeholderImg },
          { id: "3", title: "Mosaico Especial Derby", description: "Montagem do mosaico para o clássico contra o Palmeiras.", date: "Sáb, 21/06", time: "14:00", venue: "Neo Química Arena", status: "agendado", image: placeholderImg },
          { id: "4", title: "Ação Social - Visita ao Hospital", description: "Jogadores e torcida visitam crianças em hospitais.", date: "Ter, 24/06", time: "10:00", venue: "Hospital Beneficência", status: "agendado", image: placeholderImg },
          { id: "5", title: "Reunião de Planejamento", description: "Planejamento de eventos para o segundo semestre.", date: "Sáb, 05/07", time: "15:00", venue: "Sede da Fiel", status: "agendado", image: placeholderImg },
          { id: "6", title: "Treinamento de Voluntários", description: "Capacitação de voluntários para organização de eventos.", date: "Sáb, 12/07", time: "09:00", venue: "Sede da Fiel", status: "agendado", image: placeholderImg },
        ],
      },
      {
        name: "Eventos Passados",
        items: [
          { id: "5", title: "Festa da Fiel - Campeonato", description: "Comemoração do título do Torneio Rio-São Paulo com a torcida.", date: "Sáb, 12/04", status: "encerrado", image: placeholderImg },
          { id: "6", title: "Caravana para o jogo em Belo Horizonte", description: "Mais de 3 mil torcida viajaram para apoiar o time.", date: "Dom, 06/04", status: "encerrado", image: placeholderImg },
          { id: "7", title: "Mosaico Gigante - Libertadores", description: "Mosaico com 50 mil pessoas na Neo Química Arena.", date: "Qua, 19/03", status: "encerrado", image: placeholderImg },
          { id: "8", title: "Ação Social - Escola da Fiel", description: "Inauguração de nova escola para crianças da comunidade.", date: "Sáb, 15/02", status: "encerrado", image: placeholderImg },
        ],
      },
      {
        name: "Eventos Históricos",
        items: [
          { id: "9", title: "Maior Bandeirão do Mundo", description: "Recorde Guinness com bandeirão de 300 metros na Final da Libertadores 2012.", date: "4 Jul 2012", status: "encerrado", image: placeholderImg },
          { id: "10", title: "Festa do Tetra Campeonato Brasileiro", description: "Comemoração do 4º título brasileiro com mais de 1 milhão de pessoas.", date: "Dez 2017", status: "encerrado", image: placeholderImg },
          { id: "11", title: "Dia da Fiel - Homenagem", description: "Homenagem à torcida mais fiel do Brasil com show e premiações.", date: "Jun 2019", status: "encerrado", image: placeholderImg },
          { id: "12", title: "Inauguração da Neo Química Arena", description: "Abertura oficial do novo estádio com show de fogos e partida inaugural.", date: "Abr 2015", status: "encerrado", image: placeholderImg },
        ],
      },
    ],
  },
};

export const eventSlugs = ["proximos-jogos", "socios", "neo-quimica-arena", "fiel-torcida"];
