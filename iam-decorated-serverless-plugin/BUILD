package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

all_sources = ["**/*.ts"]
all_tests = ["**/*.spec.ts", "**/test/**"]

ts_library(
    module_name = "@djabry/iam-decorated-serverless-plugin",
    name = "sls_plugin",
    srcs = glob(all_sources, exclude = all_tests),
    deps = [
        "//iam-decorated-core:core",
        "@npm//@types/node",
        "@npm//serverless",
        "@npm//@types/serverless",
        "@npm//aws-sdk",
    ],
)

ts_library(
    name = "sls_plugin_spec",
    srcs = glob(all_tests),
    deps = [
        ":sls_plugin",
        "@npm//@types/node",
        "@npm//@types/jasmine",
        "@npm//@types/chai",
        "@npm//chai",
    ],
)

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

jasmine_node_test(
        name = "sls_plugin_test",
        deps = [
            ":sls_plugin_spec",
            "@npm//jasmine",
            "@npm//chai"
        ],
    )

load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

npm_package(
    name = "sls_plugin_package",
    srcs = ["package.json"],
    deps = [":sls_plugin"],
)
