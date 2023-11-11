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
        List<CompletionChoice> choices = service
                .createCompletion(
                        CompletionRequest.builder().prompt(prompt).model("gpt-3.5-turbo-instruct").echo(true).build())
                .getChoices();

        return choices.stream().map(CompletionChoice::getText).collect(Collectors.toList());
    }
}
