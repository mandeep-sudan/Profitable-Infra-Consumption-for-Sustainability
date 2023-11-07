package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.theokanning.openai.completion.CompletionChoice;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;

@Service
public class OpenAICompletionService {

    @Autowired
    OpenAiService service;

    public List<String> getTextToSQL(String prompt) {
        return service
                .createCompletion(CompletionRequest.builder().prompt("").model("gpt-3.5-turbo").echo(true).build())
                .getChoices()
                .stream().map(CompletionChoice::getText).collect(Collectors.toList());
    }
}
