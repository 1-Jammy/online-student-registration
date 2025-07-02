package com.jayesh.online_student_registrations;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OnlineStudentRegistrationsApplication {

    public static void main(String[] args) {

        // ✅ Load .env file
        Dotenv dotenv = Dotenv.load();

        // ✅ Set system properties so Spring can read them
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));

        System.setProperty("SUPABASE_URL", dotenv.get("SUPABASE_URL"));
        System.setProperty("SUPABASE_ANON_KEY", dotenv.get("SUPABASE_ANON_KEY"));
        System.setProperty("SUPABASE_SERVICE_ROLE_KEY", dotenv.get("SUPABASE_SERVICE_ROLE_KEY"));

        SpringApplication.run(OnlineStudentRegistrationsApplication.class, args);
    }

}
