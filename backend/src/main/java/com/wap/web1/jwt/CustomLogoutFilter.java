package com.wap.web1.jwt;

import com.wap.web1.repository.RefreshRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class CustomLogoutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    public CustomLogoutFilter(JWTUtil jwtUtil,RefreshRepository refreshRepository) {
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response,chain) ;
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException,ServletException {

        // path and method verify
        String requestUri = request.getRequestURI();
        if (!requestUri.matches("^\\auth\\/logout$")) {
            filterChain.doFilter(request,response);
            return;
        }
        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {
            filterChain.doFilter(request,response);
            return;
        }
        String refresh = request.getHeader("Refresh");
        //refresh null check
        if (refresh == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return ;
        }

        //expired check
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            //response status code
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        //토큰이 refresh인지 확인
        String category = jwtUtil.getCategory(refresh);
        if(!category.equals("refresh")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        Boolean isExist = refreshRepository.existsByRefresh(refresh);
        if (!isExist) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        //로그아웃 진행, Refresh 토큰 DB에서 제거
        refreshRepository.deleteByRefresh(refresh);
        response.setHeader("Refresh",null);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
