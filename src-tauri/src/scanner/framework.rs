use crate::models::ProjectDependency;
use std::path::Path;

/// Detect the primary framework used in the project
pub fn detect_framework(root_path: &str, dependencies: &[ProjectDependency]) -> Option<String> {
    let root = Path::new(root_path);

    // Check for Tauri (src-tauri directory or tauri.conf.json)
    if root.join("src-tauri").exists() || root.join("tauri.conf.json").exists() {
        // Tauri is usually combined with another framework
        let sub_framework = detect_sub_framework(root, dependencies);
        return match sub_framework {
            Some(fw) => Some(format!("{} + Tauri", fw)),
            None => Some("Tauri".to_string()),
        };
    }

    // Check for Next.js
    if root.join("next.config.js").exists()
        || root.join("next.config.ts").exists()
        || root.join("next.config.mjs").exists()
        || has_dependency(dependencies, "next")
    {
        return Some("Next.js".to_string());
    }

    // Check for NestJS
    if has_dependency(dependencies, "@nestjs/core") {
        return Some("NestJS".to_string());
    }

    // Check for Nuxt
    if root.join("nuxt.config.ts").exists()
        || root.join("nuxt.config.js").exists()
        || has_dependency(dependencies, "nuxt")
    {
        return Some("Nuxt".to_string());
    }

    // Check for SvelteKit
    if has_dependency(dependencies, "@sveltejs/kit") {
        return Some("SvelteKit".to_string());
    }

    // Check for Svelte
    if has_dependency(dependencies, "svelte") {
        return Some("Svelte".to_string());
    }

    // Check for Vue
    if has_dependency(dependencies, "vue") {
        return Some("Vue".to_string());
    }

    // Check for Remix
    if has_dependency(dependencies, "@remix-run/react") {
        return Some("Remix".to_string());
    }

    // Check for Astro
    if has_dependency(dependencies, "astro") {
        return Some("Astro".to_string());
    }

    // Check for Vite (standalone)
    if root.join("vite.config.ts").exists()
        || root.join("vite.config.js").exists()
        || root.join("vite.config.mjs").exists()
    {
        if has_dependency(dependencies, "react") {
            return Some("React + Vite".to_string());
        }
        return Some("Vite".to_string());
    }

    // Check for React (CRA or standalone)
    if has_dependency(dependencies, "react") {
        return Some("React".to_string());
    }

    // Check for Express
    if has_dependency(dependencies, "express") {
        return Some("Express".to_string());
    }

    // Check for Fastify
    if has_dependency(dependencies, "fastify") {
        return Some("Fastify".to_string());
    }

    // Check for Django/FastAPI/Flask (Python)
    if root.join("manage.py").exists() {
        return Some("Django".to_string());
    }

    // Check for Prisma
    if root.join("prisma").join("schema.prisma").exists() {
        return Some("Prisma".to_string());
    }

    // Check for Cargo.toml (Rust project)
    if root.join("Cargo.toml").exists() && !root.join("src-tauri").exists() {
        return Some("Rust".to_string());
    }

    // Check for Go
    if root.join("go.mod").exists() {
        return Some("Go".to_string());
    }

    None
}

fn detect_sub_framework(root: &Path, dependencies: &[ProjectDependency]) -> Option<String> {
    if has_dependency(dependencies, "next") {
        return Some("Next.js".to_string());
    }
    if root.join("vite.config.ts").exists() || root.join("vite.config.js").exists() {
        if has_dependency(dependencies, "react") {
            return Some("React + Vite".to_string());
        }
        return Some("Vite".to_string());
    }
    if has_dependency(dependencies, "react") {
        return Some("React".to_string());
    }
    None
}

fn has_dependency(dependencies: &[ProjectDependency], name: &str) -> bool {
    dependencies.iter().any(|d| d.name == name)
}
