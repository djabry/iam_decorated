def _impl(ctx):
    tree = ctx.actions.declare_directory(ctx.attr.name)
    folder_path = tree.path.replace("/" + ctx.attr.name, "")
    packages = []
    for d in ctx.attr.deps:
        for f in d.files.to_list():
            # We are going to define $ROOT in the command below to get absolute paths.
            packages.append("$ROOT/" + f.path)
    for p in ctx.attr.packages:
        packages.append(p)
    ctx.actions.run_shell(
        tools = [ctx.executable._tool, //tools/link-replacer:bin],
        inputs = ctx.files.deps,
        outputs = [tree],
        command = """
          BIN_PATH=$PWD/{npm};
          ROOT=$PWD;
          mkdir -p /tmp/.bazel-node-modules/{folder_path}/workdir;
          mkdir -p /tmp/.bazel-node-modules/{folder_path}/cache;
          rm -rf /tmp/.bazel-node-modules/{folder_path}/workdir/*;
          rm -rf /tmp/.bazel-node-modules/{folder_path}/cache/*;
          $BIN_PATH \\
              run ;
          cp -R /tmp/.bazel-node-modules/{folder_path}/workdir/node_modules {folder_path}/;
        """.format(
            npm = ctx.executable._tool.path,
            folder_path = folder_path,
        ),
        progress_message = "Installing node modules into %s" % tree.path,
    )

    return [DefaultInfo(files = depset([tree]))]

npm_script = rule(
    implementation = _impl,
    attrs = {
        "deps": attr.label_list(doc = "Dependencies"),
        "script_name": attr.string(
            mandatory = True,
        ),
        "replace_links": attr.label_list(doc = "Links to replace with original files"),
        "_tool": attr.label(
            executable = True,
            cfg = "host",
            allow_files = True,
            default = Label("@nodejs//:bin/npm"),
        ),
    },
)
