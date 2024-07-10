package gecw.ace.utils;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import java.io.File;

public class ImageProcessing extends Thread {
    private File imageFile;

    public ImageProcessing(String  imageFile) {
        this.imageFile = new File(imageFile);
    }

    @Override
    public void run() {
        try {
            ITesseract instance = new Tesseract();
            String result = instance.doOCR(imageFile);
            System.out.println("Extracted Text: " + result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
