package gecw.ace.fx;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

public class Window  extends Application {

    @Override
    public void start(Stage stage) throws Exception {
        WebView webView = new WebView();
        webView.getEngine().load("http://localhost:50000/ui/index.html");
        Scene scene = new Scene(webView);
        stage.setMinWidth(1200);
        stage.setMinHeight(800);
        stage.setScene(scene);
        stage.show();
    }

}
