package gecw.ace.api.controllers;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import gecw.ace.api.Response;
import gecw.ace.db.Database;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tags")
public class TagsController {
    @PostMapping("/create")
    public String addTag(@RequestBody String dataString) {
        JsonObject data = JsonParser.parseString(dataString).getAsJsonObject();
        Database.collection("tags").insert(data);
        return new Response("Tag created successfully", 200, false).string();
    }

    @GetMapping("/get")
    public String getTags() {
        return Database.collection("tags").getAll().toString();
    }
}
