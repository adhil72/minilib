package gecw.ace.api;

import com.google.gson.JsonObject;

public class Response {

    JsonObject data;

    public Response(String message, int code, Boolean failed) {
        this.data = new JsonObject();
        this.data.addProperty("message", message);
        this.data.addProperty("code", code);
        this.data.addProperty("failed", failed);
    }

    public String string() {
        return this.data.toString();
    }
}
