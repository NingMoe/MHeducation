package com.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.entity.User;

public class CommonInterceptor extends HandlerInterceptorAdapter {
	private Logger logger = Logger.getLogger(getClass());
	/**
	 * 在业务处理器处理请求之前被调用 如果返回false 从当前的拦截器往回执行所有拦截器的afterCompletion(),再退出拦截器链
	 * 如果返回true 执行下一个拦截器,直到所有的拦截器都执行完毕 再执行被拦截的Controller 然后进入拦截器链,
	 * 从最后一个拦截器往回执行所有的postHandle() 接着再从最后一个拦截器往回执行所有的afterCompletion()
	 */

	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		String url=request.getRequestURL().toString();
		boolean judge=url.contains("findPassword")||url.contains("userRegister")||url.contains("RegisterByAjax")
				||url.contains("logout")||url.contains("login")||url.contains("judgeCode")||url.contains("updatePassword");
		if(judge){
			return true;
		}  
		User user =  (User)request.getSession().getAttribute("user"); 
        if(user == null){
        	//logger.info("Interceptor:User is null,跳转到login页面!");
        	//request.getRequestDispatcher("/MHeducation/MPersonal/pages/core/login.html").forward(request, response);
        	//response.sendRedirect("/MHeducation/MPersonal/pages/core/login.html");
        	//return false;
        	return true;
        }
        return true;
            

	}

}
