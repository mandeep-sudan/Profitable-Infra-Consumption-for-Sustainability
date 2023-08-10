package com.example.backend.model;

import java.util.List;

import lombok.Data;
// import lombok.AllArgsConstructor;

@Data
// @AllArgsConstructor
public class QueryPage<T> {
    private List<T> rowList;
    private String nextPageInfo;

    public QueryPage(List<T> rowList,int nextPageInfo) {
        this.rowList=rowList;
        this.nextPageInfo=Integer.toString(nextPageInfo);
    }
}
