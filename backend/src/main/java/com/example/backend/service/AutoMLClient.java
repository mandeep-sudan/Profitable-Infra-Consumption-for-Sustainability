package com.example.backend.service;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;

@Service
public class AutoMLClient {

    public String getToken() throws Exception {
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault()
                .createScoped("https://www.googleapis.com/auth/cloud-platform");
        credentials.refreshIfExpired();
        return credentials.getAccessToken().getTokenValue();
    }
}
