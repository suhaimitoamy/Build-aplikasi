package com.trading.library.manager;

import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.provider.Settings;
import android.util.Size;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.BridgeActivity;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

public class MainActivity extends BridgeActivity {
    private static final int STORAGE_SCAN_PERMISSION_REQUEST = 7718;
    private static final int MAX_SCAN_RESULTS = 5000;

    private boolean scanAfterPermission = false;

    private static final Set<String> SUPPORTED_DOCUMENT_EXTENSIONS = new HashSet<>(Arrays.asList(
        "pdf", "doc", "docx", "md", "txt", "xls", "xlsx", "csv", "ppt", "pptx"
    ));

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            WebView webView = getBridge().getWebView();
            webView.addJavascriptInterface(new StorageScannerBridge(), "TradingStorageScanner");
        } catch (Exception ignored) {
        }
    }

    public class StorageScannerBridge {
        @JavascriptInterface
        public void scanFiles() {
            runOnUiThread(() -> {
                scanAfterPermission = true;
                if (hasAnyStoragePermission()) {
                    startStorageScan();
                } else {
                    dispatchStorageEvent("permission_required", "Meminta izin akses foto/video/storage HP...", new JSONArray());
                    requestStoragePermissions();
                }
            });
        }

        @JavascriptInterface
        public void requestThumbnail(String itemId, String uriText, String kind) {
            new Thread(() -> createAndDispatchThumbnail(itemId, uriText, kind)).start();
        }
    }

    private boolean hasAnyStoragePermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            return Environment.isExternalStorageManager();
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            return ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES) == PackageManager.PERMISSION_GRANTED
                || ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_VIDEO) == PackageManager.PERMISSION_GRANTED;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;
        }
        return true;
    }

    private void requestStoragePermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R && !Environment.isExternalStorageManager()) {
            dispatchStorageEvent("permission_required", "Aktifkan izin Kelola semua file agar PDF, Word, Excel, PowerPoint, gambar, dan video bisa discan.", new JSONArray());
            try {
                Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
                intent.setData(Uri.parse("package:" + getPackageName()));
                startActivity(intent);
            } catch (Exception ignored) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION);
                startActivity(intent);
            }
            return;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
            ActivityCompat.requestPermissions(this, new String[] {
                Manifest.permission.READ_MEDIA_IMAGES,
                Manifest.permission.READ_MEDIA_VIDEO,
                Manifest.permission.READ_MEDIA_VISUAL_USER_SELECTED
            }, STORAGE_SCAN_PERMISSION_REQUEST);
            return;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            ActivityCompat.requestPermissions(this, new String[] {
                Manifest.permission.READ_MEDIA_IMAGES,
                Manifest.permission.READ_MEDIA_VIDEO
            }, STORAGE_SCAN_PERMISSION_REQUEST);
            return;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            ActivityCompat.requestPermissions(this, new String[] {
                Manifest.permission.READ_EXTERNAL_STORAGE
            }, STORAGE_SCAN_PERMISSION_REQUEST);
            return;
        }
        startStorageScan();
    }

    @Override
    public void onResume() {
        super.onResume();
        if (scanAfterPermission && hasAnyStoragePermission()) {
            scanAfterPermission = false;
            startStorageScan();
        } else if (scanAfterPermission && Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            scanAfterPermission = false;
            dispatchStorageEvent("denied", "Izin Kelola semua file belum aktif. Scan File HP dibatalkan.", new JSONArray());
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode != STORAGE_SCAN_PERMISSION_REQUEST) return;

        boolean granted = false;
        for (int result : grantResults) {
            if (result == PackageManager.PERMISSION_GRANTED) {
                granted = true;
                break;
            }
        }

        if (granted && scanAfterPermission) {
            scanAfterPermission = false;
            startStorageScan();
        } else {
            scanAfterPermission = false;
            dispatchStorageEvent("denied", "Izin storage ditolak. Scan File HP tidak bisa dijalankan.", new JSONArray());
        }
    }

    private void startStorageScan() {
        dispatchStorageProgress("progress", "Memindai file...", new JSONArray(), 0, 0);
        new Thread(() -> {
            JSONArray files = new JSONArray();
            HashSet<String> seen = new HashSet<>();
            try {
                scanMediaCollection(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image", files, seen);
                scanMediaCollection(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, "video", files, seen);
                scanDocumentCollection(files, seen);
                dispatchStorageProgress("success", "Scan selesai.", files, files.length(), 0);
            } catch (Exception error) {
                dispatchStorageEvent("error", "Scan storage gagal: " + error.getMessage(), files);
            }
        }).start();
    }

    private void scanMediaCollection(Uri collectionUri, String kind, JSONArray files, Set<String> seen) {
        if (files.length() >= MAX_SCAN_RESULTS) return;

        String[] projection = new String[] {
            MediaStore.MediaColumns._ID,
            MediaStore.MediaColumns.DISPLAY_NAME,
            MediaStore.MediaColumns.MIME_TYPE,
            MediaStore.MediaColumns.SIZE,
            MediaStore.MediaColumns.DATE_MODIFIED
        };

        String sortOrder = MediaStore.MediaColumns.DATE_MODIFIED + " DESC";
        ContentResolver resolver = getContentResolver();

        try (Cursor cursor = resolver.query(collectionUri, projection, null, null, sortOrder)) {
            if (cursor == null) return;
            while (cursor.moveToNext() && files.length() < MAX_SCAN_RESULTS) {
                addCursorRow(collectionUri, cursor, kind, files, seen);
                if (files.length() % 100 == 0) {
                    dispatchStorageProgress("progress", "Memindai file...", new JSONArray(), files.length(), 0);
                }
            }
        } catch (SecurityException ignored) {
        }
    }

    private void scanDocumentCollection(JSONArray files, Set<String> seen) {
        if (files.length() >= MAX_SCAN_RESULTS) return;

        Uri collectionUri = MediaStore.Files.getContentUri("external");
        String[] projection = Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q
            ? new String[] {
                MediaStore.MediaColumns._ID,
                MediaStore.MediaColumns.DISPLAY_NAME,
                MediaStore.MediaColumns.MIME_TYPE,
                MediaStore.MediaColumns.SIZE,
                MediaStore.MediaColumns.DATE_MODIFIED,
                MediaStore.MediaColumns.RELATIVE_PATH
            }
            : new String[] {
                MediaStore.MediaColumns._ID,
                MediaStore.MediaColumns.DISPLAY_NAME,
                MediaStore.MediaColumns.MIME_TYPE,
                MediaStore.MediaColumns.SIZE,
                MediaStore.MediaColumns.DATE_MODIFIED
            };
        String sortOrder = MediaStore.MediaColumns.DATE_MODIFIED + " DESC";

        try (Cursor cursor = getContentResolver().query(collectionUri, projection, null, null, sortOrder)) {
            if (cursor == null) return;
            while (cursor.moveToNext() && files.length() < MAX_SCAN_RESULTS) {
                String name = getCursorString(cursor, MediaStore.MediaColumns.DISPLAY_NAME);
                String extension = getExtension(name);
                if (!SUPPORTED_DOCUMENT_EXTENSIONS.contains(extension)) continue;
                addCursorRow(collectionUri, cursor, "document", files, seen);
                if (files.length() % 100 == 0) {
                    dispatchStorageProgress("progress", "Memindai file...", new JSONArray(), files.length(), 0);
                }
            }
        } catch (SecurityException ignored) {
        }
    }

    private void addCursorRow(Uri collectionUri, Cursor cursor, String kind, JSONArray files, Set<String> seen) {
        try {
            long id = getCursorLong(cursor, MediaStore.MediaColumns._ID);
            if (id <= 0) return;
            Uri uri = ContentUris.withAppendedId(collectionUri, id);
            String uriText = uri.toString();
            if (seen.contains(uriText)) return;

            String name = getCursorString(cursor, MediaStore.MediaColumns.DISPLAY_NAME);
            if (name == null || name.trim().isEmpty()) name = "File Storage";
            String mimeType = getCursorString(cursor, MediaStore.MediaColumns.MIME_TYPE);
            long size = getCursorLong(cursor, MediaStore.MediaColumns.SIZE);
            long modified = getCursorLong(cursor, MediaStore.MediaColumns.DATE_MODIFIED);
            String relativePath = getCursorString(cursor, MediaStore.MediaColumns.RELATIVE_PATH);
            String dedupKey = buildDedupKey(name, size, mimeType, modified, relativePath);

            JSONObject file = new JSONObject();
            file.put("uri", uriText);
            file.put("name", name);
            file.put("mimeType", mimeType == null ? "" : mimeType);
            file.put("size", size);
            file.put("modifiedAt", modified);
            file.put("path", relativePath == null ? "" : relativePath);
            file.put("kind", kind);
            file.put("fileHash", dedupKey);
            file.put("dedupKey", dedupKey);
            files.put(file);
            seen.add(uriText);
        } catch (Exception ignored) {
        }
    }

    private void createAndDispatchThumbnail(String itemId, String uriText, String kind) {
        String thumbnailUri = "";
        String message = "";
        try {
            if (itemId == null || itemId.trim().isEmpty() || uriText == null || uriText.trim().isEmpty()) return;
            Uri uri = Uri.parse(uriText);
            Bitmap bitmap = null;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                int side = "video".equals(kind) ? 420 : 720;
                bitmap = getContentResolver().loadThumbnail(uri, new Size(side, side), null);
            }
            if (bitmap != null) {
                File dir = new File(getCacheDir(), "trading_scan_thumbs");
                if (!dir.exists()) dir.mkdirs();
                File out = new File(dir, Integer.toHexString((itemId + uriText).hashCode()) + ".jpg");
                try (FileOutputStream stream = new FileOutputStream(out)) {
                    int quality = "video".equals(kind) ? 72 : 88;
                    bitmap.compress(Bitmap.CompressFormat.JPEG, quality, stream);
                }
                thumbnailUri = Uri.fromFile(out).toString();
            }
        } catch (Exception error) {
            message = error.getMessage() == null ? "Thumbnail gagal dibuat." : error.getMessage();
        }
        dispatchThumbnailEvent(itemId, thumbnailUri, message);
    }

    private String getCursorString(Cursor cursor, String columnName) {
        int index = cursor.getColumnIndex(columnName);
        if (index < 0 || cursor.isNull(index)) return "";
        return cursor.getString(index);
    }

    private long getCursorLong(Cursor cursor, String columnName) {
        int index = cursor.getColumnIndex(columnName);
        if (index < 0 || cursor.isNull(index)) return 0L;
        return cursor.getLong(index);
    }

    private String getExtension(String name) {
        if (name == null) return "";
        int dot = name.lastIndexOf('.');
        if (dot < 0 || dot == name.length() - 1) return "";
        return name.substring(dot + 1).toLowerCase(Locale.US);
    }

    private String buildDedupKey(String name, long size, String mimeType, long modified, String path) {
        String safeName = name == null ? "" : name.trim().toLowerCase(Locale.US);
        String safeMime = mimeType == null ? "" : mimeType.trim().toLowerCase(Locale.US);
        String safePath = path == null ? "" : path.trim().toLowerCase(Locale.US);
        return "native:" + safeName + ":" + size + ":" + safeMime + ":" + modified + ":" + safePath;
    }

    private void dispatchStorageEvent(String status, String message, JSONArray files) {
        dispatchStorageProgress(status, message, files, files == null ? 0 : files.length(), 0);
    }

    private void dispatchStorageProgress(String status, String message, JSONArray files, int found, int errors) {
        try {
            JSONObject detail = new JSONObject();
            detail.put("status", status);
            detail.put("message", message == null ? "" : message);
            detail.put("files", files == null ? new JSONArray() : files);
            detail.put("found", found);
            detail.put("errors", errors);
            String script = "window.dispatchEvent(new CustomEvent('trading-storage-scan-result',{detail:" + detail.toString() + "}));";
            runOnUiThread(() -> {
                try {
                    getBridge().getWebView().evaluateJavascript(script, null);
                } catch (Exception ignored) {
                }
            });
        } catch (Exception ignored) {
        }
    }

    private void dispatchThumbnailEvent(String itemId, String thumbnailUri, String message) {
        try {
            JSONObject detail = new JSONObject();
            detail.put("itemId", itemId == null ? "" : itemId);
            detail.put("thumbnailUri", thumbnailUri == null ? "" : thumbnailUri);
            detail.put("message", message == null ? "" : message);
            String script = "window.dispatchEvent(new CustomEvent('trading-storage-thumbnail-result',{detail:" + detail.toString() + "}));";
            runOnUiThread(() -> {
                try {
                    getBridge().getWebView().evaluateJavascript(script, null);
                } catch (Exception ignored) {
                }
            });
        } catch (Exception ignored) {
        }
    }
}
