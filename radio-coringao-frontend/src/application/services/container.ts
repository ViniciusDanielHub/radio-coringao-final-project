import {
  INewsRepository,
  IMatchRepository,
  ITableRepository,
  IColumnistRepository,
  ICommentRepository,
  INewsletterRepository,
} from "@/domain/repositories";
import {
  MockNewsRepository,
  MockMatchRepository,
  MockTableRepository,
  MockColumnistRepository,
  MockCommentRepository,
  MockNewsletterRepository,
} from "@/infrastructure/repositories";
import {
  ApiNewsRepository,
  ApiMatchRepository,
  ApiTableRepository,
  ApiColumnistRepository,
  ApiCommentRepository,
  ApiNewsletterRepository,
} from "@/infrastructure/api/repositories";
import {
  GetHomePageDataUseCase,
  GetJogosPageDataUseCase,
  GetArticlePageDataUseCase,
  GetColumnistsUseCase,
  GetStandingsUseCase,
  AddCommentUseCase,
  SubscribeNewsletterUseCase,
} from "@/application/use-cases";

class Container {
  private _newsRepo: INewsRepository;
  private _matchRepo: IMatchRepository;
  private _tableRepo: ITableRepository;
  private _columnistRepo: IColumnistRepository;
  private _commentRepo: ICommentRepository;
  private _newsletterRepo: INewsletterRepository;

  constructor() {
    const useApi = process.env.NEXT_PUBLIC_USE_API === "true";

    if (useApi) {
      this._newsRepo = new ApiNewsRepository();
      this._matchRepo = new ApiMatchRepository();
      this._tableRepo = new ApiTableRepository();
      this._columnistRepo = new ApiColumnistRepository();
      this._commentRepo = new ApiCommentRepository();
      this._newsletterRepo = new ApiNewsletterRepository();
    } else {
      this._newsRepo = new MockNewsRepository();
      this._matchRepo = new MockMatchRepository();
      this._tableRepo = new MockTableRepository();
      this._columnistRepo = new MockColumnistRepository();
      this._commentRepo = new MockCommentRepository();
      this._newsletterRepo = new MockNewsletterRepository();
    }
  }

  // Repositórios
  get newsRepo(): INewsRepository {
    return this._newsRepo;
  }
  get matchRepo(): IMatchRepository {
    return this._matchRepo;
  }
  get tableRepo(): ITableRepository {
    return this._tableRepo;
  }
  get columnistRepo(): IColumnistRepository {
    return this._columnistRepo;
  }
  get commentRepo(): ICommentRepository {
    return this._commentRepo;
  }
  get newsletterRepo(): INewsletterRepository {
    return this._newsletterRepo;
  }

  // Use cases
  get getHomePageData(): GetHomePageDataUseCase {
    return new GetHomePageDataUseCase(this._newsRepo, this._matchRepo);
  }
  get getJogosPageData(): GetJogosPageDataUseCase {
    return new GetJogosPageDataUseCase(this._matchRepo);
  }
  get getArticlePageData(): GetArticlePageDataUseCase {
    return new GetArticlePageDataUseCase(this._newsRepo, this._matchRepo);
  }
  get getColumnists(): GetColumnistsUseCase {
    return new GetColumnistsUseCase(this._columnistRepo);
  }
  get getStandings(): GetStandingsUseCase {
    return new GetStandingsUseCase(this._tableRepo);
  }
  get addComment(): AddCommentUseCase {
    return new AddCommentUseCase(this._commentRepo);
  }
  get subscribeNewsletter(): SubscribeNewsletterUseCase {
    return new SubscribeNewsletterUseCase(this._newsletterRepo);
  }
}

export const container = new Container();