package com.example.gatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.cloud.gateway.discovery.DiscoveryClientRouteDefinitionLocator;
import org.springframework.cloud.gateway.discovery.DiscoveryLocatorProperties;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;

import java.util.Arrays;

@SpringBootApplication
public class GatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceApplication.class, args);
	}

	//@Bean
	RouteLocator routeLocator(RouteLocatorBuilder builder){
return builder.routes().route(r -> r.path("/customers/**").uri("lb://CUSTOMER-SERVICE"))
		               .route(r -> r.path("/products/**").uri("lb://PRODUCTS-SERVICE"))
				       .build();
	}

	@Bean
	DiscoveryClientRouteDefinitionLocator definitionLocator(ReactiveDiscoveryClient client, DiscoveryLocatorProperties properties){
		return new DiscoveryClientRouteDefinitionLocator(client,properties);

	}

}
