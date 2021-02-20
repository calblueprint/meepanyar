### Overview
This folder contains patches that should be run after regenerating the airtable schema. This is needed to maintain consistency between the frontend and backend.

## Directions to apply patch
- Navigate to the root directory `meepanyar/`.
- Apply patch in the `src/lib/airtable/patches/` directory by running the following command: `git apply --reject --whitespace=fix src/lib/airtable/patches/*.patch`
- Any patches that have failed to be applied will be present in a `.rej` file. They should be manually applied instead.
- For explanations on what `--reject` and `--whitespace=fix` do, see [here](https://stackoverflow.com/a/15375869)

## Add Additional Patches
- Add additional patches by creating a patch file
  - This can be done via `git format-patch ... -o location/to/save`, `git diff > location/to/save`, etc...
  - Patches can also be created from commits via `git format-patch -1 <SHA-1> -o location/to/save`
- Rename the patch file to `patch-0X.patch` where `X` is an integer larger than all other previous patch integers. This naming convention ensures that patches are applied in the proper order to avoid conflicts.
- For more information about patches, you can view the following resources: 
  - [create and apply git patch files](https://devconnected.com/how-to-create-and-apply-git-patch-files/)
  - [git format-patch docs](https://git-scm.com/docs/git-format-patch)
  - [git diff docs](https://git-scm.com/docs/git-diff)
