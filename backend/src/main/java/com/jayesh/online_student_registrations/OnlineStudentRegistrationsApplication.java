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

		SpringApplication.run(OnlineStudentRegistrationsApplication.class, args);
	}

}
