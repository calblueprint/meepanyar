### Overview
This folder contains patches that should be run after regenerating the airtable schema. This is needed to maintain consistency between the frontend and backend.

## Directions to apply patch
- Navigate to the root directory `meepanyar/`.
- Apply patch in the `src/lib/airtable/patches/` directory by running the following command in the root directory `meepanyar/`: `npm run apply-schema-patches`.
- Any patches that have failed to be applied will be present in a `.rej` file. They should be manually applied instead.
- For explanations on what `--reject` and `--whitespace=fix` do, see [here](https://stackoverflow.com/a/15375869)

## Add Additional Patches
- Add additional patches by creating a patch file
  - This can be done via `git format-patch ... -o location/to/save`, `git diff > location/to/save`, etc...
  - Patches can also be created from commits via `git format-patch -1 <SHA-1> -o location/to/save`
- Patch files should follow the naming convention `patch-<filename>.patch` where `filename` is the file the patch mutates. There should only be 1 patch produced per file, this avoids having to fix multiple patch conflicts when if they're introduced.

## Fixing Patch Conflicts
- Some changes to the schema generator may result in merge conflicts when applying a patch. Fix these conflicts as if they were merge conflicts and create an updated patch for the file so that the patch is cleanly applied on future schema generations

## Resources about patches
- For more information about patches, you can view the following resources: 
  - [create and apply git patch files](https://devconnected.com/how-to-create-and-apply-git-patch-files/)
  - [git format-patch docs](https://git-scm.com/docs/git-format-patch)
  - [git diff docs](https://git-scm.com/docs/git-diff)
