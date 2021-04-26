package com.solution09.app.bizmind.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedHashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.solution09.app.bizmind.repository.UserRepository;

@Service
public class TokenAuthenticationService {
  private final long EXPIRATIONTIME = 864_000_000; // 10 days
  @Value("${bizmind.app.jwtSecret}")
  private String SECRET;
  private final String TOKEN_PREFIX = "Bearer";
  private final String HEADER_STRING = "Authorization";

  @Autowired
  private UserRepository endUsersRepository;

  public void addAuthentication(HttpServletResponse res, String username, Collection<? extends GrantedAuthority> authorities) {
    Claims claims = Jwts.claims();
    claims.put("authorities", authorities);
    claims.setSubject(username);
    claims.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME));
    //if (authorities.contains(new SimpleGrantedAuthority("ROLE_USER"))) {
    claims.put("fullname", endUsersRepository.findByUsername(username).get().getFullname());
    claims.put("name", endUsersRepository.findByUsername(username).get().getUsername());
    claims.put("email", endUsersRepository.findByUsername(username).get().getEmail());
    //}

    String JWT = Jwts.builder()
      .setClaims(claims)
      .signWith(SignatureAlgorithm.HS512, SECRET)
      .compact();
    res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
  }

  public Authentication getAuthentication(HttpServletRequest request) {
    String token = request.getHeader(HEADER_STRING);
    if (token != null) {
      Claims claims = Jwts.parser()
        .setSigningKey(SECRET)
        .parseClaimsJws(token.replaceAll(TOKEN_PREFIX, "").trim())
        .getBody();
      String user = claims.getSubject();
      ArrayList<LinkedHashMap> rawAuthorities = claims.get("authorities", ArrayList.class);
      ArrayList<SimpleGrantedAuthority> simpleGrantedAuthorities = new ArrayList<>();
      if (rawAuthorities != null) {
        for (LinkedHashMap map : rawAuthorities) {
          SimpleGrantedAuthority authority = new SimpleGrantedAuthority((String) map.get("authority"));
          simpleGrantedAuthorities.add(authority);
        }
      }
      return user != null && !simpleGrantedAuthorities.isEmpty()
        ? new UsernamePasswordAuthenticationToken(user, null, simpleGrantedAuthorities)
        : null;
    }
    return null;
  }
}
