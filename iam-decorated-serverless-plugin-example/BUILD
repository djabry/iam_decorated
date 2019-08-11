load("//tools:node_modules.bzl", "node_modules")

filegroup(
    name = "files",
    srcs = glob([
        "**/*.*",
    ]),
)

node_modules(
    name = "node_modules",
    deps = [
        "//iam-decorated-core:package_tar",
        "//iam-decorated-serverless-plugin:package_tar"
    ],
)

