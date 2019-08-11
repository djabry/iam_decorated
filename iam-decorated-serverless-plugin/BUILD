package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")


all_sources = ["*.ts"]
all_tests = ["*.spec.ts", "test/**"]

ts_library(
    module_name = "@djabry/iam-decorated-serverless-plugin",
    name = "lib",
    srcs = glob(all_sources, exclude = all_tests),
    deps = [
        "//iam-decorated-core:lib",
        "@npm//@types/node",
        "@npm//@types/aws-lambda",
        "@npm//serverless",
        "@npm//@types/serverless",
        "@npm//aws-sdk",
    ],
)

ts_library(
    name = "test_lib",
    srcs = glob(all_tests),
    deps = [
        ":lib",
        "@npm//@types/node",
        "@npm//@types/jasmine",
        "@npm//@types/chai",
        "@npm//aws-sdk",
        "@npm//chai",
    ],
)

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

jasmine_node_test(
        name = "test",
        deps = [
            ":test_lib",
            "@npm//jasmine",
            "@npm//aws-sdk",
            "@npm//chai"
        ],
    )

load("//tools/npm:package.bzl", "tar_npm_package")

tar_npm_package(
    name = "package",
    srcs = ["package.json"],
    deps = [":lib"],
)
