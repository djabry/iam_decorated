package(default_visibility = ["//visibility:public"])
load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary", "npm_package")

nodejs_binary(
    name = "sls_package",
    data = [
        "index.ts",
        "serverless.yml",
        "//iam-decorated-serverless-plugin:sls_plugin",
        "@npm//serverless",
        "@npm//@types/node",
    ],
    entry_point = "@npm//:node_modules/serverless/bin/serverless",
    install_source_map_support = False,
    templated_args = ["package"],
)
