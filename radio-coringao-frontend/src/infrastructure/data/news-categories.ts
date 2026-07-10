import { NewsArticle } from "@/domain/entities";

const placeholderImg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCh5rWYWHh2ILCnOZuge7OeXQOKkvhBoXWWT-b9AYqyw9pZt__tGOOpylCVqYgyPvW7AXbw30lvcYaxovQExTo7M1W0l6OxQrWeL1KhgcAXQIUGpp_ZbPBS0XIJr883Dk0-Np7cQXTlFIjsIatMo1VTSGPytM31Hgw5agrY1Id_B_Xo1VhdehqJkGf0kYND39ZapobUQdS-W_QnZgeI6k8nkJQAOuZFjB7rnZ-lWJpwP5UuImNT_1WecNELu_hRA0xyRAlXa-EqY-I";

export interface NewsCategoryData {
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  articles: NewsArticle[];
}

export const newsCategories: Record<string, NewsCategoryData> = {
  ultimas: {
    name: "Últimas Notícias",
    slug: "ultimas",
    description: "As notícias mais recentes sobre o Corinthians. Fique por dentro de tudo que acontece no Timão.",
    heroImage: placeholderImg,
    articles: [
      { id: "1", title: "Garro renova e é o novo camisa 10 do Timão", excerpt: "Meia argentino se compromete por mais 3 anos e assume a camisa mais pesada do futebol brasileiro. Garro chegou ao Corinthians há 2 anos e se tornou ídolo da Fiel.", category: "Mercado", categorySlug: "mercado", author: "João Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Garro com a camisa 10", publishedAt: "Há 1 hora", slug: "garro-renova-10", isBreaking: false, isLive: false, viewCount: 15000 },
      { id: "2", title: "Yuri Alberto lidera artilharia do Brasileirão com 18 gols", excerpt: "Atacante marcou 8 gols em 5 jogos e já atraiu olhares do futebol europeu. Yuri Alberto vive a melhor fase da carreira.", category: "Destaques", categorySlug: "destaques", author: "Pedro Silva", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Yuri Alberto comemorando", publishedAt: "Há 3 horas", slug: "yuri-artilharia", isBreaking: false, isLive: false, viewCount: 12000 },
      { id: "3", title: "Ramón Díaz elogia compromisso do elenco nos treinos", excerpt: "Técnico destaca a motivação do elenco para o clássico contra o Palmeiras. Time mostrou evolução tática nos últimos jogos.", category: "Futebol", categorySlug: "futebol", author: "Maria Clara", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Ramón Díaz no treino", publishedAt: "Há 5 horas", slug: "ramon-diaz-elogia", isBreaking: false, isLive: false, viewCount: 8500 },
      { id: "4", title: "Fiel prepara mosaico histórico para o clássico de domingo", excerpt: "Torcidas organizadas se unem para criar o maior bandeirão já visto na Neo Química Arena. Preparação started há 2 semanas.", category: "Torcida", categorySlug: "torcida", author: "Ana Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Torcida do Corinthians", publishedAt: "Há 7 horas", slug: "fiel-mosaico", isBreaking: false, isLive: false, viewCount: 7200 },
      { id: "5", title: "Ingressos do clássico esgotam em apenas 2 horas", excerpt: "Fiel lota a Neo Química Arena para o jogo contra o Palmeiras. Mais de 47 mil ingressos vendidos rapidamente.", category: "Jogos", categorySlug: "jogos", author: "João Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Neo Química Arena lotada", publishedAt: "Há 10 horas", slug: "ingressos-esgotados", isBreaking: false, isLive: false, viewCount: 6800 },
      { id: "6", title: "Base do Corinthians goleia e avança na Copinha", excerpt: "Com atuação de gala do meia Pedrinho, o Timãozinho venceu por 4x0 e está nas quartas de final do torneio.", category: "Base", categorySlug: "base", author: "Maria Clara", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Base do Corinthians", publishedAt: "Há 12 horas", slug: "base-copinha", isBreaking: false, isLive: false, viewCount: 5400 },
      { id: "7", title: "Corinthians fecha parceria com nova marca de energia", excerpt: "Clube anuncia patrocínio máster que injeta R$ 45 milhões por ano no futebol. Acordo histórico para o Timão.", category: "Política", categorySlug: "politica", author: "Pedro Silva", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Dirigentes na cerimônia", publishedAt: "Há 1 dia", slug: "parceria-energia", isBreaking: false, isLive: false, viewCount: 9200 },
      { id: "8", title: "Neo Química Arena prepara show de pirotecnia para domingo", excerpt: "Estádio promete a maior festa visual da temporada com fogos sincronizados e LED gigante durante o clássico.", category: "Política", categorySlug: "politica", author: "Ana Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Arena iluminada", publishedAt: "Há 1 dia", slug: "arena-pirotecnia", isBreaking: false, isLive: false, viewCount: 6100 },
    ],
  },
  mercado: {
    name: "Mercado",
    slug: "mercado",
    description: "Transferências, contratos, renovações e rumores do mercado. Fique por dentro de todas as movimentações do Timão.",
    heroImage: placeholderImg,
    articles: [
      { id: "1", title: "Garro renova contrato e é o novo camisa 10", excerpt: "Meia argentino se compromete por mais 3 anos. Acordo inclui bônus por títulos e cláusula de saída de €15 milhões.", category: "Mercado", categorySlug: "mercado", author: "João Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Garro assinando contrato", publishedAt: "Há 2 horas", slug: "garro-renova-contrato", isBreaking: false, isLive: false, viewCount: 18000 },
      { id: "2", title: "Diretoria anuncia renovação do zagueiro titular", excerpt: "Fiel ao clube, zagueiro renova por mais 4 temporadas. Jogador é peça-chave da defesa corintiana.", category: "Mercado", categorySlug: "mercado", author: "Pedro Silva", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Zagueiro assinando", publishedAt: "Há 5 horas", slug: "renovacao-zagueiro", isBreaking: false, isLive: false, viewCount: 9500 },
      { id: "3", title: "Corinthians monitorsa meia do Racing da Argentina", excerpt: "Dirigentes viajam para Buenos Aires para negociar contratação. Jogador tem 22 anos e é destaque no futebol argentino.", category: "Mercado", categorySlug: "mercado", author: "Maria Clara", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Jogador do Racing", publishedAt: "Há 8 horas", slug: "corinthians-monitora-meia", isBreaking: false, isLive: false, viewCount: 7800 },
      { id: "4", title: "Yuri Alberto atrai olhares do futebol europeu", excerpt: "Inter Milan e Napoli monitoram atacante. Corinthians pode receber proposta acima de €20 milhões.", category: "Mercado", categorySlug: "mercado", author: "João Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Yuri Alberto", publishedAt: "Há 12 horas", slug: "yuri-europeu", isBreaking: false, isLive: false, viewCount: 14500 },
      { id: "5", title: "Fabián Bustos pode sair do Corinthians", excerpt: "Técnico argentino recebe proposta do Boca Juniors. Dirigentes avaliam situação.", category: "Mercado", categorySlug: "mercado", author: "Pedro Silva", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Fabián Bustos", publishedAt: "Há 1 dia", slug: "bustos-saida", isBreaking: false, isLive: false, viewCount: 6200 },
      { id: "6", title: "Pedro Raul é a nova contratação do Timão", excerpt: "Atacante chega do Vasco por empréstimo com opção de compra. Jogador chega para reforçar o ataque.", category: "Mercado", categorySlug: "mercado", author: "Maria Clara", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Pedro Raul", publishedAt: "Há 2 dias", slug: "pedro-raul-chega", isBreaking: false, isLive: false, viewCount: 8100 },
    ],
  },
  politica: {
    name: "Política",
    slug: "politica",
    description: "Decisões administrativas, comunicados oficiais e novidades institucionais do Corinthians.",
    heroImage: placeholderImg,
    articles: [
      { id: "1", title: "Corinthians fecha parceria com nova marca de energia", excerpt: "Clube anuncia patrocínio máster que injeta R$ 45 milhões por ano no futebol. Acordo válido por 5 anos.", category: "Política", categorySlug: "politica", author: "João Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Cerimônia de assinatura", publishedAt: "Há 3 horas", slug: "parceria-energia", isBreaking: false, isLive: false, viewCount: 12000 },
      { id: "2", title: "Neo Química Arena prepara show de pirotecnia", excerpt: "Estádio promete a maior festa visual da temporada para o clássico contra o Palmeiras.", category: "Política", categorySlug: "politica", author: "Ana Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Arena à noite", publishedAt: "Há 8 horas", slug: "arena-pirotecnia", isBreaking: false, isLive: false, viewCount: 8500 },
      { id: "3", title: "Diretoria avalia renovação de contrato de jogadores-chave", excerpt: "Clube quer manter elenco para Libertadores. Negociações devem ser fechadas em breve.", category: "Política", categorySlug: "politica", author: "Pedro Silva", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Dirigentes em reunião", publishedAt: "Há 1 dia", slug: "diretoria-renovacao", isBreaking: false, isLive: false, viewCount: 7200 },
      { id: "4", title: "Novo patrocinador injeta R$ 50 milhões no clube", excerpt: "Acordo histórico traz estabilidade financeira para o Timão. Dinheiro será usado em reforços e infraestrutura.", category: "Política", categorySlug: "politica", author: "Maria Clara", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Dirigentes", publishedAt: "Há 2 dias", slug: "novo-patrocinador", isBreaking: false, isLive: false, viewCount: 9800 },
      { id: "5", title: "Corinthians anuncia novo diretor de futebol", excerpt: "Ex-jogador assume cargo e promete profissionalização total do departamento de futebol.", category: "Política", categorySlug: "politica", author: "João Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Novo diretor", publishedAt: "Há 3 dias", slug: "novo-diretor", isBreaking: false, isLive: false, viewCount: 6500 },
      { id: "6", title: "Clube prepara projeto de revitalização do CT", excerpt: "Centro de treinamento ganhará novas quadras, academia e hotel para jogadores.", category: "Política", categorySlug: "politica", author: "Pedro Silva", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "CT do Corinthians", publishedAt: "Há 4 dias", slug: "ct-revitalizacao", isBreaking: false, isLive: false, viewCount: 5200 },
    ],
  },
  destaques: {
    name: "Destaques",
    slug: "destaques",
    description: "O melhor do conteúdo selecionado pela redação. As notícias mais importantes e impactantes do momento.",
    heroImage: placeholderImg,
    articles: [
      { id: "1", title: "Corinthians é campeão do Torneio Rio-São Paulo", excerpt: "Timão conquista título inédito com atuação magnífica na final contra o São Paulo. Gol de Garro nos acréscimos define a partida.", category: "Títulos", categorySlug: "titulos", author: "João Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Corinthians campeão", publishedAt: "Há 1 dia", slug: "campeao-rio-sao-paulo", isBreaking: false, isLive: false, viewCount: 25000 },
      { id: "2", title: "Yuri Alberto é eleito craque do mês do Brasileirão", excerpt: "Atacante marcou 8 gols em 5 jogos e liderou o Timão na conquista de 15 pontos de 15 possíveis.", category: "Destaques", categorySlug: "destaques", author: "Pedro Silva", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Yuri Alberto troféu", publishedAt: "Há 2 dias", slug: "yuri-craque-mes", isBreaking: false, isLive: false, viewCount: 18000 },
      { id: "3", title: "Feminino vence clássico e lidera grupo da Libertadores", excerpt: "Timão Feminino goleia São Paulo por 3x0 e segue invicto na competição. Time mostra futebol de primeira.", category: "Feminino", categorySlug: "feminino", author: "Maria Clara", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Feminino comemorando", publishedAt: "Há 3 dias", slug: "feminino-libertadores", isBreaking: false, isLive: false, viewCount: 14000 },
      { id: "4", title: "Ingressos do clássico esgotam em 2 horas", excerpt: "Fiel lota a Neo Química Arena. Mais de 47 mil ingressos vendidos rapidamente para o jogo contra o Palmeiras.", category: "Jogos", categorySlug: "jogos", author: "Ana Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Ingressos esgotados", publishedAt: "Há 4 dias", slug: "ingressos-classe", isBreaking: false, isLive: false, viewCount: 12000 },
      { id: "5", title: "Base do Corinthians goleia na Copinha e avança", excerpt: "Timãozinho vence por 4x0 e está nas quartas de final. Pedrinho brilha com 3 gols.", category: "Base", categorySlug: "base", author: "Maria Clara", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Base comemorando", publishedAt: "Há 5 dias", slug: "base-copinha-destaque", isBreaking: false, isLive: false, viewCount: 9500 },
      { id: "6", title: "Ramón Díaz é eleito melhor técnico do mês", excerpt: "Argentino comandou Timão em 5 vitórias consecutivas e é reconhecido pelo trabalho excepcional.", category: "Destaques", categorySlug: "destaques", author: "João Fiel", authorAvatar: "", imageUrl: placeholderImg, imageAlt: "Ramón Díaz", publishedAt: "Há 6 dias", slug: "ramon-melhor-tecnico", isBreaking: false, isLive: false, viewCount: 8200 },
    ],
  },
};

export const newsCategorySlugs = ["ultimas", "mercado", "politica", "destaques"];
