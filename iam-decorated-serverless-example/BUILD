package(default_visibility = ["//visibility:public"])
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

load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

nodejs_binary(
    name = "sls_info",
    data = [
        ":node_modules",
        ":files",
        "@npm//serverless",
    ],
    entry_point = "@npm//:node_modules/serverless/bin/serverless.js",
    templated_args = ["--node_options=--preserve-symlinks", "info"],
)

all_tests = ["*.spec.ts", "test/**"]

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "test_lib",
    srcs = glob(all_tests),
    deps = [
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
        data = [
            ":files",
            ":node_modules",
        ],
        deps = [
            ":test_lib",
            "@npm//jasmine",
            "@npm//serverless",
            "@npm//aws-sdk",
            "@npm//chai"
        ],
    )
