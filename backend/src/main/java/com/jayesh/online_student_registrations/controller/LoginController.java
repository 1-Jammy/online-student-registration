package com.jayesh.online_student_registrations.controller;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayesh.online_student_registrations.model.LoginRequest;

@RestController
@RequestMapping("/api")
public class LoginController {

    private final String supabaseUrl = System.getProperty("SUPABASE_URL");
    private final String anonKey = System.getProperty("SUPABASE_ANON_KEY");
    private final String serviceKey = System.getProperty("SUPABASE_SERVICE_ROLE_KEY");

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            if (supabaseUrl == null || anonKey == null || serviceKey == null) {
                return error("Supabase environment variables not configured", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            String email = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            HttpClient client = HttpClient.newHttpClient();

            HttpRequest loginRequestHttp = HttpRequest.newBuilder()
                    .uri(URI.create(supabaseUrl + "/auth/v1/token?grant_type=password"))
                    .header("apikey", anonKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(
                            String.format("{\"email\": \"%s\", \"password\": \"%s\"}", email, password)))
                    .build();

            HttpResponse<String> loginResponse = client.send(loginRequestHttp, HttpResponse.BodyHandlers.ofString());

            System.out.println("🔐 Supabase login status: " + loginResponse.statusCode());
            System.out.println("🔐 Supabase login body: " + loginResponse.body());

            if (loginResponse.statusCode() != 200) {
                return error("Invalid login credentials", HttpStatus.UNAUTHORIZED);
            }

            ObjectMapper mapper = new ObjectMapper();
            JsonNode loginJson = mapper.readTree(loginResponse.body());

            String accessToken = loginJson.has("access_token") ? loginJson.get("access_token").asText() : null;
            String userId = loginJson.has("user") ? loginJson.get("user").get("id").asText() : null;

            if (accessToken == null || userId == null) {
                return error("Login failed: Missing token or user ID", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            HttpRequest userRequest = HttpRequest.newBuilder()
                    .uri(URI.create(supabaseUrl + "/rest/v1/users?id=eq." + userId))
                    .header("apikey", serviceKey)
                    .header("Authorization", "Bearer " + accessToken)
                    .header("Accept", "application/json")
                    .GET()
                    .build();

            HttpResponse<String> userResponse = client.send(userRequest, HttpResponse.BodyHandlers.ofString());

            JsonNode userJson = mapper.readTree(userResponse.body());

            boolean isAdmin = userJson.isArray() && userJson.size() > 0
                    && userJson.get(0).has("is_admin")
                    && userJson.get(0).get("is_admin").asBoolean();

            return ResponseEntity.ok(Map.of("is_admin", isAdmin));

        } catch (Exception e) {
            e.printStackTrace();
            return error("Login failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest registerRequest) {
        try {
            if (supabaseUrl == null || anonKey == null || serviceKey == null) {
                return error("Supabase environment variables not configured", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            String email = registerRequest.getEmail();
            String password = registerRequest.getPassword();

            HttpClient client = HttpClient.newHttpClient();

            HttpRequest signupRequest = HttpRequest.newBuilder()
                    .uri(URI.create(supabaseUrl + "/auth/v1/signup"))
                    .header("apikey", anonKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(
                            String.format("{\"email\": \"%s\", \"password\": \"%s\"}", email, password)))
                    .build();

            HttpResponse<String> signupResponse = client.send(signupRequest, HttpResponse.BodyHandlers.ofString());

            System.out.println("📝 Supabase signup status: " + signupResponse.statusCode());
            System.out.println("📝 Supabase signup body: " + signupResponse.body());

            if (signupResponse.statusCode() != 200) {
                return error("Registration failed: " + signupResponse.body(), HttpStatus.BAD_REQUEST);
            }

            return ResponseEntity.ok(Map.of("message", "Registration successful"));
        } catch (Exception e) {
            e.printStackTrace();
            return error("Registration failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<Map<String, String>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("error", message));
    }
}
