package com.solution09.app.bizmind.security.jwt;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

/**
 *
 * @author Edwin Jose Palathinkal <edwinhere@gmail.com>
 */
@Component
public class JWTAuthenticationFilter extends GenericFilterBean {

  @Autowired
  private TokenAuthenticationService tokenAuthenticationService;

  @Override
  public void doFilter(ServletRequest request,
          ServletResponse response,
          FilterChain filterChain)
          throws IOException, ServletException {
    Authentication authentication = tokenAuthenticationService
            .getAuthentication((HttpServletRequest) request);

    SecurityContextHolder.getContext()
            .setAuthentication(authentication);
    filterChain.doFilter(request, response);
  }
}
