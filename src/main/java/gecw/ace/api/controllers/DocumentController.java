package gecw.ace.api.controllers;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import gecw.ace.api.Response;
import gecw.ace.db.Collection;
import gecw.ace.db.Database;
import gecw.ace.utils.ImageProcessing;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Date;

@RestController
@RequestMapping("/document")
public class DocumentController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/create")
    public String createDocument(@RequestParam("file") MultipartFile file,@RequestParam("data") String dataString) {
        JsonObject data = JsonParser.parseString(dataString).getAsJsonObject();
        try {
            String path =UPLOAD_DIR +  new Date().getTime() + "_" + file.getOriginalFilename();
            InputStream inputStream = file.getInputStream();
            OutputStream outputStream = new FileOutputStream(path);
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            outputStream.close();
            inputStream.close();

            long FILE_SIZE = new File(path).length();
            data.addProperty("path", path);
            data.addProperty("size", FILE_SIZE);
            data.addProperty("name", file.getOriginalFilename());
            JsonObject result = Database.collection("documents").insert(data);

            return new Response("Document inserted successfully",200,false).string();
        } catch (IOException e) {
            return new Response("Error while uploading file",500,true).string();
        }
    }

    @GetMapping("/get")
    public String getDocument() {
        return Database.collection("documents").getAll().toString();
    }

    @GetMapping("/filter")
    public String filterDocument(@RequestParam("query") String query) {
        return Database.collection("documents").search(query).toString();
    }
}
