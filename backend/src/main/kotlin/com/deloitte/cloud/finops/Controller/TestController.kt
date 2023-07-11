package com.deloitte.cloud.finops.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class testController {
    @GetMapping("/")
    fun hello(): String {
        return "Hello World!"
    }
}
