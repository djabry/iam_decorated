package(default_visibility = ["//visibility:public"])
load("//tools:node_modules.bzl", "node_modules")

filegroup(
    name = "files",
    srcs = glob([
        "*.json",
        "*.yml",
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
    bootstrap = ["@djabry/serverless-support/register"],
    data = [
        ":lib",
        "//serverless-support:lib",
        ":node_modules",
        ":files",
        "@npm//serverless",
        "@npm//yarn",
    ],
    entry_point = ":build.ts",
    templated_args = [],
)

all_tests = ["*.spec.ts", "test/**"]
source_files = ["*.ts"]

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "lib",
    srcs = glob(source_files),
    deps = [
        "//iam-decorated-core:lib",
        "//iam-decorated-serverless-plugin:lib",
        "@npm//@types/aws-lambda",
        "@npm//@types/node",
        "@npm//@types/jasmine",
        "@npm//@types/chai",
        "@npm//aws-sdk",
        "@npm//chai",
    ],
)
