import { Injectable } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { authConfig } from "./authConfig";
import { BehaviorSubject, combineLatest, filter, map, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$
  ]).pipe(
    map((values) => values.every(b => b))
  );

  navigateToSignInPage() {
    this.router.navigateByUrl('/signin');
  }

  constructor(private oauthService: OAuthService, private readonly router: Router) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
      if (this.oauthService.hasValidAccessToken() && this.router.url === '/signin') {
        this.router.navigate(['/home']);
      }
    });

    // Optional: updates automatically the access token
    /*this.oauthService.events
      .pipe(filter((e) => e.type === 'token_expires'))
      .subscribe(() => {
        this.oauthService.silentRefresh();
      });*/
  }

  login() {
    this.router.navigate(['/home']);
    this.oauthService.initCodeFlow(this.router.url);
  }

  logout() {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if(isAuthenticated) {
        this.navigateToSignInPage();
        this.oauthService.revokeTokenAndLogout();
      }
    });
  }

  refresh() {
    this.oauthService.silentRefresh();
  }

  hasValidToken() {
    return this.oauthService.hasValidAccessToken();
  }

  get accessToken() {
    return this.oauthService.getAccessToken();
  }

  get refreshToken() {
    return this.oauthService.getRefreshToken();
  }

  get identityClaims(): any {
    return this.oauthService.getIdentityClaims();
  }

  get username(): any {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.name || claims.preferred_username || '' : '';
  }

  get idToken() {
    return this.oauthService.getIdToken();
  }

  get logoutUrl() {
    return this.oauthService.logoutUrl;
  }

  isAuthenticated() {
    return this.oauthService.hasValidAccessToken();
  }
}