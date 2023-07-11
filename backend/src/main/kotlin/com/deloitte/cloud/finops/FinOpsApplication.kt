package com.deloitte.cloud.finops

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication class FinOpsApplication

fun main(args: Array<String>) {
    runApplication<FinOpsApplication>(*args)
}
