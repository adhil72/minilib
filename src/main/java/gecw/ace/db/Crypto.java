package gecw.ace.db;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.security.SecureRandom;
import java.util.Base64;

public class Crypto {

    private static SecretKey key;
    private static final String ALGORITHM = "AES";
    private static final String MODE = "AES/CBC/PKCS5Padding";
    private static final int IV_LENGTH = 16;

    public static void init() {
        try {
            if (key == null) key = generateKey();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static SecretKey generateKey() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance(ALGORITHM);
        keyGen.init(128);
        return keyGen.generateKey();
    }

    public static String encrypt(String data) throws Exception {
        Cipher cipher = Cipher.getInstance(MODE);
        byte[] iv = generateIv();
        cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(iv));
        byte[] encryptedData = cipher.doFinal(data.getBytes());
        byte[] encryptedDataWithIv = new byte[IV_LENGTH + encryptedData.length];
        System.arraycopy(iv, 0, encryptedDataWithIv, 0, IV_LENGTH);
        System.arraycopy(encryptedData, 0, encryptedDataWithIv, IV_LENGTH, encryptedData.length);
        return Base64.getEncoder().encodeToString(encryptedDataWithIv);
    }

    public static String decrypt(String encryptedData) throws Exception {
        byte[] encryptedDataWithIv = Base64.getDecoder().decode(encryptedData);
        byte[] iv = new byte[IV_LENGTH];
        byte[] actualEncryptedData = new byte[encryptedDataWithIv.length - IV_LENGTH];
        System.arraycopy(encryptedDataWithIv, 0, iv, 0, IV_LENGTH);
        System.arraycopy(encryptedDataWithIv, IV_LENGTH, actualEncryptedData, 0, actualEncryptedData.length);
        Cipher cipher = Cipher.getInstance(MODE);
        cipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec(iv));
        byte[] decryptedData = cipher.doFinal(actualEncryptedData);
        return new String(decryptedData);
    }

    private static byte[] generateIv() {
        byte[] iv = new byte[IV_LENGTH];
        SecureRandom random = new SecureRandom();
        random.nextBytes(iv);
        return iv;
    }

    public static String uuid() {
        return java.util.UUID.randomUUID().toString();
    }
}
