package gecw.ace.db;

public class File {
    public static void writeToFile(String path, String data) {
        try {
            java.io.File file = new java.io.File(path);
            java.io.FileWriter fileWriter = new java.io.FileWriter(file);
            fileWriter.write(data);
            fileWriter.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String readFromFile(String path) {
        try {
            java.io.File file = new java.io.File(path);
            java.io.FileReader fileReader = new java.io.FileReader(file);
            StringBuilder data = new StringBuilder();
            int i;
            while ((i = fileReader.read()) != -1) {
                data.append((char) i);
            }
            fileReader.close();
            return data.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
