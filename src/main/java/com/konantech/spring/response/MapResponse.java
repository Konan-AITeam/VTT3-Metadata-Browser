package com.konantech.spring.response;

import lombok.Data;

@Data
public class MapResponse {
    String result;
    int status;
    Object message;
    long timestamps;

    public MapResponse() {
        this.status = 200;
        timestamps = System.currentTimeMillis();
    }
}
