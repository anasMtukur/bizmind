package com.solution09.app.bizmind.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Collections;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 *
 * @author Edwin Jose Palathinkal <edwinhere@gmail.com>
 */
public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

  private TokenAuthenticationService tokenAuthenticationService;

  public JWTLoginFilter(String url, AuthenticationManager authManager, TokenAuthenticationService tokenAuthenticationService) {
    super(new AntPathRequestMatcher(url));
    setAuthenticationManager(authManager);
    this.tokenAuthenticationService = tokenAuthenticationService;
  }

  @Override
  public Authentication attemptAuthentication(
          HttpServletRequest req, HttpServletResponse res)
          throws AuthenticationException, IOException, ServletException {
    AccountCredentials creds = new ObjectMapper()
            .readValue(req.getInputStream(), AccountCredentials.class);
    return getAuthenticationManager().authenticate(
            new UsernamePasswordAuthenticationToken(
                    creds.getUsername(),
                    creds.getPassword(),
                    Collections.emptyList()
            )
    );
  }

  @Override
  protected void successfulAuthentication(
          HttpServletRequest req,
          HttpServletResponse res, FilterChain chain,
          Authentication auth) throws IOException, ServletException {
    this.tokenAuthenticationService
            .addAuthentication(res, auth.getName(), auth.getAuthorities());
  }

  static private class AccountCredentials {
	  private String username;
	  private String password;
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
	  
  }
}
