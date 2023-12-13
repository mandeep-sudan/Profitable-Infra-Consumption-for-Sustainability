package com.example.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.theokanning.openai.service.OpenAiService;

@SpringBootApplication
public class BackendApplication {

	@Value("${open_ai_token}")
	String openAiToken;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	OpenAiService openAiService() {
		return new OpenAiService(openAiToken);
	}

}
