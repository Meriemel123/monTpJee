package com.example.billignservice;

import com.example.billignservice.entities.Bill;
import com.example.billignservice.entities.ProductItem;
import com.example.billignservice.feign.CustomerRestClient;
import com.example.billignservice.feign.ProductItemRestClient;
import com.example.billignservice.model.Customer;
import com.example.billignservice.model.Product;
import com.example.billignservice.repositories.BillRepository;
import com.example.billignservice.repositories.ProductItemRepository;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.PagedModel;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.Date;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BillingServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(HttpServletRequest request,BillRepository billRepository, ProductItemRepository itemRepository, CustomerRestClient customerRestClient, ProductItemRestClient productItemRestClient)
    {
        return  args -> {
            for (Customer customer:customerRestClient.getCustomers())
            {
                Bill bill= billRepository.save(new Bill(null,new Date(),null,customer.getId(),null));
                PagedModel<Product> products=productItemRestClient.pageProducts();
                products.forEach(product -> {
                    ProductItem productItem=new ProductItem();
                    productItem.setPrice(product.getPrice());
                    productItem.setQuantity(1+ new Random().nextInt(100));
                    productItem.setProductID(product.getId());
                    productItem.setBill(bill);
                    itemRepository.save(productItem);
                });
            }
        };
    }




}
