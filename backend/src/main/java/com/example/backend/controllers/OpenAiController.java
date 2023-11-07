package com.example.backend.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.OpenAICompletionService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class OpenAiController {

    @Autowired
    OpenAICompletionService openAICompletionService;

    @PostMapping("/api/text-to-sql")
    List<String> getTextToSQL(@RequestBody(required = true) String prompt) {
        if (prompt == "") {
            return new ArrayList<>();
        }

        return openAICompletionService.getTextToSQL(prompt);
    }
}
