package com.jangular.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import com.jangular.backend.enums.RoleName;
import com.jangular.backend.models.Role;
import com.jangular.backend.repository.RoleRepository;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DatabaseInitializer {

    @Autowired
    private RoleRepository roleRepository;
    
    /**
     * Initialize default roles when the application starts
     */
    @Bean
    public CommandLineRunner initRoles() {
        return args -> {
            // Check if roles already exist to avoid duplicates
            if (roleRepository.count() == 0) {
                List<Role> defaultRoles = Arrays.asList(
                    new Role(RoleName.ROLE_USER, "Standard user with basic permissions"),
                    new Role(RoleName.ROLE_ADMIN, "Administrator with full access"),
                    new Role(RoleName.ROLE_MODERATOR, "Manager with department-level access")
                );
                
                roleRepository.saveAll(defaultRoles);
                System.out.println("Default roles have been initialized");
            }
        };
    }
    
    /**
     * Runs schema and data SQL scripts if needed
     * Note: Use this method if you prefer SQL scripts over JPA/Hibernate schema generation
     */
    @Bean
    public CommandLineRunner runSchemaScripts(DataSource dataSource) {
        return args -> {
            // You can conditionally run these scripts based on application properties
            // or other conditions to make it more flexible
            
            // Example: Only run in dev environment
            if ("dev".equals(System.getProperty("spring.profiles.active"))) {
                // Schema script (creates tables)
                ResourceDatabasePopulator schemaPopulator = new ResourceDatabasePopulator();
                schemaPopulator.addScript(new ClassPathResource("db/schema.sql"));
                schemaPopulator.execute(dataSource);
                
                // Data script (initial data)
                ResourceDatabasePopulator dataPopulator = new ResourceDatabasePopulator();
                dataPopulator.addScript(new ClassPathResource("db/data.sql"));
                dataPopulator.execute(dataSource);
                
                System.out.println("Database schema and initial data have been loaded");
            }
        };
    }
}