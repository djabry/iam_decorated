package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "core",
    srcs = glob(["**/*.ts"], exclude = ["**/*.spec.ts"]),
    deps = [
        "@npm//@types/jasmine"
    ],
)

ts_library(
    name = "core_spec",
    srcs = glob(["**/*.spec.ts"]),
    deps = [
        "@npm//@types/jasmine"
    ],
)

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

jasmine_node_test(
        name = "core_test",
        deps = [
            ":core_spec",
            "@npm//jasmine"
        ],
    )
