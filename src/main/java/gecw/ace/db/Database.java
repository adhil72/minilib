package gecw.ace.db;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.tomcat.util.json.JSONParser;

public class Database {
    static String dbPath = "data.json";
    static JsonObject collections = new JsonObject();

    public static void init(){
        load();
    }

    public static Collection collection(String collectionName) {
        if (!collections.has(collectionName)) collections.add(collectionName, new JsonArray());
        return new Collection(collectionName, collections.get(collectionName).getAsJsonArray());
    }

    static void save() {
        File.writeToFile(dbPath, collections.toString());
    }

    static void load() {
        String data = File.readFromFile(dbPath);
        if (data.isEmpty()) return;
        collections = JsonParser.parseString(data).getAsJsonObject();
        System.out.println(collections);
    }

}
