package(default_visibility = ["//visibility:public"])
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package", "nodejs_binary")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

all_sources = ["**/*.ts"]
all_tests = ["**/*.spec.ts", "**/test/**"]

ts_library(
    module_name = "@djabry/iam-decorated-serverless-example",
    name = "sls_example",
    srcs = glob(all_sources, exclude = all_tests),
    deps = [
        "//iam-decorated-serverless-plugin:sls_plugin",
        "@npm//@types/node",
        "@npm//@types/aws-lambda",
        "@npm//serverless",
        "@npm//@types/serverless",
        "@npm//aws-sdk",
    ],
)

ts_library(
    name = "sls_example_spec",
    srcs = glob(all_tests),
    deps = [
        ":sls_example",
        "@npm//@types/node",
        "@npm//@types/jasmine",
        "@npm//@types/chai",
        "@npm//chai",
    ],
)

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

jasmine_node_test(
        name = "sls_example_test",
        deps = [
            ":sls_example_spec",
            "@npm//jasmine",
            "@npm//chai"
        ],
    )

npm_package(
    name = "sls_example_package",
    srcs = ["package.json", "serverless.yml"],
    deps = [":sls_example"],
)

nodejs_binary(
    name = "sls",
    data = [
        ":sls_example_package",
        "@npm//serverless",
        "@npm//serverless-plugin-typescript",
        "//iam-decorated-serverless-plugin:sls_plugin",
        "@npm//@types/node",
        "@npm//@types/aws-lambda",
    ],
    entry_point = "@npm//:node_modules/serverless/bin/serverless"
)

genrule(
    name = "compiled_src",
    srcs = [
        ":sls_example_package"
    ],
    outs = ["iam-decorated.zip"],
    cmd = "mkdir foo && cp $(location :sls_example_package)/* foo && cd foo && ../$(location :sls) package -v && cp .serverless/iam-decorated.zip ../$@",
    tools = [":sls"],
)

