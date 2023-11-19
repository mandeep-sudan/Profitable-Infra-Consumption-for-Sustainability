package com.example.backend.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static java.util.Map.entry;

import org.springframework.boot.json.GsonJsonParser;
import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.gson.Gson;

@Service
public class AutoMLClient {

    private static String API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
    private static String PROJECT_ID = "profitable-infra-consumption";
    private static String MODEL_ID = "code-bison";
    private static String LOCATION_ID = "us-central1";

    private String getToken() throws Exception {
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault()
                .createScoped("https://www.googleapis.com/auth/cloud-platform");
        credentials.refreshIfExpired();
        return credentials.getAccessToken().getTokenValue();
    }

    public String textToQuery(String query) throws Exception {
        HttpClient client = HttpClient.newBuilder().build();

        // Create a request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(getResourceLocator()))
                .header("Authorization", String.format("Bearer %s", this.getToken()))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(buildRequestBody(query)))
                .build();

        // Send the request and get the response
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    private static String getResourceLocator() {
        return String.format("https://%s/v1/projects/%s/locations/%s/publishers/google/models/%s:predict", API_ENDPOINT,
                PROJECT_ID, LOCATION_ID, MODEL_ID);
    }

    private String buildRequestBody(String query) {
        Map<String, Object> container = new HashMap<>();
        container.put("instances", List.of(Map.ofEntries(entry("prefix", query))));
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(
                "candidateCount", 1);
        parameters.put("maxOutputTokens", 1024);
        parameters.put("temperature", 0.2);
        container.put("parameters", parameters);
        return new Gson().toJson(container);
    }
}
