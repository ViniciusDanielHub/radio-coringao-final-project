import z from "zod";

export const CommentInputSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  comment: z.string().min(10, "Comentário deve ter no mínimo 10 caracteres"),
});

export type CommentInput = z.infer<typeof CommentInputSchema>;

export const NewsletterInputSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
});

export type NewsletterInput = z.infer<typeof NewsletterInputSchema>;

export interface HomePageData {
  editorialNews: import("@/domain/entities").NewsArticle[];
  latestNews: import("@/domain/entities").NewsArticle[];
  scheduledMatches: import("@/domain/entities").MatchResult[];
}

export interface JogosPageData {
  nextMatch: import("@/domain/entities").NextMatch;
  recentResults: import("@/domain/entities").MatchResult[];
}

export interface ArticlePageData {
  article: import("@/domain/entities").NewsArticle;
  topStories: import("@/domain/entities").NewsArticle[];
  nextMatch: import("@/domain/entities").NextMatch;
}