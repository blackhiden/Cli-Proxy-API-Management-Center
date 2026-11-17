Create a Git Flow release using the `git-flow` CLI tool.

## Objective

Create and finalize the next release using the repository's Git Flow workflow.

The release process must:

1. Determine the next release version from the latest existing release tag.
2. Start a release branch using `git flow`.
3. Ensure all currently staged files are included in this release.
4. Finalize the release and merge it into `main` (or `master` if `main` does not exist).
5. Create the corresponding release tag.
6. Delete the release branch after the release is successfully merged.
7. Leave the repository in a clean and consistent final state.

## Versioning

Use the latest existing tag as the source for the next version number.

The numeric version must be automatically incremented from the latest tag rather than manually chosen.

Use the repository's existing numeric version format. For example:

`v1.2.3`

becomes:

`v1.2.4`

unless the repository already follows a different established versioning convention.

Becareful of using prefix `v` since `git-flow` CLI tool sometimes automatically add prefix `v` (based on some git-flow version)

Do not change or remove the required suffix.

Before creating the release, inspect the existing tags and determine the latest applicable tag automatically.

If the latest tag cannot be determined unambiguously, stop and report the problem instead of guessing.

## Staged Changes

All files that are currently staged are part of the current release.

Do not silently discard, reset, stash, or exclude staged changes.

If the staged changes need to be committed as part of the release process, include them in the release branch before finalizing the release.

Do not include unrelated unstaged changes unless they are explicitly staged as part of the release.

Do not overwrite or modify unrelated local work.

## Git Flow

Use the `git-flow` CLI tool for the release workflow.

The intended workflow is conceptually:

`start release → commit release changes → finish release → merge to main → tag release → delete release branch`

Use the repository's configured Git Flow branch structure.

The final release must be merged into `main`  (or `master` if `main` does not exist).

Do not replace the Git Flow workflow with an unrelated manual branching strategy unless `git-flow` is unavailable or fails.

## Preflight Checks

Before starting the release:

* Check the current Git branch.
* Check the working tree status.
* Check staged and unstaged changes separately.
* Check the latest release tag.
* Verify the calculated next version.
* Verify that `git-flow` is installed and available.
* Verify that the expected `main`  (or `master` if `main` does not exist) and development (`dev` or `develop`) branch exist.

Do not proceed if these checks reveal a destructive or ambiguous situation.

## Safety Rules

Never:

* Delete or reset local changes.
* Force-push.
* Force-create or overwrite an existing tag.
* Delete an existing release tag.
* Rewrite Git history.
* Ignore staged files.
* Modify unrelated files solely to make the release succeed.

If a required operation would cause data loss, rewrite history, overwrite an existing tag, or otherwise change behavior outside the intended release process, stop and report the issue.

## Release Completion

After the release is finalized, verify:

* The release branch no longer exists.
* The release was merged into `main`  (or `master` if `main` does not exist).
* The expected release tag exists.
* The tag uses the calculated version.
* The staged release files were included in the release.
* The repository is in the expected final branch/state.
* No unintended changes were discarded.

Report the final release version, final branch, created tag, and release status.

Do not create another release or perform unrelated Git operations after completing the release.
