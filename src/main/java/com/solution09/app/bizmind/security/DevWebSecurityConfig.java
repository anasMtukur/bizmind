package com.solution09.app.bizmind.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.solution09.app.bizmind.security.jwt.JWTAuthenticationFilter;
import com.solution09.app.bizmind.security.jwt.JWTLoginFilter;
import com.solution09.app.bizmind.security.jwt.TokenAuthenticationService;
import com.solution09.app.bizmind.services.UserDetailsServiceImpl;


@Configuration
@EnableWebSecurity
@Profile("dev")
public class DevWebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	UserDetailsServiceImpl userDetailsService;

    @Autowired
    private TokenAuthenticationService tokenAuthenticationService;
    
    @Autowired
    private JWTAuthenticationFilter jWTAuthenticationFilter;
	
	@Bean
    public JWTLoginFilter jWTLoginFilter() throws Exception {
        return new JWTLoginFilter( "/login", authenticationManager(), tokenAuthenticationService );
    }

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests()
		/*http.cors().and().csrf().disable()
			.authorizeRequests().*/
			.antMatchers( "/*" ).permitAll()
			.antMatchers("/api/auth/**").permitAll()
			.antMatchers( "/webjars/**" ).permitAll()
            .antMatchers("/css/**").permitAll()
			.antMatchers("/api/test/**").permitAll()
			.antMatchers("/app/**").permitAll()
			.antMatchers("/fonts/**").permitAll()
			.antMatchers("/images/**").permitAll()
			.antMatchers("/scripts/**").permitAll()
			.antMatchers("/scss/**").permitAll()
			.antMatchers("/styles/**").permitAll()
			.antMatchers("/views/**").permitAll()
			.antMatchers( HttpMethod.POST, "/login" ).permitAll()
			.anyRequest().authenticated()
			.and()
			// We filter the api/login requests
			.addFilterBefore( jWTLoginFilter(),
                UsernamePasswordAuthenticationFilter.class )
			// And filter other requests to check the presence of JWT in header
			.addFilterBefore( jWTAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class );
	}
	
	@Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService( userDetailsService ).passwordEncoder( passwordEncoder() );
    }
}