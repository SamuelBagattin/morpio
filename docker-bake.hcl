group "default" {
    targets = ["morpio"]
}

target "morpio" {
    dockerfile = "Dockerfile"
    tags = ["ghcr.io/samuelbagattin/morpio:latest,ghcr.io/samuelbagattin/morpio:stable"]
    platforms = ["linux/arm64", "linux/amd64"]
    args = {
      STATIC_DIR="./dist/morpio"
    }
}
