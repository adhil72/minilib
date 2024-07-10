package gecw.ace;

import gecw.ace.api.Config;
import gecw.ace.db.Database;
import gecw.ace.fx.Window;
import org.springframework.boot.SpringApplication;


public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        Database.init();
        SpringApplication.run(Config.class,args);
        Window.launch(Window.class, args);
    }
}