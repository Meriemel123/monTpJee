package com.example.billignservice.repositories;

import com.example.billignservice.entities.Bill;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


@RepositoryRestResource
public interface BillRepository extends JpaRepository<Bill,Long> {

    List<Bill>  findByCustomerID( @Param("customerId") Long customer);

}
