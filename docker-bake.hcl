group "default" {
    targets = ["morpio"]
}

target "morpio" {
    dockerfile = "Dockerfile"
    tags = ["ghcr.io/samuelbagattin/morpio"]
    platforms = ["linux/arm64", "linux/amd64"]
}
