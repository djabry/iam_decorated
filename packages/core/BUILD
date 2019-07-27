package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

all_sources = "**/*.ts"
all_tests = "**/*.spec.ts"

ts_library(
    name = "core",
    srcs = glob([all_sources], exclude = [all_tests]),
    deps = [
    ],
)

ts_library(
    name = "core_spec",
    srcs = glob([all_tests]),
    deps = [
        ":core",
        "@npm//@types/jasmine",
        "@npm//@types/chai",
        "@npm//chai",
    ],
)

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

jasmine_node_test(
        name = "core_test",
        deps = [
            ":core_spec",
            "@npm//jasmine",
            "@npm//chai"
        ],
    )
