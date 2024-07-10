package gecw.ace.db;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class Collection {
    String name;
    JsonArray data;

    Collection(String name, JsonArray data) {
        this.name = name;
        this.data = data;
    }

    public JsonObject insert(JsonObject document) {
        if (!document.has("id")) document.addProperty("id", Crypto.uuid());
        data.add(document);
        Database.save();
        return document;
    }

    public void update(JsonObject data, String id) {
        for (int i = 0; i < data.size(); i++) {
            if (this.data.get(i).getAsJsonObject().get("id").getAsString().equals(id)) {
                int finalI = i;
                data.keySet().forEach(key -> {
                    this.data.get(finalI).getAsJsonObject().addProperty(key, data.get(key).getAsString());
                });
                Database.save();
                break;
            }
        }
    }

    public void delete(String id) {
        for (int i = 0; i < data.size(); i++) {
            if (this.data.get(i).getAsJsonObject().get("id").getAsString().equals(id)) {
                this.data.remove(i);
                Database.save();
                break;
            }
        }
    }

    public JsonObject get(String id) {
        for (int i = 0; i < data.size(); i++) {
            if (this.data.get(i).getAsJsonObject().get("id").getAsString().equals(id)) {
                return this.data.get(i).getAsJsonObject();
            }
        }
        return null;
    }

    public JsonArray search(String query) {
        JsonArray result = new JsonArray();
        for (int i = 0; i < data.size(); i++) {
            if (this.data.get(i).getAsJsonObject().toString().toLowerCase().contains(query.toLowerCase())) {
                result.add(this.data.get(i).getAsJsonObject());
            }
        }
        return result;
    }

    public JsonArray getAll() {
        return this.data.getAsJsonArray();
    }

}

