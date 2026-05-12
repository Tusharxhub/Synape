use crate::models::{ProjectFile, ProjectFolder};
use std::path::Path;
use walkdir::WalkDir;

/// Directories to skip during scanning
const IGNORED_DIRS: &[&str] = &[
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    "turbo",
    "coverage",
    ".cache",
    "target",
    "venv",
    ".venv",
    "__pycache__",
    ".turbo",
    ".vercel",
    ".svelte-kit",
    ".nuxt",
    ".output",
    ".parcel-cache",
];

/// Max binary file size to include (1MB)
const MAX_FILE_SIZE: u64 = 1_048_576;

/// Binary extensions to skip
const BINARY_EXTENSIONS: &[&str] = &[
    "png", "jpg", "jpeg", "gif", "bmp", "ico", "svg", "webp", "mp4", "mp3", "wav",
    "ogg", "avi", "mov", "woff", "woff2", "ttf", "otf", "eot", "zip", "tar", "gz",
    "rar", "7z", "exe", "dll", "so", "dylib", "o", "a", "class", "jar", "pdf",
    "doc", "docx", "xls", "xlsx", "ppt", "pptx",
];

pub struct ScanResult {
    pub files: Vec<ProjectFile>,
    pub folders: Vec<ProjectFolder>,
    pub total_size_bytes: u64,
}

/// Scan the filesystem rooted at `root_path`, collecting files and folders.
pub fn scan_filesystem(root_path: &str) -> Result<ScanResult, String> {
    let root = Path::new(root_path);
    if !root.exists() {
        return Err(format!("Path does not exist: {}", root_path));
    }
    if !root.is_dir() {
        return Err(format!("Path is not a directory: {}", root_path));
    }

    let mut files: Vec<ProjectFile> = Vec::new();
    let mut folders: Vec<ProjectFolder> = Vec::new();
    let mut total_size: u64 = 0;
    let mut file_counter: u64 = 0;
    let mut folder_counter: u64 = 0;

    let walker = WalkDir::new(root)
        .follow_links(false)
        .into_iter()
        .filter_entry(|entry| {
            let name = entry.file_name().to_string_lossy();
            // Skip ignored directories
            if entry.file_type().is_dir() {
                return !IGNORED_DIRS.contains(&name.as_ref());
            }
            true
        });

    for entry in walker {
        let entry = match entry {
            Ok(e) => e,
            Err(_) => continue, // Skip permission errors, etc.
        };

        let path = entry.path();
        let relative = path
            .strip_prefix(root)
            .unwrap_or(path)
            .to_string_lossy()
            .to_string();

        // Skip the root itself
        if relative.is_empty() {
            continue;
        }

        if entry.file_type().is_dir() {
            folder_counter += 1;
            let name = entry.file_name().to_string_lossy().to_string();
            folders.push(ProjectFolder {
                id: format!("folder-{}", folder_counter),
                name,
                path: path.to_string_lossy().to_string(),
                relative_path: relative,
            });
        } else if entry.file_type().is_file() {
            let metadata = entry.metadata();
            let size = metadata.map(|m| m.len()).unwrap_or(0);

            // Skip huge files
            if size > MAX_FILE_SIZE {
                continue;
            }

            let name = entry.file_name().to_string_lossy().to_string();
            let extension = path
                .extension()
                .map(|e| e.to_string_lossy().to_string());

            // Skip binary files
            if let Some(ref ext) = extension {
                if BINARY_EXTENSIONS.contains(&ext.to_lowercase().as_str()) {
                    continue;
                }
            }

            let category = categorize_file(&name, extension.as_deref());

            file_counter += 1;
            total_size += size;

            files.push(ProjectFile {
                id: format!("file-{}", file_counter),
                name,
                path: path.to_string_lossy().to_string(),
                relative_path: relative,
                extension,
                size_bytes: size,
                category,
            });
        }
    }

    Ok(ScanResult {
        files,
        folders,
        total_size_bytes: total_size,
    })
}

/// Categorize a file based on its name and extension.
fn categorize_file(name: &str, extension: Option<&str>) -> String {
    let lower_name = name.to_lowercase();

    // Environment files — detect existence only, never read contents
    if lower_name == ".env"
        || lower_name == ".env.local"
        || lower_name == ".env.example"
        || lower_name == ".env.development"
        || lower_name == ".env.production"
        || lower_name == ".env.test"
        || lower_name == ".env.sample"
    {
        return "environment".to_string();
    }

    // Documentation
    if lower_name.starts_with("readme")
        || lower_name.starts_with("changelog")
        || lower_name.starts_with("license")
        || lower_name.starts_with("contributing")
    {
        return "documentation".to_string();
    }

    // Test files — match .test.ts, .spec.tsx, __tests__ patterns
    if lower_name.contains(".test.")
        || lower_name.contains(".spec.")
        || lower_name.contains("__tests__")
    {
        return "test".to_string();
    }

    // Config files
    if lower_name.starts_with(".")
        || lower_name.contains("config")
        || lower_name.contains("rc")
        || lower_name == "package.json"
        || lower_name == "cargo.toml"
        || lower_name == "tsconfig.json"
        || lower_name == "dockerfile"
        || lower_name.starts_with("docker-compose")
        || lower_name.starts_with("compose")
        || lower_name == "makefile"
        || lower_name == "procfile"
    {
        return "config".to_string();
    }

    match extension {
        Some(ext) => match ext.to_lowercase().as_str() {
            // Source code
            "ts" | "tsx" | "js" | "jsx" | "rs" | "py" | "go" | "java" | "c" | "cpp"
            | "h" | "hpp" | "cs" | "rb" | "php" | "swift" | "kt" | "scala" | "vue"
            | "svelte" => "source".to_string(),

            // Styles
            "css" | "scss" | "sass" | "less" | "styl" => "style".to_string(),

            // Config
            "json" | "yaml" | "yml" | "toml" | "ini" | "lock" => "config".to_string(),

            // Documentation
            "md" | "mdx" | "txt" | "rst" => "documentation".to_string(),

            // Assets
            "html" | "xml" => "source".to_string(),

            _ => "unknown".to_string(),
        },
        None => {
            if lower_name == "dockerfile" || lower_name == "makefile" || lower_name == "procfile" {
                "config".to_string()
            } else {
                "unknown".to_string()
            }
        }
    }
}
